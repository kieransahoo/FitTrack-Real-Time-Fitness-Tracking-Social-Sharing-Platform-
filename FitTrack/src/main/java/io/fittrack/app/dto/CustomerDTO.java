package io.fittrack.app.dto;

public class CustomerDTO {
    private Integer customerId;
    private Integer userId;

    public CustomerDTO(Integer customerId, Integer userId) {
        this.customerId = customerId;
        this.userId = userId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}