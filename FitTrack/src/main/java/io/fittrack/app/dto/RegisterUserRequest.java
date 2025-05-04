package io.fittrack.app.dto;

import java.util.List;

public class RegisterUserRequest {

    private String email;
    private String password;
    private String fullName;
    private String gender;
    private int age;
    private int height; // in cm
    private int weight; // in kg
    private String fitnessLevel;
    private String primaryGoal;
    private List<String> secondaryGoals;
    private String workoutsPerWeek;
    private String role; // "USER" or "ADMIN"

    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public int getHeight() {
        return height;
    }
    public void setHeight(int height) {
        this.height = height;
    }
    public int getWeight() {
        return weight;
    }
    public void setWeight(int weight) {
        this.weight = weight;
    }
    public String getFitnessLevel() {
        return fitnessLevel;
    }
    public void setFitnessLevel(String fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }
    public String getPrimaryGoal() {
        return primaryGoal;
    }
    public void setPrimaryGoal(String primaryGoal) {
        this.primaryGoal = primaryGoal;
    }
    public List<String> getSecondaryGoals() {
        return secondaryGoals;
    }
    public void setSecondaryGoals(List<String> secondaryGoals) {
        this.secondaryGoals = secondaryGoals;
    }
    public String getWorkoutsPerWeek() {
        return workoutsPerWeek;
    }
    public void setWorkoutsPerWeek(String workoutsPerWeek) {
        this.workoutsPerWeek = workoutsPerWeek;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    
}
