
import React from 'react';
import { Trophy, Zap, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
          className="flex items-center justify-center"
        >
          <div className="absolute w-20 h-20 rounded-full border-t-4 border-jillr-neonPurple/70 border-r-4 border-r-transparent"></div>
          <div className="absolute w-14 h-14 rounded-full border-t-4 border-jillr-neonGreen/70 border-r-4 border-r-transparent"></div>
          <div className="absolute w-8 h-8 rounded-full border-t-4 border-jillr-neonPink/70 border-r-4 border-r-transparent"></div>
        </motion.div>
        
        <Trophy className="h-10 w-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <motion.div 
        className="mt-6 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xl font-medium mb-2">Leaderboard wird geladen...</p>
        <p className="text-gray-400 text-center max-w-sm">
          Wir bereiten die neusten Ranglisten vor, einen Moment bitte...
        </p>
        
        <div className="flex items-center gap-4 mt-6">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center text-jillr-neonPurple"
          >
            <Trophy className="h-6 w-6" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="flex items-center text-jillr-neonGreen"
          >
            <Zap className="h-6 w-6" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="flex items-center text-jillr-neonPink"
          >
            <Medal className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
