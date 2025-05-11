
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a table exists in the database
 * @param tableName The name of the table to check
 * @returns A promise resolving to a boolean indicating if the table exists
 */
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    // If there's no error, the table exists
    return !error;
  } catch (err) {
    // If this fails, the table likely doesn't exist
    console.log(`Error checking if table ${tableName} exists:`, err);
    return false;
  }
}
