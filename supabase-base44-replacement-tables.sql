-- ============================================================================
-- BASE44 REPLACEMENT TABLES - MISSING TABLES AFTER BASE44 REMOVAL
-- ============================================================================
-- This file creates tables that were previously handled by base44 but are now
-- needed for direct Supabase queries after removing base44 dependencies
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. GAMIFICATION POINTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gamification_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  points_earned INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0, -- Alternative field name
  activity_type TEXT NOT NULL, -- e.g., 'love_note_sent', 'memory_created', 'goal_completed'
  activity_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gamification_points_user_id ON public.gamification_points(user_id);
CREATE INDEX IF NOT EXISTS idx_gamification_points_created_at ON public.gamification_points(created_at DESC);

-- RLS Policies
ALTER TABLE public.gamification_points ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own points" ON public.gamification_points;
CREATE POLICY "Users can view own points" ON public.gamification_points
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own points" ON public.gamification_points;
CREATE POLICY "Users can insert own points" ON public.gamification_points
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 2. BADGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_name TEXT NOT NULL,
  badge_type TEXT NOT NULL, -- e.g., 'achievement', 'milestone', 'special'
  badge_icon TEXT, -- Icon identifier or emoji
  description TEXT,
  earned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_badges_user_id ON public.badges(user_id);
CREATE INDEX IF NOT EXISTS idx_badges_earned_date ON public.badges(earned_date DESC);

-- RLS Policies
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own badges" ON public.badges;
CREATE POLICY "Users can view own badges" ON public.badges
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own badges" ON public.badges;
CREATE POLICY "Users can insert own badges" ON public.badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 3. MEMORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  memory_date DATE NOT NULL,
  location TEXT,
  media_urls TEXT[], -- Array of photo/video URLs
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_memories_user_id ON public.memories(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_memory_date ON public.memories(memory_date DESC);
CREATE INDEX IF NOT EXISTS idx_memories_created_at ON public.memories(created_at DESC);

-- RLS Policies
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own memories" ON public.memories;
CREATE POLICY "Users can view own memories" ON public.memories
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own memories" ON public.memories;
CREATE POLICY "Users can insert own memories" ON public.memories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own memories" ON public.memories;
CREATE POLICY "Users can update own memories" ON public.memories
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own memories" ON public.memories;
CREATE POLICY "Users can delete own memories" ON public.memories
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 4. CUSTOM DATE IDEAS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.custom_date_ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- e.g., 'romantic', 'adventure', 'relaxing'
  budget TEXT, -- e.g., 'free', 'low', 'medium', 'high'
  location_type TEXT, -- e.g., 'home', 'outdoor', 'restaurant'
  occasion TEXT, -- e.g., 'regular', 'anniversary', 'birthday'
  relationship_stage TEXT, -- e.g., 'new', 'dating', 'married'
  is_favorite BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_custom_date_ideas_user_id ON public.custom_date_ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_date_ideas_created_at ON public.custom_date_ideas(created_at DESC);

-- RLS Policies
ALTER TABLE public.custom_date_ideas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own date ideas" ON public.custom_date_ideas;
CREATE POLICY "Users can view own date ideas" ON public.custom_date_ideas
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own date ideas" ON public.custom_date_ideas;
CREATE POLICY "Users can insert own date ideas" ON public.custom_date_ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own date ideas" ON public.custom_date_ideas;
CREATE POLICY "Users can update own date ideas" ON public.custom_date_ideas
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own date ideas" ON public.custom_date_ideas;
CREATE POLICY "Users can delete own date ideas" ON public.custom_date_ideas
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 5. SENT LOVE NOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.sent_love_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('partner', 'sms', 'social_media', 'email')),
  recipient_email TEXT,
  recipient_phone TEXT,
  social_platform TEXT, -- e.g., 'whatsapp', 'facebook', 'instagram'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sent_love_notes_user_id ON public.sent_love_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_sent_love_notes_sent_at ON public.sent_love_notes(sent_at DESC);

-- RLS Policies
ALTER TABLE public.sent_love_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own sent notes" ON public.sent_love_notes;
CREATE POLICY "Users can view own sent notes" ON public.sent_love_notes
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own sent notes" ON public.sent_love_notes;
CREATE POLICY "Users can insert own sent notes" ON public.sent_love_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 6. SCHEDULED LOVE NOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.scheduled_love_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('partner', 'sms', 'social_media', 'email')),
  recipient_email TEXT,
  recipient_phone TEXT,
  social_platform TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'cancelled')),
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scheduled_love_notes_user_id ON public.scheduled_love_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_love_notes_scheduled_date ON public.scheduled_love_notes(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_scheduled_love_notes_status ON public.scheduled_love_notes(status);

-- RLS Policies
ALTER TABLE public.scheduled_love_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own scheduled notes" ON public.scheduled_love_notes;
CREATE POLICY "Users can view own scheduled notes" ON public.scheduled_love_notes
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own scheduled notes" ON public.scheduled_love_notes;
CREATE POLICY "Users can insert own scheduled notes" ON public.scheduled_love_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own scheduled notes" ON public.scheduled_love_notes;
CREATE POLICY "Users can update own scheduled notes" ON public.scheduled_love_notes
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own scheduled notes" ON public.scheduled_love_notes;
CREATE POLICY "Users can delete own scheduled notes" ON public.scheduled_love_notes
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 7. WAITLIST TABLE (if not already exists)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- RLS Policies (allow public inserts for waitlist)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert into waitlist" ON public.waitlist;
CREATE POLICY "Anyone can insert into waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 8. BUDDY MATCHES TABLE (if not in buddy-system-schema)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.buddy_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  buddy_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, buddy_user_id)
);

