-- ============================================================================
-- VERIFY AND SET UP BIO COLUMN
-- ============================================================================
-- This script ensures the bio column is properly configured
-- ============================================================================

-- Check if bio column exists, if not add it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'bio'
  ) THEN
    ALTER TABLE public.users ADD COLUMN bio TEXT;
    RAISE NOTICE 'Added bio column';
  ELSE
    RAISE NOTICE 'bio column already exists';
  END IF;
END $$;

-- Verify the setup
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  character_maximum_length
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
  AND column_name = 'bio';

-- Check current bio values
SELECT 
  COUNT(*) as total_users,
  COUNT(bio) as users_with_bio,
  COUNT(*) - COUNT(bio) as users_without_bio
FROM public.users;

-- Sample of users with bios
SELECT 
  id,
  name,
  LEFT(bio, 50) as bio_preview,
  LENGTH(bio) as bio_length
FROM public.users
WHERE bio IS NOT NULL AND bio != ''
LIMIT 5;

