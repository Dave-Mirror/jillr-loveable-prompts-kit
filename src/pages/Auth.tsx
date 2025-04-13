
import React, { useState } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import AuthContainer from '@/components/auth/AuthContainer';
import SocialLogin from '@/components/auth/SocialLogin';
import AuthDivider from '@/components/auth/AuthDivider';
import AuthForm from '@/components/auth/AuthForm';
import { toast } from 'sonner';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { loading: sessionLoading } = useAuthSession();
  const { loading, handleEmailSignIn, handleSocialSignIn } = useAuthSubmit();

  const handleSubmit = async (email: string, password: string, isSignUp: boolean, agreedToTerms: boolean) => {
    await handleEmailSignIn(email, password, isSignUp, agreedToTerms);
  };

  const handleNotImplemented = () => {
    toast("Coming soon", {
      description: "This login method is coming soon",
      duration: 3000,
    });
  };

  return (
    <AuthContainer title={isSignUp ? 'Create Account' : 'Welcome to Jillr'}>
      <SocialLogin 
        onGoogleLogin={() => handleSocialSignIn('google')} 
        onFacebookLogin={() => handleSocialSignIn('facebook')}
        onInstagramLogin={handleNotImplemented}
        onTikTokLogin={handleNotImplemented}
        disabled={loading || sessionLoading}
      />
      
      <AuthDivider />
      
      <AuthForm 
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        loading={loading || sessionLoading}
        onSubmit={handleSubmit}
      />
    </AuthContainer>
  );
};

export default Auth;
