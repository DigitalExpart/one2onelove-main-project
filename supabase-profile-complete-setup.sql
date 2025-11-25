-- ============================================================================
-- COMPLETE PROFILE SETUP FOR ONE 2 ONE LOVE
-- ============================================================================
-- Run this entire script in your Supabase SQL Editor
-- This sets up profile picture storage and adds profile fields
-- ============================================================================

-- ============================================================================
-- 1. CREATE STORAGE BUCKET FOR PROFILE PICTURES
-- ============================================================================

-- Create the bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-pictures',
  'profile-pictures',
  true, -- Public bucket so profile pictures can be viewed
  5242880, -- 5MB file size limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. SET UP STORAGE POLICIES (RLS)
-- ============================================================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can upload own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;

-- Policy: Allow authenticated users to upload their own profile pictures
CREATE POLICY "Users can upload own profile picture"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow authenticated users to update their own profile pictures
CREATE POLICY "Users can update own profile picture"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'profile-pictures' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow authenticated users to delete their own profile pictures
CREATE POLICY "Users can delete own profile picture"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'profile-pictures' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow anyone to view profile pictures (public read)
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-pictures');

-- ============================================================================
-- 3. ADD PROFILE FIELDS TO USERS TABLE
-- ============================================================================

-- Add location column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'location'
  ) THEN
    ALTER TABLE public.users ADD COLUMN location TEXT;
    RAISE NOTICE 'Added location column to users table';
  ELSE
    RAISE NOTICE 'Location column already exists';
  END IF;
END $$;

-- Add love_language column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'love_language'
  ) THEN
    ALTER TABLE public.users ADD COLUMN love_language TEXT 
      CHECK (love_language IN ('words_of_affirmation', 'quality_time', 'receiving_gifts', 'acts_of_service', 'physical_touch') OR love_language IS NULL);
    RAISE NOTICE 'Added love_language column to users table';
  ELSE
    RAISE NOTICE 'Love language column already exists';
  END IF;
END $$;

-- Ensure avatar_url column exists (should already exist from main schema)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.users ADD COLUMN avatar_url TEXT;
    RAISE NOTICE 'Added avatar_url column to users table';
  END IF;
END $$;

-- ============================================================================
-- 4. VERIFY SETUP
-- ============================================================================

-- Verify storage bucket exists
SELECT 
  'Storage Bucket' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'profile-pictures') 
    THEN '✓ Created' 
    ELSE '✗ Missing' 
  END as status;

-- Verify storage policies exist
SELECT 
  'Storage Policies' as check_type,
  COUNT(*)::text || ' policies found' as status
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%profile picture%';

-- Verify profile columns exist
SELECT 
  'Profile Columns' as check_type,
  string_agg(column_name, ', ' ORDER BY column_name) as status
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
  AND column_name IN ('location', 'love_language', 'avatar_url', 'partner_email', 'anniversary_date', 'relationship_status');

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- Your profile system is now ready:
-- ✓ Users can upload profile pictures (max 5MB, images only)
-- ✓ Users can update their profile details
-- ✓ Profile pictures are stored securely with RLS policies
-- ✓ All profile fields are available in the users table
-- ============================================================================

