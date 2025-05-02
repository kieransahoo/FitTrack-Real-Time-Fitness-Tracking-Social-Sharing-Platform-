import { useEffect, useState } from 'react';
import './Dashboard.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
interface DashboardStats {
  totalWorkouts: number;
  workoutsThisWeek: number;
  caloriesBurned: number;
  caloriesThisWeek: number;
  activeHours: number;
  activeHoursThisWeek: number;
  achievements: number;
  achievementsThisMonth: number;
}

interface ActivityData {
  day: string;
  calories: number;
  activeMinutes: number;
}

interface UserGoals {
  weightLoss: {
    current: number;
    target: number;
  };
  weeklyWorkouts: {
    current: number;
    target: number;
  };
  runningDistance: {
    current: number;
    target: number;
  };
}

interface RecentActivity {
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  participants: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkouts: 23,
    workoutsThisWeek: 3,
    caloriesBurned: 12450,
    caloriesThisWeek: 2500,
    activeHours: 18.5,
    activeHoursThisWeek: 0,
    achievements: 8,
    achievementsThisMonth: 2
  });

  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('week');

  const weeklyData = [
    { day: 'Mon', calories: 250, activeMinutes: 35 },
    { day: 'Tue', calories: 320, activeMinutes: 45 },
    { day: 'Wed', calories: 280, activeMinutes: 30 },
    { day: 'Thu', calories: 450, activeMinutes: 60 },
    { day: 'Fri', calories: 350, activeMinutes: 40 },
    { day: 'Sat', calories: 520, activeMinutes: 75 },
    { day: 'Sun', calories: 280, activeMinutes: 35 },
  ];

  const monthlyData = [
    { day: 'Week 1', calories: 1800, activeMinutes: 240 },
    { day: 'Week 2', calories: 2100, activeMinutes: 280 },
    { day: 'Week 3', calories: 1950, activeMinutes: 260 },
    { day: 'Week 4', calories: 2300, activeMinutes: 310 },
  ];

  const yearlyData = [
    { day: 'Jan', calories: 8500, activeMinutes: 1200 },
    { day: 'Feb', calories: 9200, activeMinutes: 1300 },
    { day: 'Mar', calories: 8900, activeMinutes: 1250 },
    { day: 'Apr', calories: 9500, activeMinutes: 1400 },
    { day: 'May', calories: 9800, activeMinutes: 1450 },
    { day: 'Jun', calories: 9300, activeMinutes: 1350 },
    { day: 'Jul', calories: 9600, activeMinutes: 1380 },
    { day: 'Aug', calories: 9400, activeMinutes: 1320 },
    { day: 'Sep', calories: 9700, activeMinutes: 1420 },
    { day: 'Oct', calories: 9200, activeMinutes: 1300 },
    { day: 'Nov', calories: 9500, activeMinutes: 1360 },
    { day: 'Dec', calories: 9100, activeMinutes: 1280 },
  ];

  const getChartData = () => {
    switch (timeFilter) {
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const [userGoals] = useState<UserGoals>({
    weightLoss: {
      current: 185,
      target: 170,
    },
    weeklyWorkouts: {
      current: 3,
      target: 5,
    },
    runningDistance: {
      current: 15,
      target: 50,
    },
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      type: "Running",
      duration: 30,
      calories: 320,
      date: "Today"
    },
    {
      type: "Yoga",
      duration: 45,
      calories: 180,
      date: "Yesterday"
    },
    {
      type: "Weight Training",
      duration: 50,
      calories: 420,
      date: "Apr 27, 2023"
    }
  ]);

  const [activeChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "30-Day Running Challenge",
      description: "Run for at least 30 minutes every day for 30 days.",
      startDate: "Apr 1, 2023",
      endDate: "Apr 30, 2023",
      progress: 35,
      participants: 245
    },
    {
      id: "2",
      title: "10K Steps Daily",
      description: "Walk at least 10,000 steps every day for 14 days.",
      startDate: "Apr 15, 2023",
      endDate: "Apr 29, 2023",
      progress: 50,
      participants: 178
    }
  ]);



  return (

    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Total Workouts</h3>
              <div className="stat-number">{stats.totalWorkouts}</div>
              <div className="stat-change positive">
                ↑ +{stats.workoutsThisWeek} this week
              </div>
            </div>
            <div className="stat-icon workout">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v-3H8v-2h3V7h2v3h3v2h-3v3h-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Calories Burned</h3>
              <div className="stat-number">{stats.caloriesBurned}</div>
              <div className="stat-change positive">
                ↑ +{stats.caloriesThisWeek} this week
              </div>
            </div>
            <div className="stat-icon calories">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32C9.75 5.73 8.83 7.7 8.75 9.66c-.09.97.27 1.96.6 2.92-.36-.22-.66-.49-.9-.81-.76-1.02-1.21-2.35-1.15-3.62.06-1.27.49-2.47 1.03-3.61C7.17 3.33 6.14 2.61 5 2.07c-.18.64-.31 1.31-.36 2.01-.07.93.23 1.78.55 2.64.66 1.75 1.65 3.39 2.43 5.08.36.78.72 1.57 1.05 2.37.06.14.12.29.19.43.29.67.53 1.37.73 2.08.1.35.19.72.25 1.08.17.95.15 1.97-.25 2.86-.58 1.28-1.73 2.18-3.08 2.37-.47.06-.97.03-1.42-.09-.47-.13-.89-.36-1.28-.64l-.11-.07c-.3.2-.55.44-.78.69-.5.5-.89 1.11-1.16 1.75.09.07.18.15.28.21.31.21.64.39.99.54.9.38 1.88.59 2.85.6 1.58.01 3.19-.49 4.35-1.53 1.16-1.03 1.93-2.45 2.22-3.97.34-1.75-.08-3.54-.85-5.13.67.87 1.23 1.82 1.69 2.83.57 1.27.94 2.64.94 4.05 0 .25-.01.5-.04.75 1.03-.84 1.78-1.93 2.26-3.13.53-1.35.69-2.84.44-4.26-.13-.7-.36-1.39-.65-2.04.91.76 1.69 1.66 2.29 2.68.36.6.65 1.25.84 1.92.26.91.35 1.85.3 2.79-.05.94-.26 1.87-.61 2.73.7-.4 1.32-.9 1.85-1.5.87-1 1.5-2.2 1.84-3.47.2-.77.31-1.57.31-2.37 0-2.37-.85-4.63-2.4-6.42-.34-.4-.71-.76-1.09-1.11M12 14c-.47 0-.86-.38-.86-.85s.39-.85.86-.85c.47 0 .85.38.85.85s-.38.85-.85.85z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Active Hours</h3>
              <div className="stat-number">{stats.activeHours}</div>
              <div className="stat-change neutral">
                -- No change this week
              </div>
            </div>
            <div className="stat-icon time">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Achievements</h3>
              <div className="stat-number">{stats.achievements}</div>
              <div className="stat-change positive">
                ↑ +{stats.achievementsThisMonth} this month
              </div>
            </div>
            <div className="stat-icon trophy">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
      <div className="dashboard-grid">
        <div className="activity-card">
          <div className="card-header">
            <h2>Activity Overview</h2>
            <div className="time-filter">
              <button 
                className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
                onClick={() => setTimeFilter('week')}
              >
                Week
              </button>
              <button 
                className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
                onClick={() => setTimeFilter('month')}
              >
                Month
              </button>
              <button 
                className={`filter-btn ${timeFilter === 'year' ? 'active' : ''}`}
                onClick={() => setTimeFilter('year')}
              >
                Year
              </button>
            </div>
          </div>
          <div className="activity-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={getChartData()}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#718096"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#9b87f5"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  stroke="#10b981"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="calories"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{
                    fill: '#9b87f5',
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    strokeWidth: 0,
                  }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="activeMinutes"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{
                    fill: '#10b981',
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    strokeWidth: 0,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="goals-card">
          <div className="card-header">
            <h2>Your Goals</h2>
            <button className="update-goals-btn">Update Goals</button>
          </div>
          <div className="goals-list">
            <div className="goal-item">
              <div className="goal-info">
                <span>Weight Loss</span>
                <span className="goal-progress">
                  {userGoals.weightLoss.current} / {userGoals.weightLoss.target} lbs
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(userGoals.weightLoss.current / userGoals.weightLoss.target) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-info">
                <span>Weekly Workouts</span>
                <span className="goal-progress">
                  {userGoals.weeklyWorkouts.current} / {userGoals.weeklyWorkouts.target} workouts
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(userGoals.weeklyWorkouts.current / userGoals.weeklyWorkouts.target) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-info">
                <span>Running Distance</span>
                <span className="goal-progress">
                  {userGoals.runningDistance.current} / {userGoals.runningDistance.target} miles
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(userGoals.runningDistance.current / userGoals.runningDistance.target) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-grid">
    <div className="activities-challenges-grid">
      <div className="recent-activities-card">
        <div className="card-header">
          <h2>Recent Activities</h2>
        </div>
        <div className="activities-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                <div className="icon-circle">
                  {activity.type === "Running" && "🏃"}
                  {activity.type === "Yoga" && "🧘"}
                  {activity.type === "Weight Training" && "🏋️"}
                </div>
              </div>
              <div className="activity-details">
                <h3>{activity.type}</h3>
                <div className="activity-stats">
                  <span>{activity.duration} min</span>
                  <span>•</span>
                  <span>{activity.calories} calories</span>
                </div>
              </div>
              <div className="activity-date">
                {activity.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="active-challenges-card">
        <div className="card-header">
          <h2>Active Challenges</h2>
        </div>
        <div className="challenges-list">
          {activeChallenges.map((challenge) => (
            <div key={challenge.id} className="challenge-item">
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <div className="challenge-dates">
                <span>{challenge.startDate}</span>
                <span>{challenge.endDate}</span>
              </div>
              <div className="challenge-progress">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <div className="challenge-stats">
                  <span>{challenge.progress}% completed</span>
                  <span>{challenge.participants} participants</span>
                </div>
              </div>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
        <button className="explore-challenges-btn">
          Explore More Challenges
        </button>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Dashboard;