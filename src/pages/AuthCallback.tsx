
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
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
      }
      
      // Navigate back to the app
      navigate('/');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="container flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Completing login...</h2>
        <p>You'll be redirected shortly.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
