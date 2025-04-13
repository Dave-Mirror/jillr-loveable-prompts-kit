
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart, LinkIcon, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from '@/types/dashboard';
import { useToast } from '@/hooks/use-toast';

interface ShopTabProps {
  products: Product[];
}

const ShopTab: React.FC<ShopTabProps> = ({ products }) => {
  const { toast } = useToast();

  const copyTrackingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link kopiert!",
      description: "Der Tracking-Link wurde in die Zwischenablage kopiert.",
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold">TikTok Shop Produkte</h2>
        <Button variant="outline" className="mt-2 md:mt-0">
          <ShoppingBag size={16} className="mr-2" /> Neues Produkt
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              <Badge className="absolute top-2 right-2 bg-jillr-neonGreen text-background">
                ${product.price}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>
                <div className="flex justify-between">
                  <span><Eye size={14} className="inline mr-1" />{Math.floor(Math.random() * 1000) + 100}</span>
                  <span><Heart size={14} className="inline mr-1" />{Math.floor(Math.random() * 100) + 10}</span>
                  <span><ShoppingBag size={14} className="inline mr-1" />{product.sales}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-2">
                <span className="text-muted-foreground">Tracking-Link:</span>
                <div className="flex mt-1">
                  <input 
                    type="text" 
                    value={product.trackingLink} 
                    readOnly 
                    className="flex-1 px-3 py-1 text-xs rounded-l-md bg-muted"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-l-none"
                    onClick={() => copyTrackingLink(product.trackingLink)}
                  >
                    <LinkIcon size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex justify-between items-center w-full text-sm">
                <span><span className="text-muted-foreground">Provision:</span> ${(product.commission * product.sales).toFixed(2)}</span>
                <Button size="sm" variant="ghost" className="p-0">
                  <ExternalLink size={14} className="mr-1" /> TikTok Shop
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopTab;
