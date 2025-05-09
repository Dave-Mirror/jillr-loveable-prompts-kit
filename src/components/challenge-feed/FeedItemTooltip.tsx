
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const FeedItemTooltip: React.FC = () => {
  return (
    <div className="absolute top-4 right-4">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/30 backdrop-blur-md h-8 w-8"
        onClick={() => toast({
          title: "Impact Points",
          description: "Support content that makes a positive difference! When you engage with this content, you help amplify its reach and impact.",
        })}
      >
        <Info className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
};

export default FeedItemTooltip;
