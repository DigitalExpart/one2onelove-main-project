import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Heart, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function InsightsPanel({ data }) {
  const insights = useMemo(() => {
    const result = [];

    // Analyze journal sentiment
    const recentJournals = data.journals.slice(0, 10);
    const positiveMoods = recentJournals.filter(j => 
      ['happy', 'grateful', 'excited', 'loving', 'peaceful'].includes(j.mood)
    ).length;
    
    if (positiveMoods >= 7) {
      result.push({
        icon: Heart,
        color: "text-pink-600",
        bgColor: "bg-pink-50",
        insight: "Your relationship shows strong positive energy! Keep nurturing this connection.",
        type: "positive"
      });
    } else if (positiveMoods <= 4 && recentJournals.length >= 5) {
      result.push({
        icon: Brain,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        insight: "Consider trying the AI Relationship Coach for personalized guidance and support.",
        type: "suggestion"
      });
    }

    // Analyze activity consistency
    const maxStreak = Math.max(...data.activityProgress.map(p => p.streak_days || 0), 0);
    if (maxStreak >= 7) {
      result.push({
        icon: Zap,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        insight: `Amazing ${maxStreak}-day streak! Consistency is building a stronger bond.`,
        type: "achievement"
      });
    }

    // Analyze goal progress
    const activeGoals = data.goals.filter(g => g.status === 'in_progress');
    const progressingGoals = activeGoals.filter(g => g.progress > 25);
    
    if (progressingGoals.length > 0 && activeGoals.length > 0) {
      result.push({
        icon: TrendingUp,
        color: "text-green-600",
        bgColor: "bg-green-50",
        insight: `You're making progress on ${progressingGoals.length} of ${activeGoals.length} goals. Keep up the momentum!`,
        type: "progress"
      });
    }

    // Analyze memory creation
    const recentMemories = data.memories.filter(m => {
      const daysSince = Math.floor((Date.now() - new Date(m.created_date).getTime()) / (1000 * 60 * 60 * 24));
      return daysSince <= 30;
    });

    if (recentMemories.length >= 3) {
      result.push({
        icon: Heart,
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        insight: `You've captured ${recentMemories.length} memories this month! Your relationship story is growing beautifully.`,
        type: "positive"
      });
    }

    return result.slice(0, 3);
  }, [data]);

  if (insights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        Relationship Insights
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Card className={`${insight.bgColor} border-0`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${insight.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {insight.insight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}