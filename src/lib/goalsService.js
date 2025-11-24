import { supabase } from './supabase';

/**
 * Relationship Goals Service
 * Handles all operations for relationship goals and their action steps
 */

// ============================================================================
// GOAL CRUD OPERATIONS
// ============================================================================

/**
 * Get all goals for the current user
 * @param {string} orderBy - Field to order by (e.g., '-created_at')
 * @returns {Promise<Array>} Array of goals with their action steps
 */
export async function getGoals(orderBy = '-created_at') {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Parse orderBy (e.g., '-created_at' means DESC)
    const isDescending = orderBy.startsWith('-');
    const field = isDescending ? orderBy.substring(1) : orderBy;
    const ascending = !isDescending;

    // Fetch goals
    const { data: goals, error: goalsError } = await supabase
      .from('relationship_goals')
      .select('*')
      .eq('user_id', user.id)
      .order(field, { ascending });

    if (goalsError) throw goalsError;

    // Fetch action steps for each goal
    const goalsWithSteps = await Promise.all(
      goals.map(async (goal) => {
        const { data: steps, error: stepsError } = await supabase
          .from('goal_action_steps')
          .select('*')
          .eq('goal_id', goal.id)
          .order('step_order', { ascending: true });

        if (stepsError) {
          console.error('Error fetching steps:', stepsError);
          return { ...goal, action_steps: [] };
        }

        return {
          ...goal,
          action_steps: steps.map(step => step.step_text),
          action_steps_details: steps // Keep full step details for editing
        };
      })
    );

    return goalsWithSteps;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
}

/**
 * Get a single goal by ID
 * @param {string} goalId - The goal ID
 * @returns {Promise<Object>} The goal with its action steps
 */
export async function getGoalById(goalId) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Fetch goal
    const { data: goal, error: goalError } = await supabase
      .from('relationship_goals')
      .select('*')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();

    if (goalError) throw goalError;

    // Fetch action steps
    const { data: steps, error: stepsError } = await supabase
      .from('goal_action_steps')
      .select('*')
      .eq('goal_id', goalId)
      .order('step_order', { ascending: true });

    if (stepsError) throw stepsError;

    return {
      ...goal,
      action_steps: steps.map(step => step.step_text),
      action_steps_details: steps
    };
  } catch (error) {
    console.error('Error fetching goal:', error);
    throw error;
  }
}

/**
 * Create a new goal with action steps
 * @param {Object} goalData - The goal data
 * @returns {Promise<Object>} The created goal
 */
export async function createGoal(goalData) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Extract action steps from goalData
    const { action_steps, ...goalFields } = goalData;

    // Create the goal
    const { data: goal, error: goalError } = await supabase
      .from('relationship_goals')
      .insert({
        ...goalFields,
        user_id: user.id,
      })
      .select()
      .single();

    if (goalError) throw goalError;

    // Create action steps if provided
    if (action_steps && action_steps.length > 0) {
      const stepsToInsert = action_steps.map((stepText, index) => ({
        goal_id: goal.id,
        step_text: stepText,
        step_order: index + 1,
        is_completed: false
      }));

      const { error: stepsError } = await supabase
        .from('goal_action_steps')
        .insert(stepsToInsert);

      if (stepsError) {
        // If steps failed, delete the goal to maintain consistency
        await supabase.from('relationship_goals').delete().eq('id', goal.id);
        throw stepsError;
      }
    }

    // Return the complete goal with steps
    return await getGoalById(goal.id);
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
}

/**
 * Update a goal and its action steps
 * @param {string} goalId - The goal ID
 * @param {Object} goalData - The updated goal data
 * @returns {Promise<Object>} The updated goal
 */
export async function updateGoal(goalId, goalData) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Extract action steps from goalData
    const { action_steps, action_steps_details, ...goalFields } = goalData;

    // Update the goal
    const { data: goal, error: goalError } = await supabase
      .from('relationship_goals')
      .update(goalFields)
      .eq('id', goalId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (goalError) throw goalError;

    // Update action steps if provided
    if (action_steps) {
      // Delete existing steps
      await supabase
        .from('goal_action_steps')
        .delete()
        .eq('goal_id', goalId);

      // Insert new steps
      if (action_steps.length > 0) {
        const stepsToInsert = action_steps.map((stepText, index) => ({
          goal_id: goalId,
          step_text: stepText,
          step_order: index + 1,
          is_completed: false
        }));

        const { error: stepsError } = await supabase
          .from('goal_action_steps')
          .insert(stepsToInsert);

        if (stepsError) throw stepsError;
      }
    }

    // Return the complete goal with steps
    return await getGoalById(goalId);
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
}

/**
 * Delete a goal (action steps will be deleted automatically via CASCADE)
 * @param {string} goalId - The goal ID
 * @returns {Promise<void>}
 */
export async function deleteGoal(goalId) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('relationship_goals')
      .delete()
      .eq('id', goalId)
      .eq('user_id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
}

