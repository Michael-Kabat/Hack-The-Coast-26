import { useState } from "react";
import { motion } from "motion/react";
import { Leaf, User, Mail, ArrowRight, Sparkles, Lock } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";

export default function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    onSignIn({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    });
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
              <Leaf className="size-9 text-white" />
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
          <Card className="border-2 border-green-200 shadow-xl">
            <CardHeader className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <CardTitle className="text-xl">Login / Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="size-4" /> Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 border-green-200 focus:border-green-500"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="size-4" /> Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-green-200 focus:border-green-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="size-4" /> Email (optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-green-200 focus:border-green-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="button"
                  onClick={() => {
                    if (!username.trim() || !password.trim()) return;

                    onSignIn({
                      username: username.trim(),
                      email: email.trim(),
                      password: password.trim(),
                    });
                  }}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg"
                  disabled={!username.trim() || !password.trim()}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                By continuing, you agree to help save our planet 🌍
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
