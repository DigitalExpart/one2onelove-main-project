-- ============================================================================
-- ONE 2 ONE LOVE - SAFE SUPABASE SCHEMA (Handles Existing Objects)
-- ============================================================================
-- This version safely handles cases where tables/policies already exist
-- Use this if you've run the schema before and need to update it
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE
-- ============================================================================

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;

-- Create users table (will not fail if already exists)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  user_type TEXT NOT NULL DEFAULT 'regular' CHECK (user_type IN ('regular', 'therapist', 'influencer', 'professional')),
  relationship_status TEXT CHECK (relationship_status IN ('single', 'dating', 'engaged', 'married', 'complicated')),
  anniversary_date DATE,
  partner_email TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create or replace function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes (IF NOT EXISTS is safe)
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_relationship_status ON public.users(relationship_status);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- ============================================================================
-- 2. THERAPIST_PROFILES TABLE
-- ============================================================================

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_therapist_profiles_updated_at ON public.therapist_profiles;

-- Create table
CREATE TABLE IF NOT EXISTS public.therapist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  profile_photo_url TEXT,
  licensed_countries TEXT[] DEFAULT '{}',
  licensed_states TEXT[] DEFAULT '{}',
  therapy_types TEXT[] DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  years_experience INTEGER,
  consultation_fee DECIMAL(10, 2),
  professional_bio TEXT,
  license_number TEXT,
  social_media_platforms JSONB DEFAULT '{}'::jsonb,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.therapist_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Therapists can view own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can update own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can insert own profile" ON public.therapist_profiles;

-- Create policies
CREATE POLICY "Therapists can view own profile" ON public.therapist_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Therapists can update own profile" ON public.therapist_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

CREATE POLICY "Therapists can insert own profile" ON public.therapist_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger
CREATE TRIGGER update_therapist_profiles_updated_at
  BEFORE UPDATE ON public.therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_user_id ON public.therapist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_status ON public.therapist_profiles(status);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_email_verified ON public.therapist_profiles(email_verified);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_phone_verified ON public.therapist_profiles(phone_verified);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_licensed_countries ON public.therapist_profiles USING GIN(licensed_countries);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_therapy_types ON public.therapist_profiles USING GIN(therapy_types);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_specializations ON public.therapist_profiles USING GIN(specializations);

-- ============================================================================
-- 3. INFLUENCER_PROFILES TABLE
-- ============================================================================

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_influencer_profiles_updated_at ON public.influencer_profiles;

-- Create table
CREATE TABLE IF NOT EXISTS public.influencer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  profile_photo_url TEXT,
  total_follower_count INTEGER NOT NULL,
  platform_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_categories TEXT[] NOT NULL DEFAULT '{}',
  collaboration_types TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  media_kit_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT min_bio_length CHECK (char_length(bio) >= 100)
);

-- Enable RLS
ALTER TABLE public.influencer_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Influencers can view own profile" ON public.influencer_profiles;
DROP POLICY IF EXISTS "Influencers can update own profile" ON public.influencer_profiles;
DROP POLICY IF EXISTS "Influencers can insert own profile" ON public.influencer_profiles;

-- Create policies
CREATE POLICY "Influencers can view own profile" ON public.influencer_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Influencers can update own profile" ON public.influencer_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

CREATE POLICY "Influencers can insert own profile" ON public.influencer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger
CREATE TRIGGER update_influencer_profiles_updated_at
  BEFORE UPDATE ON public.influencer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_user_id ON public.influencer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_status ON public.influencer_profiles(status);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_follower_count ON public.influencer_profiles(total_follower_count);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_email_verified ON public.influencer_profiles(email_verified);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_phone_verified ON public.influencer_profiles(phone_verified);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_content_categories ON public.influencer_profiles USING GIN(content_categories);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_collaboration_types ON public.influencer_profiles USING GIN(collaboration_types);
CREATE INDEX IF NOT EXISTS idx_influencer_profiles_platform_links ON public.influencer_profiles USING GIN(platform_links);

-- ============================================================================
-- COMPLETE!
-- ============================================================================

