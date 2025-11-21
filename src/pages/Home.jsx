import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

import HeroSection from "../components/home/HeroSection";
import DiversitySection from "../components/home/DiversitySection";
import FeaturedPodcast from "../components/home/FeaturedPodcast";
import FeaturesGrid from "../components/home/FeaturesGrid";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";

export default function Home() {
  const { data: stats } = useQuery({
    queryKey: ['love-notes-stats'],
    queryFn: async () => {
      const currentPeriod = new Date().toISOString().slice(0, 7);
      const currentYear = new Date().getFullYear().toString();

      // Calculate week period (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // Fetch monthly leaderboard
      const monthlyLeaderboard = await base44.entities.ContestParticipant.filter({
        contest_type: 'monthly_love_notes',
        period: currentPeriod
      });
      const monthlyTopUser = monthlyLeaderboard.sort((a, b) => b.score - a.score)[0];

      // Fetch yearly leaderboard
      const yearlyLeaderboard = await base44.entities.ContestParticipant.filter({
        contest_type: 'yearly_engagement',
        period: currentYear
      });
      const yearlyTopUser = yearlyLeaderboard.sort((a, b) => b.score - a.score)[0];

      // Calculate weekly stats from monthly data (simplified - in production you'd have separate weekly tracking)
      const weeklyTopUser = monthlyTopUser; // Using monthly data as proxy

      // Get total users count as happy couples (simplified)
      const allUsers = await base44.entities.User.list();
      const happyCouples = Math.floor(allUsers.length / 2);

      // Get total notes count from all monthly participants
      const totalNotes = monthlyLeaderboard.reduce((sum, p) => sum + (p.score || 0), 0);

      return {
        notesCreated: totalNotes,
        happyCouples: happyCouples,
        mostNotesWeek: {
          count: weeklyTopUser?.score || 0,
          membershipId: weeklyTopUser?.user_email?.split('@')[0] || ''
        },
        mostNotesMonth: {
          count: monthlyTopUser?.score || 0,
          membershipId: monthlyTopUser?.user_email?.split('@')[0] || ''
        },
        mostNotesYear: {
          count: yearlyTopUser?.score || 0,
          membershipId: yearlyTopUser?.user_email?.split('@')[0] || ''
        }
      };
    },
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    initialData: { 
      notesCreated: 0, 
      happyCouples: 0,
      mostNotesWeek: { count: 0, membershipId: '' },
      mostNotesMonth: { count: 0, membershipId: '' },
      mostNotesYear: { count: 0, membershipId: '' }
    },
  });

  return (
    <div className="min-h-screen">
      <HeroSection stats={stats} />
      <DiversitySection />
      <FeaturedPodcast />
      <FeaturesGrid />
      <Testimonials />
      <Footer />
    </div>
  );
}