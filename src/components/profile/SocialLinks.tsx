
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const SocialLinks = () => {
  // Mock data for social links - would come from database in real app
  const socialLinks = [
    { name: 'TikTok', url: '#', username: '@jillruser' },
    { name: 'Instagram', url: '#', username: '@jillr_user' },
    { name: 'YouTube', url: '#', username: 'JillrCreator' },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Social Media</h3>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((social, i) => (
          <Button 
            key={i} 
            variant="outline" 
            size="sm" 
            className="bg-jillr-darkBlue/30 border-jillr-neonBlue/20 text-xs"
            asChild
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              {social.name}: {social.username}
              <ExternalLink size={12} />
            </a>
          </Button>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-transparent border-dashed border-jillr-neonBlue/30 text-xs"
        >
          + Add social link
        </Button>
      </div>
    </div>
  );
};

export default SocialLinks;
