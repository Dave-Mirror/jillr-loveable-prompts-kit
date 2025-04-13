
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endDate: string | Date;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      
      if (difference <= 0) {
        setIsCompleted(true);
        onComplete?.();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  if (isCompleted) {
    return (
      <div className="flex items-center justify-center p-2 rounded-lg bg-destructive/20 text-destructive">
        <Clock size={16} className="mr-2" />
        <span className="text-sm font-medium">Challenge ended</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 p-2 rounded-lg glassmorphism">
      <Clock size={16} className="text-jillr-neonPink mr-1" />
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">{formatNumber(timeLeft.days)}</span>
              <span className="text-xs text-muted-foreground">d</span>
            </div>
            <span className="text-muted-foreground">:</span>
          </>
        )}
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">{formatNumber(timeLeft.hours)}</span>
          <span className="text-xs text-muted-foreground">h</span>
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">{formatNumber(timeLeft.minutes)}</span>
          <span className="text-xs text-muted-foreground">m</span>
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">{formatNumber(timeLeft.seconds)}</span>
          <span className="text-xs text-muted-foreground">s</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
