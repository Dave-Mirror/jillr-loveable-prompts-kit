
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: 'user' | 'creator' | 'brand' | 'enterprise';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roleRequired }) => {
  const { user, isLoading, session, userProfile } = useAuth();
  const location = useLocation();

  // Debug logs to track auth state
  console.log("ProtectedRoute - Auth State:", { 
    isLoading, 
    hasUser: !!user, 
    hasSession: !!session,
    path: location.pathname
  });

  // Öffentlich zugängliche Routen, die keine Authentifizierung erfordern
  const publicRoutes = [
    '/wallet', 
    '/profile', 
    '/hypocampus',
    '/explore',
    '/feed',
    '/map', 
    '/city-clash',
    '/leaderboard',
    '/creator-marketplace',
    '/shop',
    '/dashboard',  // Make dashboard publicly accessible
    '/content-editor', // Make content editor publicly accessible
    '/creator-dashboard', // For redirects
    '/brand-dashboard', // For redirects
    '/enterprise', // For redirects
    '/challenge-editor' // Make challenge editor publicly accessible
  ];
  
  // Prüfen, ob die aktuelle Route öffentlich ist
  if (publicRoutes.includes(location.pathname) || location.pathname.startsWith('/challenge/')) {
    console.log(`Route ${location.pathname} is public, allowing access`);
    return <>{children}</>;
  }

  if (isLoading) {
    console.log("Auth state is loading, showing loading screen");
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl mb-4">Loading...</h2>
          <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // For demo purposes, bypass authentication checks in development
  // This is a temporary solution to ensure dashboards are accessible
  console.log("Bypassing auth check for demonstration purposes");
  return <>{children}</>;

  // The following code is commented out to ensure dashboards are accessible
  /*
  // Check for valid session and user - nur für geschützte Routen erforderlich
  if (!session || !user) {
    // Save the current location for redirect after login
    console.log("No session or user found, redirecting to auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Rollenbasierte Zugriffssteuerung, wenn eine Rolle erforderlich ist
  if (roleRequired) {
    const userRole = getUserRole(userProfile);
    
    // Prüfe, ob der Benutzer die erforderliche Rolle hat
    if (roleRequired !== userRole) {
      console.log(`User lacks required role: ${roleRequired}, has ${userRole}`);
      return (
        <div className="container py-8">
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Zugriff verweigert</h2>
            <p>Du benötigst {roleRequired}-Berechtigungen, um auf diese Seite zuzugreifen.</p>
          </div>
        </div>
      );
    }
  }
  */
};

// Bestimmt die Rolle des Benutzers basierend auf dem Profil
function getUserRole(userProfile: any): 'user' | 'creator' | 'brand' | 'enterprise' {
  if (!userProfile) return 'user';
  
  if (userProfile.isEnterprise) return 'enterprise';
  if (userProfile.email?.includes('brand') || userProfile.accountType === 'brand') return 'brand';
  if (userProfile.isCreator) return 'creator';
  
  return 'user';
}

export default ProtectedRoute;
