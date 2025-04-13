
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

interface SocialLoginProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  onInstagramLogin: () => void;
  onTikTokLogin: () => void;
  disabled: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ 
  onGoogleLogin, 
  onFacebookLogin, 
  onInstagramLogin, 
  onTikTokLogin,
  disabled 
}) => {
  return (
    <div className="space-y-4 mb-6">
      <Button 
        className="w-full bg-white text-black hover:bg-gray-100 font-medium"
        onClick={onGoogleLogin}
        disabled={disabled}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </Button>
      
      <Button 
        className="w-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90 font-medium"
        onClick={onFacebookLogin}
        disabled={disabled}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Continue with Facebook
      </Button>
      
      <Button 
        className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90 font-medium"
        onClick={onInstagramLogin}
        disabled={disabled}
      >
        <Instagram className="mr-2 h-4 w-4" />
        Continue with Instagram
      </Button>
      
      <Button 
        className="w-full bg-black text-white hover:bg-black/90 font-medium"
        onClick={onTikTokLogin}
        disabled={disabled}
      >
        <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.321 5.562a5.124 5.124 0 0 1-3.085-2.5 5.086 5.086 0 0 1-.607-2.437h-3.89v13.75c0 .725-.16 1.356-.48 1.893a3.152 3.152 0 0 1-1.29 1.29 3.354 3.354 0 0 1-1.693.48c-.602 0-1.164-.16-1.685-.48a3.374 3.374 0 0 1-1.29-1.29 3.366 3.366 0 0 1-.48-1.694c0-.601.16-1.163.48-1.684.32-.522.763-.964 1.29-1.29a3.374 3.374 0 0 1 1.694-.48c.24 0 .441.02.682.08v-3.89a6.954 6.954 0 0 0-2.724.562 6.91 6.91 0 0 0-2.321 1.624 7.48 7.48 0 0 0-1.624 2.321 6.957 6.957 0 0 0-.562 2.724c0 .963.16 1.886.562 2.724a7.295 7.295 0 0 0 1.624 2.32 7.631 7.631 0 0 0 2.32 1.626 6.94 6.94 0 0 0 2.725.56 6.94 6.94 0 0 0 2.724-.56 7.631 7.631 0 0 0 2.321-1.626 7.48 7.48 0 0 0 1.624-2.32 6.957 6.957 0 0 0 .562-2.724V9.329a8.723 8.723 0 0 0 2.083.28 8.9 8.9 0 0 0 1.743-.2 8.892 8.892 0 0 0 1.643-.521v-3.89a5.104 5.104 0 0 1-2.725.562Z" />
        </svg>
        Continue with TikTok
      </Button>
    </div>
  );
};

export default SocialLogin;
