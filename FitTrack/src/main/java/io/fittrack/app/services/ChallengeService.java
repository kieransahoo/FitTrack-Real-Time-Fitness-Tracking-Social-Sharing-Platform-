package io.fittrack.app.services;

import io.fittrack.app.dto.ChallengeParticipationDTO;
import io.fittrack.app.dto.UserChallengeDTO;
import io.fittrack.app.entity.Challenge;
import io.fittrack.app.entity.ChallengeParticipation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChallengeService {
    Challenge createChallenge(Challenge challenge);
    List<Challenge> getAllChallenges();
    List<Challenge> getActiveChallenges();
    ChallengeParticipationDTO joinChallenge(Integer challengeId);
    List<UserChallengeDTO> getUserChallenges();
    ChallengeParticipationDTO updateProgress(Integer challengeId, double progress);
}