CREATE INDEX IF NOT EXISTS idx_buddy_matches_user_id ON public.buddy_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_buddy_matches_buddy_user_id ON public.buddy_matches(buddy_user_id);
CREATE INDEX IF NOT EXISTS idx_buddy_matches_status ON public.buddy_matches(status);

-- RLS Policies
ALTER TABLE public.buddy_matches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own buddy matches" ON public.buddy_matches;
CREATE POLICY "Users can view own buddy matches" ON public.buddy_matches
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = buddy_user_id);

DROP POLICY IF EXISTS "Users can update own buddy matches" ON public.buddy_matches;
CREATE POLICY "Users can update own buddy matches" ON public.buddy_matches
  FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = buddy_user_id);

-- ============================================================================
-- 9. CONTEST PARTICIPANTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contest_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  contest_type TEXT NOT NULL, -- e.g., 'monthly_love_notes', 'yearly_engagement'
  period TEXT NOT NULL, -- e.g., '2025-11' for monthly, '2025' for yearly
  score INTEGER NOT NULL DEFAULT 0,
  activities_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_email, contest_type, period)
);

CREATE INDEX IF NOT EXISTS idx_contest_participants_contest_type ON public.contest_participants(contest_type);
CREATE INDEX IF NOT EXISTS idx_contest_participants_period ON public.contest_participants(period);
CREATE INDEX IF NOT EXISTS idx_contest_participants_score ON public.contest_participants(score DESC);

-- RLS Policies
ALTER TABLE public.contest_participants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view contest participants" ON public.contest_participants;
CREATE POLICY "Anyone can view contest participants" ON public.contest_participants
  FOR SELECT USING (true);

-- ============================================================================
-- 10. CONTEST WINNERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contest_winners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  contest_type TEXT NOT NULL,
  period TEXT NOT NULL,
  rank INTEGER NOT NULL,
  prize_description TEXT,
  won_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(contest_type, period, rank)
);

CREATE INDEX IF NOT EXISTS idx_contest_winners_contest_type ON public.contest_winners(contest_type);
CREATE INDEX IF NOT EXISTS idx_contest_winners_period ON public.contest_winners(period);

-- RLS Policies
ALTER TABLE public.contest_winners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view contest winners" ON public.contest_winners;
CREATE POLICY "Anyone can view contest winners" ON public.contest_winners
  FOR SELECT USING (true);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================
-- Function to update updated_at timestamp (if not already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at column
DROP TRIGGER IF EXISTS update_gamification_points_updated_at ON public.gamification_points;
CREATE TRIGGER update_gamification_points_updated_at
  BEFORE UPDATE ON public.gamification_points
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_memories_updated_at ON public.memories;
CREATE TRIGGER update_memories_updated_at
  BEFORE UPDATE ON public.memories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_custom_date_ideas_updated_at ON public.custom_date_ideas;
CREATE TRIGGER update_custom_date_ideas_updated_at
  BEFORE UPDATE ON public.custom_date_ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_scheduled_love_notes_updated_at ON public.scheduled_love_notes;
CREATE TRIGGER update_scheduled_love_notes_updated_at
  BEFORE UPDATE ON public.scheduled_love_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_buddy_matches_updated_at ON public.buddy_matches;
CREATE TRIGGER update_buddy_matches_updated_at
  BEFORE UPDATE ON public.buddy_matches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contest_participants_updated_at ON public.contest_participants;
CREATE TRIGGER update_contest_participants_updated_at
  BEFORE UPDATE ON public.contest_participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ All base44 replacement tables created successfully!';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '  - gamification_points';
  RAISE NOTICE '  - badges';
  RAISE NOTICE '  - memories';
  RAISE NOTICE '  - custom_date_ideas';
  RAISE NOTICE '  - sent_love_notes';
  RAISE NOTICE '  - scheduled_love_notes';
  RAISE NOTICE '  - waitlist';
  RAISE NOTICE '  - buddy_matches';
  RAISE NOTICE '  - contest_participants';
  RAISE NOTICE '  - contest_winners';
END $$;

