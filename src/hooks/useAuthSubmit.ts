
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';

export function useAuthSubmit() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the redirect path from location state or default to "/"
  const from = location.state?.from?.pathname || "/";

  const handleEmailSignIn = async (
    email: string, 
    password: string, 
    isSignUp: boolean, 
    agreedToTerms: boolean
  ) => {
    if (isSignUp && !agreedToTerms) {
      toast({
        title: "Terms agreement required",
        description: "You must agree to the terms and conditions to sign up.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }
      
      if (result.error) throw result.error;
      
      if (isSignUp && !result.data?.user?.identities?.length) {
        toast({
          title: "Email already registered",
          description: "This email is already in use. Please try logging in instead.",
          variant: "destructive"
        });
        return false;
      }
      
      // Handle successful auth
      if (result.data.session) {
        // Create a wallet for the user if they're signing up
        if (isSignUp && result.data.user?.id) {
          try {
            // Check if wallet already exists
            const { data: existingWallet } = await supabase
              .from('wallets')
              .select('id')
              .eq('user_id', result.data.user.id)
              .maybeSingle();
            
            // Only create wallet if it doesn't exist
            if (!existingWallet) {
              const { error: walletError } = await supabase
                .from('wallets')
                .insert([{ user_id: result.data.user.id }]);
              
              if (walletError) {
                console.error('Error creating wallet:', walletError);
              }
            }
          } catch (err) {
            console.error('Error checking/creating wallet:', err);
          }
        }
        
        toast({
          title: isSignUp ? "Account created" : "Welcome back!",
          description: isSignUp 
            ? "Your account has been created successfully" 
            : "You've been logged in successfully",
        });
      }
      
      return true;
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'instagram' | 'tiktok') => {
    try {
      setLoading(true);
      
      // TikTok and Instagram are not directly supported by Supabase, so we'll show a toast
      if (provider === 'instagram' || provider === 'tiktok') {
        sonnerToast("Coming soon", {
          description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} login will be available soon`,
          duration: 3000,
        });
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Social login failed",
        description: error.message || "Failed to login with social provider",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleEmailSignIn,
    handleSocialSignIn,
    from
  };
}
