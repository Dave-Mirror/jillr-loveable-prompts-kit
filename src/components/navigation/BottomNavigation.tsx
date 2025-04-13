
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Trophy, Wallet, User, Map, Star, Zap } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/explore', label: 'Entdecken' },
    { icon: Map, path: '/livemap', label: 'Live Map' },
    { icon: Trophy, path: '/leaderboard', label: 'Rangliste' },
    { icon: Wallet, path: '/wallet', label: 'Wallet' },
    { icon: User, path: '/profile', label: 'Profil' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-jillr-darkBlue/95 backdrop-blur-xl border-t border-jillr-neonPurple/20 z-40 md:hidden shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-jillr-neonPurple' : 'text-muted-foreground hover:text-white/80'
              }`}
            >
              <item.icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-jillr-neonPurple mt-1"></div>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;

