-- ============================================================================
-- ONE 2 ONE LOVE - COMPLETE SUPABASE DATABASE SCHEMA
-- ============================================================================
-- This file contains all database tables for the One 2 One Love platform
-- Run this entire file in your Supabase SQL Editor to set up all tables
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE (Base user accounts for all user types)
-- ============================================================================
-- This table extends Supabase auth.users and supports all user types:
-- regular, therapist, influencer, professional

-- Add missing columns to existing users table if needed
DO $$ 
BEGIN
  -- Add user_type column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'user_type'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN user_type TEXT DEFAULT 'regular' 
    CHECK (user_type IN ('regular', 'therapist', 'influencer', 'professional'));
    UPDATE public.users SET user_type = 'regular' WHERE user_type IS NULL;
    ALTER TABLE public.users ALTER COLUMN user_type SET NOT NULL;
  END IF;
  
  -- Add is_verified if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'is_verified'
  ) THEN
    ALTER TABLE public.users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  END IF;
  
  -- Add is_active if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.users ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
  END IF;
  
  -- Make name NOT NULL if needed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'name'
    AND is_nullable = 'YES'
  ) THEN
    UPDATE public.users SET name = email WHERE name IS NULL;
    ALTER TABLE public.users ALTER COLUMN name SET NOT NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  user_type TEXT NOT NULL DEFAULT 'regular' CHECK (user_type IN ('regular', 'therapist', 'influencer', 'professional')),
  -- Regular user fields
  relationship_status TEXT CHECK (relationship_status IN ('single', 'dating', 'engaged', 'married', 'complicated')),
  anniversary_date DATE,
  partner_email TEXT,
  -- Common fields
  avatar_url TEXT,
  bio TEXT,
  -- Status fields
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;

-- Trigger to update updated_at on users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_relationship_status ON public.users(relationship_status);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- Comments for users table
COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth.users - supports regular, therapist, influencer, and professional user types';
COMMENT ON COLUMN public.users.id IS 'References auth.users(id)';
COMMENT ON COLUMN public.users.user_type IS 'Type of user: regular, therapist, influencer, professional';
COMMENT ON COLUMN public.users.relationship_status IS 'Current relationship status: single, dating, engaged, married, complicated (for regular users)';
COMMENT ON COLUMN public.users.is_verified IS 'Whether the user account has been verified';
COMMENT ON COLUMN public.users.is_active IS 'Whether the user account is active';

-- ============================================================================
-- 2. THERAPIST_PROFILES TABLE
-- ============================================================================
-- Detailed profiles for therapist user accounts
-- Links to users table via user_id

CREATE TABLE IF NOT EXISTS public.therapist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  profile_photo_url TEXT,
  
  -- Professional Information
  licensed_countries TEXT[] DEFAULT '{}', -- Array of countries
  licensed_states TEXT[] DEFAULT '{}', -- Array of states/provinces
  therapy_types TEXT[] DEFAULT '{}', -- Array of therapy types
  specializations TEXT[] DEFAULT '{}', -- Array of specializations
  certifications TEXT[] DEFAULT '{}', -- Array of certifications
  years_experience INTEGER,
  consultation_fee DECIMAL(10, 2), -- Fee in USD
  professional_bio TEXT,
  license_number TEXT, -- Professional license number
  
  -- Social Media (stored as JSONB for flexibility)
  social_media_platforms JSONB DEFAULT '{}'::jsonb,
  
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for therapist_profiles table
ALTER TABLE public.therapist_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Therapists can view own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can update own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can insert own profile" ON public.therapist_profiles;

-- RLS Policies for therapist_profiles table
CREATE POLICY "Therapists can view own profile" ON public.therapist_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Therapists can update own profile" ON public.therapist_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

CREATE POLICY "Therapists can insert own profile" ON public.therapist_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for therapist_profiles table
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_user_id ON public.therapist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_status ON public.therapist_profiles(status);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_email_verified ON public.therapist_profiles(email_verified);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_phone_verified ON public.therapist_profiles(phone_verified);

-- GIN indexes for array searches
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_licensed_countries ON public.therapist_profiles USING GIN(licensed_countries);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_therapy_types ON public.therapist_profiles USING GIN(therapy_types);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_specializations ON public.therapist_profiles USING GIN(specializations);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_therapist_profiles_updated_at ON public.therapist_profiles;

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_therapist_profiles_updated_at
  BEFORE UPDATE ON public.therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for therapist_profiles table
COMMENT ON TABLE public.therapist_profiles IS 'Detailed profiles for therapist users, linked to users table';
COMMENT ON COLUMN public.therapist_profiles.user_id IS 'References users(id) - the base user account';
COMMENT ON COLUMN public.therapist_profiles.status IS 'Application status: pending, approved, rejected, suspended';
COMMENT ON COLUMN public.therapist_profiles.licensed_countries IS 'Array of countries where therapist is licensed';
COMMENT ON COLUMN public.therapist_profiles.licensed_states IS 'Array of states/provinces where therapist is licensed';
COMMENT ON COLUMN public.therapist_profiles.social_media_platforms IS 'JSON object with social media links: {instagram, facebook, twitter, tiktok, youtube, linkedin}';

