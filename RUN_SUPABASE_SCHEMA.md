# How to Run Supabase Schema

This guide explains how to set up all database tables in your Supabase project.

## Option 1: Run All Tables at Once (Recommended)

1. **Open Supabase SQL Editor**
   - Go to your Supabase dashboard: https://supabase.com/dashboard
   - Select your project
   - Click on **SQL Editor** in the left sidebar

2. **Create a New Query**
   - Click **New query** button
   - Copy the entire contents of `supabase-complete-schema.sql`
   - Paste it into the SQL Editor

3. **Run the Query**
   - Click **Run** (or press `Ctrl + Enter`)
   - Wait for "Success" message

4. **Verify Tables Created**
   - Go to **Table Editor** in the left sidebar
   - You should see three tables:
     - `users`
     - `therapist_profiles`
     - `influencer_profiles`

## Option 2: Run Tables Individually

If you prefer to run tables one at a time:

### Step 1: Users Table
1. Open SQL Editor
2. Copy and run `supabase-schema.sql`
3. Verify `users` table exists

### Step 2: Therapist Profiles Table
1. Open SQL Editor
2. Copy and run `supabase-therapist-schema.sql`
3. Verify `therapist_profiles` table exists

### Step 3: Influencer Profiles Table
1. Open SQL Editor
2. Copy and run `supabase-influencer-schema.sql`
3. Verify `influencer_profiles` table exists

## What Each Table Does

### 1. `users` Table
- **Purpose**: Base user accounts for all user types
- **User Types**: regular, therapist, influencer, professional
- **Key Fields**: email, name, user_type, relationship_status (for regular users)
- **Links to**: Supabase Auth (`auth.users`)

### 2. `therapist_profiles` Table
- **Purpose**: Detailed information for therapist accounts
- **Key Fields**: 
  - Professional info (licenses, specializations, certifications)
  - Consultation fee
  - Social media links
  - Application status (pending/approved/rejected)
- **Links to**: `users` table via `user_id`

### 3. `influencer_profiles` Table
- **Purpose**: Detailed information for influencer accounts
- **Key Fields**:
  - Follower count
  - Platform links (Instagram, TikTok, YouTube, etc.)
  - Content categories
  - Collaboration types
  - Bio (min 100 characters)
- **Links to**: `users` table via `user_id`

## Storage Buckets Setup

After running the schema, create storage buckets for photos:

### Therapist Photos Bucket
1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name: `therapist-photos`
4. Make it **Public** (or set up RLS policies)
5. Click **Create**

### Influencer Photos Bucket
1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name: `influencer-photos`
4. Make it **Public** (or set up RLS policies)
5. Click **Create**

## Verification Queries

After running the schema, you can verify everything is set up correctly:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'therapist_profiles', 'influencer_profiles');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'therapist_profiles', 'influencer_profiles');

-- Check indexes exist
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'therapist_profiles', 'influencer_profiles');
```

## Troubleshooting

### Error: "relation already exists"
- The table already exists. You can either:
  - Drop the existing table and recreate it
  - Use `CREATE TABLE IF NOT EXISTS` (already included in the schema)

### Error: "permission denied"
- Make sure you're running the query as the postgres role
- Check that you have the correct permissions in your Supabase project

### Error: "function does not exist"
- The `update_updated_at_column()` function should be created automatically
- If it fails, make sure you run the function definition before the triggers

## Next Steps

After running the schema:
1. ✅ All tables created
2. ✅ RLS policies enabled
3. ✅ Indexes created
4. 🔄 Create storage buckets for photos
5. 🔄 Test signup flows
6. 🔄 Set up admin approval workflows

## Need Help?

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify your database connection
3. Make sure you're using the correct project
4. Check that all required extensions are enabled

