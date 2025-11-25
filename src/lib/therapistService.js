import { supabase, handleSupabaseError } from './supabase';

/**
 * Create a therapist profile
 * This should be called after creating the user account in AuthContext
 */
export const createTherapistProfile = async (userId, therapistData) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      licensedCountries,
      licensedStates,
      therapyTypes,
      specializations,
      certifications,
      yearsExperience,
      consultationFee,
      professionalBio,
      socialMediaPlatforms,
      profilePhotoUrl,
      emailVerified,
      phoneVerified,
      licenseNumber,
    } = therapistData;

    const { data, error } = await supabase
      .from('therapist_profiles')
      .insert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        profile_photo_url: profilePhotoUrl || null,
        licensed_countries: licensedCountries || [],
        licensed_states: licensedStates || [],
        therapy_types: therapyTypes || [],
        specializations: specializations || [],
        certifications: certifications || [],
        years_experience: yearsExperience ? parseInt(yearsExperience) : null,
        consultation_fee: consultationFee ? parseFloat(consultationFee) : null,
        professional_bio: professionalBio || null,
        license_number: licenseNumber || null,
        social_media_platforms: socialMediaPlatforms || {},
        email_verified: emailVerified || false,
        phone_verified: phoneVerified || false,
        status: 'pending', // All new therapist applications start as pending
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, profile: data };
  } catch (error) {
    console.error('Error creating therapist profile:', error);
    return { success: false, error: handleSupabaseError(error) };
  }
};

/**
 * Get therapist profile by user ID
 */
export const getTherapistProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('therapist_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw error;
    }

    return { success: true, profile: data };
  } catch (error) {
    console.error('Error fetching therapist profile:', error);
    return { success: false, error: handleSupabaseError(error) };
  }
};

/**
 * Update therapist profile
 */
export const updateTherapistProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('therapist_profiles')
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
    console.error('Error updating therapist profile:', error);
    return { success: false, error: handleSupabaseError(error) };
  }
};

