package io.fittrack.app.services;

import io.fittrack.app.dto.NotificationDTO;
import io.fittrack.app.entity.Notification;
import io.fittrack.app.exception.NotificationException;
import io.fittrack.app.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    
    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public NotificationDTO createNotification(String type, String message, Integer userId) {
        try {
            logger.info("Creating notification for user {}: {} - {}", userId, type, message);
            
            Notification notification = new Notification();
            notification.setType(type);
            notification.setMessage(message);
            notification.setUserId(userId);
            notification.setRead(false);
            notification.setCreatedAt(LocalDateTime.now());
            
            notification = notificationRepository.save(notification);
            
            NotificationDTO notificationDTO = new NotificationDTO(
                notification.getId(),
                notification.getType(),
                notification.getMessage(),
                notification.isRead(),
                notification.getCreatedAt(),
                notification.getUserId()
            );
            
            logger.info("Notification created successfully: {}", notification.getId());
            return notificationDTO;
        } catch (Exception e) {
            logger.error("Error creating notification: {}", e.getMessage(), e);
            throw new NotificationException("Failed to create notification");
        }
    }

    @Override
    public List<NotificationDTO> getUserNotifications(Integer userId) {
        try {
            logger.info("Fetching notifications for user: {}", userId);
            
            List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
            
            List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(notification -> new NotificationDTO(
                    notification.getId(),
                    notification.getType(),
                    notification.getMessage(),
                    notification.isRead(),
                    notification.getCreatedAt(),
                    notification.getUserId()
                ))
                .collect(Collectors.toList());
            
            logger.info("Retrieved {} notifications for user {}", notifications.size(), userId);
            return notificationDTOs;
        } catch (Exception e) {
            logger.error("Error fetching user notifications: {}", e.getMessage(), e);
            throw new NotificationException("Failed to fetch notifications");
        }
    }

    @Override
    public NotificationDTO markNotificationAsRead(Integer notificationId) {
        try {
            logger.info("Marking notification as read: {}", notificationId);
            
            Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotificationException("Notification not found"));
            
            notification.setRead(true);
            notification = notificationRepository.save(notification);
            
            NotificationDTO notificationDTO = new NotificationDTO(
                notification.getId(),
                notification.getType(),
                notification.getMessage(),
                notification.isRead(),
                notification.getCreatedAt(),
                notification.getUserId()
            );
            
            logger.info("Notification {} marked as read", notificationId);
            return notificationDTO;
        } catch (Exception e) {
            logger.error("Error marking notification as read: {}", e.getMessage(), e);
            throw new NotificationException("Failed to mark notification as read");
        }
    }

    @Override
    public void deleteNotification(Integer notificationId) {
        try {
            logger.info("Deleting notification: {}", notificationId);
            
            if (!notificationRepository.existsById(notificationId)) {
                throw new NotificationException("Notification not found");
            }
            
            notificationRepository.deleteById(notificationId);
            logger.info("Notification {} deleted successfully", notificationId);
        } catch (Exception e) {
            logger.error("Error deleting notification: {}", e.getMessage(), e);
            throw new NotificationException("Failed to delete notification");
        }
    }

    @Override
    public void createChallengeCompletionNotification(Integer userId, String challengeName) {
        try {
            String message = String.format("Congratulations! You've completed the challenge: %s", challengeName);
            createNotification("CHALLENGE_COMPLETION", message, userId);
            logger.info("Challenge completion notification created for user {} - {}", userId, challengeName);
        } catch (Exception e) {
            logger.error("Error creating challenge completion notification: {}", e.getMessage(), e);
            throw new NotificationException("Failed to create challenge completion notification");
        }
    }

    @Override
    public void createCalorieMilestoneNotification(Integer userId, int calories) {
        try {
            String message = String.format("Congratulations! You've burned %d calories!", calories);
            createNotification("CALORIE_MILESTONE", message, userId);
            logger.info("Calorie milestone notification created for user {} - {} calories", userId, calories);
        } catch (Exception e) {
            logger.error("Error creating calorie milestone notification: {}", e.getMessage(), e);
            throw new NotificationException("Failed to create calorie milestone notification");
        }
    }
}