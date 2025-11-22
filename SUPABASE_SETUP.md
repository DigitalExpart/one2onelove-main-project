# Supabase Setup Guide

This guide will help you set up Supabase for the One 2 One Love backend.

## Step 1: Use Your Existing Supabase Project

Since you already have a Supabase project with a waitlist table, we'll use the same project. This is perfectly fine - we'll just add new tables alongside your existing ones.

**Benefits of using the same project:**
- Single database for all your data
- Shared authentication system
- Easier to manage
- Can link waitlist users to actual accounts later

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Important**: Add `.env` to your `.gitignore` file to keep your keys secure!

## Step 4: Create the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` from this project
4. Click "Run" to execute the SQL
5. Verify the tables were created by going to **Table Editor** → you should see:
   - Your existing `waitlist` table (or whatever you named it)
   - A new `users` table for the One 2 One Love app

**Note:** The `users` table is separate from your waitlist. If you want to link waitlist users to accounts later, you can add a migration to connect them by email.

## Step 5: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under "Site URL", add your development URL: `http://localhost:5173`
3. Under "Redirect URLs", add:
   - `http://localhost:5173/**`
   - Your production URL when ready
4. (Optional) Configure email templates under **Authentication** → **Email Templates**

## Step 6: Install Dependencies

Run the following command in your project root:

```bash
npm install @supabase/supabase-js
```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the sign up page
3. Try creating a new account
4. Check your Supabase dashboard:
   - **Authentication** → **Users** should show your new user
   - **Table Editor** → **users** should show the user profile

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env` file has the correct values
- Make sure you're using the `anon` key, not the `service_role` key
- Restart your dev server after changing `.env` files

### "Table does not exist" error
- Make sure you ran the SQL schema in Step 4
- Check that the table is in the `public` schema

### "Email already registered" error
- This is expected if you try to sign up with the same email twice
- You can delete test users from **Authentication** → **Users** in Supabase dashboard

### Email verification not working
- Check **Authentication** → **Settings** → **Email Auth**
- Make sure "Enable email confirmations" is configured as needed
- Check your email spam folder

## Optional: Link Waitlist to User Accounts

If you want to connect your existing waitlist entries to user accounts when they sign up:

1. Check your waitlist table structure
2. Review `supabase-migration-waitlist-link.sql`
3. Modify the SQL to match your waitlist table column names
4. Run the migration in your Supabase SQL Editor

This will allow you to:
- See which waitlist users have signed up
- Track conversion from waitlist to active users
- Send targeted messages to waitlist users who haven't signed up yet

## Next Steps

After setting up Supabase:

1. ✅ Sign up functionality is now working
2. 🔄 Sign in functionality (update SignIn.jsx)
3. 🔄 Password reset functionality
4. 🔄 Email verification flow
5. 🔄 User profile updates
6. 🔄 Link waitlist entries to user accounts (optional)
7. 🔄 Additional tables (messages, love notes, etc.)

## Security Notes

- Never commit your `.env` file to git
- The `anon` key is safe to use in frontend code (it's public)
- Row Level Security (RLS) policies are set up to protect user data
- Always use the `anon` key in frontend, never the `service_role` key

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

