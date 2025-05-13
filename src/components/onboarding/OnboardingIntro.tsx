
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const OnboardingIntro: React.FC = () => {
  return (
    <div className="text-center">
      <div className="mb-8 relative">
        <div className="w-full h-64 rounded-xl overflow-hidden bg-jillr-darkBlue flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-jillr-neonPurple/20 to-jillr-neonBlue/20 animate-pulse rounded-full" style={{ filter: 'blur(30px)' }} />
            
            <div className="p-8 rounded-full bg-jillr-neonPurple/20 relative z-10">
              <Zap size={72} className="text-jillr-neonPurple animate-bounce-subtle" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <p className="text-lg text-white/80 mb-6">
        Tritt der kreativsten UGC-Community bei & verdiene Belohnungen!
      </p>
      
      <motion.div 
        className="flex gap-3 justify-center flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="px-3 py-2 rounded-full bg-jillr-darkAccent text-sm text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-jillr-neonPurple"></span>
          Community-Challenges
        </div>
        <div className="px-3 py-2 rounded-full bg-jillr-darkAccent text-sm text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-jillr-neonBlue"></span>
          Echte Belohnungen
        </div>
        <div className="px-3 py-2 rounded-full bg-jillr-darkAccent text-sm text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-jillr-neonGreen"></span>
          XP & Coins sammeln
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingIntro;
