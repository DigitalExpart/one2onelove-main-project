import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Gamepad2, Target, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityProgress({ data }) {
  const activities = [
    {
      name: "Journal Entries",
      icon: BookOpen,
      current: data.journals.length,
      goal: 20,
      color: "bg-blue-500"
    },
    {
      name: "Games Played",
      icon: Gamepad2,
      current: data.games.length,
      goal: 15,
      color: "bg-green-500"
    },
    {
      name: "Goals Completed",
      icon: Target,
      current: data.goals.filter(g => g.status === 'completed').length,
      goal: 10,
      color: "bg-orange-500"
    },
    {
      name: "Memories Captured",
      icon: Calendar,
      current: data.memories.length,
      goal: 25,
      color: "bg-pink-500"
    },
    {
      name: "Milestones Tracked",
      icon: Award,
      current: data.milestones.length,
      goal: 8,
      color: "bg-purple-500"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100">
      <CardContent className="p-6">
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const progress = Math.min((activity.current / activity.goal) * 100, 100);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${activity.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">{activity.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600">
                    {activity.current}/{activity.goal}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                {progress === 100 && (
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    🎉 Goal Reached!
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}