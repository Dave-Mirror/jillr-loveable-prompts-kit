
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  Shirt, Hat, Glasses, Clock, Star, ShoppingBag, 
  Coins, Award, Lock, CheckCircle  
} from 'lucide-react';

// Types for avatar customization
export interface AvatarItem {
  id: string;
  name: string;
  type: 'head' | 'face' | 'body' | 'accessory' | 'background';
  imageUrl: string;
  levelRequired: number;
  cost: number | null; // null means already owned
  purchaseWith: 'coins' | 'xp' | 'impact' | null;
  isOwned: boolean;
  isEquipped: boolean;
}

interface AvatarCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel: number;
  userCoins: number;
  userXp: number;
  initialAvatar: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const AvatarCustomizationModal: React.FC<AvatarCustomizationModalProps> = ({ 
  isOpen, 
  onClose, 
  userLevel,
  userCoins,
  userXp,
  initialAvatar,
  onAvatarChange
}) => {
  const [activeTab, setActiveTab] = useState('head');
  const [previewAvatar, setPreviewAvatar] = useState(initialAvatar);
  const [selectedItems, setSelectedItems] = useState<Record<string, AvatarItem>>({});
  
  // Mock items for demonstration - in real app would come from database
  const [availableItems, setAvailableItems] = useState<AvatarItem[]>([
    // Head items
    {
      id: 'head-1',
      name: 'Standard Hat',
      type: 'head',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=Hat1',
      levelRequired: 1,
      cost: null,
      purchaseWith: null,
      isOwned: true,
      isEquipped: false
    },
    {
      id: 'head-2',
      name: 'Premium Hat',
      type: 'head',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=Hat2',
      levelRequired: 3,
      cost: 50,
      purchaseWith: 'coins',
      isOwned: false,
      isEquipped: false
    },
    // Face items
    {
      id: 'face-1',
      name: 'Sunglasses',
      type: 'face',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=Glasses',
      levelRequired: 1,
      cost: null,
      purchaseWith: null,
      isOwned: true,
      isEquipped: false
    },
    {
      id: 'face-2',
      name: 'VR Goggles',
      type: 'face',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=VR',
      levelRequired: 5,
      cost: 100,
      purchaseWith: 'xp',
      isOwned: false,
      isEquipped: false
    },
    // Body items
    {
      id: 'body-1',
      name: 'T-Shirt',
      type: 'body',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=Shirt',
      levelRequired: 1,
      cost: null,
      purchaseWith: null,
      isOwned: true,
      isEquipped: false
    },
    {
      id: 'body-2',
      name: 'Hoodie',
      type: 'body',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=Hoodie',
      levelRequired: 2,
      cost: 75,
      purchaseWith: 'coins',
      isOwned: false,
      isEquipped: false
    },
    // Accessories
    {
      id: 'accessory-1',
      name: 'Watch',
      type: 'accessory',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=Watch',
      levelRequired: 1,
      cost: null,
      purchaseWith: null,
      isOwned: true,
      isEquipped: false
    },
    {
      id: 'accessory-2',
      name: 'Necklace',
      type: 'accessory',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=Necklace',
      levelRequired: 4,
      cost: 150,
      purchaseWith: 'coins',
      isOwned: false,
      isEquipped: false
    },
    // Background
    {
      id: 'background-1',
      name: 'Standard Background',
      type: 'background',
      imageUrl: 'https://placehold.co/100x100/9b87f5/ffffff?text=BG1',
      levelRequired: 1,
      cost: null,
      purchaseWith: null,
      isOwned: true,
      isEquipped: false
    },
    {
      id: 'background-2',
      name: 'Premium Background',
      type: 'background',
      imageUrl: 'https://placehold.co/100x100/5f45d2/ffffff?text=BG2',
      levelRequired: 6,
      cost: 200,
      purchaseWith: 'impact',
      isOwned: false,
      isEquipped: false
    }
  ]);

  const handlePurchase = (item: AvatarItem) => {
    // In a real implementation, this would call a backend API to handle the purchase
    // and update the user's coins/XP
    if (!item.cost || item.isOwned) return;

    const updatedItems = availableItems.map(availableItem => {
      if (availableItem.id === item.id) {
        return { ...availableItem, isOwned: true };
      }
      return availableItem;
    });

    setAvailableItems(updatedItems);

    toast({
      title: `${item.name} purchased!`,
      description: `You've successfully purchased this item.`
    });
  };

  const handleItemSelect = (item: AvatarItem) => {
    if (!item.isOwned && item.levelRequired > userLevel) return;

    // Unequip any currently equipped item of the same type
    const updatedItems = availableItems.map(availableItem => {
      if (availableItem.type === item.type && availableItem.isEquipped) {
        return { ...availableItem, isEquipped: false };
      }
      if (availableItem.id === item.id) {
        return { ...availableItem, isEquipped: item.isOwned ? !item.isEquipped : item.isEquipped };
      }
      return availableItem;
    });

    setAvailableItems(updatedItems);
    
    // Update the selectedItems object
    const newSelectedItems = { ...selectedItems };
    
    if (item.isOwned) {
      if (!item.isEquipped) {
        newSelectedItems[item.type] = item;
      } else {
        delete newSelectedItems[item.type];
      }
      setSelectedItems(newSelectedItems);
    }

    // In a real app, this would generate a composite image based on the selected items
    // For now, we'll simulate changing the avatar by showing another placeholder
    if (item.isOwned && !item.isEquipped) {
      setPreviewAvatar(`https://placehold.co/200x200/9b87f5/ffffff?text=Custom%20Avatar`);
    }
  };

  const saveChanges = () => {
    // In a real implementation, this would send the selected items to a backend
    // to generate a composite avatar image and update the user's profile
    onAvatarChange(previewAvatar);
    toast({
      title: "Avatar updated!",
      description: "Your avatar has been successfully updated."
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Personalisiere deinen Avatar</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 overflow-hidden flex-1">
          {/* Avatar Preview */}
          <div className="flex-1 flex flex-col items-center justify-start">
            <div className="text-lg font-semibold mb-4">Avatar-Vorschau</div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-jillr-neonPurple mb-4">
              <img 
                src={previewAvatar} 
                alt="Avatar preview" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {Object.entries(selectedItems).map(([type, item]) => (
                <div key={item.id} className="flex items-center bg-jillr-darkBlue/50 rounded-full px-3 py-1">
                  <span className="text-sm">{item.name}</span>
                  <button 
                    className="ml-2 text-red-400 hover:text-red-500" 
                    onClick={() => handleItemSelect(item)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-6 justify-center">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Award className="h-5 w-5 text-jillr-neonPink" />
                  <span className="text-sm font-medium">Level {userLevel}</span>
                </div>
                <div className="text-xs text-gray-400">Für freigeschaltete Items</div>
              </div>
              
              <Separator orientation="vertical" className="h-10" />
              
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Coins className="h-5 w-5 text-jillr-neonGreen" />
                  <span className="text-sm font-medium">{userCoins}</span>
                </div>
                <div className="text-xs text-gray-400">Für Premium-Items</div>
              </div>
            </div>
          </div>
          
          {/* Customization Options */}
          <div className="flex-[1.5] flex flex-col">
            <Tabs defaultValue="head" value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="head" className="flex items-center gap-1">
                  <Hat className="h-4 w-4" />
                  <span className="hidden sm:inline">Kopf</span>
                </TabsTrigger>
                <TabsTrigger value="face" className="flex items-center gap-1">
                  <Glasses className="h-4 w-4" />
                  <span className="hidden sm:inline">Gesicht</span>
                </TabsTrigger>
                <TabsTrigger value="body" className="flex items-center gap-1">
                  <Shirt className="h-4 w-4" />
                  <span className="hidden sm:inline">Körper</span>
                </TabsTrigger>
                <TabsTrigger value="accessory" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Accessoires</span>
                </TabsTrigger>
                <TabsTrigger value="background" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Hintergrund</span>
                </TabsTrigger>
              </TabsList>
              
              {['head', 'face', 'body', 'accessory', 'background'].map((type) => (
                <TabsContent key={type} value={type} className="flex-1 overflow-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {availableItems
                      .filter(item => item.type === type)
                      .map((item) => {
                        const isDisabled = !item.isOwned && item.levelRequired > userLevel;
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`relative p-4 border rounded-lg flex flex-col items-center cursor-pointer hover:bg-jillr-darkBlue/30
                              ${item.isEquipped ? 'bg-jillr-neonPurple/20 border-jillr-neonPurple' : 'bg-jillr-darkBlue/10 border-jillr-darkBlue/20'}
                              ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}
                            `}
                            onClick={() => !isDisabled && handleItemSelect(item)}
                          >
                            <div className="absolute top-2 right-2">
                              {item.isOwned ? (
                                item.isEquipped ? (
                                  <CheckCircle className="h-5 w-5 text-jillr-neonGreen" />
                                ) : null
                              ) : (
                                <Lock className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            
                            <div className="w-16 h-16 rounded-lg overflow-hidden mb-2">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="text-sm font-medium text-center">{item.name}</div>
                            
                            {!item.isOwned && (
                              <div className="mt-2">
                                {item.levelRequired > userLevel ? (
                                  <div className="flex items-center text-xs text-amber-400">
                                    <Award className="h-3 w-3 mr-1" />
                                    Level {item.levelRequired}
                                  </div>
                                ) : item.cost ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-xs h-7 px-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePurchase(item);
                                    }}
                                  >
                                    {item.purchaseWith === 'coins' && <Coins className="h-3 w-3 mr-1" />}
                                    {item.purchaseWith === 'xp' && <Award className="h-3 w-3 mr-1" />}
                                    {item.cost} {item.purchaseWith === 'coins' ? 'Coins' : item.purchaseWith === 'xp' ? 'XP' : 'Points'}
                                  </Button>
                                ) : null}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Abbrechen</Button>
          <Button onClick={saveChanges}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCustomizationModal;
