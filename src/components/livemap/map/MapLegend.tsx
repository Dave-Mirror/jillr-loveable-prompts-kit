
import React from 'react';
import { Gift, Package, Target, Users, Camera, MapPin } from 'lucide-react';

type MapMode = 'all' | 'challenges' | 'eastereggs' | 'ugc' | 'cityclash';

interface MapLegendProps {
  mode?: MapMode;
}

const MapLegend: React.FC<MapLegendProps> = ({ mode = 'all' }) => {
  // Bestimme die anzuzeigenden Legendenelemente basierend auf dem Modus
  const getLegendItems = () => {
    switch(mode) {
      case 'challenges':
        return [
          { icon: <Target className="h-4 w-4 text-red-500" />, label: 'Challenges' },
        ];
      case 'eastereggs':
        return [
          { icon: <Gift className="h-4 w-4 text-yellow-500" />, label: 'Easter Eggs' },
        ];
      case 'ugc':
        return [
          { icon: <Camera className="h-4 w-4 text-blue-500" />, label: 'UGC Content' },
          { icon: <MapPin className="h-4 w-4 text-purple-500" />, label: 'Brands' },
        ];
      case 'cityclash':
        return [
          { icon: <Users className="h-4 w-4 text-purple-500" />, label: 'City Clash' },
        ];
      default:
        return [
          { icon: <Gift className="h-4 w-4 text-yellow-500" />, label: 'Easter Eggs' },
          { icon: <Package className="h-4 w-4 text-blue-500" />, label: 'Drops' },
          { icon: <Target className="h-4 w-4 text-red-500" />, label: 'Challenges' },
          { icon: <Users className="h-4 w-4 text-purple-500" />, label: 'Team Events' },
          { icon: <Camera className="h-4 w-4 text-green-500" />, label: 'UGC' },
        ];
    }
  };

  return (
    <div className="absolute bottom-3 left-3 bg-jillr-dark/80 backdrop-blur-sm border border-jillr-border p-2 rounded-lg">
      <div className="flex flex-col gap-1.5 text-xs">
        {getLegendItems().map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            {item.icon}
            <span className="text-white">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
