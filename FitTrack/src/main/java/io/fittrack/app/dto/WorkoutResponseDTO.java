package io.fittrack.app.dto;

import java.time.LocalDateTime;

public class WorkoutResponseDTO {
    private Integer workoutId;
    private String type;
    private String duration;
    private String calories;
    private String notes;
    private LocalDateTime date;
    private Integer customerId;

    public WorkoutResponseDTO(Integer workoutId, String type, String duration, 
                            String calories, String notes, LocalDateTime date, 
                            Integer customerId) {
        this.workoutId = workoutId;
        this.type = type;
        this.duration = duration;
        this.calories = calories;
        this.notes = notes;
        this.date = date;
        this.customerId = customerId;
    }

    // Getters and Setters
    public Integer getWorkoutId() {
        return workoutId;
    }

    public void setWorkoutId(Integer workoutId) {
        this.workoutId = workoutId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getCalories() {
        return calories;
    }

    public void setCalories(String calories) {
        this.calories = calories;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
}