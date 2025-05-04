package io.fittrack.app.controller;

import io.fittrack.app.dto.NotificationDTO;
import io.fittrack.app.dto.UserDTO;
import io.fittrack.app.services.NotificationService;
import io.fittrack.app.services.UserService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserService userService;

    @GetMapping

    public ResponseEntity<List<NotificationDTO>> getUserNotifications() {
        Integer userId = getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDTO> markAsRead(@PathVariable Integer notificationId) {
        return ResponseEntity.ok(notificationService.markNotificationAsRead(notificationId));
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Integer notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.noContent().build();
    }

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDTO user = userService.getUserByEmail(authentication.getName());
        return user.getUserId();
    }
}