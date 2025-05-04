package io.fittrack.app.repository;

import io.fittrack.app.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    List<Challenge> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate currentDate, LocalDate currentDate2);
}