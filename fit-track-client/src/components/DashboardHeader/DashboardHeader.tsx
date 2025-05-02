import { Link } from 'react-router-dom';
import './DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Link to="/" className="brand">
          <h1>FitTrack</h1>
        </Link>
        <nav className="main-nav">
          <Link to="/dashboard" className="nav-link active">Dashboard</Link>
          <Link to="/workouts" className="nav-link">Workouts</Link>
          <Link to="/challenges" className="nav-link">Challenges</Link>
          <Link to="/community" className="nav-link">Community</Link>
        </nav>
      </div>
      <div className="header-right">
        <div className="notifications">
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">1</span>
        </div>
        <div className="user-profile">
          <img 
            src="https://placehold.co/40x40" 
            alt="Profile" 
            className="profile-image"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;