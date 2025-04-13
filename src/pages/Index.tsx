
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Send users to appropriate dashboards based on role, or to explore if not logged in
      if (user) {
        // Temporary hardcoded roles until role system is fully implemented
        if (user.email?.includes('brand') || user.email?.includes('enterprise')) {
          navigate("/enterprise-dashboard");
        } else if (user.email?.includes('creator')) {
          navigate("/creator-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/explore");
      }
    }
  }, [navigate, user, isLoading]);

  return null;
};

export default Index;
