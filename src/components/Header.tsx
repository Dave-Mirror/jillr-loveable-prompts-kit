
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Coins, Zap, Award, User, LogOut, Wallet, ShoppingBag, 
  Video, BarChart, Trophy, Home, Map, Search, Bell, Menu, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { user, signOut, userProfile } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Dashboard', icon: BarChart, path: user?.email?.includes('brand') || user?.email?.includes('enterprise') ? '/enterprise-dashboard' : '/dashboard' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Challenges', icon: Trophy, path: '/challenges' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled || location.pathname !== '/explore' 
          ? 'bg-jillr-dark/90 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-b from-jillr-dark/80 to-transparent'
      } py-3`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold neon-text">jillr</span>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex ml-4">
            <NavigationMenuList className="flex gap-1">
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-white/10 ${
                      location.pathname === item.path ? 'text-jillr-neonPurple border-b-2 border-jillr-neonPurple' : 'text-foreground'
                    }`}
                  >
                    <item.icon size={16} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10">
            <Search size={18} />
          </Button>
          
          {user ? (
            <>
              {/* User Stats - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue/50">
                  <Zap size={16} className="text-jillr-neonPurple" />
                  <span className="text-sm font-medium">{userProfile?.xp || 0} XP</span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue/50">
                  <Coins size={16} className="text-jillr-neonGreen" />
                  <span className="text-sm font-medium">{userProfile?.coins || 0}</span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue/50">
                  <Award size={16} className="text-jillr-neonPink" />
                  <span className="text-sm font-medium">Lvl {userProfile?.level || 1}</span>
                </div>
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10 relative">
                <Bell size={18} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-jillr-neonPink"></span>
              </Button>
              
              {/* User Profile */}
              <Link to="/profile" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue/60 hover:bg-jillr-neonPurple/20 transition-colors overflow-hidden">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={18} />
                )}
              </Link>
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10">
                    <Menu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-jillr-darkBlue/95 backdrop-blur-xl border-jillr-neonPurple/20">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xl font-bold neon-text">jillr</span>
                    </div>
                    
                    {/* User Stats - Mobile */}
                    <div className="flex justify-between gap-2 mb-8">
                      <div className="flex-1 items-center gap-1 px-2 py-3 rounded-lg bg-jillr-dark/70 flex flex-col">
                        <Zap size={20} className="text-jillr-neonPurple" />
                        <span className="text-sm font-medium">{userProfile?.xp || 0} XP</span>
                      </div>
                      
                      <div className="flex-1 items-center gap-1 px-2 py-3 rounded-lg bg-jillr-dark/70 flex flex-col">
                        <Coins size={20} className="text-jillr-neonGreen" />
                        <span className="text-sm font-medium">{userProfile?.coins || 0}</span>
                      </div>
                      
                      <div className="flex-1 items-center gap-1 px-2 py-3 rounded-lg bg-jillr-dark/70 flex flex-col">
                        <Award size={20} className="text-jillr-neonPink" />
                        <span className="text-sm font-medium">Lvl {userProfile?.level || 1}</span>
                      </div>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <nav className="space-y-1 flex-1">
                      {mainNavItems.map((item) => (
                        <Link 
                          key={item.path} 
                          to={item.path} 
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            location.pathname === item.path 
                              ? 'bg-jillr-dark text-jillr-neonPurple' 
                              : 'hover:bg-jillr-dark/50'
                          }`}
                        >
                          <item.icon size={20} />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                      
                      <Link 
                        to="/wallet" 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-jillr-dark/50"
                      >
                        <Wallet size={20} />
                        <span>Wallet</span>
                      </Link>
                      
                      {user.email?.includes('creator') && (
                        <Link 
                          to="/creator-dashboard" 
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-jillr-dark/50"
                        >
                          <Video size={20} />
                          <span>Creator Studio</span>
                        </Link>
                      )}
                      
                      {(user.email?.includes('brand') || user.email?.includes('enterprise')) && (
                        <Link 
                          to="/enterprise-dashboard" 
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-jillr-dark/50"
                        >
                          <BarChart size={20} />
                          <span>Enterprise Dashboard</span>
                        </Link>
                      )}
                    </nav>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleSignOut}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-jillr-neonPink hover:bg-jillr-dark/50"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button className="neon-button">
                  Login
                </Button>
              </Link>
              
              {/* Mobile Menu for Non-authenticated Users */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10">
                    <Menu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-jillr-darkBlue/95 backdrop-blur-xl border-jillr-neonPurple/20">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xl font-bold neon-text">jillr</span>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <nav className="space-y-1">
                      {mainNavItems.map((item) => (
                        <Link 
                          key={item.path} 
                          to={item.path} 
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            location.pathname === item.path 
                              ? 'bg-jillr-dark text-jillr-neonPurple' 
                              : 'hover:bg-jillr-dark/50'
                          }`}
                        >
                          <item.icon size={20} />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                    
                    <div className="mt-auto">
                      <Link to="/auth" className="w-full">
                        <Button className="neon-button w-full mt-6">
                          Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
