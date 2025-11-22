-- Influencer Profiles Table
-- This table stores detailed information for influencer user accounts
-- Links to the users table via user_id

CREATE TABLE IF NOT EXISTS public.influencer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  profile_photo_url TEXT,
  
  -- Influencer Information (Required)
  total_follower_count INTEGER NOT NULL, -- Combined followers across all platforms
  platform_links JSONB NOT NULL DEFAULT '{}'::jsonb, -- {instagram, tiktok, youtube, other}
  content_categories TEXT[] NOT NULL DEFAULT '{}', -- Array of categories
  collaboration_types TEXT[] NOT NULL DEFAULT '{}', -- Array of collaboration types
  bio TEXT NOT NULL, -- Influencer bio (min 100 characters)
  
  -- Optional Fields
  media_kit_url TEXT, -- URL to media kit
  
  -- Verification Status
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  
  -- Application Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT, -- Reason if rejected
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.users(id), -- Admin who reviewed
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT min_bio_length CHECK (char_length(bio) >= 100)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.influencer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for influencer_profiles table
-- Influencers can view their own profile
CREATE POLICY "Influencers can view own profile" ON public.influencer_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Influencers can update their own profile (only if pending or approved)
CREATE POLICY "Influencers can update own profile" ON public.influencer_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

-- Influencers can insert their own profile
CREATE POLICY "Influencers can insert own profile" ON public.influencer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_user_id ON public.influencer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_status ON public.influencer_profiles(status);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_follower_count ON public.influencer_profiles(total_follower_count);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_email_verified ON public.influencer_profiles(email_verified);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_phone_verified ON public.influencer_profiles(phone_verified);

-- GIN indexes for array searches
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_content_categories ON public.influencer_profiles USING GIN(content_categories);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_collaboration_types ON public.influencer_profiles USING GIN(collaboration_types);

-- GIN index for JSONB platform_links
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_platform_links ON public.influencer_profiles USING GIN(platform_links);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_influencer_profiles_updated_at
  BEFORE UPDATE ON public.influencer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE public.influencer_profiles IS 'Detailed profiles for influencer users, linked to users table';
COMMENT ON COLUMN public.influencer_profiles.user_id IS 'References users(id) - the base user account';
COMMENT ON COLUMN public.influencer_profiles.status IS 'Application status: pending, approved, rejected, suspended';
COMMENT ON COLUMN public.influencer_profiles.total_follower_count IS 'Combined follower count across all platforms';
COMMENT ON COLUMN public.influencer_profiles.platform_links IS 'JSON object with social media links: {instagram, tiktok, youtube, other}';
COMMENT ON COLUMN public.influencer_profiles.content_categories IS 'Array of content categories the influencer creates';
COMMENT ON COLUMN public.influencer_profiles.collaboration_types IS 'Array of collaboration types the influencer is open to';

