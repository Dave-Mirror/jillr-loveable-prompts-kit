
import React from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin, Compass } from 'lucide-react';

const OnboardingMap: React.FC = () => {
  return (
    <div className="text-center">
      <div className="mb-8 relative">
        <div className="w-full h-64 rounded-xl overflow-hidden bg-jillr-darkBlue mb-4">
          {/* Map visualization */}
          <div className="w-full h-full bg-jillr-darkBlue relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,30,50,0.8),rgba(20,40,80,0.6))]">
              {/* Grid lines for map effect */}
              <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(155, 135, 245, 0.3)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map elements */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Map pins */}
              <motion.div 
                className="absolute top-1/4 left-1/3"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
              >
                <div className="p-1 rounded-full bg-jillr-neonBlue/30">
                  <MapPin size={24} className="text-jillr-neonBlue" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded-full bg-jillr-neonBlue/20 text-jillr-neonBlue">
                    Style Challenge
                  </span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-1/3 right-1/3"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.8,
                  delay: 0.3
                }}
              >
                <div className="p-1 rounded-full bg-jillr-neonGreen/30">
                  <MapPin size={24} className="text-jillr-neonGreen" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded-full bg-jillr-neonGreen/20 text-jillr-neonGreen">
                    AR Event
                  </span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-2/3 left-2/3"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  delay: 0.6
                }}
              >
                <div className="p-1 rounded-full bg-jillr-neonPink/30">
                  <MapPin size={24} className="text-jillr-neonPink" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                  <span className="text-xs px-2 py-1 rounded-full bg-jillr-neonPink/20 text-jillr-neonPink">
                    Reward Zone
                  </span>
                </div>
              </motion.div>

              {/* User position */}
              <motion.div 
                className="p-2 rounded-full bg-jillr-neonPurple shadow-lg shadow-jillr-neonPurple/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(155, 135, 245, 0.7)',
                    '0 0 0 10px rgba(155, 135, 245, 0)',
                    '0 0 0 0 rgba(155, 135, 245, 0.7)'
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2
                }}
              >
                <Compass size={24} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <p className="text-lg text-white/80 mb-6">
        Finde Challenges in deiner Nähe und nimm an exklusiven Events teil.
      </p>
      
      <motion.div 
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="p-3 rounded-lg bg-jillr-darkAccent/60 flex items-center gap-3 justify-start">
          <div className="p-2 rounded-full bg-jillr-neonBlue/20">
            <Map size={18} className="text-jillr-neonBlue" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">Live Map</div>
            <div className="text-xs text-white/60">Entdecke Challenges & Events in der Nähe</div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-jillr-darkAccent/60 flex items-center gap-3 justify-start">
          <div className="p-2 rounded-full bg-jillr-neonGreen/20">
            <MapPin size={18} className="text-jillr-neonGreen" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">AR Rewards</div>
            <div className="text-xs text-white/60">Sammle versteckte Belohnungen an echten Orten</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingMap;
