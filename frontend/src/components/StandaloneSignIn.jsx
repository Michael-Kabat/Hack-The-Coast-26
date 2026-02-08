import { useState } from "react";

/**
 * StandaloneSignIn Component
 *
 * A minimal, self-contained sign-in page
 * Just copy this file and use it anywhere!
 *
 * Props:
 * - onSignIn: (username) => void - Callback when user signs in
 * - brandName: string (optional) - Your app name (default: "EcoQuest")
 */
export function StandaloneSignIn({ onSignIn, brandName = "EcoQuest" }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSignIn(username.trim());
    }
  };

  return (
    <div className="signin-container">
      <style>{`
        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(10deg) scale(1.1); }
          50% { transform: rotate(-10deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.1); }
        }

        .signin-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #ccfbf1 100%);
          padding: 1rem;
        }

        .signin-wrapper {
          width: 100%;
          max-width: 500px;
          animation: fadeIn 0.6s ease-out;
        }

        /* Brand Header */
        .brand-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .brand-icon {
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          animation: wiggle 2s ease-in-out infinite;
          animation-delay: 3s;
        }

        .brand-name {
          font-size: 3rem;
          font-weight: bold;
          color: #064e3b;
          margin: 0;
        }

        /* Form Card */
        .form-card {
          border-radius: 0.75rem;
          border: 2px solid #a7f3d0;
          background: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .form-header {
          padding: 2rem;
          padding-bottom: 1.5rem;
          text-align: center;
        }

        .form-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .form-title {
          font-size: 1.875rem;
          font-weight: bold;
          margin: 0;
          color: #064e3b;
        }

        .form-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin: 0;
        }

        .form-content {
          padding: 0 2rem 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .form-input {
          width: 100%;
          height: 3rem;
          padding: 0 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #a7f3d0;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .submit-button {
          width: 100%;
          height: 3rem;
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .submit-button:hover {
          background: linear-gradient(to right, #059669, #047857);
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .divider-container {
          position: relative;
          margin: 1.5rem 0;
        }

        .divider-line {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
        }

        .divider-line span {
          width: 100%;
          border-top: 1px solid #e5e7eb;
        }

        .divider-text {
          position: relative;
          display: flex;
          justify-content: center;
          text-transform: uppercase;
          font-size: 0.75rem;
        }

        .divider-text span {
          background: white;
          padding: 0 0.5rem;
          color: #6b7280;
        }

        .guest-button {
          width: 100%;
          height: 2.75rem;
          padding: 0 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
          font-size: 1rem;
          font-weight: 500;
        }

        .guest-button:hover {
          background: #f9fafb;
          border-color: #10b981;
        }

        .form-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .stats-banner {
          margin-top: 2rem;
          border-radius: 0.75rem;
          background: linear-gradient(to right, #10b981, #059669);
          padding: 1.5rem;
          text-align: center;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .stat-item {
          padding: 0.5rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .icon-sm {
          width: 1rem;
          height: 1rem;
        }

        .icon-md {
          width: 1.5rem;
          height: 1.5rem;
        }

        .icon-lg {
          width: 2.25rem;
          height: 2.25rem;
        }

        @media (max-width: 640px) {
          .brand-name {
            font-size: 2.25rem;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="signin-wrapper">
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-icon">
            <svg
              className="icon-lg"
              style={{ color: "white" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h1 className="brand-name">{brandName}</h1>
        </div>

        {/* Sign In Card */}
        <div className="form-card">
          <div className="form-header">
            <div className="form-title-row">
              <svg
                className="icon-md"
                style={{ color: "#10b981" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <h2 className="form-title">Welcome Back!</h2>
            </div>
            <p className="form-subtitle">
              Enter your username to start your eco-journey
            </p>
          </div>

          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  <svg
                    className="icon-sm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={!username.trim()}
                className="submit-button"
              >
                Start Your Journey
                <svg
                  className="icon-md"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <div className="divider-container">
                <div className="divider-line">
                  <span />
                </div>
                <div className="divider-text">
                  <span>Quick start</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSignIn("GreenWarrior")}
                className="guest-button"
              >
                <span>🌿</span>
                Continue as Guest
              </button>
            </form>

            <div className="form-footer">
              By continuing, you agree to help save our planet 🌍
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="stats-banner">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">8.5K+</div>
              <div className="stat-label">Eco-Warriors</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">125K+</div>
              <div className="stat-label">Missions Done</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2.3M</div>
              <div className="stat-label">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
