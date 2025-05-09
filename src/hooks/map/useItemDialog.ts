
import { useState, useCallback } from 'react';
import { MapElement } from '@/types/livemap';

export function useItemDialog() {
  const [selectedItem, setSelectedItem] = useState<MapElement | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleItemClick = useCallback((item: any) => {
    // Ensure item has all required properties for a MapElement
    if (item && item.title && item.description) {
      const mapElement: MapElement = {
        id: item.id || `info-${Date.now()}`,
        type: item.type || 'challenge',
        title: item.title,
        description: item.description,
        position: {
          x: 0, // Default values
          y: 0
        }
      };
      setSelectedItem(mapElement);
      setIsDetailsOpen(true);
    }
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDetailsOpen(false);
    // Optional: Add a small delay before clearing the selected marker
    // so the closing animation can complete
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  return {
    selectedItem,
    isDetailsOpen,
    handleItemClick,
    handleCloseDialog
  };
}
