
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Gift } from 'lucide-react';

const OnboardingRewards: React.FC = () => {
  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-full h-64 rounded-xl overflow-hidden bg-jillr-darkBlue mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-jillr-neonPurple/20 to-jillr-neonPink/20" />
          
          <motion.div
            className="h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-3 gap-4 p-6 relative z-10">
              <RewardCard 
                icon={<Trophy className="h-8 w-8 text-jillr-neonPurple" />}
                value="500XP"
                label="Challenge Points"
              />
              <RewardCard 
                icon={<Gift className="h-8 w-8 text-jillr-neonGreen" />}
                value="200"
                label="Coins"
              />
              <RewardCard 
                icon={<Star className="h-8 w-8 text-yellow-500" />}
                value="Level 2"
                label="Status"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <p className="text-lg text-white/80 mb-6">
        Löse Challenges, bekomme XP und verdiene echte Belohnungen durch deine Kreativität.
      </p>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="p-3 rounded-lg bg-jillr-darkAccent/60 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-jillr-neonPurple/20 mr-3">
              <Trophy size={16} className="text-jillr-neonPurple" />
            </div>
            <span className="text-sm text-white">Challenge abschließen</span>
          </div>
          <span className="badge-xp">+100XP</span>
        </div>
        
        <div className="p-3 rounded-lg bg-jillr-darkAccent/60 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-jillr-neonGreen/20 mr-3">
              <Gift size={16} className="text-jillr-neonGreen" />
            </div>
            <span className="text-sm text-white">Coins einlösen</span>
          </div>
          <span className="badge-coin">Rewards</span>
        </div>
      </motion.div>
    </div>
  );
};

const RewardCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ 
  icon, value, label 
}) => {
  return (
    <motion.div
      className="bg-jillr-darkAccent rounded-lg p-3 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {icon}
      <p className="font-bold mt-2">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </motion.div>
  );
};

export default OnboardingRewards;
