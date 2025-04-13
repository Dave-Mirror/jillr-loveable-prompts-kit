
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        // Check if wallet exists for the user, if not create one
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: walletData } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          if (!walletData) {
            // Create wallet for the user
            await supabase
              .from('wallets')
              .insert([
                { user_id: session.user.id }
              ]);
          }
          
          toast.success("Du hast dich erfolgreich angemeldet!");
        }
        
        // Get the redirect path from the location state or default to "/"
        const from = location.state?.from?.pathname || "/";
        
        // Navigate to the page the user was trying to access, or to wallet if coming from auth
        navigate(from === "/auth" ? "/wallet" : from, { replace: true });
      } catch (error) {
        console.error('Error during authentication:', error);
        toast.error("Bei der Anmeldung ist ein Fehler aufgetreten");
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="container flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Anmeldung wird abgeschlossen...</h2>
        <p>Du wirst in Kürze weitergeleitet.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
