import { supabase, handleSupabaseError } from './supabase';

/**
 * Create a professional profile
 * This should be called after creating the user account in AuthContext
 */
export const createProfessionalProfile = async (userId, professionalData) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      organizationName,
      practiceType,
      serviceDescription,
      websiteUrl,
      professionalBio,
      profilePhotoUrl,
      emailVerified,
      phoneVerified,
    } = professionalData;

    // Validate bio length
    if (!professionalBio || professionalBio.length < 100) {
      return { success: false, error: 'Professional bio must be at least 100 characters' };
    }

    if (professionalBio.length > 1000) {
      return { success: false, error: 'Professional bio must be 1000 characters or less' };
    }

    // Validate service description length
    if (serviceDescription && serviceDescription.length > 500) {
      return { success: false, error: 'Service description must be 500 characters or less' };
    }

    const { data, error } = await supabase
      .from('professional_profiles')
      .insert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        profile_photo_url: profilePhotoUrl || null,
        organization_name: organizationName,
        practice_type: practiceType,
        service_description: serviceDescription || null,
        website_url: websiteUrl || null,
        professional_bio: professionalBio,
        email_verified: emailVerified || false,
        phone_verified: phoneVerified || false,
        status: 'pending', // All new professional applications start as pending
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, profile: data };
  } catch (error) {
    console.error('Error creating professional profile:', error);
    return { success: false, error: handleSupabaseError(error) };
  }
};

/**
 * Get professional profile by user ID
 */
export const getProfessionalProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('professional_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw error;
    }

    return { success: true, profile: data };
  } catch (error) {
    console.error('Error fetching professional profile:', error);
    return { success: false, error: handleSupabaseError(error) };
  }
};

/**
 * Update professional profile
 */
export const updateProfessionalProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('professional_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, profile: data };
  } catch (error) {
    console.error('Error updating professional profile:', error);
    return { success: false, error: handleSupabaseError(error) };
  }
};

