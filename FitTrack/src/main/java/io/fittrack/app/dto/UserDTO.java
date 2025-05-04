package io.fittrack.app.dto;

public class UserDTO {

    private Integer userId;
    private String fullName;

    private String email;

    private String role;

    private boolean suspended;

    public Integer getUserId() {
        return userId;
    }

    public UserDTO() {
    }

    public UserDTO(Integer userId, String fullName, String email, String role, boolean suspended) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.suspended = suspended;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isSuspended() {
        return suspended;
    }

    public void setSuspended(boolean suspended) {
        this.suspended = suspended;
    }

    
}
