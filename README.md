# FitTrack - Real-Time Fitness Tracking Platform

## Project Overview
FitTrack is a fitness tracking platform that allows users to log their workouts, track progress, and share achievements with their social network. Users can set fitness goals, participate in challenges, and engage with other members of the community.


## Key Features
- **User Features**:
  - Workout logging with calories/duration tracking
  - Challenge participation & progress tracking
  - Real-time notifications for milestones
  - Profile management with fitness goals

- **Admin Features**:
  - User account management
  - Challenge creation/moderation
  - System health monitoring

## Tech Stack
- **Backend**: 
  - Java 17, Spring Boot 3.1+
  - MySQL, Spring Data JPA
  - Spring Security with JWT
  - Swagger for API docs

- **Frontend**:
  - React/ Basic HTML5/CSS3
  - Axios for API calls

## Setup Instructions

1. **Backend Setup**:
- Create a database as fittrack in mysql.
```bash
mvn clean install
mvn spring-boot:run
```

## API Documentation Details

### Authentication API
- Register/Login API using JWT.
- Role-based login (Admin / User).

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/auth/login` | POST | Authenticate user/admin | `{email, password}` | JWT token + user role |
| `/api/auth/register` | POST | Create new user account | `{name, email, password, fitnessGoal}` | Created user details |

### Admin API
| Endpoint | Method | Description | Headers | Request Body |
|----------|--------|-------------|---------|--------------|
| `/api/admin/challenges` | POST | Create challenge | JWT (Admin) | `{title, description, startDate, endDate, target: INT}` |
| `/api/admin/challenges` | GET | List all challenges | JWT (Admin) | - |

### Workout API
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/workouts` | POST | Save a new workout | `{type, duration, calories, notes, date}` | Confirmation message |
| `/api/workouts/list` | GET | Get paginated list of workouts | - | List of workouts |
| `/api/workouts/stats` | GET | Get workout statistics | - | Workout statistics |

### Challenges API
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/challenges` | GET | Get active challenges | - | List of active challenges |
| `/api/challenges/{challengeId}/join` | POST | Join a challenge | - | ChallengeParticipationDTO |
| `/api/challenges/my-challenges` | GET | Get user's challenges | - | List of user's challenges |
| `/api/challenges/{challengeId}/progress` | PUT | Update challenge progress | `progress: double` | Updated ChallengeParticipationDTO |
### Admin API
| Endpoint | Method | Description | Headers | Request Body |
|----------|--------|-------------|---------|--------------|
| `/api/admin/users` | GET | List all users | JWT (Admin) | - |
| `/api/admin/users/{userId}/suspend` | PUT | Suspend a user | JWT (Admin) | - |
| `/api/admin/challenges` | POST | Create challenge | JWT (Admin) | `{title, description, startDate, endDate, target: INT}` |
| `/api/admin/challenges` | GET | List all challenges | JWT (Admin) | - |

### Notification API
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/notifications` | GET | Get user notifications | - | List of NotificationDTO |
| `/api/notifications/{notificationId}/read` | PUT | Mark notification as read | - | Updated NotificationDTO |
| `/api/notifications/{notificationId}` | DELETE | Delete a notification | - | - |

