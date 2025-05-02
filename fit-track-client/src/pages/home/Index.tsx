
import { Link } from 'react-router-dom';
import '../../index.css';

const Index = () => {
    return (
        <>
            <section className="main-container">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Track , Achieve, Share </h1>
                        <p className="hero-description">FitTrack helps you log workouts, set fitness goals, join challenges, and share your achievements with a supportive community.</p>
                    </div>
                    <div className="hero-buttons">
                        <Link to="/signup" className="primary-button">Sign Up</Link>
                        <Link to="/login" className="primary-button">Login</Link>
                    </div>
                </section>
                <section className="image-section">
                    <div className="image-container">
                        <img
                            src="https://placehold.co/600x400/9b87f5/FFFFFF?text=FitTrack&font=montserrat"
                            alt="FitTrack App"
                            className="hero-image"
                        />
                    </div>
                    <div className="stats-container">
                        <div className="stat-box top-left">
                            <div className="stat-content">
                                🏃 3,500+ <span>Active Users</span>
                            </div>
                        </div>
                        <div className="stat-box bottom-right">
                            <div className="stat-content">
                                🏆 150+ <span>Challenges</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="features-section">
                <h2 className="features-title">Everything you need to reach your fitness goals</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>📊</span>
                        </div>
                        <h3 className="feature-title">Track Your Workouts</h3>
                        <p className="feature-description">
                            Log your workouts, track your progress, and analyze your performance over time.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>🏆</span>
                        </div>
                        <h3 className="feature-title">Join Challenges</h3>
                        <p className="feature-description">
                            Participate in challenges to stay motivated and push your limits.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>👥</span>
                        </div>
                        <h3 className="feature-title">Community Support</h3>
                        <p className="feature-description">
                            Share your achievements and connect with other fitness enthusiasts.
                        </p>
                    </div>
                </div>
            </section>
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">
                        Ready to start your fitness journey?
                    </h2>
                    <p className="cta-description">
                        Join thousands of users who are tracking their fitness,
                        participating in challenges, and achieving their goals with FitTrack.
                    </p>
                    <Link to="/signup" className="cta-button-link">
                        <button className="cta-button">
                            <span>Get Started Now</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </Link>
                </div>
            </section>
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <h2 className="testimonials-title">
                        What our users say
                    </h2>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="avatar">
                                    JD
                                </div>
                                <div className="user-info">
                                    <h4>Jane Doe</h4>
                                    <p>Fitness Enthusiast</p>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                "FitTrack has completely transformed my fitness journey. The challenges keep me motivated and the community is so supportive!"
                            </p>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="avatar">
                                    MS
                                </div>
                                <div className="user-info">
                                    <h4>Mike Smith</h4>
                                    <p>Marathon Runner</p>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                "I've been using FitTrack to prepare for my marathon. The tracking features and running challenges have been invaluable."
                            </p>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="avatar">
                                    AJ
                                </div>
                                <div className="user-info">
                                    <h4>Alex Johnson</h4>
                                    <p>Yoga Instructor</p>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                "As a yoga instructor, I recommend FitTrack to all my students. It's perfect for tracking progress and setting goals."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;