package io.fittrack.app.dto;

import java.time.LocalDateTime;

public class ChallengeParticipationDTO {
    private Integer participationId;
    private Integer challengeId;
    private String challengeTitle;
    private Integer customerId;
    private LocalDateTime joinDate;
    private double progressPercentage;
    private String status;

    // Constructor
    public ChallengeParticipationDTO(Integer participationId, Integer challengeId, String challengeTitle,
                                     Integer customerId, LocalDateTime joinDate, double progressPercentage, String status) {
        this.participationId = participationId;
        this.challengeId = challengeId;
        this.challengeTitle = challengeTitle;
        this.customerId = customerId;
        this.joinDate = joinDate;
        this.progressPercentage = progressPercentage;
        this.status = status;
    }

    public Integer getParticipationId() {
        return participationId;
    }

    public void setParticipationId(Integer participationId) {
        this.participationId = participationId;
    }

    public Integer getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Integer challengeId) {
        this.challengeId = challengeId;
    }

    public String getChallengeTitle() {
        return challengeTitle;
    }

    public void setChallengeTitle(String challengeTitle) {
        this.challengeTitle = challengeTitle;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}