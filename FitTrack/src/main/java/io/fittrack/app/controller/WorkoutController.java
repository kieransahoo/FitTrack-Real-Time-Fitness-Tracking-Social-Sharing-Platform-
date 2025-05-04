package io.fittrack.app.controller;

import io.fittrack.app.dto.WorkoutResponseDTO;
import io.fittrack.app.dto.WorkoutStatsDTO;
import io.fittrack.app.entity.Workout;
import io.fittrack.app.services.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @PostMapping
    private ResponseEntity<?> workoutService(@Valid @RequestBody Workout workout) {
        try {
            workoutService.saveWorkout(workout);
            return new ResponseEntity<>("Workout saved successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while saving workout: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list")
    private ResponseEntity<?> getAllWorkouts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "workoutId,asc") String[] sort) {
        try {
            Pageable pageable = PageRequest.of(
                    page,
                    size,
                    Sort.by(Sort.Direction.fromString(sort[1]), sort[0]));
            Page<WorkoutResponseDTO> workouts = workoutService.getAllWorkouts(pageable);
            return new ResponseEntity<>(workouts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while fetching workouts: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getWorkoutStats() {
        try {
            WorkoutStatsDTO stats = workoutService.getWorkoutStats();
            return new ResponseEntity<>(stats, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while fetching workout statistics: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
