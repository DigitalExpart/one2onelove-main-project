-- Update existing users table to add user_type and other new fields
-- Run this if you already created the users table and need to add these columns

-- Add user_type column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'user_type'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN user_type TEXT DEFAULT 'regular' 
    CHECK (user_type IN ('regular', 'therapist', 'influencer', 'professional'));
    
    -- Update existing users to be 'regular' type
    UPDATE public.users SET user_type = 'regular' WHERE user_type IS NULL;
    
    -- Make it NOT NULL after setting defaults
    ALTER TABLE public.users ALTER COLUMN user_type SET NOT NULL;
  END IF;
END $$;

-- Add is_verified column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'is_verified'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Add is_active column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
  END IF;
END $$;

-- Make name NOT NULL if it isn't already
DO $$ 
BEGIN
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

-- Create index for user_type if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);

-- Create index for is_active if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

