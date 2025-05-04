package io.fittrack.app.controller;

import io.fittrack.app.dto.ChallengeParticipationDTO;
import io.fittrack.app.entity.Challenge;
import io.fittrack.app.entity.ChallengeParticipation;
import io.fittrack.app.services.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/challenges")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping
    public ResponseEntity<?> getActiveChallenges() {
        try {
            return new ResponseEntity<>(challengeService.getActiveChallenges(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error fetching active challenges: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{challengeId}/join")
    public ResponseEntity<?> joinChallenge(@PathVariable Integer challengeId) {
        try {
            ChallengeParticipationDTO participation = challengeService.joinChallenge(challengeId);
            return new ResponseEntity<>(participation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error joining challenge: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/my-challenges")
    public ResponseEntity<?> getUserChallenges() {
        try {
            return new ResponseEntity<>(challengeService.getUserChallenges(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error fetching user challenges: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{challengeId}/progress")
    public ResponseEntity<?> updateProgress(
            @PathVariable Integer challengeId,
            @RequestParam double progress) {
        try {
            ChallengeParticipationDTO updated = challengeService.updateProgress(challengeId, progress);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating progress: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }
}