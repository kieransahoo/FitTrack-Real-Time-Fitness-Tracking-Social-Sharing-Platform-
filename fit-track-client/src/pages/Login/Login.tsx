import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    fitnessLevel: string;
    primaryGoal: string;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const data = await response.json();
      
      // Set token in cookies with expiry of 24 hours
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000));
      document.cookie = `fittrack_token=${data.token}; expires=${expiryDate.toUTCString()}; path=/`;

      // Store user data in localStorage if needed
      if (data.user) {
        localStorage.setItem("fittrack_user", JSON.stringify(data.user));
      }

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <Link to="/" className="brand-link">
            <h1 className="brand-title">FitTrack</h1>
          </Link>
          <p className="welcome-text">Welcome back!</p>
        </div>
        
        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">Sign In</h2>
            <p className="card-description">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-content">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="card-footer">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
        
        <div className="signup-prompt">
          <p>
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;