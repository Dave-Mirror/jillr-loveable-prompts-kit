
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a table exists in the database
 * @param tableName The name of the table to check
 * @returns A promise resolving to a boolean indicating if the table exists
 */
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    // Use a more type-safe approach to check if a table exists
    const { data: tableInfo, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .eq('tablename', tableName)
      .limit(1);
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    // If we got data and it has at least one row, the table exists
    return !!tableInfo && tableInfo.length > 0;
  } catch (err) {
    // If this fails, the table likely doesn't exist
    console.log(`Error checking if table ${tableName} exists:`, err);
    return false;
  }
}
