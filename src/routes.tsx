
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Profile from '@/pages/Profile';
import ChallengeDetail from '@/pages/ChallengeDetail';
import Auth from '@/pages/Auth';
import Explore from '@/pages/Explore';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import CreatorDashboard from '@/pages/CreatorDashboard';
import ChallengeFeed from '@/pages/ChallengeFeed';
import ContentEditor from '@/pages/ContentEditor';
import Upload from '@/pages/Upload';
import Wallet from '@/pages/Wallet';
import LiveMap from '@/pages/LiveMap';
import Shop from '@/pages/Shop';
import Leaderboard from '@/pages/Leaderboard';
import EnterpriseDashboard from '@/pages/EnterpriseDashboard';
import ChallengeEditor from '@/pages/ChallengeEditor';
import HypocampusPage from '@/pages/HypocampusPage';
import TriggerManagementPage from '@/pages/TriggerManagementPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/challenge/:challengeId',
    element: <ChallengeDetail />,
  },
  {
    path: '/dashboard',
    element: <CreatorDashboard />,
  },
  {
    path: '/feed',
    element: <ChallengeFeed />,
  },
  {
    path: '/editor',
    element: <ContentEditor />,
  },
  {
    path: '/upload/:challengeId',
    element: <Upload />,
  },
  {
    path: '/wallet',
    element: <Wallet />,
  },
  {
    path: '/map',
    element: <LiveMap />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/enterprise',
    element: <EnterpriseDashboard />,
  },
  {
    path: '/challenge-editor',
    element: <ChallengeEditor />,
  },
  {
    path: '/hypocampus',
    element: <HypocampusPage />,
  },
  {
    path: '/trigger-management',
    element: <TriggerManagementPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
