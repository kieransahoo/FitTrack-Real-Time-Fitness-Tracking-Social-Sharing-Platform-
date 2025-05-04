package io.fittrack.app.controller;

import io.fittrack.app.dto.UserDTO;
import io.fittrack.app.entity.Challenge;
import io.fittrack.app.services.ChallengeService;
import io.fittrack.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDTO> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{userId}/suspend")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> suspendUser(@PathVariable Integer userId) {
        try {
            userService.suspendUser(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception
            return new ResponseEntity<>("Error suspending user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Autowired
    private ChallengeService challengeService;

    @PostMapping("/challenges")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createChallenge(@RequestBody Challenge challenge) {
        try {
            Challenge createdChallenge = challengeService.createChallenge(challenge);
            return new ResponseEntity<>(createdChallenge, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating challenge: " + e.getMessage(), 
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/challenges")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllChallenges() {
        try {
            return new ResponseEntity<>(challengeService.getAllChallenges(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error fetching challenges: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
