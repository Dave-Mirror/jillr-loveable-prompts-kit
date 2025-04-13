
import React from 'react';
import { Clock, MapPin, Award, Video } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

type ChallengeDetailsProps = {
  challenge: any;
}

export const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({ challenge }) => {
  return (
    <Accordion type="single" collapsible className="w-full mb-6">
      <AccordionItem value="details">
        <AccordionTrigger className="text-xl font-semibold">
          Details & Anforderungen
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-jillr-neonPink" />
                <div>
                  <div className="font-semibold">Zeitraum</div>
                  <div className="text-sm">
                    {new Date(challenge.start_date).toLocaleDateString()} bis {new Date(challenge.end_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              {challenge.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-jillr-neonPink" />
                  <div>
                    <div className="font-semibold">Ort</div>
                    <div className="text-sm">{challenge.location}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Award size={20} className="text-jillr-neonPink" />
                <div>
                  <div className="font-semibold">Belohnung</div>
                  <div className="text-sm">{challenge.coin_reward || 0} Coins & {challenge.xp_reward || 0} XP</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Video size={20} className="text-jillr-neonPink" />
                <div>
                  <div className="font-semibold">Format</div>
                  <div className="text-sm">
                    {challenge.required_format || 'Video (empfohlen: 9:16 Verhältnis für TikTok)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
