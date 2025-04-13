
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import HeaderContainer from './header/HeaderContainer';
import LeftSection from './header/LeftSection';
import RightSection from './header/RightSection';

const Header = () => {
  const { user, signOut, userProfile } = useAuth();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <HeaderContainer>
      <LeftSection user={user} />
      <RightSection user={user} userProfile={userProfile} signOut={handleSignOut} />
    </HeaderContainer>
  );
};

export default Header;
