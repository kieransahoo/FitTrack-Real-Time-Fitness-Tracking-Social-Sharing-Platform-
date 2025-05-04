package io.fittrack.app.services;

import io.fittrack.app.dto.WorkoutResponseDTO;
import io.fittrack.app.dto.WorkoutStatsDTO;
import io.fittrack.app.entity.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WorkoutService {

    void saveWorkout(Workout workout);

    Page<WorkoutResponseDTO> getAllWorkouts(Pageable pageable);

    WorkoutStatsDTO getWorkoutStats();
}
