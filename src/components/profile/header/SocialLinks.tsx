
import React from 'react';
import { Instagram, Youtube, Twitch, Twitter } from 'lucide-react';
import { TiktokIcon } from '@/components/ui/icons/TiktokIcon';

interface SocialLinksProps {
  socialLinks?: {
    tiktok?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
    twitter?: string;
  };
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  if (!socialLinks) return null;
  
  const hasLinks = Object.values(socialLinks).some(link => !!link);
  
  if (!hasLinks) return null;

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 my-3">
      {socialLinks.tiktok && (
        <a 
          href={`https://tiktok.com/@${socialLinks.tiktok}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-md bg-jillr-darkBlue/80 flex items-center justify-center hover:bg-jillr-neonPurple/20 transition-colors"
        >
          <TiktokIcon size={16} />
        </a>
      )}
      
      {socialLinks.instagram && (
        <a 
          href={`https://instagram.com/${socialLinks.instagram}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-md bg-jillr-darkBlue/80 flex items-center justify-center hover:bg-jillr-neonPurple/20 transition-colors"
        >
          <Instagram size={16} />
        </a>
      )}
      
      {socialLinks.youtube && (
        <a 
          href={`https://youtube.com/@${socialLinks.youtube}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-md bg-jillr-darkBlue/80 flex items-center justify-center hover:bg-jillr-neonPurple/20 transition-colors"
        >
          <Youtube size={16} />
        </a>
      )}
      
      {socialLinks.twitch && (
        <a 
          href={`https://twitch.tv/${socialLinks.twitch}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-md bg-jillr-darkBlue/80 flex items-center justify-center hover:bg-jillr-neonPurple/20 transition-colors"
        >
          <Twitch size={16} />
        </a>
      )}
      
      {socialLinks.twitter && (
        <a 
          href={`https://twitter.com/${socialLinks.twitter}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-md bg-jillr-darkBlue/80 flex items-center justify-center hover:bg-jillr-neonPurple/20 transition-colors"
        >
          <Twitter size={16} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
