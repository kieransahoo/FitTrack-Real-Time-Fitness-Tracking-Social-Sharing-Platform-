import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/dashboard" className="brand">
          <h1>FitTrack</h1>
        </Link>
        <nav className="main-nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActiveRoute('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/workouts" 
            className={`nav-link ${isActiveRoute('/workouts') ? 'active' : ''}`}
          >
            Workouts
          </Link>
          <Link 
            to="/challenges" 
            className={`nav-link ${isActiveRoute('/challenges') ? 'active' : ''}`}
          >
            Challenges
          </Link>
          <Link 
            to="/community" 
            className={`nav-link ${isActiveRoute('/community') ? 'active' : ''}`}
          >
            Community
          </Link>
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

export default Header;