import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These should be set in your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (!error) return 'An unknown error occurred';
  
  // Common Supabase error messages
  if (error.message) {
    return error.message;
  }
  
  if (error.code) {
    switch (error.code) {
      case '23505': // Unique violation
        return 'This email is already registered';
      case '23503': // Foreign key violation
        return 'Invalid reference data';
      case 'PGRST116': // Not found
        return 'Resource not found';
      default:
        return error.message || 'An error occurred';
    }
  }
  
  return 'An error occurred';
};

