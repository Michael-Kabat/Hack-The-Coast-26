import { motion } from "motion/react";
import { Target, Flame, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const getLevel = (points) => {
  return Math.floor(points / 250) + 1;
};

const getPointsToNextLevel = (points) => {
  const currentLevel = getLevel(points);
  const nextLevelPoints = currentLevel * 250;
  return nextLevelPoints - points;
};

const getProgressPercentage = (points) => {
  const currentLevelStart = (getLevel(points) - 1) * 250;
  const progress = points - currentLevelStart;
  return (progress / 250) * 100;
};

export function UserStats({ totalPoints, streak, completedMissions }) {
  const level = getLevel(totalPoints);
  const pointsToNext = getPointsToNextLevel(totalPoints);
  const progress = getProgressPercentage(totalPoints);

  const stats = [
    {
      icon: Star,
      label: "Level",
      value: level,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Target,
      label: "Total Points",
      value: totalPoints.toLocaleString(),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Flame,
      label: "Day Streak",
      value: streak,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: TrendingUp,
      label: "Missions Done",
      value: completedMissions,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-90">
                Level {level} Eco-Warrior
              </span>
              <span className="text-sm opacity-90">
                {pointsToNext} pts to Level {level + 1}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-white shadow-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div
                  className={`mb-2 inline-flex rounded-lg p-2 ${stat.bgColor}`}
                >
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
