
import React from 'react';
import { Button } from '@/components/ui/button';

interface SocialLoginProps {
  onGoogleLogin: () => void;
  disabled: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onGoogleLogin, disabled }) => {
  return (
    <div className="space-y-4 mb-6">
      <Button 
        className="w-full bg-white text-black hover:bg-gray-100 font-medium"
        onClick={onGoogleLogin}
        disabled={disabled}
      >
        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12 h8"></path>
          <path d="M12 8 v8"></path>
        </svg>
        Continue with Google
      </Button>
      
      {/* Add more social logins as needed */}
    </div>
  );
};

export default SocialLogin;
