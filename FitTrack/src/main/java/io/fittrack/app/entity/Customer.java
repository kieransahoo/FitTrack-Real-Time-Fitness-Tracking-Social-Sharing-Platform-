package io.fittrack.app.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends User {
    private String gender;
    private int age;
    private int height; // in cm
    private int weight; // in kg
    private String fitnessLevel;
    private String primaryGoal;

    @ElementCollection
    private List<String> secondaryGoals;

    private String workoutsPerWeek;
}
