
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Trophy, Wallet, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/explore', label: 'Entdecken' },
    { icon: Trophy, path: '/leaderboard', label: 'Rangliste' },
    { icon: Wallet, path: '/wallet', label: 'Wallet' },
    { icon: User, path: '/profile', label: 'Profil' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-jillr-neonPurple' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
