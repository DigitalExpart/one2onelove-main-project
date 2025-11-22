-- One 2 One Love - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the necessary tables
-- This schema works alongside your existing waitlist table

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
-- Note: This table is separate from your waitlist table
-- Supports all user types: regular, therapist, influencer, professional
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  user_type TEXT NOT NULL DEFAULT 'regular' CHECK (user_type IN ('regular', 'therapist', 'influencer', 'professional')),
  -- Regular user fields
  relationship_status TEXT CHECK (relationship_status IN ('single', 'dating', 'engaged', 'married', 'complicated')),
  anniversary_date DATE,
  partner_email TEXT,
  -- Common fields
  avatar_url TEXT,
  bio TEXT,
  -- Status fields
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_relationship_status ON public.users(relationship_status);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- Comments for documentation
COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth.users - supports regular, therapist, influencer, and professional user types';
COMMENT ON COLUMN public.users.id IS 'References auth.users(id)';
COMMENT ON COLUMN public.users.user_type IS 'Type of user: regular, therapist, influencer, professional';
COMMENT ON COLUMN public.users.relationship_status IS 'Current relationship status: single, dating, engaged, married, complicated (for regular users)';
COMMENT ON COLUMN public.users.is_verified IS 'Whether the user account has been verified';
COMMENT ON COLUMN public.users.is_active IS 'Whether the user account is active';

