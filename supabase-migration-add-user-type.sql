-- Migration: Add user_type column to existing users table
-- Run this if your users table was created without the user_type column

-- Add user_type column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'user_type'
  ) THEN
    -- Add the column with a default value
    ALTER TABLE public.users 
    ADD COLUMN user_type TEXT DEFAULT 'regular' 
    CHECK (user_type IN ('regular', 'therapist', 'influencer', 'professional'));
    
    -- Update existing users to be 'regular' type
    UPDATE public.users SET user_type = 'regular' WHERE user_type IS NULL;
    
    -- Make it NOT NULL after setting defaults
    ALTER TABLE public.users ALTER COLUMN user_type SET NOT NULL;
    
    -- Create index if it doesn't exist
    CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
  END IF;
END $$;

-- Add other missing columns if needed
DO $$ 
BEGIN
  -- Add is_verified if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'is_verified'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  END IF;
  
  -- Add is_active if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
  END IF;
  
  -- Make name NOT NULL if it isn't already
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'name'
    AND is_nullable = 'YES'
  ) THEN
    -- Set default for existing NULL names
    UPDATE public.users SET name = email WHERE name IS NULL;
    ALTER TABLE public.users ALTER COLUMN name SET NOT NULL;
  END IF;
END $$;

-- Create missing indexes
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

