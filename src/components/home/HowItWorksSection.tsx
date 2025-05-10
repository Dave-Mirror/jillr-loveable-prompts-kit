
import React from 'react';
import { CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "1. Registrieren",
      description: "Erstelle ein kostenloses Konto und richte deinen Avatar ein.",
    },
    {
      title: "2. Challenges entdecken",
      description: "Finde Challenges, die zu deinem Stil und deinen Interessen passen.",
    },
    {
      title: "3. Kreativ werden",
      description: "Erstelle einzigartigen Content und reiche ihn für Challenges ein.",
    },
    {
      title: "4. Belohnungen erhalten",
      description: "Verdiene XP, Coins und reale Belohnungen für deine Kreativität.",
    }
  ];
  
  return (
    <div className="py-16 px-4 bg-jillr-darkAccent/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">So funktioniert Jillr</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In wenigen Schritten kannst du Teil der kreativsten UGC-Community werden und für deine Kreativität belohnt werden.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-jillr-darkBlue/50 rounded-lg p-6 border border-jillr-neonPurple/20 hover:border-jillr-neonPurple/40 transition-all hover:translate-y-[-5px]"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-jillr-neonPurple/20 text-jillr-neonPurple mx-auto">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
              <p className="text-muted-foreground text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
