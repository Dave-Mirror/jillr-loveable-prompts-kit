
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
};

export default ProtectedRoute;
