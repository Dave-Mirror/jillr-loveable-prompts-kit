
import Dashboard from './Dashboard';
import LiveMap from './LiveMap';
import Profile from './Profile';
import NotFound from './NotFound';
import ChallengeDetails from './ChallengeDetails';
import CompanyProfile from './CompanyProfile';
import MapExperience from './MapExperience';
import ChallengeExplorer from './ChallengeExplorer';
import React from 'react';

// Placeholder for pages that aren't implemented yet
const Placeholder: React.FC<{message?: string}> = ({message}) => (
  <NotFound message={message || "This page is under construction"} />
);

export {
  Dashboard,
  LiveMap,
  Profile,
  ChallengeDetails,
  CompanyProfile,
  MapExperience,
  ChallengeExplorer,
  NotFound,
  Placeholder as Login,
  Placeholder as Register,
  Placeholder as Onboarding,
  Placeholder as Settings,
  Placeholder as Community
};
