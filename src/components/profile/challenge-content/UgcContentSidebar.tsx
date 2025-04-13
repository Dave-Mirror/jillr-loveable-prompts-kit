
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Heart, ExternalLink } from 'lucide-react';

interface UgcContentSidebarProps {
  contentUploads: any[];
}

const UgcContentSidebar: React.FC<UgcContentSidebarProps> = ({ contentUploads }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My UGC Content</CardTitle>
        <CardDescription>Your uploaded challenge content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contentUploads.map(content => (
            <div key={content.id} className="flex gap-3">
              <div className="relative w-24 h-32 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={content.thumbnail} 
                  alt={content.title} 
                  className="object-cover w-full h-full"
                />
                {content.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-jillr-neonPink">Featured</Badge>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{content.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {content.challenge}
                </p>
                <div className="flex gap-3 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{content.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={12} />
                    <span>{content.likes}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-1 text-xs gap-1 h-7" asChild>
                  <a href={content.tiktokLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={12} /> View on TikTok
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UgcContentSidebar;
