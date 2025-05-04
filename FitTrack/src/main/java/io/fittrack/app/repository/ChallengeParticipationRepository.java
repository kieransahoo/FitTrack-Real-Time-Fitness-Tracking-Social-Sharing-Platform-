package io.fittrack.app.repository;

import io.fittrack.app.entity.Challenge;
import io.fittrack.app.entity.ChallengeParticipation;
import io.fittrack.app.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ChallengeParticipationRepository extends JpaRepository<ChallengeParticipation, Long> {
    boolean existsByCustomerAndChallenge(Customer customer, Challenge challenge);
    List<ChallengeParticipation> findByCustomer(Customer customer);
    Optional<ChallengeParticipation> findByCustomerAndChallenge(Customer customer, Challenge challenge);
}