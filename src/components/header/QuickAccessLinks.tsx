
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, User, Bell, Trophy } from 'lucide-react';

const QuickAccessLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-2 group">
      <Link 
        to="/leaderboard" 
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
      >
        <Trophy size={16} />
        <span className="text-xs hidden md:inline">Rangliste</span>
      </Link>
      
      <Link 
        to="/wallet" 
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
      >
        <Wallet size={16} />
        <span className="text-xs hidden md:inline">Wallet</span>
      </Link>
      
      <Link 
        to="/profile" 
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
      >
        <User size={16} />
        <span className="text-xs hidden md:inline">Profil</span>
      </Link>
    </div>
  );
};

export default QuickAccessLinks;
