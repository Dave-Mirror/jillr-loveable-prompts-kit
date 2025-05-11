
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a table exists in the database
 * @param tableName The name of the table to check
 * @returns A promise resolving to a boolean indicating if the table exists
 */
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    // Instead of querying pg_tables directly, we'll try to select from the table with a limit 0
    // This avoids TypeScript errors since we're now accessing tables that exist in the schema
    const { error } = await supabase
      .from(tableName as any)
      .select('*', { count: 'exact', head: true })
      .limit(0);
    
    // If no error occurred, the table exists
    if (!error) {
      return true;
    }
    
    // Check if the error specifically mentions that the table doesn't exist
    if (error.message && (
      error.message.includes('does not exist') || 
      error.message.includes('relation') || 
      error.message.includes('undefined')
    )) {
      console.log(`Table ${tableName} does not exist:`, error.message);
      return false;
    }
    
    // If it's another type of error, log it but assume the table might still exist
    console.warn(`Error checking if table ${tableName} exists:`, error);
    return false;
  } catch (err) {
    // If this fails, the table likely doesn't exist
    console.log(`Error checking if table ${tableName} exists:`, err);
    return false;
  }
}
