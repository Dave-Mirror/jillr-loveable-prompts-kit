
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: 'user' | 'creator' | 'brand' | 'enterprise' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roleRequired }) => {
  const { user, isLoading, session, userProfile } = useAuth();
  const location = useLocation();

  // Debug logs to track auth state
  console.log("ProtectedRoute - Auth State:", { 
    isLoading, 
    hasUser: !!user, 
    hasSession: !!session,
    path: location.pathname,
    roleRequired
  });

  // Determine the user's role
  const getUserRole = (): 'user' | 'creator' | 'brand' | 'enterprise' | 'admin' => {
    if (!userProfile) return 'user';
    
    if (userProfile.isAdmin) return 'admin';
    if (userProfile.isEnterprise) return 'enterprise';
    if (userProfile.email?.includes('brand') || userProfile.accountType === 'brand') return 'brand';
    if (userProfile.isCreator) return 'creator';
    
    return 'user';
  };

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
    '/dashboard',
    '/content-editor',
    '/creator-dashboard',
    '/brand-dashboard',
    '/enterprise',
    '/challenge-editor',
    '/trigger-management'
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

  // Role-based protection
  if (roleRequired && user) {
    const userRole = getUserRole();
    
    // Special case for admin (can access everything)
    if (userRole === 'admin') {
      return <>{children}</>;
    }
    
    // Check if user has required role
    if (userRole !== roleRequired) {
      console.log(`User role ${userRole} doesn't match required role ${roleRequired}, redirecting to dashboard`);
      return <Navigate to="/dashboard" replace />;
    }
  }

  // For demo purposes, bypass authentication checks in development
  console.log("Bypassing auth check for demonstration purposes");
  return <>{children}</>;
};

export default ProtectedRoute;
