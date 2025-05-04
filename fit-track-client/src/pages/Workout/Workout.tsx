import { useState, useEffect } from 'react';
import './Workout.css';

interface WorkoutEntry {
  type: string;
  date: string;
  duration: number;
  calories: number;
  notes?: string;
}

interface WorkoutFormData {
  type: string;
  duration: string;
  calories: string;
  notes: string;
}

interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  mostCommonWorkout: string;
}

const Workout = () => {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutEntry[]>([]);
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<WorkoutFormData>({
    type: '',
    duration: '',
    calories: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    totalDuration: 0,
    totalCalories: 0,
    mostCommonWorkout: ''
  });

  const fetchWorkoutStats = async () => {
    try {
      const token = document.cookie.split('fittrack_token=')[1];
      const response = await fetch('http://localhost:8081/api/workouts/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workout statistics');
      }

      const stats = await response.json();
      setWorkoutStats(stats);
    } catch (error) {
      console.error('Error fetching workout statistics:', error);
    }
  };

  useEffect(() => {
    fetchWorkoutHistory();
    fetchWorkoutStats(); // Add this line to fetch stats when component mounts
  }, []);

  const fetchWorkoutHistory = async () => {
    try {
      const token = document.cookie.split('fittrack_token=')[1];
      const response = await fetch('http://localhost:8081/api/workouts/list?page=0&size=5&sort=date,desc', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workout history');
      }

      const data = await response.json();
      setWorkoutHistory(data.content.map((workout: any) => ({
        type: workout.type || 'Unknown',  // Handle null type
        date: new Date(workout.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        duration: parseInt(workout.duration) || 0,
        calories: parseInt(workout.calories) || 0,
        notes: workout.notes || ''
      })));
    } catch (error) {
      console.error('Error fetching workout history:', error);
    }
};

  const handleLogWorkout = async () => {
    try {
      setIsLoading(true);
      
      const token = document.cookie.split('fittrack_token=')[1];
      const response = await fetch('http://localhost:8081/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          workoutType: formData.type,
          duration: parseInt(formData.duration),
          caloriesBurned: parseInt(formData.calories),
          notes: formData.notes,
          date: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to log workout');
      }

      // Reset form and close modal
      setFormData({
        type: '',
        duration: '',
        calories: '',
        notes: ''
      });
      setShowModal(false);
      
      // Refresh workout history
      await fetchWorkoutHistory();
      await fetchWorkoutStats(); // Add this line to update stats after logging
    } catch (error) {
      console.error('Error logging workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAddWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const token = document.cookie.split('fittrack_token=')[1];
      const response = await fetch('http://localhost:8081/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: formData.type,
          duration: formData.duration,
          calories: formData.calories,
          notes: formData.notes,
          date: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to log workout');
      }

      // Reset form
      setFormData({
        type: '',
        duration: '',
        calories: '',
        notes: ''
      });
      
      // Refresh workout history
      await fetchWorkoutHistory();
      await fetchWorkoutStats(); // Add this line to update stats after quick adding
    } catch (error) {
      console.error('Error logging workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="workout-container">
      <div className="workout-header">
        <h1>Your Workouts</h1>
        <div className="workout-actions">
          <button className="view-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor" className="calendar-icon">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
            Calendar View
          </button>
          <button className="log-workout" onClick={() => setShowModal(true)}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="plus-icon">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Log Workout
          </button>
        </div>
      </div>
      <div className="workout-content">
        <div className="workout-history">
          <div className="history-header">
            <h2>Workout History</h2>
            <div className="view-selector">
              <select defaultValue="all">
                <option value="all">All types</option>
                <option value="running">Running</option>
                <option value="yoga">Yoga</option>
                <option value="weight">Weight Training</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
              </select>
            </div>
          </div>

          <div className="workout-list">
            {workoutHistory.map((workout, index) => (
              <div key={index} className="workout-item">
                <div className="workout-icon">
                  {workout.type === "Running" && "🏃"}
                  {workout.type === "Yoga" && "🧘"}
                  {workout.type === "Weight Training" && "🏋️"}
                  {workout.type === "Cycling" && "🚴"}
                  {workout.type === "Swimming" && "🏊"}
                </div>
                <div className="workout-info">
                  <div className="workout-type">{workout.type}</div>
                  <div className="workout-date">{workout.date}</div>
                  <div className="workout-stats">
                    <span>{workout.duration} min</span>
                    <span>{workout.calories} cal</span>
                  </div>
                  {workout.notes && (
                    <div className="workout-notes">{workout.notes}</div>
                  )}
                </div>
                <button className="more-options">⋮</button>
              </div>
            ))}
          </div>
        </div>

        <div className="workout-sidebar">
          <div className="quick-add-workout">
            <h2>Quick Add Workout</h2>
            <form className="workout-form" onSubmit={handleQuickAddWorkout}>
              <div className="form-group">
                <label>Workout Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="" disabled>Select workout type</option>
                  <option value="running">Running</option>
                  <option value="yoga">Yoga</option>
                  <option value="weight">Weight Training</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Enter duration"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Calories Burned</label>
                  <input 
                    type="number" 
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    placeholder="Enter calories"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any achievements or challenges?"
                />
              </div>
              <button 
                type="submit" 
                className="log-workout-btn"
                disabled={isLoading || !formData.type || !formData.duration || !formData.calories}
              >
                {isLoading ? 'Logging...' : 'Log Workout'}
              </button>
            </form>
          </div>

          <div className="workout-statistics">
            <h2>Workout Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <label>Total Workouts</label>
                <span className="stat-value">{workoutStats.totalWorkouts}</span>
              </div>
              <div className="stat-item">
                <label>Total Duration</label>
                <span className="stat-value">{workoutStats.totalDuration} min</span>
              </div>
              <div className="stat-item">
                <label>Total Calories</label>
                <span className="stat-value">{workoutStats.totalCalories}</span>
              </div>
              <div className="stat-item">
                <label>Most Common</label>
                <span className="stat-value">{workoutStats.mostCommonWorkout}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;