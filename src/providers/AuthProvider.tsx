
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import AuthContext from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    console.log("AuthProvider initialized");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile if authenticated
        if (session?.user) {
          setTimeout(async () => {
            console.log("Fetching user profile after auth state change");
            await fetchUserProfile(session.user.id);
          }, 0);
        } else {
          // Create a demo profile for non-authenticated users
          const demoProfile = createDemoProfile();
          console.log("Created demo profile for unauthenticated session:", demoProfile);
          setUserProfile(demoProfile);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session check:", session ? "Session found" : "No session");
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        // Create a demo profile for non-authenticated users
        const demoProfile = createDemoProfile();
        console.log("Created demo profile for initial state:", demoProfile);
        setUserProfile(demoProfile);
      }
      
      setIsLoading(false);
    })
    .catch(err => {
      console.error("Error checking session:", err);
      // Create a demo profile for error cases
      const demoProfile = createDemoProfile();
      setUserProfile(demoProfile);
      setIsLoading(false);
    });

    return () => {
      console.log("Unsubscribing from auth changes");
      subscription.unsubscribe();
    };
  }, []);

  // Creates a demo profile for non-authenticated sessions
  const createDemoProfile = () => {
    // For demonstration purposes - provide a default profile
    return {
      id: 'demo-user',
      active_challenges: 5,
      level: 3,
      xp: 2500,
      coins: 750,
      // Add role properties for easier access
      isCreator: true,
      isEnterprise: false,
      accountType: 'user'
    };
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      
      // Instead of querying the profiles table directly, we'll query wallets table
      // and create a synthetic profile from wallet data, since we don't have 
      // a profiles table in the type definitions
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user wallet:', error);
        // Create a default profile with just the user ID
        const defaultProfile = {
          id: userId,
          active_challenges: 0,
          level: 1,
          xp: 0,
          coins: 0,
          // Add role properties for easier access - derive from user ID for testing
          isCreator: userId.includes('creator'),
          isEnterprise: userId.includes('enterprise'),
          accountType: userId.includes('brand') ? 'brand' : 'user'
        };
        console.log("Created default profile:", defaultProfile);
        setUserProfile(defaultProfile);
        return;
      }
      
      // Create a profile object from the wallet data
      const profileData = {
        id: userId,
        active_challenges: 0, // This would normally come from a count of user_challenges
        level: calculateLevel(data.xp_total || 0),
        xp: data.xp_total || 0,
        coins: data.coins_total || 0,
        // Add role properties for easier access - using userId for role determination
        isCreator: userId.includes('creator'),
        isEnterprise: userId.includes('enterprise'),
        accountType: userId.includes('brand') ? 'brand' : 'user'
      };
      
      console.log("Fetched profile data:", profileData);
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      // Fallback profile
      const fallbackProfile = {
        id: userId,
        active_challenges: 0,
        level: 1,
        xp: 0,
        coins: 0,
        // Derive roles from user ID for testing
        isCreator: userId.includes('creator'),
        isEnterprise: userId.includes('enterprise'),
        accountType: userId.includes('brand') ? 'brand' : 'user'
      };
      console.log("Using fallback profile:", fallbackProfile);
      setUserProfile(fallbackProfile);
    }
  };

  // Simple level calculation function
  const calculateLevel = (xp: number): number => {
    // Example: Every 1000 XP is a new level, starting from level 1
    return Math.max(1, Math.floor(xp / 1000) + 1);
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Du wurdest erfolgreich abgemeldet");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Fehler beim Abmelden");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
