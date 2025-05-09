
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Flame, Star, Award, MapPin, Music, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const TemplatesTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Sample templates with expanded metadata
  const templates = [
    {
      id: 'template1',
      title: 'TikTok Transition Trend',
      thumbnail: '/placeholder.svg',
      featured: true,
      type: 'trend',
      views: '3.2M',
      engagement: '98%',
      isAI: true,
      industries: ['beauty', 'fashion']
    },
    {
      id: 'template2',
      title: 'Beauty Transformation',
      thumbnail: '/placeholder.svg',
      featured: false,
      type: 'before_after',
      views: '1.8M',
      engagement: '95%',
      isAI: true,
      industries: ['beauty']
    },
    {
      id: 'template3',
      title: 'Before & After',
      thumbnail: '/placeholder.svg',
      featured: false,
      type: 'before_after',
      views: '2.1M',
      engagement: '92%',
      isAI: false,
      industries: ['fitness', 'fashion']
    },
    {
      id: 'template4',
      title: 'Product Showcase',
      thumbnail: '/placeholder.svg',
      featured: true,
      type: 'product_review',
      views: '1.5M',
      engagement: '89%',
      isAI: true,
      industries: ['beauty', 'fashion']
    },
    {
      id: 'template5',
      title: 'Dance Challenge',
      thumbnail: '/placeholder.svg',
      featured: false,
      type: 'trend',
      views: '4.7M',
      engagement: '97%',
      isAI: false,
      industries: ['entertainment']
    },
    {
      id: 'template6',
      title: 'Tutorial Style',
      thumbnail: '/placeholder.svg',
      featured: false,
      type: 'tutorial',
      views: '1.2M',
      engagement: '88%',
      isAI: true,
      industries: ['education', 'beauty']
    },
  ];
  
  // Sample geo-restricted templates
  const geoTemplates = [
    {
      id: 'geo1',
      title: 'Store Exclusive AR Filter',
      thumbnail: '/placeholder.svg',
      location: 'Berlin Fashion Store',
      distance: '0.5 km',
      type: 'ar'
    },
    {
      id: 'geo2',
      title: 'Restaurant Special',
      thumbnail: '/placeholder.svg',
      location: 'Gourmet Delight, Hamburg',
      distance: '5.2 km',
      type: 'food'
    },
    {
      id: 'geo3',
      title: 'Event Exclusive',
      thumbnail: '/placeholder.svg',
      location: 'Munich Tech Expo',
      distance: 'Not Available',
      type: 'event'
    },
  ];

  // Filter templates based on search and active tab
  const filteredTemplates = templates.filter(template => {
    if (searchQuery) {
      return template.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    switch (activeTab) {
      case 'trending':
        return template.featured;
      case 'ai':
        return template.isAI;
      case 'brand':
        return template.type === 'product_review';
      case 'all':
      default:
        return true;
    }
  });
  
  const handleTemplateSelect = (templateId: string) => {
    toast({
      title: "Template ausgewählt",
      description: "Das Template wird auf dein Video angewendet und optimiert.",
    });
  };
  
  const handleGeoTemplateSelect = (templateId: string) => {
    const template = geoTemplates.find(t => t.id === templateId);
    
    if (template && template.distance !== 'Not Available') {
      toast({
        title: "Geo-Template verfügbar!",
        description: `Du kannst dieses exklusive AR-Template bei ${template.location} nutzen.`,
      });
    } else {
      toast({
        title: "Geo-Template nicht verfügbar",
        description: "Du musst dich in der Nähe des Standorts befinden, um dieses Template freizuschalten.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Templates & Vorlagen</h3>
        <div className="relative w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Templates suchen..." 
            className="pl-9 h-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="trending" className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> Trending
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> KI-optimiert
          </TabsTrigger>
          <TabsTrigger value="brand" className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> Marken
          </TabsTrigger>
          <TabsTrigger value="geo" className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> Geo-Templates
          </TabsTrigger>
          <TabsTrigger value="all">Alle anzeigen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geo">
          <div className="mb-3">
            <h4 className="text-base font-medium flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-jillr-neonPurple" />
              Standort-basierte Templates
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Diese exklusiven Templates sind nur an bestimmten Standorten verfügbar. Besuche die Locations um zusätzliche AR-Effekte freizuschalten.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {geoTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="relative overflow-hidden rounded-md border border-gray-700 bg-card"
                  onClick={() => handleGeoTemplateSelect(template.id)}
                >
                  <div className="aspect-[9/16] bg-gray-800 relative">
                    <img 
                      src={template.thumbnail} 
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                      <h4 className="text-sm font-medium text-white mb-1">{template.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <MapPin className="h-3 w-3" />
                        {template.location}
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant={template.distance !== 'Not Available' ? 'default' : 'destructive'} className="text-xs">
                          {template.distance !== 'Not Available' ? 'Verfügbar' : 'Nicht verfügbar'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.type === 'ar' ? 'AR-Filter' : template.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value={activeTab !== 'geo' ? activeTab : ''}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id}
                className="relative group cursor-pointer"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="aspect-[9/16] bg-gray-800 rounded-md overflow-hidden relative">
                  <img 
                    src={template.thumbnail} 
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
                      Anwenden
                    </Button>
                  </div>
                  <div className="absolute top-0 left-0 right-0 p-1.5 flex items-center justify-between">
                    {template.featured && (
                      <Badge className="bg-jillr-neonPurple text-white text-xs flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        <span>Trending</span>
                      </Badge>
                    )}
                    {template.isAI && (
                      <Badge className="bg-black/60 text-white text-xs ml-auto">
                        <Sparkles className="h-2.5 w-2.5 mr-1" />
                        <span>AI</span>
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center text-xs text-white">
                      <span>{template.views} Views</span>
                      <span className="text-green-400">{template.engagement}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1.5 space-y-1">
                  <p className="text-xs font-medium truncate">{template.title}</p>
                  <div className="flex gap-1">
                    {template.industries.map((industry) => (
                      <Badge key={industry} variant="outline" className="text-[0.6rem] py-0 px-1">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Music className="h-4 w-4 text-jillr-neonPurple" />
          AI-Musik & Sound
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex items-center justify-center gap-2">
            <img src="/placeholder.svg" alt="CapCut" className="h-5 w-5" />
            <span>CapCut Sounds importieren</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-jillr-neonPurple" />
            <span>KI Soundtrack generieren</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesTool;
