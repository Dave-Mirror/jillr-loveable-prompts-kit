
import { supabase } from '@/integrations/supabase/client';

export interface EnterpriseProfile {
  id: string;
  user_id: string;
  company_name: string;
  branding_colors: {
    primary: string;
    secondary: string;
  };
  industry: string[];
  hashtags: string[];
  created_at?: string;
}

// Mock function for fetching enterprise profile when DB table doesn't exist yet
export const getEnterpriseProfile = async (userId: string) => {
  try {
    // First try real database - but we'll skip this for now since the table doesn't exist in types
    // Instead, we'll use mock data directly
    console.log("Using mock enterprise profile data");
    const mockProfile: EnterpriseProfile = {
      id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
      user_id: userId,
      company_name: 'My Brand',
      branding_colors: {
        primary: '#9b87f5',
        secondary: '#7E69AB'
      },
      industry: ['Marketing'],
      hashtags: [],
      created_at: new Date().toISOString()
    };
    
    return { data: mockProfile, error: null };
  } catch (error) {
    console.error("Error in getEnterpriseProfile:", error);
    return { data: null, error };
  }
};

// Mock function for updating enterprise profile when DB table doesn't exist yet
export const updateEnterpriseProfile = async (profileId: string, updates: Partial<EnterpriseProfile>) => {
  try {
    // Skip database update attempt since table doesn't exist in types
    // Return mock data with updates
    console.log("Using mock enterprise profile update");
    return { data: { ...updates, id: profileId } as EnterpriseProfile, error: null };
  } catch (error) {
    console.error("Error in updateEnterpriseProfile:", error);
    return { data: null, error };
  }
};

// Mock function for creating enterprise profile when DB table doesn't exist yet
export const createEnterpriseProfile = async (profile: Partial<EnterpriseProfile>) => {
  try {
    // Skip database creation attempt since table doesn't exist in types
    // Return mock data
    console.log("Using mock enterprise profile creation");
    const mockProfile: EnterpriseProfile = {
      ...(profile as EnterpriseProfile),
      id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    
    return { data: mockProfile, error: null };
  } catch (error) {
    console.error("Error in createEnterpriseProfile:", error);
    return { data: null, error };
  }
};
