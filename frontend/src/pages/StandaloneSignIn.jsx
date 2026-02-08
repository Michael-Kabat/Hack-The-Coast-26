import { useState } from "react";

/**
 * StandaloneSignIn Component
 *
 * A completely self-contained, zero-dependency sign-in page
 * Just copy this file and use it anywhere!
 *
 * Props:
 * - onSignIn: (username) => void - Callback when user signs in
 * - brandName: string (optional) - Your app name (default: "EcoQuest")
 * - brandColor: string (optional) - Primary color (default: green)
 */
export function StandaloneSignIn({
  onSignIn,
  brandName = "EcoQuest",
  brandColor = "green",
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
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
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .signin-wrapper {
            grid-template-columns: 1fr 1fr;
          }
          .branding-section {
            text-align: left !important;
          }
          .branding-header {
            justify-content: flex-start !important;
          }
          .branding-description {
            margin: 0 !important;
          }
        }

        /* Branding Section */
        .branding-section {
          animation: fadeInLeft 0.6s ease-out;
          text-align: center;
        }

        .branding-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1.5rem;
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

        .branding-title {
          font-size: 2rem;
          font-weight: bold;
          color: #064e3b;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .branding-description {
          font-size: 1.125rem;
          color: #047857;
          max-width: 28rem;
          margin: 0 auto 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }

        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .feature-card {
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          padding: 1rem;
          text-align: center;
          animation: fadeInUp 0.6s ease-out;
        }

        .feature-card:nth-child(1) { animation-delay: 0.3s; }
        .feature-card:nth-child(2) { animation-delay: 0.4s; }
        .feature-card:nth-child(3) { animation-delay: 0.5s; }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .feature-label {
          font-weight: 600;
          color: #064e3b;
          margin-bottom: 0.25rem;
        }

        .feature-desc {
          font-size: 0.875rem;
          color: #059669;
        }

        /* Form Section */
        .form-section {
          animation: fadeInRight 0.6s ease-out;
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .form-card {
          border-radius: 0.75rem;
          border: 2px solid #a7f3d0;
          background: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .form-header {
          padding: 1.5rem;
          padding-bottom: 1rem;
        }

        .form-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .form-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .form-content {
          padding: 0 1.5rem 1.5rem;
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

        .quick-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .quick-button {
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
        }

        .quick-button:hover {
          background: #f9fafb;
        }

        .form-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .stats-banner {
          margin-top: 1.5rem;
          border-radius: 0.75rem;
          background: linear-gradient(to right, #10b981, #059669);
          padding: 1rem;
          text-align: center;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out;
          animation-delay: 0.8s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .stat-item {
          padding: 0 1rem;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-item:last-child {
          border-right: none;
        }

        .stat-value {
          font-size: 1.5rem;
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
          width: 1.25rem;
          height: 1.25rem;
        }

        .icon-lg {
          width: 2.25rem;
          height: 2.25rem;
        }
      `}</style>

      <div className="signin-wrapper">
        {/* Right Side - Sign In Form */}
        <div className="form-section">
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
                Enter your details to start your eco-journey
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

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <div className="quick-buttons">
                  <button
                    type="button"
                    onClick={() => onSignIn("GreenWarrior")}
                    className="quick-button"
                  >
                    <span>🌿</span>
                    Guest
                  </button>
                  <button
                    type="button"
                    onClick={() => onSignIn("EcoHero")}
                    className="quick-button"
                  >
                    <span>⚡</span>
                    Demo
                  </button>
                </div>
              </form>

              <div className="form-footer">
                By continuing, you agree to help save our planet 🌍
              </div>
            </div>
          </div>

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
    </div>
  );
}
