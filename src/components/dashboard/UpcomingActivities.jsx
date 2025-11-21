import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Gamepad2, Target, Calendar, ArrowRight, Sparkles, Heart, Brain, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Sophisticated recommendation engine
const analyzeUserPatterns = (data) => {
  const insights = {
    preferredActivities: [],
    relationshipStage: 'developing',
    engagementLevel: 'medium',
    activityGaps: [],
    topInterests: [],
    recommendedFocus: []
  };

  // Analyze journal patterns
  const journalTags = data.journals.flatMap(j => j.tags || []);
  const tagFrequency = journalTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  insights.topInterests = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  // Analyze activity frequency
  const now = Date.now();
  const daysSinceJournal = data.journals[0] 
    ? Math.floor((now - new Date(data.journals[0].entry_date).getTime()) / (1000 * 60 * 60 * 24))
    : 999;
  const daysSinceGame = data.games[0]
    ? Math.floor((now - new Date(data.games[0].date_played).getTime()) / (1000 * 60 * 60 * 24))
    : 999;
  const daysSinceMemory = data.memories[0]
    ? Math.floor((now - new Date(data.memories[0].created_date).getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  // Identify activity gaps
  if (daysSinceJournal > 5) insights.activityGaps.push('journal');
  if (daysSinceGame > 7) insights.activityGaps.push('game');
  if (daysSinceMemory > 10) insights.activityGaps.push('memory');
  if (data.goals.filter(g => g.status === 'in_progress').length === 0) insights.activityGaps.push('goals');

  // Determine relationship stage based on milestones
  const hasMoveIn = data.milestones.some(m => m.milestone_type === 'moving_in');
  const hasEngagement = data.milestones.some(m => m.milestone_type === 'engagement');
  const hasWedding = data.milestones.some(m => m.milestone_type === 'wedding');
  const hasAnniversary = data.milestones.some(m => m.milestone_type === 'anniversary');

  if (hasWedding || hasAnniversary) insights.relationshipStage = 'established';
  else if (hasEngagement || hasMoveIn) insights.relationshipStage = 'committed';
  else if (data.milestones.length > 0) insights.relationshipStage = 'developing';
  else insights.relationshipStage = 'new';

  // Determine engagement level
  const totalActivities = data.journals.length + data.games.length + data.memories.length + data.goals.length;
  const maxStreak = Math.max(...data.activityProgress.map(p => p.streak_days || 0), 0);
  
  if (totalActivities > 30 && maxStreak > 14) insights.engagementLevel = 'high';
  else if (totalActivities > 10 && maxStreak > 7) insights.engagementLevel = 'medium';
  else insights.engagementLevel = 'low';

  // Analyze game performance
  const avgGameScore = data.games.length > 0
    ? data.games.reduce((sum, g) => sum + (g.score || 0), 0) / data.games.length
    : 0;
  
  if (avgGameScore > 70) insights.preferredActivities.push('competitive');
  
  // Recommend focus areas
  if (journalTags.some(tag => ['communication', 'conflict', 'understanding'].includes(tag))) {
    insights.recommendedFocus.push('communication');
  }
  if (journalTags.some(tag => ['future', 'plans', 'dreams'].includes(tag))) {
    insights.recommendedFocus.push('planning');
  }
  if (data.goals.filter(g => g.category === 'intimacy').length > 0) {
    insights.recommendedFocus.push('intimacy');
  }

  return insights;
};

// Generate personalized recommendations
const generateRecommendations = (data, insights) => {
  const activities = [];
  
  // Priority 10: Critical gaps (haven't done in a while)
  if (insights.activityGaps.includes('journal')) {
    activities.push({
      name: "Write a Reflection",
      description: `It's been ${Math.floor((Date.now() - new Date(data.journals[0]?.entry_date || 0).getTime()) / (1000 * 60 * 60 * 24))} days since your last entry. Share your thoughts together.`,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-600",
      link: "SharedJournals",
      priority: 10,
      badge: "Overdue"
    });
  }

  // Priority 9: Active goals needing attention
  const activeGoals = data.goals.filter(g => g.status === 'in_progress');
  if (activeGoals.length > 0) {
    const goalsBehind = activeGoals.filter(g => g.progress < 50);
    if (goalsBehind.length > 0) {
      activities.push({
        name: "Update Goal Progress",
        description: `${goalsBehind.length} goal${goalsBehind.length > 1 ? 's need' : ' needs'} attention. Let's make progress together!`,
        icon: Target,
        color: "from-orange-500 to-red-600",
        link: "RelationshipGoals",
        priority: 9,
        badge: "Action Needed"
      });
    }
  }

  // Priority 8: Upcoming milestones
  const upcomingMilestones = data.milestones.filter(m => {
    const date = new Date(m.date);
    const today = new Date();
    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    return diff > 0 && diff <= 14;
  });

  if (upcomingMilestones.length > 0) {
    activities.push({
      name: "Plan Milestone Celebration",
      description: `${upcomingMilestones.length} special moment${upcomingMilestones.length > 1 ? 's' : ''} coming up! Time to plan something special.`,
      icon: Calendar,
      color: "from-pink-500 to-purple-600",
      link: "RelationshipMilestones",
      priority: 8,
      badge: "Coming Soon"
    });
  }

  // Priority 7: Based on top interests from journals
  if (insights.topInterests.includes('communication') || insights.recommendedFocus.includes('communication')) {
    activities.push({
      name: "Communication Practice",
      description: "Based on your journal entries, strengthen your communication skills together.",
      icon: Brain,
      color: "from-cyan-500 to-blue-600",
      link: "CommunicationPractice",
      priority: 7,
      badge: "Personalized"
    });
  }

  // Priority 6: Discovery - New relationship stage activities
  if (insights.relationshipStage === 'new' && data.memories.length < 5) {
    activities.push({
      name: "Create First Memories",
      description: "Start documenting your journey together. Capture those special early moments!",
      icon: Calendar,
      color: "from-pink-500 to-rose-600",
      link: "MemoryLane",
      priority: 6,
      badge: "Discovery",
      isDiscovery: true
    });
  }

  if (insights.relationshipStage === 'committed' && !data.goals.some(g => g.category === 'home')) {
    activities.push({
      name: "Set Home Goals",
      description: "You're building a life together - set goals around your shared home and future.",
      icon: Target,
      color: "from-indigo-500 to-purple-600",
      link: "RelationshipGoals",
      priority: 6,
      badge: "Discovery",
      isDiscovery: true
    });
  }

  if (insights.relationshipStage === 'established' && data.journals.length < 20) {
    activities.push({
      name: "Deepen Your Connection",
      description: "Keep your bond strong with regular reflection through shared journaling.",
      icon: BookOpen,
      color: "from-purple-500 to-pink-600",
      link: "SharedJournals",
      priority: 6,
      badge: "Discovery",
      isDiscovery: true
    });
  }

  // Priority 5: Games based on performance
  if (insights.activityGaps.includes('game')) {
    activities.push({
      name: "Play Together",
      description: "Haven't played in a while? Time for some fun and laughter with cooperative games!",
      icon: Gamepad2,
      color: "from-green-500 to-emerald-600",
      link: "CooperativeGames",
      priority: 5,
      badge: "Fun Time"
    });
  }

  // Priority 4: Quiz recommendations based on low engagement
  if (insights.engagementLevel === 'low' || data.activityProgress.length === 0) {
    activities.push({
      name: "Discover Through Quizzes",
      description: "Learn more about each other and your relationship through insightful quizzes.",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      link: "RelationshipQuizzes",
      priority: 4,
      badge: "Getting Started"
    });
  }

  // Priority 3: Based on journal mood patterns
  const recentJournals = data.journals.slice(0, 5);
  const challengedMoods = recentJournals.filter(j => j.mood === 'challenged').length;
  
  if (challengedMoods >= 2) {
    activities.push({
      name: "Relationship Coach",
      description: "Your recent entries suggest you might benefit from AI coaching support.",
      icon: Sparkles,
      color: "from-purple-600 to-indigo-600",
      link: "RelationshipCoach",
      priority: 8,
      badge: "Recommended"
    });
  }

  // Default recommendations if nothing else applies
  if (activities.length === 0) {
    activities.push(
      {
        name: "Start Your Journey",
        description: "Begin with a quiz to understand your relationship better.",
        icon: Brain,
        color: "from-purple-500 to-pink-600",
        link: "RelationshipQuizzes",
        priority: 3,
        badge: "Start Here"
      },
      {
        name: "Capture a Memory",
        description: "Document a special moment from your relationship.",
        icon: Calendar,
        color: "from-pink-500 to-rose-600",
        link: "MemoryLane",
        priority: 2,
        badge: "New"
      },
      {
        name: "Play Together",
        description: "Try a cooperative game and have fun together!",
        icon: Gamepad2,
        color: "from-green-500 to-emerald-600",
        link: "CooperativeGames",
        priority: 1,
        badge: "New"
      }
    );
  }

  return activities.sort((a, b) => b.priority - a.priority).slice(0, 3);
};

export default function UpcomingActivities({ data }) {
  const recommendations = useMemo(() => {
    const insights = analyzeUserPatterns(data);
    return generateRecommendations(data, insights);
  }, [data]);

  const badgeColors = {
    "Overdue": "bg-red-100 text-red-700",
    "Action Needed": "bg-orange-100 text-orange-700",
    "Coming Soon": "bg-purple-100 text-purple-700",
    "Personalized": "bg-blue-100 text-blue-700",
    "Discovery": "bg-emerald-100 text-emerald-700",
    "Fun Time": "bg-green-100 text-green-700",
    "Getting Started": "bg-cyan-100 text-cyan-700",
    "Recommended": "bg-indigo-100 text-indigo-700",
    "Start Here": "bg-pink-100 text-pink-700",
    "New": "bg-purple-100 text-purple-700"
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {recommendations.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-white/80 backdrop-blur-sm border-2 ${
              activity.isDiscovery ? 'border-emerald-300' : 'border-purple-100'
            } hover:shadow-xl transition-all h-full relative overflow-hidden`}>
              {activity.isDiscovery && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              )}
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {activity.badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColors[activity.badge] || 'bg-gray-100 text-gray-700'}`}>
                      {activity.badge}
                    </span>
                  )}
                </div>
                
                {activity.isDiscovery && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">New Discovery</span>
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {activity.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                  {activity.description}
                </p>
                
                <Link to={createPageUrl(activity.link)}>
                  <Button className={`w-full bg-gradient-to-r ${activity.color} hover:opacity-90`}>
                    {activity.isDiscovery ? 'Discover' : 'Start Now'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}