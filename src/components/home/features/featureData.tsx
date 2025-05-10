
import { Play, Users, Star, Map } from "lucide-react";
import React from 'react';

export interface Feature {
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  iconType: 'play' | 'users' | 'star' | 'map';
  action: () => void;
}

export const getInitialFeatures = (navigate: (path: string) => void): Feature[] => [
  {
    title: "Kreative Challenges",
    description: "Nimm an spannenden Challenges teil und zeige deine Kreativität.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    videoUrl: "",
    iconType: 'play',
    action: () => navigate('/explore')
  },
  {
    title: "Community Features",
    description: "Verbinde dich mit anderen kreativen Köpfen und teile deine Ideen.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    videoUrl: "",
    iconType: 'users',
    action: () => navigate('/challenge-feed')
  },
  {
    title: "Easter Eggs entdecken",
    description: "Finde versteckte Überraschungen und sammle besondere Belohnungen.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    videoUrl: "",
    iconType: 'star',
    action: () => navigate('/livemap')
  },
  {
    title: "Lokale Aktivitäten",
    description: "Entdecke Challenges und Events in deiner Nähe.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    videoUrl: "",
    iconType: 'map',
    action: () => navigate('/livemap')
  }
];

export const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case 'play':
      return <Play className="h-10 w-10 text-jillr-neonPurple" />;
    case 'users':
      return <Users className="h-10 w-10 text-jillr-neonPurple" />;
    case 'star':
      return <Star className="h-10 w-10 text-jillr-neonPurple" />;
    case 'map':
      return <Map className="h-10 w-10 text-jillr-neonPurple" />;
    default:
      return <Play className="h-10 w-10 text-jillr-neonPurple" />;
  }
};
