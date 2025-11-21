import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Heart, Trophy, BookOpen, Target, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function MetricsOverview({ data }) {
  const metrics = useMemo(() => {
    const maxStreak = Math.max(
      ...data.activityProgress.map(p => p.streak_days || 0),
      0
    );

    const totalActivities = 
      data.journals.length + 
      data.games.length + 
      data.memories.length +
      data.goals.filter(g => g.status === 'completed').length;

    const activeGoals = data.goals.filter(g => g.status === 'in_progress').length;

    const upcomingMilestones = data.milestones.filter(m => {
      const date = new Date(m.date);
      const today = new Date();
      const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
      return diff > 0 && diff <= 30;
    }).length;

    const totalScore = data.games.reduce((sum, g) => sum + (g.score || 0), 0);

    const journalEntries = data.journals.length;

    return {
      maxStreak,
      totalActivities,
      activeGoals,
      upcomingMilestones,
      totalScore,
      journalEntries
    };
  }, [data]);

  const metricCards = [
    {
      icon: Flame,
      label: "Current Streak",
      value: metrics.maxStreak,
      suffix: "days",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Heart,
      label: "Activities Done",
      value: metrics.totalActivities,
      suffix: "total",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: Target,
      label: "Active Goals",
      value: metrics.activeGoals,
      suffix: "goals",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Trophy,
      label: "Game Score",
      value: metrics.totalScore,
      suffix: "points",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      icon: BookOpen,
      label: "Journal Entries",
      value: metrics.journalEntries,
      suffix: "entries",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Calendar,
      label: "Upcoming Events",
      value: metrics.upcomingMilestones,
      suffix: "this month",
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metricCards.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`${metric.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow`}>
              <CardContent className="p-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {metric.suffix}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}