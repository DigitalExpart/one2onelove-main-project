-- Optional Migration: Link Waitlist Users to Accounts
-- This is optional - only run if you want to connect waitlist entries to user accounts
-- Run this AFTER you've created the users table and have some users registered

-- Add a column to link waitlist entries to user accounts (optional)
-- Uncomment and modify based on your waitlist table structure:

-- ALTER TABLE public.waitlist 
-- ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.users(id) ON DELETE SET NULL;

-- Create an index for faster lookups
-- CREATE INDEX IF NOT EXISTS idx_waitlist_user_id ON public.waitlist(user_id);

-- Optional: Function to automatically link waitlist entry when user signs up
-- This assumes your waitlist table has an 'email' column
-- CREATE OR REPLACE FUNCTION link_waitlist_to_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   UPDATE public.waitlist
--   SET user_id = NEW.id
--   WHERE email = NEW.email AND user_id IS NULL;
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER on_user_created_link_waitlist
--   AFTER INSERT ON public.users
--   FOR EACH ROW
--   EXECUTE FUNCTION link_waitlist_to_user();

-- To find waitlist users who have now signed up:
-- SELECT w.*, u.id as user_id, u.name, u.created_at as account_created
-- FROM public.waitlist w
-- INNER JOIN public.users u ON w.email = u.email;

