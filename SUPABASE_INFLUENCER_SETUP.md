# Influencer Signup - Database Setup

This guide explains how to set up the influencer signup functionality with Supabase.

## Database Schema

Influencer signup uses two tables:
1. **`users`** - Base user account (with `user_type = 'influencer'`)
2. **`influencer_profiles`** - Detailed influencer information

## Setup Instructions

### Step 1: Run the Influencer Schema

1. Go to your Supabase SQL Editor
2. Run `supabase-influencer-schema.sql` to create the `influencer_profiles` table
3. Verify the table was created in **Table Editor**

### Step 2: Create Storage Bucket for Photos

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name: `influencer-photos`
4. Make it **Public** (or set up proper RLS policies)
5. Click **Create bucket**

## Required vs Optional Fields

### Required Fields (marked with *):
- **First Name** - Required
- **Last Name** - Required
- **Email Address** - Required (must be verified)
- **Phone Number** - Required (must be verified)
- **Total Follower Count** - Required (integer)
- **Social Media Links** - Required (at least one platform: Instagram, TikTok, YouTube, or Other)
- **Content Categories** - Required (comma-separated list)
- **Collaboration Types** - Required (comma-separated list)
- **Bio** - Required (minimum 100 characters)

### Optional Fields:
- **Profile Photo** - Optional
- **Media Kit URL** - Optional

## What Gets Stored

### In `users` table:
- `id` - UUID (from Supabase Auth)
- `email` - Influencer's email
- `name` - Full name (first + last)
- `user_type` - Set to `'influencer'`

### In `influencer_profiles` table:
- **Basic Info**: `first_name`, `last_name`, `phone`, `profile_photo_url`
- **Influencer Info**:
  - `total_follower_count` (integer) - Combined followers across all platforms
  - `platform_links` (JSONB) - `{instagram, tiktok, youtube, other}`
  - `content_categories` (array) - Categories of content created
  - `collaboration_types` (array) - Types of collaborations open to
  - `bio` (text) - Influencer bio (min 100 characters)
- **Optional**: `media_kit_url` (text)
- **Verification**: `email_verified`, `phone_verified`
- **Status**: `status` (pending/approved/rejected/suspended)

## Application Flow

1. **User fills out influencer form** with all required information
2. **Email and phone verification** (currently using mock codes: `123456`)
3. **Photo upload** (optional) to Supabase Storage
4. **User account created** in Supabase Auth
5. **User profile created** in `users` table with `user_type = 'influencer'`
6. **Influencer profile created** in `influencer_profiles` table with `status = 'pending'`
7. **Application submitted** - influencer receives confirmation

## Status Workflow

- **pending** - Initial status when application is submitted
- **approved** - Admin has reviewed and approved the influencer
- **rejected** - Application was rejected (with `rejection_reason`)
- **suspended** - Previously approved but now suspended

## Testing Influencer Signup

1. Navigate to `/SignUp` page
2. Click "Influencer" card
3. Fill out the form:
   - Basic information (name, email, phone) - **All Required**
   - Verify email and phone (use code: `123456`)
   - Upload profile photo (optional)
   - **Total Follower Count** - Required
   - **Social Media Links** - At least one required (Instagram, TikTok, YouTube, or Other)
   - **Content Categories** - Required (comma-separated)
   - **Collaboration Types** - Required (comma-separated)
   - **Media Kit URL** - Optional
   - **Bio** - Required (min 100 characters)
4. Submit the application
5. Check Supabase dashboard:
   - **Authentication → Users**: Should show new influencer user
   - **Table Editor → users**: Should show user with `user_type = 'influencer'`
   - **Table Editor → influencer_profiles**: Should show influencer profile with `status = 'pending'`

## Querying Influencer Data

```sql
-- Get all pending influencer applications
SELECT 
  u.email,
  u.name,
  ip.first_name,
  ip.last_name,
  ip.status,
  ip.total_follower_count,
  ip.content_categories,
  ip.created_at
FROM public.users u
INNER JOIN public.influencer_profiles ip ON u.id = ip.user_id
WHERE u.user_type = 'influencer' AND ip.status = 'pending'
ORDER BY ip.created_at DESC;

-- Get approved influencers by content category
SELECT 
  u.name,
  ip.content_categories,
  ip.collaboration_types,
  ip.total_follower_count
FROM public.users u
INNER JOIN public.influencer_profiles ip ON u.id = ip.user_id
WHERE ip.status = 'approved' 
  AND 'Relationships' = ANY(ip.content_categories);
```

## Validation Rules

- **Bio**: Must be at least 100 characters
- **Platform Links**: At least one platform link is required
- **Content Categories**: At least one category is required
- **Collaboration Types**: At least one type is required
- **Follower Count**: Must be a positive integer

## Next Steps

- ✅ Influencer signup form with proper required/optional fields
- ✅ Database schema
- 🔄 Admin approval workflow
- 🔄 Email notifications for approval/rejection
- 🔄 Influencer dashboard
- 🔄 Search/filter influencers by category
- 🔄 Collaboration management system

