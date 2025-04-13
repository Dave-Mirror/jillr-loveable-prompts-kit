
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail } from 'lucide-react';

interface AuthFormProps {
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
  loading: boolean;
  onSubmit: (email: string, password: string, isSignUp: boolean, agreedToTerms: boolean) => Promise<boolean | void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  isSignUp, 
  setIsSignUp, 
  loading, 
  onSubmit 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isSignUp, agreedToTerms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      {isSignUp && (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full neon-button"
        disabled={loading || (isSignUp && !agreedToTerms)}
      >
        <Mail className="mr-2 h-4 w-4" />
        {isSignUp ? 'Sign Up' : 'Log In'}
      </Button>

      <div className="mt-6 text-center text-sm">
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="text-jillr-neonPurple hover:underline"
              onClick={() => setIsSignUp(false)}
            >
              Log in
            </button>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="text-jillr-neonPurple hover:underline"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
