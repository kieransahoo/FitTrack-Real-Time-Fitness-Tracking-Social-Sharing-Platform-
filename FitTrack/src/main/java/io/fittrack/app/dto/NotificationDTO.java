package io.fittrack.app.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private Integer id;
    private String type;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;
    private Integer userId;

    // Update constructor
    public NotificationDTO(Integer id, String type, String message, boolean read, 
            LocalDateTime createdAt, Integer userId) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.read = read;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    // Update getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}