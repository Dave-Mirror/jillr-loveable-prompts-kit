import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import PageContainer from '@/components/navigation/PageContainer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import BottomNavigation from '@/components/navigation/BottomNavigation';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile'; // Add this import
import CreatorDashboard from './pages/CreatorDashboard';
import BrandDashboard from './pages/BrandDashboard';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import ChallengeDetail from './pages/ChallengeDetail';
import ChallengeEditor from './pages/ChallengeEditor';
import ChallengeBuilder from './pages/ChallengeBuilder';
import ContentEditor from './pages/ContentEditor';
import LiveMap from './pages/LiveMap';
import Leaderboard from './pages/Leaderboard';
import Shop from './pages/Shop';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';
import Upload from './pages/Upload';
import CreatorMarketplace from './pages/CreatorMarketplace';

import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <PageContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/challenge/:id" element={<ChallengeDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:username" element={<UserProfile />} /> {/* Add this route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
            <Route path="/brand-dashboard" element={<BrandDashboard />} />
            <Route path="/livemap" element={<LiveMap />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/creator-marketplace" element={<CreatorMarketplace />} />
            <Route
              path="/challenge-editor"
              element={
                <ProtectedRoute>
                  <ChallengeEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenge-builder"
              element={
                <ProtectedRoute>
                  <ChallengeBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/content-editor"
              element={
                <ProtectedRoute>
                  <ContentEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNavigation />
          <Toaster />
        </PageContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