/**
 * Update goal progress
 * @param {string} goalId - The goal ID
 * @param {number} progress - Progress percentage (0-100)
 * @returns {Promise<Object>} The updated goal
 */
export async function updateGoalProgress(goalId, progress) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Ensure progress is between 0 and 100
    const validProgress = Math.max(0, Math.min(100, progress));

    // Auto-complete if progress reaches 100%
    const updates = {
      progress: validProgress
    };

    if (validProgress === 100) {
      updates.status = 'completed';
    }

    const { data: goal, error } = await supabase
      .from('relationship_goals')
      .update(updates)
      .eq('id', goalId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return await getGoalById(goalId);
  } catch (error) {
    console.error('Error updating goal progress:', error);
    throw error;
  }
}

/**
 * Mark goal as completed
 * @param {string} goalId - The goal ID
 * @returns {Promise<Object>} The updated goal
 */
export async function completeGoal(goalId) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: goal, error } = await supabase
      .from('relationship_goals')
      .update({
        status: 'completed',
        progress: 100,
      })
      .eq('id', goalId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return await getGoalById(goalId);
  } catch (error) {
    console.error('Error completing goal:', error);
    throw error;
  }
}

// ============================================================================
// ACTION STEPS OPERATIONS
// ============================================================================

/**
 * Get all action steps for a goal
 * @param {string} goalId - The goal ID
 * @returns {Promise<Array>} Array of action steps
 */
export async function getActionSteps(goalId) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Verify user owns this goal
    const { data: goal, error: goalError } = await supabase
      .from('relationship_goals')
      .select('id')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();

    if (goalError) throw goalError;

    // Fetch action steps
    const { data: steps, error: stepsError } = await supabase
      .from('goal_action_steps')
      .select('*')
      .eq('goal_id', goalId)
      .order('step_order', { ascending: true });

    if (stepsError) throw stepsError;

    return steps;
  } catch (error) {
    console.error('Error fetching action steps:', error);
    throw error;
  }
}

/**
 * Toggle action step completion status
 * @param {string} stepId - The step ID
 * @param {boolean} isCompleted - The completion status
 * @returns {Promise<Object>} The updated step
 */
export async function toggleStepCompletion(stepId, isCompleted) {
  try {
    const { data: step, error } = await supabase
      .from('goal_action_steps')
      .update({
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null
      })
      .eq('id', stepId)
      .select()
      .single();

    if (error) throw error;

    return step;
  } catch (error) {
    console.error('Error toggling step completion:', error);
    throw error;
  }
}

/**
 * Add a new action step to an existing goal
 * @param {string} goalId - The goal ID
 * @param {string} stepText - The step text
 * @returns {Promise<Object>} The created step
 */
export async function addActionStep(goalId, stepText) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Verify user owns this goal
    const { data: goal, error: goalError } = await supabase
      .from('relationship_goals')
      .select('id')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();

    if (goalError) throw goalError;

    // Get the highest step_order
    const { data: existingSteps, error: stepsError } = await supabase
      .from('goal_action_steps')
      .select('step_order')
      .eq('goal_id', goalId)
      .order('step_order', { ascending: false })
      .limit(1);

    if (stepsError) throw stepsError;

    const nextOrder = existingSteps.length > 0 ? existingSteps[0].step_order + 1 : 1;

    // Create the new step
    const { data: step, error: insertError } = await supabase
      .from('goal_action_steps')
      .insert({
        goal_id: goalId,
        step_text: stepText,
        step_order: nextOrder,
        is_completed: false
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return step;
  } catch (error) {
    console.error('Error adding action step:', error);
    throw error;
  }
}

/**
 * Delete an action step
 * @param {string} stepId - The step ID
 * @returns {Promise<void>}
 */
export async function deleteActionStep(stepId) {
  try {
    const { error } = await supabase
      .from('goal_action_steps')
      .delete()
      .eq('id', stepId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting action step:', error);
    throw error;
  }
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Get goal statistics for the current user
 * @returns {Promise<Object>} Statistics object
 */
export async function getGoalStats() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: goals, error } = await supabase
      .from('relationship_goals')
      .select('status, progress')
      .eq('user_id', user.id);

    if (error) throw error;

    const stats = {
      total: goals.length,
      completed: goals.filter(g => g.status === 'completed').length,
      in_progress: goals.filter(g => g.status === 'in_progress').length,
      cancelled: goals.filter(g => g.status === 'cancelled').length,
      avgProgress: goals.length > 0 
        ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
        : 0
    };

    return stats;
  } catch (error) {
    console.error('Error fetching goal stats:', error);
    throw error;
  }
}

export default {
  // Goal operations
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress,
  completeGoal,
  
  // Action steps operations
  getActionSteps,
  toggleStepCompletion,
  addActionStep,
  deleteActionStep,
  
  // Statistics
  getGoalStats
};

