
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfileLoading from '@/components/profile/ProfileLoading';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Building2, BarChart2, Zap } from 'lucide-react';

// Mock data for demo profile when not logged in
const mockUserProfile = {
  id: 'demo-user-id',
  level: 5,
  xp: 4500,
  coins: 750,
  active_challenges: 3
};

const Profile = () => {
  const { userProfile, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('user');
  
  // Use mock profile if user is not authenticated
  const profileData = userProfile || mockUserProfile;
  
  // Parse the tab parameter from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam && ['activity', 'rewards', 'community', 'statistics', 'social', 'data', 'settings', 'hypocampus'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Set user role based on user information or URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get('role');
    
    if (roleParam && ['user', 'creator', 'brand', 'enterprise'].includes(roleParam)) {
      setUserRole(roleParam);
    } else if (user) {
      if (user.email?.includes('brand') || userProfile?.accountType === 'brand') {
        setUserRole('brand');
      } else if (userProfile?.isCreator) {
        setUserRole('creator');
      } else if (userProfile?.isEnterprise) {
        setUserRole('enterprise');
      }
    }
  }, [user, userProfile, location]);

  // Handle role change
  const handleRoleChange = (role: string) => {
    setUserRole(role);
    // Update URL with role parameter
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('role', role);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    
    // Set appropriate tab based on role
    if (role === 'user' && activeTab !== 'activity' && activeTab !== 'rewards') {
      setActiveTab('activity');
      searchParams.set('tab', 'activity');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    } else if (role === 'creator' && activeTab !== 'community' && activeTab !== 'statistics') {
      setActiveTab('community');
      searchParams.set('tab', 'community');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    } else if ((role === 'brand' || role === 'enterprise') && activeTab !== 'statistics' && activeTab !== 'hypocampus') {
      setActiveTab('statistics');
      searchParams.set('tab', 'statistics');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  };

  // Go to dashboard with current role
  const handleGoToDashboard = () => {
    navigate('/dashboard', { state: { initialActiveTab: userRole } });
  };

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="pb-8">
      <ProfileHeader userProfile={profileData} />
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Profil & Dashboard</h2>
            <p className="text-muted-foreground">Verwalte deine persönlichen Daten und Aktivitäten</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={userRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rolle auswählen" />
              </SelectTrigger>
              <SelectContent className="bg-jillr-dark border border-jillr-neonPurple/30">
                <SelectItem value="user" className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Nutzer</span>
                  </span>
                </SelectItem>
                <SelectItem value="creator" className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Creator</span>
                  </span>
                </SelectItem>
                <SelectItem value="brand" className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    <span>Brand</span>
                  </span>
                </SelectItem>
                <SelectItem value="enterprise" className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Enterprise</span>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleGoToDashboard}>
              Dashboard Ansicht
            </Button>
          </div>
        </div>
        
        <ProfileTabs 
          userProfile={profileData} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
        />
      </div>
    </div>
  );
};

export default Profile;
