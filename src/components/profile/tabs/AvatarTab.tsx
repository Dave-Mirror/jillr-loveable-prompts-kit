
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Coins, HeartHandshake, Trophy, Shirt, Hat, Glasses, Zap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AvatarCustomizationModal from '../avatar/AvatarCustomizationModal';

interface AvatarTabProps {
  userProfile: any;
}

const AvatarTab: React.FC<AvatarTabProps> = ({ userProfile }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState('https://placehold.co/200x200/9b87f5/FFFFFF/png?text=JC');
  
  const currentLevel = userProfile.level || 1;
  const currentXP = userProfile.xp || 0;
  
  // Mock unlocked items data - in a real app would come from the database
  const unlockedItems = [
    {
      id: 'item-1',
      name: 'Hut "Challenger"',
      type: 'head',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=Hat1',
      unlockedAt: 'Level 3'
    },
    {
      id: 'item-2',
      name: 'T-Shirt "Explorer"',
      type: 'body',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=Shirt',
      unlockedAt: 'Level 1'
    }
  ];
  
  // Mock upcoming items data
  const upcomingItems = [
    {
      id: 'upcoming-1',
      name: 'VR-Brille',
      type: 'face',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=VR',
      unlocksAt: 'Level 5'
    },
    {
      id: 'upcoming-2',
      name: 'Hoodie "Pro"',
      type: 'body',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=Hoodie',
      unlocksAt: 'Level 7'
    }
  ];
  
  // Mock purchased items data
  const purchasedItems = [
    {
      id: 'purchased-1',
      name: 'Premium Hintergrund',
      type: 'background',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=BG2',
      purchasedWith: 'coins',
      cost: 200
    }
  ];
  
  const handleAvatarChange = (newAvatar: string) => {
    setCurrentAvatar(newAvatar);
    // In a real app, update this in the database
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Avatar preview card */}
        <Card className="flex-1 border-jillr-neonPurple/20">
          <CardHeader>
            <CardTitle>Dein Avatar</CardTitle>
            <CardDescription>Passe deinen Avatar an und sammle einzigartige Items</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-jillr-neonPurple mb-4">
                <img 
                  src={currentAvatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-jillr-neonPurple text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Award size={14} />
                Level {currentLevel}
              </div>
            </div>
            
            <Button 
              onClick={() => setIsCustomizing(true)}
              className="mb-4"
            >
              Avatar anpassen
            </Button>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-jillr-darkBlue/50 flex items-center justify-center mb-1">
                  <Award size={24} className="text-jillr-neonPink" />
                </div>
                <span className="text-xs">Level {currentLevel}</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-jillr-darkBlue/50 flex items-center justify-center mb-1">
                  <Zap size={24} className="text-jillr-neonPurple" />
                </div>
                <span className="text-xs">{currentXP} XP</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-jillr-darkBlue/50 flex items-center justify-center mb-1">
                  <Coins size={24} className="text-jillr-neonGreen" />
                </div>
                <span className="text-xs">{userProfile.coins || 0} Coins</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Unlocked items */}
        <Card className="flex-1 border-jillr-neonPurple/20">
          <CardHeader>
            <CardTitle>Freigeschaltete Items</CardTitle>
            <CardDescription>Items, die du durch dein Level freischalten konntest</CardDescription>
          </CardHeader>
          <CardContent>
            {unlockedItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="mx-auto h-12 w-12 mb-2 opacity-30" />
                <p>Du hast noch keine Items freigeschaltet</p>
                <p className="text-sm">Steige im Level auf, um Items freizuschalten</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {unlockedItems.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg flex items-center gap-3 bg-jillr-darkBlue/10">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs py-0">
                          {item.unlockedAt}
                        </Badge>
                        {item.type === 'head' && <Hat size={12} />}
                        {item.type === 'body' && <Shirt size={12} />}
                        {item.type === 'face' && <Glasses size={12} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming items */}
        <Card className="border-jillr-neonPurple/20">
          <CardHeader>
            <CardTitle>Kommende Items</CardTitle>
            <CardDescription>Items, die du durch Level-Aufstieg freischalten kannst</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="mx-auto h-12 w-12 mb-2 opacity-30" />
                <p>Alle Items freigeschaltet</p>
                <p className="text-sm">Du hast bereits alle levelbasierten Items freigeschaltet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {upcomingItems.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg flex items-center gap-3 bg-jillr-darkBlue/10">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative opacity-70">
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Award size={20} className="text-jillr-neonPink" />
                      </div>
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs py-0">
                          {item.unlocksAt}
                        </Badge>
                        {item.type === 'head' && <Hat size={12} />}
                        {item.type === 'body' && <Shirt size={12} />}
                        {item.type === 'face' && <Glasses size={12} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Purchased items */}
        <Card className="border-jillr-neonPurple/20">
          <CardHeader>
            <CardTitle>Gekaufte Items</CardTitle>
            <CardDescription>Items, die du mit Coins oder XP erworben hast</CardDescription>
          </CardHeader>
          <CardContent>
            {purchasedItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Coins className="mx-auto h-12 w-12 mb-2 opacity-30" />
                <p>Keine gekauften Items</p>
                <p className="text-sm">Besuche den Shop, um Items zu kaufen</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {purchasedItems.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg flex items-center gap-3 bg-jillr-darkBlue/10">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs py-0 bg-jillr-neonGreen/10 border-jillr-neonGreen/20 text-jillr-neonGreen">
                          <Coins size={10} className="mr-1" />
                          {item.cost} {item.purchasedWith === 'coins' ? 'Coins' : 'XP'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {isCustomizing && (
        <AvatarCustomizationModal
          isOpen={isCustomizing}
          onClose={() => setIsCustomizing(false)}
          userLevel={currentLevel}
          userCoins={userProfile.coins || 0}
          userXp={currentXP}
          initialAvatar={currentAvatar}
          onAvatarChange={handleAvatarChange}
        />
      )}
    </div>
  );
};

export default AvatarTab;
