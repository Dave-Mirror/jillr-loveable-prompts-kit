
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Home, Zap, Map, Trophy, ShoppingBag, Coins, Award } from 'lucide-react';

const UserDashboardContent = () => {
  const { userProfile } = useAuth();

  // Fortschritt berechnen (Beispiel)
  const level = userProfile?.level || 1;
  const xp = userProfile?.xp || 0;
  const progress = (xp % 1000) / 10; // Angenommen, 1000 XP pro Level

  // Beispiel Challenges
  const mockChallenges = [
    { id: '1', title: 'Dance Challenge', type: 'Video', rewards: '500 XP', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800' },
    { id: '2', title: 'Urban Photo', type: 'Foto', rewards: '300 XP', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800' },
  ];

  return (
    <div className="space-y-6">
      {/* Statistik-Karten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-jillr-neonPurple" /> Aktive Challenges
            </CardTitle>
            <CardDescription>Laufende Challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">{userProfile?.active_challenges || 0}</div>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to="/explore" className="flex items-center text-jillr-neonPurple">
                Mehr Challenges entdecken <span className="ml-1">→</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Award className="text-jillr-neonGreen" /> XP Level
            </CardTitle>
            <CardDescription>Dein aktuelles Level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">{level}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {xp} XP insgesamt
            </div>
            <div className="w-full bg-jillr-dark/60 h-1 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonGreen h-full rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Coins className="text-jillr-neonPink" /> Jillr Coins
            </CardTitle>
            <CardDescription>Dein Rewards-Guthaben</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">{userProfile?.coins || 0}</div>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to="/wallet" className="flex items-center text-jillr-neonPink">
                Wallet ansehen <span className="ml-1">→</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Empfohlene Challenges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Empfohlen für dich</h2>
          <Button asChild variant="ghost">
            <Link to="/explore">Alle ansehen</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockChallenges.map(challenge => (
            <Link key={challenge.id} to={`/challenge/${challenge.id}`}>
              <Card className="overflow-hidden h-full hover:border-jillr-neonPurple/50 transition-all">
                <div className="relative">
                  <img 
                    src={challenge.image} 
                    alt={challenge.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-jillr-neonPurple/80 text-white text-xs px-2 py-0.5 rounded-sm">
                        {challenge.type}
                      </span>
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-sm">
                        {challenge.rewards}
                      </span>
                    </div>
                    <h3 className="font-bold text-white">{challenge.title}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Schnellzugriff */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
          <Link to="/map">
            <Map className="h-8 w-8 mb-2 text-jillr-neonBlue" />
            <span>Live Map</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
          <Link to="/leaderboard">
            <Trophy className="h-8 w-8 mb-2 text-jillr-neonGreen" />
            <span>Leaderboard</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
          <Link to="/city-clash">
            <Home className="h-8 w-8 mb-2 text-jillr-neonPurple" />
            <span>City Clash</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
          <Link to="/shop">
            <ShoppingBag className="h-8 w-8 mb-2 text-jillr-neonPink" />
            <span>Shop</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserDashboardContent;
