import { useState } from "react";
import { motion } from "motion/react";

export function StandaloneSignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSignIn(username.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl"
            >
              <svg
                className="size-9 text-white"
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
            </motion.div>
            <h1 className="text-5xl font-bold text-green-900">EcoQuest</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-900">
              Save the Planet,
              <br />
              One Mission at a Time
            </h2>
            <p className="text-lg text-green-700 max-w-md mx-auto lg:mx-0">
              Join thousands of eco-warriors completing daily environmental
              challenges, earning rewards, and making a real difference.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              {
                icon: "🎯",
                label: "Daily Missions",
                desc: "New challenges every day",
              },
              { icon: "🏆", label: "Compete", desc: "Global leaderboard" },
              { icon: "🔥", label: "Build Streaks", desc: "Stay consistent" },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="rounded-xl bg-white/50 backdrop-blur-sm p-4 text-center"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="font-semibold text-green-900">
                  {feature.label}
                </div>
                <div className="text-sm text-green-600">{feature.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-xl border-2 border-green-200 bg-white shadow-2xl">
            {/* Header */}
            <div className="space-y-2 p-6 pb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="size-5 text-green-600"
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
                <h2 className="text-2xl font-bold">Welcome Back!</h2>
              </div>
              <p className="text-sm text-gray-600">
                Enter your details to start your eco-journey
              </p>
            </div>

            {/* Content */}
            <div className="p-6 pt-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <svg
                      className="size-4"
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
                    className="w-full h-12 px-3 rounded-md border border-green-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <svg
                      className="size-4"
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
                    className="w-full h-12 px-3 rounded-md border border-green-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!username.trim()}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-md flex items-center justify-center gap-2 transition-all"
                >
                  Start Your Journey
                  <svg
                    className="size-5"
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

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Quick start
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onSignIn("GreenWarrior")}
                    className="h-11 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🌿</span>
                    Guest
                  </button>
                  <button
                    type="button"
                    onClick={() => onSignIn("EcoHero")}
                    className="h-11 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>⚡</span>
                    Demo
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                By continuing, you agree to help save our planet 🌍
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-center text-white shadow-xl"
          >
            <div className="grid grid-cols-3 divide-x divide-white/20">
              <div>
                <div className="text-2xl font-bold">8.5K+</div>
                <div className="text-sm opacity-90">Eco-Warriors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">125K+</div>
                <div className="text-sm opacity-90">Missions Done</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2.3M</div>
                <div className="text-sm opacity-90">CO₂ Saved</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
