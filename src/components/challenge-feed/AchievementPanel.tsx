
import React from 'react';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedItem } from '@/utils/challenge/feed';

interface AchievementPanelProps {
  item: FeedItem;
  showAchievement: string | null;
  toggleAchievement: (id: string | null) => void;
}

const AchievementPanel: React.FC<AchievementPanelProps> = ({ 
  item, 
  showAchievement, 
  toggleAchievement 
}) => {
  if (!item.achievements || item.achievements.length === 0) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {showAchievement === item.id && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 rounded-t-xl"
        >
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Award className="h-5 w-5 mr-2 text-jillr-neonPurple" />
            Achievements Unlocked
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.achievements.map(achievement => (
              <div key={achievement.id} className="bg-jillr-dark p-3 rounded-lg flex items-center space-x-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="text-white font-medium">{achievement.name}</p>
                  <p className="text-jillr-neonPurple text-xs">+25 points</p>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2 text-white/70"
            onClick={() => toggleAchievement(null)}
          >
            Close
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPanel;
