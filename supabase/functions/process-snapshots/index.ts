
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Check if this is a scheduled run
    const isScheduled = new URL(req.url).searchParams.get('scheduled') === 'true';
    
    // Get all memory snapshots from the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data: snapshots, error: snapshotsError } = await supabaseClient
      .from('memory_snapshots')
      .select('*')
      .gte('timestamp', yesterday.toISOString());
      
    if (snapshotsError) {
      throw new Error(`Error fetching snapshots: ${snapshotsError.message}`);
    }
    
    // Group snapshots by user_id to analyze patterns
    const userSnapshots: Record<string, any[]> = {};
    snapshots.forEach(snapshot => {
      if (!userSnapshots[snapshot.user_id]) {
        userSnapshots[snapshot.user_id] = [];
      }
      userSnapshots[snapshot.user_id].push(snapshot);
    });
    
    // Process each user's snapshots
    const results = await Promise.all(
      Object.entries(userSnapshots).map(async ([userId, userSnaps]) => {
        return await processUserSnapshots(supabaseClient, userId, userSnaps);
      })
    );
    
    return new Response(
      JSON.stringify({ success: true, processed_users: results.length }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function processUserSnapshots(
  supabaseClient: any,
  userId: string, 
  snapshots: any[]
) {
  try {
    // Analyze patterns in the snapshots
    const patterns = analyzePatterns(snapshots);
    
    if (patterns.length === 0) {
      return { userId, status: "no_patterns" };
    }
    
    // For each detected pattern, check if there's already a similar trigger
    const results = await Promise.all(patterns.map(async (pattern) => {
      const existingTrigger = await checkExistingTrigger(supabaseClient, userId, pattern);
      
      if (existingTrigger) {
        // Update the existing trigger if needed
        return await updateExistingTrigger(supabaseClient, existingTrigger, pattern);
      } else {
        // Create a new trigger
        return await createNewTrigger(supabaseClient, userId, pattern);
      }
    }));
    
    return { userId, status: "processed", results };
    
  } catch (error) {
    console.error(`Error processing snapshots for user ${userId}:`, error);
    return { userId, status: "error", message: error.message };
  }
}

function analyzePatterns(snapshots: any[]) {
  // This is a simplified pattern detection for demo purposes
  // In a real application, you would use more sophisticated analysis
  const patterns = [];
  
  // Check for time-based patterns
  const timeOfDayCounts = {
    morning: 0,
    noon: 0,
    evening: 0,
    night: 0
  };
  
  snapshots.forEach(snapshot => {
    const hour = snapshot.data.hour || new Date(snapshot.timestamp).getHours();
    
    if (hour >= 5 && hour < 11) timeOfDayCounts.morning++;
    else if (hour >= 11 && hour < 14) timeOfDayCounts.noon++;
    else if (hour >= 14 && hour < 22) timeOfDayCounts.evening++;
    else timeOfDayCounts.night++;
  });
  
  // Check if user has a strong preference for a particular time of day
  const timeEntries = Object.entries(timeOfDayCounts);
  const sortedTimes = timeEntries.sort((a, b) => b[1] - a[1]);
  
  if (sortedTimes[0][1] > 5 && sortedTimes[0][1] > sortedTimes[1][1] * 1.5) {
    // User has a strong preference
    patterns.push({
      type: 'time',
      value: sortedTimes[0][0],
      confidence: 0.7,
      suggested_action: {
        type: 'reward',
        value: 'xp_small',
        description: `Du bist häufig ${sortedTimes[0][0] === 'morning' ? 'morgens' : 
                        sortedTimes[0][0] === 'noon' ? 'mittags' : 
                        sortedTimes[0][0] === 'evening' ? 'abends' : 'nachts'} aktiv!`
      }
    });
  }
  
  // Check for location patterns
  const locationCounts: Record<string, number> = {};
  
  snapshots.forEach(snapshot => {
    if (snapshot.data.location_type) {
      locationCounts[snapshot.data.location_type] = 
        (locationCounts[snapshot.data.location_type] || 0) + 1;
    }
  });
  
  const locationEntries = Object.entries(locationCounts);
  const sortedLocations = locationEntries.sort((a, b) => b[1] - a[1]);
  
  if (sortedLocations.length > 0 && sortedLocations[0][1] >= 3) {
    // User frequently visits a location
    patterns.push({
      type: 'location',
      value: sortedLocations[0][0],
      confidence: 0.6,
      suggested_action: {
        type: 'challenge',
        value: 'suggest',
        description: `Neue Challenge vorschlagen beim Besuch von: ${sortedLocations[0][0]}`
      }
    });
  }
  
  // Check for activity patterns
  const activityCounts: Record<string, number> = {};
  
  snapshots.forEach(snapshot => {
    if (snapshot.activity_type) {
      activityCounts[snapshot.activity_type] = 
        (activityCounts[snapshot.activity_type] || 0) + 1;
    }
  });
  
  const activityEntries = Object.entries(activityCounts);
  const sortedActivities = activityEntries.sort((a, b) => b[1] - a[1]);
  
  if (sortedActivities.length > 0 && sortedActivities[0][1] >= 4) {
    // User frequently performs an activity
    patterns.push({
      type: 'activity',
      value: sortedActivities[0][0],
      confidence: 0.65,
      suggested_action: {
        type: 'reward',
        value: 'xp_medium',
        description: `Belohnung für häufige Aktivität: ${sortedActivities[0][0]}`
      }
    });
  }
  
  return patterns;
}

async function checkExistingTrigger(supabaseClient: any, userId: string, pattern: any) {
  const { data, error } = await supabaseClient
    .from('context_triggers')
    .select('*')
    .eq('user_id', userId)
    .eq('created_by', 'system')
    .eq('trigger_condition->>type', pattern.type)
    .eq('trigger_condition->>value', pattern.value);
  
  if (error) {
    console.error('Error checking existing triggers:', error);
    return null;
  }
  
  return data && data.length > 0 ? data[0] : null;
}

async function updateExistingTrigger(supabaseClient: any, existingTrigger: any, pattern: any) {
  // Maybe increase the confidence or adjust the action based on new data
  // For this demo, we'll just update the description
  
  const updatedDescription = `${existingTrigger.description} (Updated)`;
  
  const { data, error } = await supabaseClient
    .from('context_triggers')
    .update({
      description: updatedDescription,
      updated_at: new Date().toISOString()
    })
    .eq('id', existingTrigger.id);
  
  if (error) {
    console.error('Error updating trigger:', error);
    return { status: 'error', message: error.message };
  }
  
  return { status: 'updated', trigger_id: existingTrigger.id };
}

async function createNewTrigger(supabaseClient: any, userId: string, pattern: any) {
  const triggerCondition = {
    type: pattern.type,
    value: pattern.value,
    original: `${pattern.type}_${pattern.value}`
  };
  
  const triggerAction = {
    type: pattern.suggested_action.type,
    value: pattern.suggested_action.value,
    original: `${pattern.suggested_action.type}_${pattern.suggested_action.value}`
  };
  
  const { data, error } = await supabaseClient
    .from('context_triggers')
    .insert({
      user_id: userId,
      created_by: 'system',
      trigger_condition: triggerCondition,
      trigger_action: triggerAction,
      description: pattern.suggested_action.description,
      active: true
    });
  
  if (error) {
    console.error('Error creating new trigger:', error);
    return { status: 'error', message: error.message };
  }
  
  return { status: 'created', trigger_id: data[0].id };
}
