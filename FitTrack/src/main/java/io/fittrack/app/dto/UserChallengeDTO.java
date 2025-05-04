package io.fittrack.app.dto;

import java.time.LocalDateTime;

public class UserChallengeDTO {
    private Integer participationId;
    private Integer challengeId;
    private String challengeTitle;
    private String challengeDescription;
    private LocalDateTime joinDate;
    private double progressPercentage;
    private String status;

    public UserChallengeDTO(Integer participationId, Integer challengeId, String challengeTitle,
            String challengeDescription, LocalDateTime joinDate, double progressPercentage, String status) {
        this.participationId = participationId;
        this.challengeId = challengeId;
        this.challengeTitle = challengeTitle;
        this.challengeDescription = challengeDescription;
        this.joinDate = joinDate;
        this.progressPercentage = progressPercentage;
        this.status = status;
    }

    // Add getters and setters
}