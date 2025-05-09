
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const AvatarShopPreview: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-jillr-neonPurple/20 hover:border-jillr-neonPurple/50 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-jillr-neonPurple" />
          Avatar-Shop
        </CardTitle>
        <CardDescription>Personalisiere deinen Avatar mit einzigartigen Items</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-0">
        <div className="grid grid-cols-3 gap-2">
          <div className="w-20 h-20 rounded-lg bg-jillr-darkBlue/50 flex items-center justify-center overflow-hidden">
            <img src="https://placehold.co/100x100/9b87f5/ffffff?text=Hat1" alt="Hat" className="w-16 h-16 object-contain" />
          </div>
          <div className="w-20 h-20 rounded-lg bg-jillr-darkBlue/50 flex items-center justify-center overflow-hidden">
            <img src="https://placehold.co/100x100/9b87f5/ffffff?text=Shirt" alt="Shirt" className="w-16 h-16 object-contain" />
          </div>
          <div className="w-20 h-20 rounded-lg bg-jillr-darkBlue/50 flex items-center justify-center overflow-hidden">
            <img src="https://placehold.co/100x100/9b87f5/ffffff?text=Glasses" alt="Glasses" className="w-16 h-16 object-contain" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => navigate('/profile?tab=settings')}
        >
          Avatarshop öffnen
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AvatarShopPreview;
