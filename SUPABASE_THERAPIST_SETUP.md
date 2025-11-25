# Therapist Signup - Database Setup

This guide explains how to set up the therapist signup functionality with Supabase.

## Database Schema

Therapist signup uses two tables:
1. **`users`** - Base user account (with `user_type = 'therapist'`)
2. **`therapist_profiles`** - Detailed therapist information

## Setup Instructions

### Step 1: Run the Therapist Schema

1. Go to your Supabase SQL Editor
2. Run `supabase-therapist-schema.sql` to create the `therapist_profiles` table
3. Verify the table was created in **Table Editor**

### Step 2: Create Storage Bucket for Photos

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name: `therapist-photos`
4. Make it **Public** (or set up proper RLS policies)
5. Click **Create bucket**

### Step 3: Set Up Storage Policies (Optional but Recommended)

If you made the bucket private, add RLS policies:

```sql
-- Allow therapists to upload their own photos
CREATE POLICY "Therapists can upload own photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'therapist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow therapists to update their own photos
CREATE POLICY "Therapists can update own photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'therapist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## What Gets Stored

### In `users` table:
- `id` - UUID (from Supabase Auth)
- `email` - Therapist's email
- `name` - Full name (first + last)
- `user_type` - Set to `'therapist'`

### In `therapist_profiles` table:
- **Basic Info**: `first_name`, `last_name`, `phone`, `profile_photo_url`
- **Professional Info**: 
  - `licensed_countries` (array)
  - `licensed_states` (array)
  - `therapy_types` (array)
  - `specializations` (array)
  - `certifications` (array)
  - `years_experience` (integer)
  - `consultation_fee` (decimal)
  - `professional_bio` (text)
  - `license_number` (text)
- **Social Media**: `social_media_platforms` (JSONB object)
- **Verification**: `email_verified`, `phone_verified`
- **Status**: `status` (pending/approved/rejected/suspended)

## Application Flow

1. **User fills out therapist form** with all required information
2. **Email and phone verification** (currently using mock codes)
3. **Photo upload** (optional) to Supabase Storage
4. **User account created** in Supabase Auth
5. **User profile created** in `users` table with `user_type = 'therapist'`
6. **Therapist profile created** in `therapist_profiles` table with `status = 'pending'`
7. **Application submitted** - therapist receives confirmation

## Status Workflow

- **pending** - Initial status when application is submitted
- **approved** - Admin has reviewed and approved the therapist
- **rejected** - Application was rejected (with `rejection_reason`)
- **suspended** - Previously approved but now suspended

## Testing Therapist Signup

1. Navigate to `/SignUp` page
2. Click "Therapist" card
3. Fill out the form:
   - Basic information (name, email, phone)
   - Verify email and phone (use code: `123456`)
   - Upload profile photo (optional)
   - Professional information
   - Social media links (optional)
4. Submit the application
5. Check Supabase dashboard:
   - **Authentication → Users**: Should show new therapist user
   - **Table Editor → users**: Should show user with `user_type = 'therapist'`
   - **Table Editor → therapist_profiles**: Should show therapist profile with `status = 'pending'`

## Querying Therapist Data

```sql
-- Get all pending therapist applications
SELECT 
  u.email,
  u.name,
  tp.first_name,
  tp.last_name,
  tp.status,
  tp.years_experience,
  tp.consultation_fee,
  tp.created_at
FROM public.users u
INNER JOIN public.therapist_profiles tp ON u.id = tp.user_id
WHERE u.user_type = 'therapist' AND tp.status = 'pending'
ORDER BY tp.created_at DESC;

-- Get approved therapists by specialization
SELECT 
  u.name,
  tp.specializations,
  tp.therapy_types,
  tp.consultation_fee
FROM public.users u
INNER JOIN public.therapist_profiles tp ON u.id = tp.user_id
WHERE tp.status = 'approved' 
  AND 'Anxiety' = ANY(tp.specializations);
```

## Next Steps

- ✅ Therapist signup form
- ✅ Database schema
- 🔄 Admin approval workflow
- 🔄 Email notifications for approval/rejection
- 🔄 Therapist dashboard
- 🔄 Search/filter therapists by specialization
- 🔄 Booking system for consultations

