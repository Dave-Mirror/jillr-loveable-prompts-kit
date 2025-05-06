
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfileLoading from '@/components/profile/ProfileLoading';
import { fetchUserProfile } from '@/utils/profile/fetchUserProfile';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { user, userProfile: authUserProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('activity');
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        // If no username provided, or username matches logged in user, show own profile
        if (!username && authUserProfile) {
          setProfileData(authUserProfile);
          setIsOwnProfile(true);
        } else {
          const profile = await fetchUserProfile(username || '');
          setProfileData(profile);
          setIsOwnProfile(user?.id === profile?.id);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: 'Fehler beim Laden des Profils',
          description: 'Bitte versuche es später erneut.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username, user, authUserProfile, toast]);

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!profileData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Profil nicht gefunden</h1>
        <p className="mb-6 text-muted-foreground">
          Das gesuchte Profil konnte nicht gefunden werden.
        </p>
        <Link 
          to="/explore" 
          className="text-jillr-neonPurple hover:underline"
        >
          Zurück zur Entdecken-Seite
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <ProfileHeader 
        userProfile={profileData} 
        isOwnProfile={isOwnProfile} 
      />
      <div className="container mt-6">
        <ProfileTabs 
          userProfile={profileData} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOwnProfile={isOwnProfile}
        />
      </div>
    </div>
  );
};

export default UserProfile;
