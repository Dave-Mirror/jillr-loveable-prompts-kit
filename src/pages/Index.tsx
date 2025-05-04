
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Trophy, Map, Wallet, User, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import PageContainer from '@/components/navigation/PageContainer';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onboardingSteps = [
    {
      title: "Willkommen bei Jillr",
      description: "Tritt der kreativsten UGC-Community bei & verdiene Belohnungen!",
      image: "/assets/onboarding-intro.webp",
      cta: "Loslegen",
      onClick: () => setCurrentStep(1)
    },
    {
      title: "Verdiene während du kreativ bist",
      description: "Löse Challenges, bekomme XP und verdiene echte Belohnungen durch deine Kreativität.",
      image: "/assets/onboarding-rewards.webp",
      cta: "Weiter",
      onClick: () => setCurrentStep(2)
    },
    {
      title: "Entdecke lokale Challenges",
      description: "Finde Challenges in deiner Nähe und nimm an exklusiven Events teil.",
      image: "/assets/onboarding-map.webp",
      cta: "Jetzt starten",
      onClick: () => navigate('/auth')
    },
  ];

  const currentStepData = onboardingSteps[currentStep];
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <PageContainer nextPage="/explore">
      <div className="min-h-[calc(100vh-90px)] flex flex-col">
        {/* Onboarding Steps */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
          <motion.div 
            key={currentStep}
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            className="max-w-md w-full mx-auto text-center"
          >
            <div className="mb-8 relative">
              <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-jillr-darkBlue mb-4">
                <div className="w-full h-full bg-gradient-to-br from-jillr-neonPurple/30 to-jillr-neonBlue/30 flex items-center justify-center">
                  <div className="p-6 rounded-full bg-jillr-neonPurple/20 animate-pulse">
                    {currentStep === 0 ? (
                      <Zap size={48} className="text-jillr-neonPurple" />
                    ) : currentStep === 1 ? (
                      <Trophy size={48} className="text-jillr-neonPurple" />
                    ) : (
                      <Map size={48} className="text-jillr-neonPurple" />
                    )}
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{currentStepData.title}</h1>
              <p className="text-muted-foreground mb-8">{currentStepData.description}</p>
              
              <Button 
                onClick={currentStepData.onClick} 
                className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/90 text-white w-full py-6"
                size="lg"
              >
                {currentStepData.cta} <ArrowRight className="ml-2" />
              </Button>
              
              <div className="flex justify-center mt-6 gap-2">
                {onboardingSteps.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${currentStep === index ? 'bg-jillr-neonPurple' : 'bg-gray-500/30'}`}
                    onClick={() => setCurrentStep(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Features Section */}
        <div className="w-full bg-jillr-dark py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Was dich bei Jillr erwartet</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FeatureCard 
                icon={<Zap size={20} />} 
                title="Kreative Challenges"
                description="Nimm an einzigartigen Challenges teil"
              />
              <FeatureCard 
                icon={<Trophy size={20} />} 
                title="Verdiene Rewards"
                description="Gewinne echte Preise und Rabatte"
              />
              <FeatureCard 
                icon={<Star size={20} />} 
                title="Werde bekannt"
                description="Steige in der Rangliste auf"
              />
              <FeatureCard 
                icon={<Wallet size={20} />} 
                title="Sammle Coins"
                description="Nutze Coins für exklusive Vorteile"
              />
            </div>
            
            <div className="flex justify-center mt-8">
              {currentStep < 2 ? (
                <Button
                  variant="outline" 
                  className="border-jillr-neonPurple text-jillr-neonPurple"
                  onClick={() => navigate('/auth')}
                >
                  Direkt anmelden
                </Button>
              ) : (
                <Button
                  variant="outline" 
                  className="border-jillr-neonPurple text-jillr-neonPurple"
                  onClick={() => navigate('/explore')}
                >
                  Challenges entdecken
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action for Registration at Bottom */}
        <div className="w-full bg-gradient-to-r from-jillr-darkBlue to-jillr-dark p-6 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2">Bereit loszulegen?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Registriere dich jetzt und erhalte 500 XP & einen exklusiven Gutschein!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate('/auth')} 
                className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/90"
              >
                Jetzt registrieren
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/explore')} 
              >
                Challenges anschauen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-jillr-darkBlue/50 p-4 rounded-lg border border-jillr-neonPurple/20 text-center">
    <div className="flex justify-center mb-3">
      <div className="p-2 rounded-full bg-jillr-neonPurple/20 text-jillr-neonPurple">
        {icon}
      </div>
    </div>
    <h3 className="text-sm font-medium mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export default Index;
