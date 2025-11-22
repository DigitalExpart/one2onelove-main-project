# Regular User Signup - Database Setup

This guide explains how the regular user signup is set up in the database.

## Database Schema

The `users` table supports all user types, including regular users. Here's what gets stored for regular users:

### Required Fields for Regular Users:
- `id` - UUID (from Supabase Auth)
- `email` - User's email address
- `name` - User's full name
- `user_type` - Set to `'regular'` for regular user signups

### Optional Fields for Regular Users:
- `relationship_status` - single, dating, engaged, married, complicated
- `anniversary_date` - Date of anniversary (if applicable)
- `partner_email` - Email of partner (if inviting partner)
- `avatar_url` - Profile picture URL
- `bio` - User bio/description

### Status Fields:
- `is_verified` - Whether account is verified (default: false)
- `is_active` - Whether account is active (default: true)

## Setup Instructions

### If you haven't created the users table yet:
1. Run the complete `supabase-schema.sql` file in your Supabase SQL Editor
2. This will create the table with all necessary fields

### If you already created the users table:
1. Run `supabase-schema-update.sql` to add the new fields
2. This will safely add `user_type`, `is_verified`, and `is_active` columns

## How Regular User Signup Works

1. **User fills out form** with:
   - Full Name
   - Email
   - Password
   - Relationship Status (optional)
   - Anniversary Date (optional)
   - Partner Email (optional)

2. **Supabase Auth** creates the authentication account

3. **User profile** is created in the `users` table with:
   - `user_type = 'regular'`
   - All form data
   - Default status values

4. **User is automatically logged in** and redirected to dashboard

## Testing Regular User Signup

1. Navigate to `/SignUp` page
2. Click "Regular User" card
3. Fill out the form:
   - Enter a test name
   - Use a valid email (you'll receive verification email)
   - Create a password (min 8 characters)
   - Optionally fill relationship details
   - Check the terms checkbox
4. Click "Create Account"
5. Check your Supabase dashboard:
   - **Authentication → Users**: Should show new user
   - **Table Editor → users**: Should show user profile with `user_type = 'regular'`

## Verification

After signup, you can verify the data was saved correctly:

```sql
-- View all regular users
SELECT * FROM public.users WHERE user_type = 'regular';

-- View user with relationship status
SELECT name, email, relationship_status, anniversary_date, partner_email 
FROM public.users 
WHERE user_type = 'regular' 
ORDER BY created_at DESC;
```

## Next Steps

After regular user signup is working:
- ✅ Regular user signup (current)
- 🔄 Email verification flow
- 🔄 Sign in functionality
- 🔄 Password reset
- 🔄 Profile updates
- 🔄 Therapist signup (separate table or extended fields)
- 🔄 Influencer signup (separate table or extended fields)
- 🔄 Professional signup (separate table or extended fields)

