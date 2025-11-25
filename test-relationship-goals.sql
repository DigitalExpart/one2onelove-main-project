-- ============================================================================
-- RELATIONSHIP GOALS - TEST QUERIES
-- ============================================================================
-- Use these queries to test your Relationship Goals setup
-- Run in Supabase SQL Editor
-- ============================================================================

-- 1. Verify tables exist
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name AND table_schema = 'public') as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('relationship_goals', 'goal_action_steps')
ORDER BY table_name;

-- Expected: 2 rows
-- relationship_goals: 17 columns
-- goal_action_steps: 7 columns

-- 2. Verify RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('relationship_goals', 'goal_action_steps')
ORDER BY tablename;

-- Expected: Both tables should have rls_enabled = true

-- 3. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as command,
  CASE 
    WHEN qual IS NOT NULL THEN 'USING'
    WHEN with_check IS NOT NULL THEN 'WITH CHECK'
    ELSE 'NO QUAL'
  END as policy_type
FROM pg_policies
WHERE tablename IN ('relationship_goals', 'goal_action_steps')
ORDER BY tablename, policyname;

-- Expected: 4 policies per table (SELECT, INSERT, UPDATE, DELETE)

-- 4. Check triggers
SELECT 
  trigger_name,
  event_object_table as table_name,
  action_timing,
  event_manipulation as event
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('relationship_goals', 'goal_action_steps')
ORDER BY event_object_table, trigger_name;

-- Expected: 
-- update_relationship_goals_updated_at (BEFORE UPDATE)
-- set_goal_completed_date (BEFORE UPDATE)
-- update_goal_action_steps_updated_at (BEFORE UPDATE)

-- 5. Check indexes
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('relationship_goals', 'goal_action_steps')
ORDER BY tablename, indexname;

-- Expected: Multiple indexes for performance optimization

-- 6. Test view exists
SELECT COUNT(*) as view_exists
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name = 'goals_with_steps';

-- Expected: 1 (view exists)

-- ============================================================================
-- SAMPLE DATA INSERTION (for testing)
-- ============================================================================

-- Insert a test goal (you must be authenticated)
-- NOTE: Replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users

/*
INSERT INTO public.relationship_goals (
  user_id,
  title,
  description,
  category,
  target_date,
  partner_email,
  progress,
  status
) VALUES (
  'YOUR_USER_ID_HERE',  -- Get this from: SELECT id FROM auth.users WHERE email = 'your@email.com';
  'Weekly Date Nights',
  'Make time for each other every week',
  'quality_time',
  '2025-12-31',
  'partner@example.com',
  0,
  'in_progress'
) RETURNING *;
*/

-- Insert action steps for the goal
-- NOTE: Replace 'YOUR_GOAL_ID_HERE' with the ID returned from the previous query

/*
INSERT INTO public.goal_action_steps (goal_id, step_text, step_order) VALUES
('YOUR_GOAL_ID_HERE', 'Plan date night every Friday', 1),
('YOUR_GOAL_ID_HERE', 'Take turns choosing the activity', 2),
('YOUR_GOAL_ID_HERE', 'Turn off phones during dates', 3),
('YOUR_GOAL_ID_HERE', 'Try one new restaurant per month', 4)
RETURNING *;
*/

-- ============================================================================
-- QUERY YOUR GOALS
-- ============================================================================

-- Get all your goals with action steps (using the view)
/*
SELECT * FROM public.goals_with_steps
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
*/

-- Get goals with their step count
/*
SELECT 
  g.id,
  g.title,
  g.category,
  g.status,
  g.progress,
  g.target_date,
  COUNT(s.id) as step_count,
  COUNT(s.id) FILTER (WHERE s.is_completed = true) as completed_steps
FROM public.relationship_goals g
LEFT JOIN public.goal_action_steps s ON g.id = s.goal_id
WHERE g.user_id = auth.uid()
GROUP BY g.id
ORDER BY g.created_at DESC;
*/

-- ============================================================================
-- CLEANUP (if needed)
-- ============================================================================

-- Delete all test goals and steps
/*
DELETE FROM public.relationship_goals 
WHERE user_id = auth.uid()
  AND title LIKE '%Test%';
*/

-- ============================================================================
-- PERFORMANCE TEST
-- ============================================================================

-- Check query performance for goals with many action steps
/*
EXPLAIN ANALYZE
SELECT g.*, json_agg(s ORDER BY s.step_order) as steps
FROM public.relationship_goals g
LEFT JOIN public.goal_action_steps s ON g.id = s.goal_id
WHERE g.user_id = auth.uid()
GROUP BY g.id;
*/

