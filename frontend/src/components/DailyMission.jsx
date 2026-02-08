import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Leaf, CheckCircle2, Calendar, Award } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "./ui/badge";

const MISSIONS = [
  {
    id: "1",
    title: "Pick up 5 pieces of trash",
    description: "Clean your neighborhood by collecting 5 pieces of litter",
    points: 50,
    category: "waste",
  },
  {
    id: "2",
    title: "Use bike instead of car",
    description: "Cycle to work or school instead of driving",
    points: 100,
    category: "transport",
  },
  {
    id: "3",
    title: "Zero plastic day",
    description: "Avoid using any single-use plastic items today",
    points: 75,
    category: "waste",
  },
  {
    id: "4",
    title: "Meatless Monday",
    description: "Eat only plant-based meals throughout the day",
    points: 80,
    category: "food",
  },
  {
    id: "5",
    title: "Unplug unused devices",
    description: "Unplug all electronics not in use to save energy",
    points: 60,
    category: "energy",
  },
  {
    id: "6",
    title: "Take 5-minute showers",
    description: "Reduce water usage by limiting shower time",
    points: 70,
    category: "water",
  },
  {
    id: "7",
    title: "Use reusable bags",
    description: "Bring reusable bags for all shopping trips",
    points: 50,
    category: "waste",
  },
];

const getCategoryColor = (category) => {
  const colors = {
    waste: "bg-orange-500",
    transport: "bg-blue-500",
    energy: "bg-yellow-500",
    water: "bg-cyan-500",
    food: "bg-green-500",
  };
  return colors[category] || "bg-gray-500";
};

const getCategoryIcon = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export function DailyMission({ onComplete }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [todaysMission, setTodaysMission] = useState(null);

  useEffect(() => {
    // Get mission based on day of year
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24,
    );
    const missionIndex = dayOfYear % MISSIONS.length;
    const mission = MISSIONS[missionIndex];
    setTodaysMission(mission);

    // Check if already completed today
    const completedDate = localStorage.getItem("lastCompletedMission");
    const todayString = today.toDateString();
    if (completedDate === todayString) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, []);

  const handleComplete = () => {
    if (!todaysMission || isCompleted) return;

    const today = new Date().toDateString();
    localStorage.setItem("lastCompletedMission", today);
    setIsCompleted(true);
    onComplete(todaysMission.points);
  };

  if (!todaysMission) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-green-500/20 bg-linear-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-green-600" />
              <CardTitle className="text-green-900">Today's Mission</CardTitle>
            </div>
            <Badge
              className={`${getCategoryColor(todaysMission.category)} text-white`}
            >
              {getCategoryIcon(todaysMission.category)}
            </Badge>
          </div>
          <CardDescription className="text-green-700">
            Complete today's challenge to earn points and help the planet!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-green-900">
              {todaysMission.title}
            </h3>
            <p className="text-green-700">{todaysMission.description}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-yellow-600" />
              <span className="font-semibold text-green-900">
                {todaysMission.points} points
              </span>
            </div>

            {isCompleted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-white"
              >
                <CheckCircle2 className="size-5" />
                <span>Completed!</span>
              </motion.div>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Leaf className="mr-2 size-4" />
                Mark Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
