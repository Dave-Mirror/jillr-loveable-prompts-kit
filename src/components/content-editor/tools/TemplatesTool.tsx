
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const TemplatesTool: React.FC = () => {
  // Sample templates
  const templates = [
    {
      id: 'template1',
      title: 'TikTok Trend',
      thumbnail: '/placeholder.svg',
      featured: true,
    },
    {
      id: 'template2',
      title: 'Beauty Transformation',
      thumbnail: '/placeholder.svg',
      featured: false,
    },
    {
      id: 'template3',
      title: 'Before & After',
      thumbnail: '/placeholder.svg',
      featured: false,
    },
    {
      id: 'template4',
      title: 'Product Showcase',
      thumbnail: '/placeholder.svg',
      featured: true,
    },
    {
      id: 'template5',
      title: 'Dance Challenge',
      thumbnail: '/placeholder.svg',
      featured: false,
    },
    {
      id: 'template6',
      title: 'Tutorial Style',
      thumbnail: '/placeholder.svg',
      featured: false,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Templates & Vorlagen</h3>
        <Button size="sm" variant="outline" className="text-xs">
          Alle anzeigen
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="relative group"
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
              {template.featured && (
                <div className="absolute top-2 right-2 bg-jillr-neonPurple text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span>Trending</span>
                </div>
              )}
            </div>
            <p className="mt-1 text-xs font-medium truncate">{template.title}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">CapCut Templates</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex items-center justify-center gap-2">
            <img src="/placeholder.svg" alt="CapCut" className="h-5 w-5" />
            <span>CapCut Import</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex items-center justify-center gap-2">
            <img src="/placeholder.svg" alt="Canva" className="h-5 w-5" />
            <span>Canva Import</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesTool;
