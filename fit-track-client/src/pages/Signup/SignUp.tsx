import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

interface SignupData {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: string;
    age: string;
    height: string;
    weight: string;
    fitnessLevel: string;
    primaryGoal: string;
    secondaryGoals: string[];
    workoutsPerWeek: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState<SignupData>({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        fitnessLevel: '',
        primaryGoal: '',
        secondaryGoals: [],
        workoutsPerWeek: ''
    });

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const renderProgressBar = () => (
        <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>Account</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>Personal</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <span>Goals</span>
            </div>
        </div>
    );

    const renderAccountStep = () => (
        <div className="form-step">
            <h2>Create Your Account</h2>
            <p className="step-description">Start by setting up your account credentials</p>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <p className="password-hint">Password must be at least 8 characters and include a number.</p>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
            </div>

            <button className="next-button" onClick={handleNext}>
                Next <span>→</span>
            </button>
        </div>
    );

    const renderPersonalStep = () => (
        <div className="form-step">
            <h2>Personal Information</h2>
            <p className="step-description">Tell us a bit about yourself so we can personalize your experience</p>

            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Gender</label>
                <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <label>Age</label>
                <input
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
            </div>

            <div className="form-row">
                <div className="form-group half">
                    <label>Height (cm)</label>
                    <input
                        type="number"
                        placeholder="Height in cm"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                </div>
                <div className="form-group half">
                    <label>Weight (kg)</label>
                    <input
                        type="number"
                        placeholder="Weight in kg"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                </div>
            </div>

            <div className="button-group">
                <button className="back-button" onClick={handleBack}>
                    <span>←</span> Back
                </button>
                <button className="next-button" onClick={handleNext}>
                    Next <span>→</span>
                </button>
            </div>
        </div>
    );

    const renderGoalsStep = () => (
        <div className="form-step">
            <h2>Fitness Goals</h2>
            <p className="step-description">Let us know what you want to achieve with FitTrack</p>

            <div className="form-group">
                <label>Fitness Level</label>
                <div className="button-toggle-group">
                    <button
                        className={`toggle-button ${formData.fitnessLevel === 'beginner' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, fitnessLevel: 'beginner' })}
                    >
                        Beginner
                    </button>
                    <button
                        className={`toggle-button ${formData.fitnessLevel === 'intermediate' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, fitnessLevel: 'intermediate' })}
                    >
                        Intermediate
                    </button>
                    <button
                        className={`toggle-button ${formData.fitnessLevel === 'advanced' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, fitnessLevel: 'advanced' })}
                    >
                        Advanced
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label>Primary Goal</label>
                <div className="goals-grid">
                    <button
                        className={`goal-button ${formData.primaryGoal === 'weightLoss' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, primaryGoal: 'weightLoss' })}
                    >
                        <span>📉</span>
                        Weight Loss
                    </button>
                    <button
                        className={`goal-button ${formData.primaryGoal === 'muscleGain' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, primaryGoal: 'muscleGain' })}
                    >
                        <span>💪</span>
                        Muscle Gain
                    </button>
                    <button
                        className={`goal-button ${formData.primaryGoal === 'endurance' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, primaryGoal: 'endurance' })}
                    >
                        <span>🏃</span>
                        Endurance
                    </button>
                    <button
                        className={`goal-button ${formData.primaryGoal === 'generalFitness' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, primaryGoal: 'generalFitness' })}
                    >
                        <span>🏆</span>
                        General Fitness
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label>Secondary Goals (Optional)</label>
                <div className="goals-grid">
                    {['increaseStrength', 'improveFlexibility', 'betterCardio', 'healthierDiet'].map(goal => (
                        <button
                            key={goal}
                            className={`goal-button ${formData.secondaryGoals.includes(goal) ? 'active' : ''}`}
                            onClick={() => {
                                const newGoals = formData.secondaryGoals.includes(goal)
                                    ? formData.secondaryGoals.filter(g => g !== goal)
                                    : [...formData.secondaryGoals, goal];
                                setFormData({ ...formData, secondaryGoals: newGoals });
                            }}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Planned Workouts per Week</label>
                <div className="button-toggle-group">
                    <button
                        className={`toggle-button ${formData.workoutsPerWeek === '1-2' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, workoutsPerWeek: '1-2' })}
                    >
                        1-2 times
                    </button>
                    <button
                        className={`toggle-button ${formData.workoutsPerWeek === '3-4' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, workoutsPerWeek: '3-4' })}
                    >
                        3-4 times
                    </button>
                    <button
                        className={`toggle-button ${formData.workoutsPerWeek === '5+' ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, workoutsPerWeek: '5+' })}
                    >
                        5+ times
                    </button>
                </div>
            </div>

            <div className="button-group">
                <button className="back-button" onClick={handleBack}>
                    <span>←</span> Back
                </button>
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Complete Setup'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError('');

            // Basic validation
            if (!formData.email || !formData.password || !formData.confirmPassword) {
                throw new Error('Please fill in all required fields');
            }

            if (formData.password !== formData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            if (formData.password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            // Prepare data for API
            const signupData = {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                role: "USER",
                gender: formData.gender,
                age: parseInt(formData.age),
                height: parseFloat(formData.height),
                weight: parseFloat(formData.weight),
                fitnessGoal: formData.primaryGoal,
                activityLevel: formData.workoutsPerWeek,
                fitnessLevel: formData.fitnessLevel
            };

            const response = await fetch('http://localhost:8081/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create account');
            }

            if (response.status === 201) {
                setShowSuccessModal(true);
                setIsLoading(false);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during signup');
            setIsLoading(false);
        }
    };

    const SuccessModal = () => (
        <div className="modal-overlay">
            <div className="success-modal">
                <div className="success-icon">✓</div>
                <h2>Account Created Successfully!</h2>
                <p>Your FitTrack account has been created. You can now sign in to start your fitness journey.</p>
                <Link to="/login" className="signin-button">
                    Sign In
                </Link>
            </div>
        </div>
    );

    return (
        <div className="signup-container">
            <div className="signup-content">
                <Link to="/" className="brand-link">
                    <h1 className="brand-title">FitTrack</h1>
                </Link>
                <p className="page-subtitle">Start your fitness journey today</p>

                {renderProgressBar()}

                <div className="signup-card">
                    {step === 1 && renderAccountStep()}
                    {step === 2 && renderPersonalStep()}
                    {step === 3 && renderGoalsStep()}
                </div>

                <p className="login-prompt">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
            {showSuccessModal && <SuccessModal />} {/* Add this line */}
        </div>
    );
};

export default SignUp;