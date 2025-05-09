
import React from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface RankChangeIndicatorProps {
  change: number;
}

const RankChangeIndicator: React.FC<RankChangeIndicatorProps> = ({ change }) => {
  if (change === 0) {
    return <Minus className="h-3 w-3 text-gray-400" />;
  }

  if (change > 0) {
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-jillr-neonGreen flex items-center text-xs"
      >
        <ChevronUp className="h-3 w-3" />
        <span className="text-xs">{change}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="text-jillr-neonPink flex items-center text-xs"
    >
      <ChevronDown className="h-3 w-3" />
      <span className="text-xs">{Math.abs(change)}</span>
    </motion.div>
  );
};

export default RankChangeIndicator;
