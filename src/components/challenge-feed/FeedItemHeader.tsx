
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FeedItem } from '@/utils/challenge/feed';

interface FeedItemHeaderProps {
  item: FeedItem;
}

const FeedItemHeader: React.FC<FeedItemHeaderProps> = ({ item }) => {
  return (
    <div className="absolute top-4 left-4 flex items-center">
      <Avatar className="h-10 w-10 border-2 border-white">
        <AvatarImage src={item.userAvatar} alt={item.username} />
        <AvatarFallback>{item.username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-2">
        <p className="font-semibold text-white">{item.username}</p>
        <p className="text-xs text-gray-300">@{item.username}</p>
      </div>
      
      <Badge className="ml-2">
        {item.challengeInfo?.title || 'Challenge'}
      </Badge>
    </div>
  );
};

export default FeedItemHeader;
