import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import Index from './pages/home/Index';
import Dashboard from './pages/Dashboard/Dashboard';
import Workout from './pages/Workout/Workout';
import Challenges from './pages/Challenges/Challenges';
import Community from './pages/Community/Community';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected routes wrapped in AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workout />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
