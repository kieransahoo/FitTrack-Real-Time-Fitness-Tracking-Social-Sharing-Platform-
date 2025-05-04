import React, { useState } from 'react';
import './Community.css';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  workoutData?: {
    type: string;
    duration: string;
    calories: number;
  };
}

interface TopAchiever {
  id: string;
  name: string;
  avatar: string;
  achievements: number;
  workouts: number;
  isFollowing: boolean;
}

interface Achievement {
  id: string;
  user: string;
  title: string;
  timestamp: string;
  icon: string;
}

const Community: React.FC = () => {
  const [postText, setPostText] = useState<string>('');

  const demoTopAchievers: TopAchiever[] = [
    {
      id: '1',
      name: 'Jane Cooper',
      avatar: 'JC',
      achievements: 18,
      workouts: 47,
      isFollowing: true
    },
    {
      id: '2',
      name: 'Alex Morgan',
      avatar: 'AM',
      achievements: 15,
      workouts: 39,
      isFollowing: false
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'MJ',
      achievements: 12,
      workouts: 35,
      isFollowing: true
    }
  ];

  const demoRecentAchievements: Achievement[] = [
    {
      id: '1',
      user: 'Alex Morgan',
      title: 'Completed 7-Day HIIT Challenge',
      timestamp: '3 hours ago',
      icon: '🏆'
    },
    {
      id: '2',
      user: 'Sarah Williams',
      title: '5-Day Workout Streak',
      timestamp: '3 hours ago',
      icon: '🔥'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      title: 'Ran 100 miles this month',
      timestamp: 'Yesterday',
      icon: '🏃'
    }
  ];

  const demoPosts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Jane Cooper',
        avatar: 'JC'
      },
      content: 'Just completed my first 10K run! Feeling amazing and proud of my progress.',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 5,
      workoutData: {
        type: 'Running',
        duration: '55 min',
        calories: 450
      }
    },
    {
      id: '2',
      user: {
        name: 'Alex Morgan',
        avatar: 'AM'
      },
      content: 'Celebrating a new achievement today!',
      timestamp: 'Yesterday',
      likes: 43,
      comments: 7
    }
  ];

  const popularTags: string[] = [
    '#running', '#fitness', '#weightloss', '#motivation',
    '#yoga', '#hiit', '#nutrition', '#strengthtraining',
    '#progress'
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post content:', postText);
    setPostText('');
  };

  return (
    <div className="community-container">
      <h1 className="page-title">Community</h1>
      
      <div className="community-content">
        <div className="post-feed">
          <div className="post-section">
            <div className="post-input-wrapper">
              <div className="user-avatar"></div>
              <div className="input-container">
                <textarea
                  placeholder="Share your fitness journey or achievements..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </div>
            </div>
            <div className="post-button-container">
              <button 
                className="post-button" 
                disabled={!postText.trim()}
                onClick={handlePostSubmit}
              >
                Post
              </button>
            </div>
          </div>

          {demoPosts.map(post => (
            <div key={post.id} className="post-section">
              <div className="post-header">
                <div className={`achiever-avatar ${post.user.avatar.toLowerCase()}`}>
                  {post.user.avatar}
                </div>
                <div className="post-user-info">
                  <h3>{post.user.name}</h3>
                  <span className="post-time">{post.timestamp}</span>
                </div>
              </div>
              <p className="post-content">{post.content}</p>
              {post.workoutData && (
                <div className="workout-data">
                  <span>🏃‍♂️ {post.workoutData.type}</span>
                  <span>⏱️ {post.workoutData.duration}</span>
                  <span>🔥 {post.workoutData.calories} cal</span>
                </div>
              )}
              <div className="post-actions">
                <button>❤️ {post.likes}</button>
                <button>💬 {post.comments}</button>
                <button>↗️ Share</button>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar">
          <div className="top-achievers">
            <h2>Top Achievers</h2>
            <div className="achievers-list">
              {demoTopAchievers.map((achiever, index) => (
                <div key={achiever.id} className="achiever-card">
                  <span className="achiever-rank">{index + 1}</span>
                  <div className={`achiever-avatar ${achiever.avatar.toLowerCase()}`}>
                    {achiever.avatar}
                  </div>
                  <div className="achiever-info">
                    <h3>{achiever.name}</h3>
                    <div className="achiever-stats">
                      <span>{achiever.achievements} achievements</span>
                      <span>•</span>
                      <span>{achiever.workouts} workouts</span>
                    </div>
                  </div>
                  <button className={`follow-button ${achiever.isFollowing ? 'following' : ''}`}>
                    {achiever.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-achievements">
            <h2>Recent Achievements</h2>
            <div className="achievement-list">
              {demoRecentAchievements.map(achievement => (
                <div key={achievement.id} className="achievement-item">
                  <div className="achievement-icon">
                    {achievement.icon}
                  </div>
                  <div className="achievement-details">
                    <h3>{achievement.title}</h3>
                    <span className="achievement-time">{achievement.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="popular-tags">
            <h2>Popular Tags</h2>
            <div className="tags-container">
              {popularTags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;