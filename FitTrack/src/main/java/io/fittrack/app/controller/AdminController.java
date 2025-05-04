package io.fittrack.app.controller;

import io.fittrack.app.entity.Challenge;
import io.fittrack.app.services.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
    
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
