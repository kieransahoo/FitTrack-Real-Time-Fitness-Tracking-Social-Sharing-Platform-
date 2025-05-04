package io.fittrack.app.services;

import io.fittrack.app.dto.NotificationDTO;
import java.util.List;

public interface NotificationService {
    NotificationDTO createNotification(String type, String message, Integer userId);
    List<NotificationDTO> getUserNotifications(Integer userId);
    NotificationDTO markNotificationAsRead(Integer notificationId);
    void deleteNotification(Integer notificationId);
    void createChallengeCompletionNotification(Integer userId, String challengeName);
    void createCalorieMilestoneNotification(Integer userId, int calories);
}