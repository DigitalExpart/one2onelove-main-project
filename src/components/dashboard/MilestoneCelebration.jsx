import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PartyPopper, Gift, Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function MilestoneCelebration({ milestones }) {
  const upcomingMilestone = useMemo(() => {
    const today = new Date();
    
    // Find milestones within next 7 days
    const upcoming = milestones
      .filter(m => {
        const date = new Date(m.date);
        const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        return diff >= 0 && diff <= 7;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return upcoming[0] || null;
  }, [milestones]);

  if (!upcomingMilestone) return null;

  const daysUntil = Math.ceil((new Date(upcomingMilestone.date) - new Date()) / (1000 * 60 * 60 * 24));
  const isToday = daysUntil === 0;
  const isTomorrow = daysUntil === 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 border-0 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <CardContent className="p-6 md:p-8 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                  {isToday ? (
                    <PartyPopper className="w-8 h-8 text-white" />
                  ) : (
                    <Gift className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold opacity-90">
                      {isToday ? "🎉 TODAY!" : isTomorrow ? "Tomorrow" : `In ${daysUntil} days`}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {upcomingMilestone.title}
                  </h3>
                  <p className="text-white/90 mb-1">
                    {format(new Date(upcomingMilestone.date), 'MMMM d, yyyy')}
                  </p>
                  {upcomingMilestone.description && (
                    <p className="text-white/80 text-sm max-w-2xl">
                      {upcomingMilestone.description}
                    </p>
                  )}
                </div>
              </div>
              
              <Link to={createPageUrl("RelationshipMilestones")}>
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-white/90 shadow-xl font-semibold"
                >
                  {isToday ? "Celebrate Now! 🎊" : "Plan Celebration"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}