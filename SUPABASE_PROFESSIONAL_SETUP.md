# Professional Signup - Database Setup

This guide explains how to set up the professional signup functionality with Supabase.

## Database Schema

Professional signup uses two tables:
1. **`users`** - Base user account (with `user_type = 'professional'`)
2. **`professional_profiles`** - Detailed professional information

## Setup Instructions

### Step 1: Run the Professional Schema

1. Go to your Supabase SQL Editor
2. Run `supabase-professional-schema.sql` to create the `professional_profiles` table
3. Or run the complete `supabase-complete-schema.sql` which includes all tables
4. Verify the table was created in **Table Editor**

### Step 2: Create Storage Bucket for Photos

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name: `professional-photos`
4. Make it **Public** (or set up proper RLS policies)
5. Click **Create bucket**

## Required vs Optional Fields

### Required Fields (marked with *):
- **First Name** - Required
- **Last Name** - Required
- **Email Address** - Required (must be verified)
- **Phone Number** - Required (must be verified)
- **Practice/Organization Name** - Required
- **Practice Type** - Required (dropdown selection)
- **Services You Offer** - Required (max 500 characters)
- **Professional Bio** - Required (100-1000 characters)

### Optional Fields:
- **Profile Photo** - Optional
- **Website URL** - Optional

## What Gets Stored

### In `users` table:
- `id` - UUID (from Supabase Auth)
- `email` - Professional's email
- `name` - Full name (first + last)
- `user_type` - Set to `'professional'`

### In `professional_profiles` table:
- **Basic Info**: `first_name`, `last_name`, `phone`, `profile_photo_url`
- **Professional Info**:
  - `organization_name` (text) - Name of practice/organization
  - `practice_type` (text) - Type of practice (e.g., Private Practice, Coaching Business)
  - `service_description` (text) - Services offered (max 500 characters)
  - `professional_bio` (text) - Professional bio (100-1000 characters)
- **Optional**: `website_url` (text)
- **Verification**: `email_verified`, `phone_verified`
- **Status**: `status` (pending/approved/rejected/suspended)

## Application Flow

1. **User fills out professional form** with all required information
2. **Email and phone verification** (currently using mock codes: `123456`)
3. **Photo upload** (optional) to Supabase Storage
4. **User account created** in Supabase Auth (but account is inactive)
5. **User profile created** in `users` table with `user_type = 'professional'`
6. **Professional profile created** in `professional_profiles` table with `status = 'pending'`
7. **Application submitted** - professional receives confirmation
8. **Admin reviews application** and approves/rejects
9. **Account becomes active** only after admin approval

## Status Workflow

- **pending** - Initial status when application is submitted (account is inactive)
- **approved** - Admin has reviewed and approved the professional (account becomes active)
- **rejected** - Application was rejected (with `rejection_reason`)
- **suspended** - Previously approved but now suspended

## Admin Approval Process

When a professional applies:
1. Application is created with `status = 'pending'`
2. Admin receives notification (to be implemented)
3. Admin reviews application in admin dashboard
4. Admin approves or rejects:
   - **Approve**: Set `status = 'approved'`, account becomes active
   - **Reject**: Set `status = 'rejected'` with `rejection_reason`

## Testing Professional Signup

1. Navigate to `/SignUp` page
2. Click "Professional" card
3. Fill out the form:
   - Basic information (name, email, phone) - **All Required**
   - Verify email and phone (use code: `123456`)
   - Upload profile photo (optional)
   - **Practice/Organization Name** - Required
   - **Practice Type** - Required (select from dropdown)
   - **Website URL** - Optional
   - **Services You Offer** - Required (max 500 characters)
   - **Professional Bio** - Required (100-1000 characters)
4. Click "Submit Application"
5. Check Supabase dashboard:
   - **Authentication → Users**: Should show new professional user
   - **Table Editor → users**: Should show user with `user_type = 'professional'`
   - **Table Editor → professional_profiles**: Should show professional profile with `status = 'pending'`

## Querying Professional Data

```sql
-- Get all pending professional applications
SELECT 
  u.email,
  u.name,
  pp.first_name,
  pp.last_name,
  pp.organization_name,
  pp.practice_type,
  pp.status,
  pp.created_at
FROM public.users u
INNER JOIN public.professional_profiles pp ON u.id = pp.user_id
WHERE u.user_type = 'professional' AND pp.status = 'pending'
ORDER BY pp.created_at DESC;

-- Get approved professionals by practice type
SELECT 
  u.name,
  pp.organization_name,
  pp.practice_type,
  pp.website_url
FROM public.users u
INNER JOIN public.professional_profiles pp ON u.id = pp.user_id
WHERE pp.status = 'approved' 
  AND pp.practice_type = 'coaching_business';
```

## Validation Rules

- **Professional Bio**: Must be between 100 and 1000 characters
- **Service Description**: Must be 500 characters or less
- **Practice Type**: Must be selected from dropdown
- **Organization Name**: Required, cannot be empty

## Next Steps

- ✅ Professional signup form with proper required/optional fields
- ✅ Database schema
- ✅ Application submission (status: pending)
- 🔄 Admin approval workflow (to be implemented)
- 🔄 Email notifications for approval/rejection
- 🔄 Professional dashboard
- 🔄 Admin dashboard for reviewing applications

