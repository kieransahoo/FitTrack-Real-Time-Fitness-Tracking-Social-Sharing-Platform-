package io.fittrack.app.services;

import io.fittrack.app.dto.ChallengeParticipationDTO;
import io.fittrack.app.dto.UserChallengeDTO;
import io.fittrack.app.dto.UserDTO;
import io.fittrack.app.entity.Challenge;
import io.fittrack.app.entity.ChallengeParticipation;
import io.fittrack.app.entity.Customer;
import io.fittrack.app.exception.ChallengeException;
import io.fittrack.app.repository.ChallengeRepository;
import io.fittrack.app.repository.ChallengeParticipationRepository;
import io.fittrack.app.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeParticipationRepository participationRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(ChallengeServiceImpl.class);

    @Override
    public Challenge createChallenge(Challenge challenge) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new RuntimeException("Only admins can create challenges");
        }
        
        if (challenge.getStartDate().isAfter(challenge.getEndDate())) {
            throw new RuntimeException("Start date must be before end date");
        }
        
        return challengeRepository.save(challenge);
    }

    @Override
    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    @Override
    public List<Challenge> getActiveChallenges() {
        LocalDate now = LocalDate.now();
        return challengeRepository.findAll().stream()
                .filter(challenge -> 
                    !now.isBefore(challenge.getStartDate()) && 
                    !now.isAfter(challenge.getEndDate()))
                .collect(Collectors.toList());
    }



    @Override
    public ChallengeParticipationDTO joinChallenge(Integer challengeId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDTO user = userService.getUserByEmail(authentication.getName());
            if (user == null) {
                logger.warn("User not found with email: {}", authentication.getName());
                throw new RuntimeException("User not found");
            }

            Customer customer = customerRepository.findByUser_Email(authentication.getName());
            if (customer == null) {
                logger.warn("Customer not found for user with email: {}", authentication.getName());
                throw new RuntimeException("Customer not found");
            }

            Challenge challenge = challengeRepository.findById(challengeId)
                    .orElseThrow(() -> {
                        logger.error("Challenge not found with ID: {}", challengeId);
                        return new ChallengeException("Challenge not found");
                    });

            if (LocalDate.now().isAfter(challenge.getEndDate())) {
                logger.warn("Attempt to join ended challenge. ChallengeId: {}, CustomerId: {}", 
                    challengeId, customer.getCustomerId());
                throw new ChallengeException("Challenge has already ended");
            }

            if (participationRepository.existsByCustomerAndChallenge(customer, challenge)) {
                logger.warn("Customer {} attempted to join challenge {} multiple times", 
                    customer.getCustomerId(), challengeId);
                throw new ChallengeException("Already joined this challenge");
            }

            ChallengeParticipation participation = new ChallengeParticipation();
            participation.setChallenge(challenge);
            participation.setCustomer(customer);
            participation.setJoinDate(LocalDateTime.now());
            participation.setProgressPercentage(0.0);
            participation.setStatus("ACTIVE");

            participation = participationRepository.save(participation);
            
            logger.info("Customer {} successfully joined challenge {}", 
                customer.getCustomerId(), challengeId);

            return new ChallengeParticipationDTO(
                participation.getParticipationId(),
                challenge.getChallengeId(),
                challenge.getTitle(),
                customer.getCustomerId(),
                participation.getJoinDate(),
                participation.getProgressPercentage(),
                participation.getStatus()
            );

        } catch (ChallengeException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error while joining challenge: {}", e.getMessage(), e);
            throw new ChallengeException("Failed to join challenge. Please try again later.");
        }
    }

    @Override
    public List<UserChallengeDTO> getUserChallenges() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDTO user = userService.getUserByEmail(authentication.getName());
            if (user == null) {
                logger.warn("User not found with email: {}", authentication.getName());
                throw new RuntimeException("User not found");
            }

            Customer customer = customerRepository.findByUser_Email(authentication.getName());
            if (customer == null) {
                logger.warn("Customer not found for user with email: {}", authentication.getName());
                throw new RuntimeException("Customer not found");
            }

            List<ChallengeParticipation> participations = participationRepository.findByCustomer(customer);
            
            return participations.stream()
                .map(participation -> new UserChallengeDTO(
                    participation.getParticipationId(),
                    participation.getChallenge().getChallengeId(),
                    participation.getChallenge().getTitle(),
                    participation.getChallenge().getDescription(),
                    participation.getJoinDate(),
                    participation.getProgressPercentage(),
                    participation.getStatus()
                ))
                .collect(Collectors.toList());
        } catch (ChallengeException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error fetching user challenges: {}", e.getMessage(), e);
            throw new ChallengeException("Failed to fetch user challenges");
        }
    }

    @Override
    public ChallengeParticipationDTO updateProgress(Integer challengeId, double progress) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDTO user = userService.getUserByEmail(authentication.getName());
            if (user == null) {
                logger.warn("User not found with email: {}", authentication.getName());
                throw new RuntimeException("User not found");
            }

            Customer customer = customerRepository.findByUser_Email(authentication.getName());
            if (customer == null) {
                logger.warn("Customer not found for user with email: {}", authentication.getName());
                throw new RuntimeException("Customer not found");
            }

            Challenge challenge = challengeRepository.findById(challengeId)
                    .orElseThrow(() -> {
                        logger.error("Challenge not found with ID: {}", challengeId);
                        return new ChallengeException("Challenge not found");
                    });

            ChallengeParticipation participation = participationRepository
                    .findByCustomerAndChallenge(customer, challenge)
                    .orElseThrow(() -> {
                        logger.error("Participation not found for customer {} and challenge {}", 
                            customer.getCustomerId(), challengeId);
                        return new ChallengeException("Not participating in this challenge");
                    });

            if (progress < 0 || progress > 100) {
                logger.warn("Invalid progress value {} for challenge {}", progress, challengeId);
                throw new ChallengeException("Progress must be between 0 and 100");
            }

            participation.setProgressPercentage(progress);
            if (progress >= 100) {
                participation.setStatus("COMPLETED");
                logger.info("Challenge {} completed by customer {}", challengeId, customer.getCustomerId());
            }

            participation = participationRepository.save(participation);
            
            logger.info("Progress updated for challenge {}: {}%", challengeId, progress);

            return new ChallengeParticipationDTO(
                participation.getParticipationId(),
                challenge.getChallengeId(),
                challenge.getTitle(),
                customer.getCustomerId(),
                participation.getJoinDate(),
                participation.getProgressPercentage(),
                participation.getStatus()
            );
        } catch (ChallengeException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error updating challenge progress: {}", e.getMessage(), e);
            throw new ChallengeException("Failed to update challenge progress");
        }
    }
}