
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import AuthContext from '@/contexts/AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile if authenticated
        if (session?.user) {
          setTimeout(async () => {
            await fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
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
        setUserProfile({
          id: userId,
          active_challenges: 0,
          level: 1,
          xp: 0,
          coins: 0
        });
        return;
      }
      
      // Create a profile object from the wallet data
      const profileData = {
        id: userId,
        active_challenges: 0, // This would normally come from a count of user_challenges
        level: calculateLevel(data.xp_total || 0),
        xp: data.xp_total || 0,
        coins: data.coins_total || 0
      };
      
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      // Fallback profile
      setUserProfile({
        id: userId,
        active_challenges: 0,
        level: 1,
        xp: 0,
        coins: 0
      });
    }
  };

  // Simple level calculation function
  const calculateLevel = (xp: number): number => {
    // Example: Every 1000 XP is a new level, starting from level 1
    return Math.max(1, Math.floor(xp / 1000) + 1);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
