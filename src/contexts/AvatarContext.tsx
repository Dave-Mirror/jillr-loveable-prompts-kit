
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types for avatar items
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

interface AvatarContextType {
  avatarUrl: string;
  equippedItems: Record<string, AvatarItem>;
  ownedItems: AvatarItem[];
  availableItems: AvatarItem[];
  updateAvatarUrl: (url: string) => void;
  equipItem: (item: AvatarItem) => void;
  unequipItem: (type: string) => void;
  purchaseItem: (itemId: string) => boolean;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Avatar URL state
  const [avatarUrl, setAvatarUrl] = useState<string>('https://placehold.co/200x200/9b87f5/FFFFFF/png?text=JC');
  
  // Equipped items state - one per slot
  const [equippedItems, setEquippedItems] = useState<Record<string, AvatarItem>>({});
  
  // Mock initial items - would be loaded from the database in a real app
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
    // More items...
  ]);
  
  // Compute owned items
  const ownedItems = availableItems.filter(item => item.isOwned);
  
  // Update avatar URL
  const updateAvatarUrl = (url: string) => {
    setAvatarUrl(url);
  };
  
  // Equip an item
  const equipItem = (item: AvatarItem) => {
    if (!item.isOwned) return;
    
    // Update equipped items
    setEquippedItems(prev => {
      const updated = { ...prev };
      updated[item.type] = item;
      return updated;
    });
    
    // Update available items
    setAvailableItems(prev => 
      prev.map(availableItem => {
        if (availableItem.id === item.id) {
          return { ...availableItem, isEquipped: true };
        }
        
        if (availableItem.type === item.type && availableItem.isEquipped) {
          return { ...availableItem, isEquipped: false };
        }
        
        return availableItem;
      })
    );
  };
  
  // Unequip an item
  const unequipItem = (type: string) => {
    setEquippedItems(prev => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
    
    // Update available items
    setAvailableItems(prev => 
      prev.map(availableItem => {
        if (availableItem.type === type && availableItem.isEquipped) {
          return { ...availableItem, isEquipped: false };
        }
        return availableItem;
      })
    );
  };
  
  // Purchase an item
  const purchaseItem = (itemId: string): boolean => {
    const item = availableItems.find(item => item.id === itemId);
    
    if (!item || item.isOwned || !item.cost) {
      return false;
    }
    
    // In a real app, this would check if the user has enough coins/XP
    // and make a backend call to process the purchase
    
    // Update the item to be owned
    setAvailableItems(prev => 
      prev.map(availableItem => {
        if (availableItem.id === itemId) {
          return { ...availableItem, isOwned: true };
        }
        return availableItem;
      })
    );
    
    return true;
  };
  
  return (
    <AvatarContext.Provider value={{
      avatarUrl,
      equippedItems,
      ownedItems,
      availableItems,
      updateAvatarUrl,
      equipItem,
      unequipItem,
      purchaseItem
    }}>
      {children}
    </AvatarContext.Provider>
  );
};

// Hook to use the avatar context
export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
