# FitTrack-Real-Time-Fitness-Tracking-Social-Sharing-Platform-
FitTrack (Real-Time Fitness Tracking &amp; Social Sharing Platform)

Project: FitTrack (Real-Time Fitness Tracking & Social Sharing Platform)
Introduction:
FitTrack is a fitness tracking platform that allows users to log their workouts, track progress, and share achievements with their social network. Users can set fitness goals, participate in challenges, and engage with other members of the community.

Product Features:
User Roles:
User: Logs workouts, sets goals, joins challenges, shares achievements with friends.


Admin: Manages user accounts, reviews content, and manages system health.


Functionality:
Users can create profiles with fitness goals (e.g., weight loss, muscle gain).


Users log workouts, including type, duration, calories burned, and progress.


Each workout entry can be tracked and viewed in a timeline.


Users can join fitness challenges that are posted by the platform (e.g., “Run 5K in 7 days”).


Users can track their progress against the challenges in real-time.


The system provides notifications about milestone achievements and challenge completions.


Users can view achievements and share them on their profile or with their network.


Admins can view user activity, ban users, and manage challenges.



Product Design:
Database Structure:
Users table
Workouts table
Challenges table
ChallengeParticipations table
Notifications table

Backend Functions:
1. Workout Logging API:
Users log their workout details (type, duration, calories).


Each workout is associated with a timestamp.


The system checks if the workout matches any ongoing challenge criteria.


2. Challenge Participation API:
Users can join challenges and track their progress.


Challenges are visible to users based on their fitness goals.


When a user joins a challenge, their progress (e.g., miles run, calories burned) is logged.


Notifications are sent when the challenge is completed or milestones are reached.


3. Notification System:
Notifications are triggered when a user reaches milestones (e.g., "Congrats, you’ve burned 500 calories this week!").


Notifications are real-time but can be accessed later via a notifications feed.


4. Admin User Management API:
Admins can view users, suspend accounts, and manage challenge creation.


5. CRON Job (Challenge Status Update):
A CRON job runs to update the status of challenges (e.g., from ACTIVE to COMPLETED) based on the end date.


Challenges that end automatically mark participants as “COMPLETED”.



Tasks for Assessment:
Auth APIs:


Register/Login API using JWT.


Role-based login (Admin / User).


Workout Logging API:


Allow users to log workouts (type, calories burned, duration).


Associate each workout with a timestamp.


Challenge API:


Admins can create challenges (title, description, start/end date).


Users can join challenges and track their progress.


Progress updates should be logged in the ChallengeParticipations table.


Notification System API:


Send notifications to users when they reach milestones (e.g., calories burned, challenge completion).


Notifications are stored and accessible later.


Admin User Management API:


Admins can view and manage user accounts, suspend accounts for inappropriate behavior, and manage challenges.


Frontend Pages:


User profile page (view/edit profile, track workout logs).


Challenge page (view available challenges, join a challenge, track progress).


Workout logging page (log workouts, view past logs).


Admin dashboard (view/manage users, view challenge statistics).



Constraints:
Focus on logging workouts, joining challenges, and tracking progress.


Keep the frontend simple — can use React/HTML or basic Bootstrap.


Notifications should be real-time but stored for later review.


A simple chat or social feed can be simulated (no need for fully implemented social interactions).


Admin functionality should focus on managing user activity and challenges.



Tech Stack:
Backend: Java, Spring Boot, JPA, MySQL/PostgreSQL, Spring Security (JWT), CRON Jobs, Logging.


Frontend: React / Basic HTML/CSS


Tools: Postman, Git, Maven/Gradle



