
import React from 'react';
import { Globe } from 'lucide-react';
import { Company } from '@/utils/challenge/rewards/types';

interface CompanyHeaderProps {
  company: Company;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company }) => {
  return (
    <div className="glassmorphism p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-32 h-32 rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center">
          <img 
            src={company.logoUrl} 
            alt={`${company.name} Logo`} 
            className="w-full h-auto object-contain"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{company.name}</h1>
              <div className="flex items-center text-sm text-jillr-neonPurple">
                <Globe className="h-4 w-4 mr-1.5" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {company.website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </div>
            </div>
            
            <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-jillr-neonPurple/30 to-jillr-neonPurple/10 border border-jillr-neonPurple/30 text-jillr-neonPurple">
              {company.industry.charAt(0).toUpperCase() + company.industry.slice(1)}
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">{company.description}</p>
          
          <CompanyMetadata company={company} />
        </div>
      </div>
    </div>
  );
};

interface CompanyMetadataProps {
  company: Company;
}

const CompanyMetadata: React.FC<CompanyMetadataProps> = ({ company }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
        <div className="flex items-start gap-2">
          <Target className="h-5 w-5 text-jillr-neonGreen mt-0.5" />
          <div>
            <div className="font-medium text-white mb-1">Zielgruppe</div>
            <div className="text-gray-400">
              {company.targetAudience.join(', ')}
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Palette className="h-5 w-5 text-jillr-neonPink mt-0.5" />
          <div>
            <div className="font-medium text-white mb-1">Marken-Tonalität</div>
            <div className="text-gray-400">
              {company.tone}
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Package className="h-5 w-5 text-jillr-neonBlue mt-0.5" />
          <div>
            <div className="font-medium text-white mb-1">Verfügbare Ressourcen</div>
            <div className="text-gray-400">
              {company.availableResources.join(', ')}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex items-center gap-1.5">
          {company.colorPalette.map((color, index) => (
            <div 
              key={index} 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

// Add missing imports
import { Target, Palette, Package } from 'lucide-react';

export { CompanyHeader, CompanyMetadata };
