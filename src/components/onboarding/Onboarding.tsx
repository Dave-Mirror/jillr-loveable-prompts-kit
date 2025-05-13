
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import OnboardingIntro from './OnboardingIntro';
import OnboardingRewards from './OnboardingRewards';
import OnboardingMap from './OnboardingMap';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to auth/registration page
      navigate('/auth');
    }
  };

  const screens = [
    {
      title: "Willkommen bei Jillr",
      component: <OnboardingIntro />,
      buttonText: "Loslegen"
    },
    {
      title: "Verdiene während du kreativ bist",
      component: <OnboardingRewards />,
      buttonText: "Weiter"
    },
    {
      title: "Entdecke lokale Challenges",
      component: <OnboardingMap />,
      buttonText: "Jetzt starten"
    }
  ];

  const currentScreen = screens[currentStep];

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen bg-jillr-dark flex flex-col justify-between py-10 px-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
            {currentScreen.title}
          </h1>

          {currentScreen.component}
        </motion.div>
      </div>

      <div className="w-full max-w-md mx-auto mt-8">
        <Button 
          onClick={nextStep}
          className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPurpleDark"
          size="lg"
        >
          {currentScreen.buttonText}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="flex justify-center mt-6 gap-2">
          {[0, 1, 2].map(step => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentStep === step 
                  ? 'bg-jillr-neonPurple w-6' 
                  : 'bg-jillr-darkAccent'
              }`}
              aria-label={`Go to slide ${step + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
