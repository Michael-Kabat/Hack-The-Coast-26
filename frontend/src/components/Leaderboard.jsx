import { motion } from "motion/react";
import { Trophy, Medal, Crown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

// Mock data for demonstration
const generateLeaderboard = (currentUserPoints) => {
  const mockUsers = [
    { username: "EcoWarrior", points: 2450, streak: 45 },
    { username: "GreenChampion", points: 2180, streak: 38 },
    { username: "PlanetSaver", points: 1920, streak: 31 },
    { username: "EarthGuardian", points: 1650, streak: 28 },
    { username: "NatureHero", points: 1480, streak: 24 },
    { username: "ClimateAction", points: 1290, streak: 22 },
    { username: "SustainableSam", points: 1150, streak: 19 },
    { username: "RecycleRex", points: 980, streak: 15 },
  ];

  const currentUserStreak = parseInt(localStorage.getItem("userStreak") || "0");
  const username = localStorage.getItem("username") || "You";

  const allUsers = [
    ...mockUsers,
    {
      username,
      points: currentUserPoints,
      streak: currentUserStreak,
      isCurrentUser: true,
    },
  ].sort((a, b) => b.points - a.points);

  return allUsers.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};

const getRankIcon = (rank) => {
  if (rank === 1) return <Crown className="size-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="size-6 text-gray-400" />;
  if (rank === 3) return <Medal className="size-6 text-orange-600" />;
  return null;
};

const getRankBadgeColor = (rank) => {
  if (rank === 1)
    return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
  if (rank === 2)
    return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
  if (rank === 3)
    return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
  return "bg-gray-100 text-gray-700";
};

export function Leaderboard({ currentUserPoints }) {
  const leaderboard = generateLeaderboard(currentUserPoints);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="size-6 text-yellow-600" />
          <CardTitle>Global Leaderboard</CardTitle>
        </div>
        <CardDescription>
          See how you rank against other eco-warriors!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
                entry.isCurrentUser
                  ? "bg-green-100 border-2 border-green-500 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div
                className={`flex size-10 items-center justify-center rounded-full font-bold ${getRankBadgeColor(entry.rank)}`}
              >
                {getRankIcon(entry.rank) || `#${entry.rank}`}
              </div>

              <Avatar className="size-10">
                <AvatarFallback
                  className={
                    entry.isCurrentUser
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white"
                  }
                >
                  {entry.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {entry.username}
                    {entry.isCurrentUser && (
                      <span className="ml-1 text-green-600">(You)</span>
                    )}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {entry.streak} day streak 🔥
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-green-600">
                  {entry.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
