# 🎯 Relationship Goals Backend Setup Guide

This guide will help you set up the complete backend for the Relationship Goals feature with support for unlimited action steps.

---

## 📋 Overview

The Relationship Goals feature allows users to:
- ✅ Create relationship goals with multiple action steps
- ✅ Track progress on each goal
- ✅ Add unlimited action steps to any goal
- ✅ Set reminders for goals
- ✅ Share goals with partner via email
- ✅ Mark goals as completed
- ✅ View goal statistics

---

## 🗄️ Database Schema

### Tables Created:
1. **`relationship_goals`** - Stores the main goal information
2. **`goal_action_steps`** - Stores action steps for each goal (one-to-many relationship)

### Key Features:
- ✅ **Row Level Security (RLS)** enabled on both tables
- ✅ **Automatic timestamps** with `updated_at` triggers
- ✅ **Cascade deletion** - deleting a goal automatically deletes its action steps
- ✅ **Progress tracking** with 0-100% validation
- ✅ **Auto-completion** when status changes to 'completed'

---

## 🚀 Setup Instructions

### Step 1: Run the Database Migration

1. **Open Supabase Dashboard**
   - Go to your project at [https://supabase.com/dashboard](https://supabase.com/dashboard)

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar

3. **Create New Query**
   - Click "New query" button

4. **Copy and Paste SQL**
   - Open the file: `supabase-relationship-goals-schema.sql`
   - Copy **ALL** the contents
   - Paste into the SQL Editor

5. **Run the Migration**
   - Click the "Run" button (or press `Ctrl/Cmd + Enter`)
   - Wait for the success message: ✅ "Success. No rows returned"

6. **Verify Tables Were Created**
   - Go to "Table Editor" in the left sidebar
   - You should see two new tables:
     - `relationship_goals`
     - `goal_action_steps`

---

### Step 2: Verify the Setup

Run this verification query in the SQL Editor:

```sql
-- Check if tables exist
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('relationship_goals', 'goal_action_steps');

-- Check RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('relationship_goals', 'goal_action_steps');
```

**Expected Results:**
```
✅ relationship_goals - 17 columns - RLS: true
✅ goal_action_steps - 7 columns - RLS: true
```

---

## 🎨 Frontend Integration

### The Frontend is Already Set Up! ✨

Your GoalForm component (`src/components/goals/GoalForm.jsx`) already supports:
- ✅ Adding multiple action steps
- ✅ Removing action steps
- ✅ Dynamic "+ Add Step" button
- ✅ Validation and cleaning of empty steps

### Service Functions Available:

The `goalsService.js` provides these functions:

#### Goal Operations:
```javascript
import goalsService from '@/lib/goalsService';

// Get all goals
const goals = await goalsService.getGoals('-created_at');

// Get single goal
const goal = await goalsService.getGoalById(goalId);

// Create goal with action steps
const newGoal = await goalsService.createGoal({
  title: 'Weekly Date Nights',
  description: 'Make time for each other',
  category: 'quality_time',
  target_date: '2025-12-31',
  partner_email: 'partner@example.com',
  action_steps: [
    'Plan date night every Friday',
    'Take turns choosing the activity',
    'Turn off phones during dates'
  ],
  reminder_enabled: true,
  reminder_phone: '555-123-4567',
  reminder_frequency: 'weekly'
});

// Update goal
const updated = await goalsService.updateGoal(goalId, {
  progress: 50,
  action_steps: ['Updated step 1', 'New step 2']
});

// Delete goal
await goalsService.deleteGoal(goalId);

// Update progress
await goalsService.updateGoalProgress(goalId, 75);

// Complete goal
await goalsService.completeGoal(goalId);
```

#### Action Steps Operations:
```javascript
// Get all steps for a goal
const steps = await goalsService.getActionSteps(goalId);

// Toggle step completion
await goalsService.toggleStepCompletion(stepId, true);

// Add new step to existing goal
await goalsService.addActionStep(goalId, 'New action step');

// Delete step
await goalsService.deleteActionStep(stepId);
```

#### Statistics:
```javascript
// Get user's goal statistics
const stats = await goalsService.getGoalStats();
// Returns: { total, completed, in_progress, cancelled, avgProgress }
```

---

## 🧪 Testing the Feature

### Test Case 1: Create Goal with Multiple Steps

1. **Go to Relationship Goals page** in your app
2. **Click "Add New Goal"**
3. **Fill in the form:**
   - Title: "Improve Communication"
   - Description: "Have meaningful conversations daily"
   - Category: Communication
   - Target Date: (any future date)
   - Action Steps:
     - "Have 15-minute check-in every morning"
     - "Practice active listening"
     - "Share one gratitude daily"
     - **Click "+ Add Step"** to add more!
4. **Click "Save Goal"**
5. **Verify:** Goal appears with all action steps

### Test Case 2: Edit Goal and Add More Steps

1. **Click on an existing goal**
2. **Click "Edit" button**
3. **Add more action steps** using "+ Add Step"
4. **Remove a step** using the trash icon
5. **Save changes**
6. **Verify:** Changes are saved correctly

### Test Case 3: Complete Goal

1. **Click on a goal**
2. **Update progress to 100%**
3. **Verify:** Goal moves to "Completed Goals" section
4. **Verify:** `completed_date` is automatically set

### Test Case 4: Delete Goal

1. **Click delete on any goal**
2. **Confirm deletion**
3. **Verify:** Goal and ALL its action steps are deleted

---

## 📊 Database Schema Details

### `relationship_goals` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References `users.id` |
| `title` | TEXT | Goal title (required) |
| `description` | TEXT | Detailed description |
| `category` | TEXT | One of: communication, quality_time, intimacy, personal_growth, financial, family, health, adventure, home, career |
| `status` | TEXT | 'in_progress', 'completed', or 'cancelled' |
| `progress` | INTEGER | 0-100% |
| `target_date` | DATE | Goal deadline |
| `completed_date` | TIMESTAMPTZ | Auto-set when status = 'completed' |
| `partner_email` | TEXT | Optional partner email |
| `shared_with_partner` | BOOLEAN | Whether goal is shared |
| `reminder_enabled` | BOOLEAN | SMS reminders enabled |
| `reminder_phone` | TEXT | Phone for reminders |
| `reminder_frequency` | TEXT | 'daily', 'weekly', or 'biweekly' |
| `last_reminder_sent` | TIMESTAMPTZ | Last reminder timestamp |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Auto-updated on changes |

### `goal_action_steps` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `goal_id` | UUID | References `relationship_goals.id` (CASCADE DELETE) |
| `step_text` | TEXT | The action step description |
| `step_order` | INTEGER | Order of the step (1, 2, 3...) |
| `is_completed` | BOOLEAN | Whether step is done |
| `completed_at` | TIMESTAMPTZ | When step was completed |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Auto-updated on changes |

---

## 🔒 Security Features

### Row Level Security (RLS) Policies:

#### For `relationship_goals`:
- ✅ Users can only view their own goals
- ✅ Users can only insert goals for themselves
- ✅ Users can only update their own goals
- ✅ Users can only delete their own goals

#### For `goal_action_steps`:
- ✅ Users can only view steps for their own goals
- ✅ Users can only add steps to their own goals
- ✅ Users can only update steps on their own goals
- ✅ Users can only delete steps from their own goals

All policies verify ownership through the `relationship_goals.user_id` field.

---

## 🎯 Features Supported

### ✅ Unlimited Action Steps
Users can add as many action steps as they want to each goal. The form has a "+ Add Step" button that allows adding infinite steps.

### ✅ Step Ordering
Action steps are automatically ordered using `step_order` (1, 2, 3, etc.).

### ✅ Cascade Deletion
When a goal is deleted, all its action steps are automatically deleted (no orphaned steps).

### ✅ Progress Tracking
- Progress is stored as 0-100%
- When progress reaches 100%, goal can be auto-completed
- Average progress is calculated across all goals

### ✅ Auto Timestamps
- `created_at` is set automatically when records are created
- `updated_at` is automatically updated whenever a record changes
- `completed_date` is auto-set when status changes to 'completed'

---

## 🛠️ Troubleshooting

### Issue: "Permission denied for table relationship_goals"
**Solution:** Make sure you ran the RLS policies section of the SQL script.

### Issue: "relation 'relationship_goals' does not exist"
**Solution:** Run the entire `supabase-relationship-goals-schema.sql` script again.

### Issue: Action steps not saving
**Solution:** Check browser console for errors. Verify RLS policies are set correctly.

### Issue: Can't see goals in Table Editor
**Solution:** 
1. You're logged in as a different user than expected
2. RLS is hiding data (this is correct behavior!)
3. Use SQL Editor to query: `SELECT * FROM relationship_goals;`

---

## 📈 Next Steps

### Optional Enhancements:

1. **Email Notifications**
   - Set up Supabase Edge Function to send email invites to partners
   - Notify partner when goal is shared

2. **SMS Reminders**
   - Integrate Twilio for SMS reminders
   - Set up cron job to send reminders based on `reminder_frequency`

3. **Goal Templates**
   - Create pre-defined goal templates for common relationship goals
   - Allow users to select from templates

4. **Progress Analytics**
   - Add charts showing progress over time
   - Show trends and insights

5. **Partner Collaboration**
   - Allow partners to view shared goals
   - Enable both partners to update progress

---

## ✅ Setup Complete!

You now have a fully functional Relationship Goals backend with:
- ✅ Database tables with RLS security
- ✅ Support for unlimited action steps per goal
- ✅ Complete service functions for all operations
- ✅ Frontend form ready to use
- ✅ Automatic data validation and timestamps

**Start creating relationship goals and watch your relationship grow! 💕**

