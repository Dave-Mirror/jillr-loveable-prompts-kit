
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Award, Video, Share2, Hash } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

// Mock data - in a real app this would come from an API/database
const mockChallenges = [
  {
    id: '1',
    title: 'Summer Dance Challenge',
    description: 'Show your best moves with this trending summer hit! Create a 15-30 second video showcasing your dancing skills to this viral track. Be creative with your moves and filming location! Winners get exclusive badges and will be featured on our main page.',
    type: 'Dance',
    hashtags: ['summerdance', 'vibes', 'moves'],
    xpReward: 500,
    coinsReward: 250,
    badgeReward: 'Summer Dancer',
    participants: 1342,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    videoUrl: 'https://www.tiktok.com/embed/7227513357285216518',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1080'
  },
  {
    id: '2',
    title: 'City Parkour',
    description: 'Show your parkour skills in your city. Find interesting urban locations and perform your best jumps, flips, and movements. Stay safe and follow local regulations! Most creative and technically impressive videos will win special rewards and get featured on our community showcase.',
    type: 'Sport',
    hashtags: ['parkour', 'urban', 'jump', 'flip'],
    xpReward: 750,
    coinsReward: 400,
    badgeReward: 'Urban Explorer',
    participants: 865,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    videoUrl: 'https://www.tiktok.com/embed/7256863742095017243',
    imageUrl: 'https://images.unsplash.com/photo-1504609813442-a9ead3caee88?q=80&w=1080'
  },
  {
    id: '3',
    title: 'Makeup Transformation',
    description: 'Create an amazing before/after makeup transformation. Show your skills by recording a quick transformation that highlights your makeup artistry. Use any products you want and be as creative as possible! Top transformations will receive beauty rewards and special recognition.',
    type: 'Beauty',
    hashtags: ['makeup', 'transformation', 'beauty', 'skills'],
    xpReward: 600,
    coinsReward: 300,
    badgeReward: 'Beauty Artist',
    participants: 2156,
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    videoUrl: 'https://www.tiktok.com/embed/7270745842073988395',
    imageUrl: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?q=80&w=1080'
  },
  {
    id: '4',
    title: 'Singing Challenge',
    description: 'Cover this viral song and show off your vocal talent. Record yourself singing 30-60 seconds of this popular track. You can add your own style or stick to the original. Best covers get featured on our platform and earn music-themed rewards!',
    type: 'Music',
    hashtags: ['singing', 'cover', 'music', 'viral'],
    xpReward: 550,
    coinsReward: 275,
    badgeReward: 'Vocal Star',
    participants: 1789,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    videoUrl: 'https://www.tiktok.com/embed/7152909065559684358',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1080'
  },
  {
    id: '5',
    title: 'Street Fashion',
    description: 'Show your unique street style. Create a short video showcasing your best street fashion outfit. Be creative with your styling, environment, and presentation. Most stylish and creative outfits will win special fashion badges and be highlighted in our style guide!',
    type: 'Fashion',
    hashtags: ['streetstyle', 'fashion', 'outfit', 'trend'],
    xpReward: 450,
    coinsReward: 225,
    badgeReward: 'Style Icon',
    participants: 1543,
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    videoUrl: 'https://www.tiktok.com/embed/7191349324639043846',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1080'
  },
  {
    id: '6',
    title: 'Cooking Masterpiece',
    description: 'Create a delicious dish and record the process. Show off your cooking skills by making something tasty and visually appealing. Record key steps of your preparation and the final result. Best recipes and presentations will win culinary rewards and be featured in our recipe collection!',
    type: 'Food',
    hashtags: ['cooking', 'recipe', 'food', 'delicious'],
    xpReward: 600,
    coinsReward: 300,
    badgeReward: 'Master Chef',
    participants: 932,
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    videoUrl: 'https://www.tiktok.com/embed/7257950335750972699',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1080'
  }
];

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const challenge = mockChallenges.find(c => c.id === id);
  
  if (!challenge) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
        <p className="text-muted-foreground mb-6">The challenge you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="neon-button">
          Explore Challenges
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Challenge info */}
        <div className="lg:w-2/3">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={challenge.imageUrl} 
              alt={challenge.title} 
              className="w-full aspect-video object-cover"
            />
            <div className="absolute top-4 left-4 bg-jillr-neonPurple/80 text-white px-3 py-1 rounded-lg">
              {challenge.type}
            </div>
            <div className="absolute top-4 right-4">
              <CountdownTimer endDate={challenge.endDate} />
            </div>
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {challenge.hashtags.map((tag, index) => (
                <div key={index} className="flex items-center text-sm px-3 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue">
                  <Hash size={14} className="mr-1" />
                  {tag}
                </div>
              ))}
            </div>
            
            <p className="text-lg mb-6">{challenge.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="glassmorphism p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-jillr-neonPurple" />
                  <h3 className="font-medium">XP Reward</h3>
                </div>
                <p className="text-2xl font-bold">{challenge.xpReward} XP</p>
              </div>
              
              <div className="glassmorphism p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-jillr-neonPink" />
                  <h3 className="font-medium">Badge Reward</h3>
                </div>
                <p className="text-xl font-bold">{challenge.badgeReward}</p>
              </div>
              
              <div className="glassmorphism p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={18} className="text-jillr-neonBlue" />
                  <h3 className="font-medium">Participants</h3>
                </div>
                <p className="text-2xl font-bold">{challenge.participants.toLocaleString()}</p>
              </div>
            </div>
            
            <Link 
              to={`/upload/${challenge.id}`} 
              className="neon-button w-full flex items-center justify-center gap-2"
            >
              <Video size={18} />
              Join Challenge
            </Link>
          </div>
        </div>
        
        {/* Right column - Example video and social*/}
        <div className="lg:w-1/3">
          <div className="glassmorphism p-4 rounded-xl mb-6">
            <h2 className="text-xl font-bold mb-4">Example</h2>
            <div className="rounded-lg overflow-hidden relative pb-[177.8%] h-0">
              <iframe
                src={challenge.videoUrl}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
          
          <div className="glassmorphism p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Share Challenge</h2>
            <button className="w-full py-3 px-4 rounded-lg bg-jillr-darkBlue hover:bg-jillr-darkBlue/80 transition-colors flex items-center justify-center gap-2 mb-3">
              <Share2 size={16} />
              Copy Link
            </button>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-3 rounded-lg bg-[#1877f2] hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                </svg>
              </button>
              <button className="p-3 rounded-lg bg-[#1da1f2] hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 5.89c-.75.33-1.56.56-2.4.66.86-.52 1.52-1.34 1.83-2.32-.82.49-1.72.84-2.67 1.03A4.19 4.19 0 0 0 15.45 4c-2.33 0-4.22 1.88-4.22 4.21 0 .33.04.65.11.96-3.51-.18-6.63-1.87-8.72-4.43-.36.63-.57 1.35-.57 2.13 0 1.46.74 2.75 1.87 3.51-.69-.02-1.34-.21-1.9-.53v.05c0 2.04 1.45 3.74 3.38 4.13-.35.1-.72.15-1.11.15-.27 0-.53-.03-.79-.08.54 1.68 2.09 2.9 3.94 2.93-1.44 1.13-3.26 1.8-5.24 1.8-.34 0-.68-.02-1.01-.06 1.87 1.19 4.08 1.89 6.45 1.89 7.74 0 11.96-6.41 11.96-11.96 0-.18 0-.36-.01-.55.82-.59 1.53-1.33 2.1-2.17z"></path>
                </svg>
              </button>
              <button className="p-3 rounded-lg bg-[#000000] hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44.02c.13 1.73.19 3.47.16 5.2V7h3.53v4h-3.53v12h-4.82V11h-2.3V7h2.3V5.7c0-1.15-.23-2.29-.32-3.44-.08-1.16-.13-2.32-.16-3.48-1.25.01-2.49.01-3.74.01H7.9c0 1.9-.04 3.8-.16 5.7V7h-3.3v4h3.3v12h4.79V11h.03V7h-.03c-.03-2.34.03-4.67.16-7Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
