
import React from 'react';
import { MapPin, Camera, Video, Users, Flag, Leaf, Puzzle, Clock, Recycle } from 'lucide-react';

interface ChallengeCategoriesProps {
  selectedCategory: string;
}

const ChallengeCategories: React.FC<ChallengeCategoriesProps> = ({ selectedCategory }) => {
  // Only show the category details for the selected category or 'all'
  const showLocation = selectedCategory === 'all' || selectedCategory === 'location';
  const showSocial = selectedCategory === 'all' || selectedCategory === 'social';
  const showTeam = selectedCategory === 'all' || selectedCategory === 'team';
  const showEco = selectedCategory === 'all' || selectedCategory === 'eco';
  const showMystery = selectedCategory === 'all' || selectedCategory === 'mystery';

  return (
    <div className="space-y-8 mb-10">
      {/* 1. Standortbasierte Missionen & Geofencing Challenges */}
      {showLocation && (
        <div className="bg-jillr-dark/50 rounded-lg border border-jillr-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <MapPin className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold">Standortbasierte Missionen & Geofencing Challenges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <h3 className="font-medium">QR-Code Scan Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Scanne QR-Codes an Bushaltestellen, Stores oder Wahrzeichen und sammle exklusive Belohnungen.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <h3 className="font-medium">Check-in Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Besuche & checke dich bei Partnerstores ein, erhalte XP & Rabatte mit Live-Tracking via Geofencing.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <h3 className="font-medium">Easter Egg Hunt</h3>
              </div>
              <p className="text-sm text-gray-400">Finde digitale Truhen mit Produktdrops oder Gutscheinen, die in der Stadt versteckt sind.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4 text-blue-400" />
                <h3 className="font-medium">Selfie-Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Kreative Selfies an berühmten Wahrzeichen oder Partnergeschäften für exklusive Marken-Challenges.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <h3 className="font-medium">Public Transport Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Fahre bestimmte Strecken mit Öffis oder Fahrrad & tracke deine Route für Belohnungen.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 2. Social Media & UGC Challenges */}
      {showSocial && (
        <div className="bg-jillr-dark/50 rounded-lg border border-jillr-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Video className="h-6 w-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold">Social Media & UGC Challenges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-4 w-4 text-purple-400" />
                <h3 className="font-medium">TikTok/Instagram Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Erstelle virale TikToks oder Instagram Reels mit Jillr-Template und Marken-Branding.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4 text-purple-400" />
                <h3 className="font-medium">Foto- oder Outfit-Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Stelle dein bestes Streetwear-Outfit zusammen & teile es mit dem Hashtag #JillrCityClash.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-400" />
                <h3 className="font-medium">Influencer-Battle</h3>
              </div>
              <p className="text-sm text-gray-400">Tritt gegen bekannte Creator an und imitiere ihre Moves für exklusive Belohnungen.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 3. Team-Challenges & City Takeover Battles */}
      {showTeam && (
        <div className="bg-jillr-dark/50 rounded-lg border border-jillr-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-orange-500/20">
              <Users className="h-6 w-6 text-orange-400" />
            </div>
            <h2 className="text-xl font-bold">Team-Challenges & City Takeover Battles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-orange-400" />
                <h3 className="font-medium">Erobere Stadtteile mit deinem Clan</h3>
              </div>
              <p className="text-sm text-gray-400">Tritt in Teams an & meistere Challenges in bestimmten Zonen, um das „Mayor-Privileg" zu erhalten.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4 text-orange-400" />
                <h3 className="font-medium">Street Art Battle</h3>
              </div>
              <p className="text-sm text-gray-400">Hinterlasse digitale Graffiti oder Tags an bestimmten Orten und überdecke die Tags anderer Teams.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <h3 className="font-medium">Checkpoint-Rennen (Urban Sprint)</h3>
              </div>
              <p className="text-sm text-gray-400">Erreiche 3–5 Standorte so schnell wie möglich und sammle Items für exklusive Rewards.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="h-4 w-4 text-orange-400" />
                <h3 className="font-medium">Flaggenraub – Capture the Flag</h3>
              </div>
              <p className="text-sm text-gray-400">Erobere und verteidige virtuelle Flaggen an wichtigen Plätzen für Team-XP.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 4. Nachhaltigkeits- & Umwelt-Challenges */}
      {showEco && (
        <div className="bg-jillr-dark/50 rounded-lg border border-jillr-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <Leaf className="h-6 w-6 text-green-400" />
            </div>
            <h2 className="text-xl font-bold">Nachhaltigkeits- & Umwelt-Challenges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Recycle className="h-4 w-4 text-green-400" />
                <h3 className="font-medium">Müllsammel-Challenge („Eco-Hero")</h3>
              </div>
              <p className="text-sm text-gray-400">Sammle Müll an bestimmten Orten & lade ein Foto hoch für XP & Prämien von Nachhaltigkeitspartnern.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-green-400" />
                <h3 className="font-medium">CO₂-Tracker Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Tracke emissions­freie Kilometer zu Fuß oder mit dem Rad für Belohnungen.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Recycle className="h-4 w-4 text-green-400" />
                <h3 className="font-medium">Refill & Zero Waste Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Fülle an Refill-Stationen nach und erhalte vergünstigte Produkte von nachhaltigen Marken.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 5. Mystery & Escape Room Challenges */}
      {showMystery && (
        <div className="bg-jillr-dark/50 rounded-lg border border-jillr-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-red-500/20">
              <Puzzle className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-xl font-bold">Mystery & Escape Room Challenges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-red-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Puzzle className="h-4 w-4 text-red-400" />
                <h3 className="font-medium">Schnitzeljagd („Urban Detective")</h3>
              </div>
              <p className="text-sm text-gray-400">Scanne QR-Codes, löse Rätsel und folge Hinweisen durch eine Story-basierte Stadtreise.</p>
            </div>
            
            <div className="bg-jillr-darkBlue/40 p-4 rounded-lg border border-jillr-border hover:border-red-500/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-red-400" />
                <h3 className="font-medium">In Time Challenge</h3>
              </div>
              <p className="text-sm text-gray-400">Sammle „Lebenszeit" durch Aktivitäten und verdiene neue Zeit durch Mini-Missionen.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCategories;