-- ============================================================================
-- 3. INFLUENCER_PROFILES TABLE
-- ============================================================================
-- Detailed profiles for influencer user accounts
-- Links to users table via user_id

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

-- Enable Row Level Security (RLS) for influencer_profiles table
ALTER TABLE public.influencer_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Influencers can view own profile" ON public.influencer_profiles;
DROP POLICY IF EXISTS "Influencers can update own profile" ON public.influencer_profiles;
DROP POLICY IF EXISTS "Influencers can insert own profile" ON public.influencer_profiles;

-- RLS Policies for influencer_profiles table
CREATE POLICY "Influencers can view own profile" ON public.influencer_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Influencers can update own profile" ON public.influencer_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

CREATE POLICY "Influencers can insert own profile" ON public.influencer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for influencer_profiles table
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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_influencer_profiles_updated_at ON public.influencer_profiles;

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_influencer_profiles_updated_at
  BEFORE UPDATE ON public.influencer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for influencer_profiles table
COMMENT ON TABLE public.influencer_profiles IS 'Detailed profiles for influencer users, linked to users table';
COMMENT ON COLUMN public.influencer_profiles.user_id IS 'References users(id) - the base user account';
COMMENT ON COLUMN public.influencer_profiles.status IS 'Application status: pending, approved, rejected, suspended';
COMMENT ON COLUMN public.influencer_profiles.total_follower_count IS 'Combined follower count across all platforms';
COMMENT ON COLUMN public.influencer_profiles.platform_links IS 'JSON object with social media links: {instagram, tiktok, youtube, other}';
COMMENT ON COLUMN public.influencer_profiles.content_categories IS 'Array of content categories the influencer creates';
COMMENT ON COLUMN public.influencer_profiles.collaboration_types IS 'Array of collaboration types the influencer is open to';

-- ============================================================================
-- 4. PROFESSIONAL_PROFILES TABLE
-- ============================================================================
-- Detailed profiles for professional user accounts
-- Links to users table via user_id
-- Applications start as 'pending' and require admin approval

CREATE TABLE IF NOT EXISTS public.professional_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  profile_photo_url TEXT,
  
  -- Professional Information (Required)
  organization_name TEXT NOT NULL,
  practice_type TEXT NOT NULL,
  service_description TEXT NOT NULL,
  professional_bio TEXT NOT NULL,
  
  -- Optional Fields
  website_url TEXT,
  
  -- Verification Status
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  
  -- Application Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.users(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT max_service_description_length CHECK (char_length(service_description) <= 500),
  CONSTRAINT max_bio_length CHECK (char_length(professional_bio) <= 1000),
  CONSTRAINT min_bio_length CHECK (char_length(professional_bio) >= 100)
);

-- Enable Row Level Security (RLS) for professional_profiles table
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Professionals can view own profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Professionals can update own profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Professionals can insert own profile" ON public.professional_profiles;

-- RLS Policies for professional_profiles table
CREATE POLICY "Professionals can view own profile" ON public.professional_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Professionals can update own profile" ON public.professional_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

CREATE POLICY "Professionals can insert own profile" ON public.professional_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for professional_profiles table
CREATE INDEX IF NOT EXISTS idx_professional_profiles_user_id ON public.professional_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_status ON public.professional_profiles(status);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_practice_type ON public.professional_profiles(practice_type);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_email_verified ON public.professional_profiles(email_verified);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_phone_verified ON public.professional_profiles(phone_verified);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_professional_profiles_updated_at ON public.professional_profiles;

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_professional_profiles_updated_at
  BEFORE UPDATE ON public.professional_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for professional_profiles table
COMMENT ON TABLE public.professional_profiles IS 'Detailed profiles for professional users, linked to users table';
COMMENT ON COLUMN public.professional_profiles.user_id IS 'References users(id) - the base user account';
COMMENT ON COLUMN public.professional_profiles.status IS 'Application status: pending, approved, rejected, suspended';
COMMENT ON COLUMN public.professional_profiles.organization_name IS 'Name of the practice or organization';
COMMENT ON COLUMN public.professional_profiles.practice_type IS 'Type of professional practice';
COMMENT ON COLUMN public.professional_profiles.service_description IS 'Description of services offered (max 500 characters)';
COMMENT ON COLUMN public.professional_profiles.professional_bio IS 'Professional bio (100-1000 characters)';

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- All tables have been created with:
-- - Row Level Security (RLS) enabled
-- - Proper indexes for performance
-- - Automatic timestamp updates
-- - Foreign key relationships
--
-- Tables created:
-- 1. users - Base user accounts for all user types
-- 2. therapist_profiles - Therapist-specific information
-- 3. influencer_profiles - Influencer-specific information
-- 4. professional_profiles - Professional-specific information
--
-- Next steps:
-- 1. Create Storage buckets for photos:
--    - therapist-photos
--    - influencer-photos
--    - professional-photos
-- 2. Test the signup flows
-- 3. Set up admin approval workflows
-- ============================================================================

