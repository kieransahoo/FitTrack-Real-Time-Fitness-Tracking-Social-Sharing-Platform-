package io.fittrack.app.services;

import io.fittrack.app.dto.UserDTO;
import io.fittrack.app.dto.WorkoutStatsDTO;
import io.fittrack.app.dto.WorkoutResponseDTO;
import io.fittrack.app.entity.Customer;
import io.fittrack.app.entity.User;
import io.fittrack.app.entity.Workout;
import io.fittrack.app.repository.CustomerRepository;
import io.fittrack.app.repository.WorkoutRepository;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class WorkoutServiceImpl implements WorkoutService {

    private static final Logger logger = LoggerFactory.getLogger(WorkoutServiceImpl.class);

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void saveWorkout(Workout workout) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDTO user = userService.getUserByEmail(authentication.getName());
            if (user == null) {
                logger.warn("User not found with email: {}", authentication.getName());
                throw new RuntimeException("User not found");
            }

            // Find the customer associated with the user
            Customer customer = customerRepository.findByUser_Email(authentication.getName());
            if (customer == null) {
                logger.warn("Customer not found for user with email: {}", authentication.getName());
                throw new RuntimeException("Customer not found");
            }

            // Set the customer-workout relationship
            workout.setCustomer(customer);
            workout.setDate(LocalDateTime.now());
            workoutRepository.save(workout);
            logger.info("Workout saved successfully with ID: {}", workout.getWorkoutId());
        } catch (Exception e) {
            logger.error("Error occurred while saving workout: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to save workout. Please try again later.");
        }
    }

    @Override
    public Page<WorkoutResponseDTO> getAllWorkouts(Pageable pageable) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDTO user = userService.getUserByEmail(authentication.getName());
            if (user == null) {
                logger.warn("User not found with email: {}", authentication.getName());
                throw new RuntimeException("User not found");
            }

            // Find the customer associated with the user
            Customer customer = customerRepository.findByUser_Email(authentication.getName());
            if (customer == null) {
                logger.warn("Customer not found for user with email: {}", authentication.getName());
                throw new RuntimeException("Customer not found");
            }

            logger.info("Fetching workouts for customer ID: {}", customer.getCustomerId());
            Page<Workout> workouts = workoutRepository.findByCustomer_CustomerId(customer.getCustomerId(), pageable);
            
            return workouts.map(workout -> new WorkoutResponseDTO(
                workout.getWorkoutId(),
                workout.getType(),
                workout.getDuration(),
                workout.getCalories(),
                workout.getNotes(),
                workout.getDate(),
                customer.getCustomerId()
            ));
        } catch (Exception e) {
            logger.error("Error occurred while fetching workouts: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch workouts. Please try again later.");
        }
    }

    @Override
    public WorkoutStatsDTO getWorkoutStats() {
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

            Object[] stats = workoutRepository.getWorkoutStats(customer.getCustomerId());
            List<Object[]> mostCommon = workoutRepository.findMostCommonWorkoutType(customer.getCustomerId());
            
            String mostCommonWorkout = "No workouts yet";
            if (mostCommon != null && !mostCommon.isEmpty() && mostCommon.size() >= 2) {
                Object[] firstEntry = mostCommon.get(1);  // Get the second entry which contains the type
                if (firstEntry != null && firstEntry.length > 0 && firstEntry[0] != null) {
                    mostCommonWorkout = firstEntry[0].toString();
                }
            }

            // Safely handle the stats array
            long totalWorkouts = 0L;
            long totalDuration = 0L;
            long totalCalories = 0L;

            if (stats != null && stats.length > 0) {
                Object[] statsArray = (Object[]) stats[0];
                if (statsArray != null && statsArray.length >= 3) {
                    totalWorkouts = statsArray[0] != null ? ((Long) statsArray[0]) : 0L;
                    totalDuration = statsArray[1] != null ? ((Long) statsArray[1]) : 0L;
                    totalCalories = statsArray[2] != null ? ((Long) statsArray[2]) : 0L;
                }
            }

            return new WorkoutStatsDTO(
                totalWorkouts,
                totalDuration,
                totalCalories,
                mostCommonWorkout
            );
        } catch (Exception e) {
            logger.error("Error occurred while fetching workout stats: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch workout statistics. Please try again later.");
        }
    }
}
