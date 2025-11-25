-- Professional Profiles Table
-- This table stores detailed information for professional user accounts
-- Links to the users table via user_id
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
  organization_name TEXT NOT NULL, -- Practice/Organization name
  practice_type TEXT NOT NULL, -- Type of practice (e.g., Coaching, Counseling, Financial Planning)
  service_description TEXT NOT NULL, -- Services offered (max 500 characters)
  professional_bio TEXT NOT NULL, -- Professional bio (max 1000 characters)
  
  -- Optional Fields
  website_url TEXT, -- Organization website URL
  
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
  CONSTRAINT max_service_description_length CHECK (char_length(service_description) <= 500),
  CONSTRAINT max_bio_length CHECK (char_length(professional_bio) <= 1000),
  CONSTRAINT min_bio_length CHECK (char_length(professional_bio) >= 100)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Professionals can view own profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Professionals can update own profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Professionals can insert own profile" ON public.professional_profiles;

-- RLS Policies for professional_profiles table
-- Professionals can view their own profile
CREATE POLICY "Professionals can view own profile" ON public.professional_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Professionals can update their own profile (only if pending or approved)
CREATE POLICY "Professionals can update own profile" ON public.professional_profiles
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    status IN ('pending', 'approved')
  );

-- Professionals can insert their own profile
CREATE POLICY "Professionals can insert own profile" ON public.professional_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for better query performance
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

-- Comments for documentation
COMMENT ON TABLE public.professional_profiles IS 'Detailed profiles for professional users, linked to users table';
COMMENT ON COLUMN public.professional_profiles.user_id IS 'References users(id) - the base user account';
COMMENT ON COLUMN public.professional_profiles.status IS 'Application status: pending, approved, rejected, suspended';
COMMENT ON COLUMN public.professional_profiles.organization_name IS 'Name of the practice or organization';
COMMENT ON COLUMN public.professional_profiles.practice_type IS 'Type of professional practice (e.g., Coaching, Counseling, Financial Planning)';
COMMENT ON COLUMN public.professional_profiles.service_description IS 'Description of services offered (max 500 characters)';
COMMENT ON COLUMN public.professional_profiles.professional_bio IS 'Professional bio (100-1000 characters)';

