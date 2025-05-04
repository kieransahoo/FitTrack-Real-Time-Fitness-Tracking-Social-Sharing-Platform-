package io.fittrack.app.repository;

import io.fittrack.app.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {
    Page<Workout> findByCustomer_CustomerId(Integer customerId, org.springframework.data.domain.Pageable pageable);

    @Query("SELECT w.type, COUNT(w) as count FROM Workout w WHERE w.customer.customerId = :customerId GROUP BY w.type ORDER BY count DESC")
    List<Object[]> findMostCommonWorkoutType(@Param("customerId") Integer customerId);

    @Query("SELECT COUNT(w), SUM(CAST(w.duration AS long)), SUM(CAST(w.calories AS long)) FROM Workout w WHERE w.customer.customerId = :customerId")
    Object[] getWorkoutStats(@Param("customerId") Integer customerId);
}
