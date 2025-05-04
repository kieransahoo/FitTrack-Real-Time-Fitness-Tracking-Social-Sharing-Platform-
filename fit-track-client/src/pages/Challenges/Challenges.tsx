import { useState, useEffect } from 'react';
import './Challenges.css';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'cardio' | 'strength' | 'flexibility';
  startDate: string;
  endDate: string;
  participants: number;
  progress: number;
  status: 'active' | 'upcoming' | 'completed';
}

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  // Load initial challenges when component mounts
  useEffect(() => {
    searchChallenges('', 'all');
  }, []);

  // Demo API call function
  const searchChallenges = async (query: string, filter: string) => {
    setLoading(true);
    try {
      // Simulating API call with demo data
      console.log('Searching challenges with:', { query, filter });
      
      // Demo response data
      const demoResponse = [
        {
          id: '1',
          title: '30-Day Running Challenge',
          description: 'Run for at least 30 minutes every day for 30 days.',
          type: 'cardio' as const,
          startDate: 'Apr 1, 2025',
          endDate: 'Apr 30, 2025',
          participants: 245,
          progress: 35,
          status: 'active' as const
        },
        {
          id: '2',
          title: '100 Push-Ups Challenge',
          description: 'Complete 100 push-ups every day for 14 days.',
          type: 'strength' as const,
          startDate: 'May 5, 2025',
          endDate: 'May 19, 2025',
          participants: 127,
          progress: 0,
          status: 'upcoming' as const
        },
        {
          id: '3',
          title: 'Yoga for Beginners',
          description: 'Complete 20 minutes of yoga every day for 21 days.',
          type: 'flexibility' as const,
          startDate: 'Mar 10, 2025',
          endDate: 'Mar 31, 2025',
          participants: 312,
          progress: 100,
          status: 'completed' as const
        },
        {
          id: '4',
          title: '10K Steps Daily',
          description: 'Walk at least 10,000 steps every day for 14 days.',
          type: 'cardio' as const,
          startDate: 'Apr 15, 2025',
          endDate: 'Apr 29, 2025',
          participants: 178,
          progress: 50,
          status: 'active' as const
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter challenges based on search query
      const filteredChallenges = demoResponse.filter(challenge => 
        challenge.title.toLowerCase().includes(query.toLowerCase()) ||
        challenge.description.toLowerCase().includes(query.toLowerCase())
      );

      // Filter based on status
      const statusFilteredChallenges = filter === 'all' 
        ? filteredChallenges 
        : filteredChallenges.filter(challenge => challenge.status === filter);

      console.log('Search Results:', statusFilteredChallenges);
      
      // Set challenges with proper error handling
      if (Array.isArray(statusFilteredChallenges)) {
        setChallenges(statusFilteredChallenges);
      } else {
        setChallenges([]);
        console.error('Invalid challenges data received');
      }
    } catch (error) {
      console.error('Error searching challenges:', error);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchChallenges(searchQuery, activeFilter);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeFilter]);

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <div className="search-section">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search challenges"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-tabs">
          <button 
            className={activeFilter === 'all' ? 'active' : ''} 
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={activeFilter === 'active' ? 'active' : ''} 
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button 
            className={activeFilter === 'upcoming' ? 'active' : ''} 
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={activeFilter === 'completed' ? 'active' : ''} 
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Searching challenges...</div>
      ) : challenges.length === 0 ? (
        <div className="empty-state">
          No challenges found. Try adjusting your search or filters.
        </div>
      ) : (
        <div className="challenges-grid">
          {challenges.map(challenge => (
            <div key={challenge.id} className="challenge-card">
              <div className="challenge-header">
                <h3>{challenge.title}</h3>
                <span className={`challenge-type ${challenge.type}`}>
                  {challenge.type}
                </span>
              </div>
              <p className="challenge-description">{challenge.description}</p>
              <div className="challenge-dates">
                <span>{challenge.startDate}</span>
                <span>{challenge.endDate}</span>
              </div>
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
                <div className="progress-info">
                  <span>{challenge.progress}% completed</span>
                  <span>{challenge.participants} participants</span>
                </div>
              </div>
              <button className={`action-button ${challenge.status}`}>
                {challenge.status === 'active' && 'View Progress'}
                {challenge.status === 'upcoming' && 'Join Challenge'}
                {challenge.status === 'completed' && 'View Results'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Challenges;