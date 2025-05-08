
import React from 'react';
import { IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import { industryIcons, challengeTypeIcons } from '@/utils/challenge/rewards/mockData';

interface ChallengeFilterProps {
  industry: IndustryType | 'all';
  challengeType: ChallengeType | 'all';
  sortBy: 'latest' | 'rewards' | 'endDate';
  setIndustry: (industry: IndustryType | 'all') => void;
  setChallengeType: (type: ChallengeType | 'all') => void;
  setSortBy: (sort: 'latest' | 'rewards' | 'endDate') => void;
}

const ChallengeFilter: React.FC<ChallengeFilterProps> = ({
  industry,
  challengeType,
  sortBy,
  setIndustry,
  setChallengeType,
  setSortBy
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Branche</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value as IndustryType | 'all')}
          className="glassmorphism px-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
        >
          <option value="all" className="bg-jillr-dark">{industryIcons.all} Alle Branchen</option>
          <option value="fashion" className="bg-jillr-dark">{industryIcons.fashion} Mode & Bekleidung</option>
          <option value="beauty" className="bg-jillr-dark">{industryIcons.beauty} Beauty & Kosmetik</option>
          <option value="sport" className="bg-jillr-dark">{industryIcons.sport} Sport & Fitness</option>
          <option value="food" className="bg-jillr-dark">{industryIcons.food} Lebensmittel & Getränke</option>
          <option value="travel" className="bg-jillr-dark">{industryIcons.travel} Reisen & Gastgewerbe</option>
          <option value="gaming" className="bg-jillr-dark">{industryIcons.gaming} Gaming & Tech</option>
          <option value="mobility" className="bg-jillr-dark">{industryIcons.mobility} Mobilität & Transport</option>
          <option value="sustainability" className="bg-jillr-dark">{industryIcons.sustainability} Nachhaltigkeit & Umwelt</option>
          <option value="entertainment" className="bg-jillr-dark">{industryIcons.entertainment} Entertainment & Events</option>
          <option value="education" className="bg-jillr-dark">{industryIcons.education} Bildung & Wissen</option>
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Challenge-Typ</label>
        <select
          value={challengeType}
          onChange={(e) => setChallengeType(e.target.value as ChallengeType | 'all')}
          className="glassmorphism px-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
        >
          <option value="all" className="bg-jillr-dark">{challengeTypeIcons.all} Alle Challenge-Typen</option>
          <option value="photo" className="bg-jillr-dark">{challengeTypeIcons.photo} Foto-Challenge</option>
          <option value="video" className="bg-jillr-dark">{challengeTypeIcons.video} Video-Challenge</option>
          <option value="ar" className="bg-jillr-dark">{challengeTypeIcons.ar} AR-Challenge</option>
          <option value="geofencing" className="bg-jillr-dark">{challengeTypeIcons.geofencing} Geofencing-Challenge</option>
          <option value="fitness" className="bg-jillr-dark">{challengeTypeIcons.fitness} Fitness-Challenge</option>
          <option value="wearable" className="bg-jillr-dark">{challengeTypeIcons.wearable} Wearable-Challenge</option>
          <option value="schnitzeljagd" className="bg-jillr-dark">{challengeTypeIcons.schnitzeljagd} Schnitzeljagd</option>
          <option value="community" className="bg-jillr-dark">{challengeTypeIcons.community} Community-Challenge</option>
          <option value="battle" className="bg-jillr-dark">{challengeTypeIcons.battle} Battle-Challenge</option>
          <option value="review" className="bg-jillr-dark">{challengeTypeIcons.review} Review-Challenge</option>
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Sortierung</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'latest' | 'rewards' | 'endDate')}
          className="glassmorphism px-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
        >
          <option value="latest" className="bg-jillr-dark">Neueste zuerst</option>
          <option value="rewards" className="bg-jillr-dark">Höchste Belohnungen</option>
          <option value="endDate" className="bg-jillr-dark">Bald endende</option>
        </select>
      </div>
    </div>
  );
};

export default ChallengeFilter;
