
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Hauptseiten
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Entdecken-Kategorie
import Explore from '@/pages/Explore';
import ChallengeFeed from '@/pages/ChallengeFeed';
import LiveMap from '@/pages/LiveMap';
import CityClashPage from '@/pages/CityClashPage';

// Challenge-spezifisch
import ChallengeDetail from '@/pages/ChallengeDetail';
import Upload from '@/pages/Upload';

// Erstellen-Kategorie
import Dashboard from '@/pages/Dashboard';
import ContentEditor from '@/pages/ContentEditor';
import ChallengeEditor from '@/pages/ChallengeEditor';

// Community-Kategorie
import Shop from '@/pages/Shop';
import Leaderboard from '@/pages/Leaderboard';
import CreatorMarketplace from '@/pages/CreatorMarketplace';

// Persönlich-Kategorie
import Profile from '@/pages/Profile';
import Wallet from '@/pages/Wallet';

// System-Seiten
import HypocampusPage from '@/pages/HypocampusPage';
import TriggerManagementPage from '@/pages/TriggerManagementPage';
import AuthCallback from '@/pages/AuthCallback';

export const routes = createBrowserRouter([
  // Hauptrouten
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  
  // Entdecken-Kategorie
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/feed',
    element: <ChallengeFeed />,
  },
  {
    path: '/map',
    element: <LiveMap />,
  },
  {
    path: '/city-clash',
    element: <CityClashPage />,
  },
  {
    path: '/challenge/:challengeId',
    element: <ChallengeDetail />,
  },
  
  // Erstellen-Kategorie
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/editor',
    element: <ContentEditor />,
  },
  {
    path: '/content-editor',
    element: <ContentEditor />,
  },
  {
    path: '/challenge-editor',
    element: <ChallengeEditor />,
  },
  {
    path: '/upload/:challengeId',
    element: <Upload />,
  },
  
  // Community-Kategorie
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/creator-marketplace',
    element: <CreatorMarketplace />,
  },
  
  // Persönlich-Kategorie
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/wallet',
    element: <Wallet />,
  },
  
  // System-Seiten
  {
    path: '/hypocampus',
    element: <HypocampusPage />,
  },
  {
    path: '/trigger-management',
    element: <TriggerManagementPage />,
  },
  
  // Umleitungen für alte Routen
  {
    path: '/creator-dashboard',
    element: <Dashboard />,
  },
  {
    path: '/brand-dashboard',
    element: <Dashboard />,
  },
  {
    path: '/enterprise',
    element: <Dashboard />,
  },
  {
    path: '/livemap',
    element: <LiveMap />,
  },
  {
    path: '/challenge-feed',
    element: <ChallengeFeed />,
  },
  
  // 404 Route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
