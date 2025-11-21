import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-600"
};

const rarityBorders = {
  common: "border-gray-300",
  rare: "border-blue-300",
  epic: "border-purple-300",
  legendary: "border-yellow-300"
};

export default function BadgesDisplay({ badges }) {
  // Sample badges to show locked ones
  const allPossibleBadges = [
    { id: 1, badge_name: "First Steps", icon: "👣", rarity: "common", description: "Complete your first activity" },
    { id: 2, badge_name: "Week Warrior", icon: "🔥", rarity: "rare", description: "Maintain a 7-day streak" },
    { id: 3, badge_name: "Love Journal", icon: "📖", rarity: "rare", description: "Write 10 journal entries" },
    { id: 4, badge_name: "Game Master", icon: "🎮", rarity: "epic", description: "Complete 20 games together" },
    { id: 5, badge_name: "Goal Crusher", icon: "🎯", rarity: "epic", description: "Complete 5 relationship goals" },
    { id: 6, badge_name: "Memory Keeper", icon: "📸", rarity: "rare", description: "Capture 15 memories" },
    { id: 7, badge_name: "Streak Legend", icon: "⚡", rarity: "legendary", description: "Maintain a 30-day streak" },
    { id: 8, badge_name: "Anniversary", icon: "💑", rarity: "legendary", description: "Celebrate your anniversary" }
  ];

  const earnedBadgeNames = badges.map(b => b.badge_name);
  const displayBadges = allPossibleBadges.map(badge => ({
    ...badge,
    earned: earnedBadgeNames.includes(badge.badge_name)
  }));

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-amber-100 h-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {displayBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative`}
            >
              <div
                className={`p-4 rounded-xl border-2 ${
                  badge.earned
                    ? `${rarityBorders[badge.rarity]} bg-white`
                    : 'border-gray-200 bg-gray-50'
                } text-center transition-all hover:scale-105`}
              >
                {!badge.earned && (
                  <div className="absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="text-3xl mb-2 opacity-90">{badge.icon}</div>
                <div className={`text-xs font-bold mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                  {badge.badge_name}
                </div>
                <div className={`text-xs ${badge.earned ? 'text-gray-600' : 'text-gray-400'} line-clamp-2`}>
                  {badge.description}
                </div>
                {badge.earned && (
                  <div className={`mt-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${rarityColors[badge.rarity]} text-white`}>
                    {badge.rarity}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {badges.length === 0 && (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">
              Start activities to earn badges!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}