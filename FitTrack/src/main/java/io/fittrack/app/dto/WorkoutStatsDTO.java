package io.fittrack.app.dto;

public class WorkoutStatsDTO {
    private long totalWorkouts;
    private long totalDuration;
    private long totalCalories;
    private String mostCommonWorkout;

    public WorkoutStatsDTO(long totalWorkouts, long totalDuration, long totalCalories, String mostCommonWorkout) {
        this.totalWorkouts = totalWorkouts;
        this.totalDuration = totalDuration;
        this.totalCalories = totalCalories;
        this.mostCommonWorkout = mostCommonWorkout;
    }

    // Getters and Setters
    public long getTotalWorkouts() {
        return totalWorkouts;
    }

    public void setTotalWorkouts(long totalWorkouts) {
        this.totalWorkouts = totalWorkouts;
    }

    public long getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(long totalDuration) {
        this.totalDuration = totalDuration;
    }

    public long getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(long totalCalories) {
        this.totalCalories = totalCalories;
    }

    public String getMostCommonWorkout() {
        return mostCommonWorkout;
    }

    public void setMostCommonWorkout(String mostCommonWorkout) {
        this.mostCommonWorkout = mostCommonWorkout;
    }
}