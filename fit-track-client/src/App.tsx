
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import Index from './pages/home/Index';
import Dashboard from './pages/Dashboard/Dashboard';
import Workout from './pages/Workout/Workout';
import Community from './pages/Community/Community';
import Challenges from './pages/Challenges/Challenges';
import { useEffect, useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in cookies
    const token = document.cookie.split(';').find(c => c.trim().startsWith('fittrack_token='));
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          {isAuthenticated && (
            <Route element={<AuthLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts" element={<Workout />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/community" element={<Community />} />
            </Route>
          )}
        </Routes>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
