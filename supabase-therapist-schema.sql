-- Therapist Profiles Table
-- This table stores detailed information for therapist user accounts
-- Links to the users table via user_id

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

-- Enable Row Level Security (RLS)
ALTER TABLE public.therapist_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for therapist_profiles table
-- Therapists can view their own profile
CREATE POLICY "Therapists can view own profile" ON public.therapist_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Therapists can update their own profile (only if pending or approved)
CREATE POLICY "Therapists can update own profile" ON public.therapist_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

-- Therapists can insert their own profile
CREATE POLICY "Therapists can insert own profile" ON public.therapist_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles (you'll need to set up admin role checking)
-- For now, we'll allow service role to manage this

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_user_id ON public.therapist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_status ON public.therapist_profiles(status);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_email_verified ON public.therapist_profiles(email_verified);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_phone_verified ON public.therapist_profiles(phone_verified);

-- GIN indexes for array searches
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_licensed_countries ON public.therapist_profiles USING GIN(licensed_countries);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_therapy_types ON public.therapist_profiles USING GIN(therapy_types);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_specializations ON public.therapist_profiles USING GIN(specializations);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_therapist_profiles_updated_at
  BEFORE UPDATE ON public.therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE public.therapist_profiles IS 'Detailed profiles for therapist users, linked to users table';
COMMENT ON COLUMN public.therapist_profiles.user_id IS 'References users(id) - the base user account';
COMMENT ON COLUMN public.therapist_profiles.status IS 'Application status: pending, approved, rejected, suspended';
COMMENT ON COLUMN public.therapist_profiles.licensed_countries IS 'Array of countries where therapist is licensed';
COMMENT ON COLUMN public.therapist_profiles.licensed_states IS 'Array of states/provinces where therapist is licensed';
COMMENT ON COLUMN public.therapist_profiles.social_media_platforms IS 'JSON object with social media links: {instagram, facebook, twitter, tiktok, youtube, linkedin}';

