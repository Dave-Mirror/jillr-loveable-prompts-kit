
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roleRequired }) => {
  const { user, isLoading, session } = useAuth();
  const location = useLocation();

  // Special case for wallet, profile, and hypocampus pages - allow access without authentication
  if (location.pathname === '/wallet' || location.pathname === '/profile' || location.pathname === '/hypocampus') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl mb-4">Loading...</h2>
          <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Check for valid session and user
  if (!session || !user) {
    // Save the current location for redirect after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Role-based access control
  if (roleRequired && user.role !== roleRequired) {
    return (
      <div className="container py-8">
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You need {roleRequired} permissions to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
