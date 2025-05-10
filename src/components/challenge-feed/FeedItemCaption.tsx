
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FeedItem } from '@/utils/challenge/feed';

interface FeedItemCaptionProps {
  item: FeedItem;
}

const FeedItemCaption: React.FC<FeedItemCaptionProps> = ({ item }) => {
  return (
    <div className="absolute bottom-24 left-4 right-12 max-w-[80%]">
      <p className="text-white mb-2">{item.caption}</p>
      <div className="flex flex-wrap gap-1">
        {item.hashtags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs bg-white/10">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FeedItemCaption;
