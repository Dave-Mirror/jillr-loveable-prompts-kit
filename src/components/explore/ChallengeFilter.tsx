
import React from 'react';
import { IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import { industryIcons, challengeTypeIcons } from '@/utils/challenge/rewards/mockData';
import { ChevronDown, SortAsc, Zap, Clock } from 'lucide-react';

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
    <div className="glassmorphism p-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
            <span className="w-3 h-3 bg-jillr-neonPurple rounded-full"></span>
            Branche
          </label>
          <div className="relative">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryType | 'all')}
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-jillr-darkAccent border border-jillr-border text-white focus:border-jillr-neonPurple focus:ring focus:ring-jillr-neonPurple/20 transition-all appearance-none"
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
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
            <span className="w-3 h-3 bg-jillr-neonBlue rounded-full"></span>
            Challenge-Typ
          </label>
          <div className="relative">
            <select
              value={challengeType}
              onChange={(e) => setChallengeType(e.target.value as ChallengeType | 'all')}
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-jillr-darkAccent border border-jillr-border text-white focus:border-jillr-neonBlue focus:ring focus:ring-jillr-neonBlue/20 transition-all appearance-none"
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
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
            <span className="w-3 h-3 bg-jillr-neonGreen rounded-full"></span>
            Sortierung
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'rewards' | 'endDate')}
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-jillr-darkAccent border border-jillr-border text-white focus:border-jillr-neonGreen focus:ring focus:ring-jillr-neonGreen/20 transition-all appearance-none"
            >
              <option value="latest" className="bg-jillr-dark flex items-center">
                <SortAsc className="inline-block mr-1.5 w-4 h-4" /> Neueste zuerst
              </option>
              <option value="rewards" className="bg-jillr-dark">
                <Zap className="inline-block mr-1.5 w-4 h-4" /> Höchste Belohnungen
              </option>
              <option value="endDate" className="bg-jillr-dark">
                <Clock className="inline-block mr-1.5 w-4 h-4" /> Bald endende
              </option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <div className="text-xs text-gray-400">Aktive Filter:</div>
        {industry !== 'all' && (
          <div className="bg-jillr-neonPurple/20 text-jillr-neonPurple text-xs px-2 py-1 rounded-full flex items-center gap-1">
            {industryIcons[industry]} {industry}
            <button 
              onClick={() => setIndustry('all')}
              className="ml-1 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        {challengeType !== 'all' && (
          <div className="bg-jillr-neonBlue/20 text-jillr-neonBlue text-xs px-2 py-1 rounded-full flex items-center gap-1">
            {challengeTypeIcons[challengeType]} {challengeType}
            <button 
              onClick={() => setChallengeType('all')}
              className="ml-1 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        {sortBy !== 'latest' && (
          <div className="bg-jillr-neonGreen/20 text-jillr-neonGreen text-xs px-2 py-1 rounded-full flex items-center gap-1">
            {sortBy === 'rewards' ? <Zap className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            {sortBy === 'rewards' ? 'Höchste Belohnungen' : 'Bald endende'}
            <button 
              onClick={() => setSortBy('latest')}
              className="ml-1 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeFilter;
