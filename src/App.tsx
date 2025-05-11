
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { AvatarProvider } from "./contexts/AvatarContext";
import Header from "./components/Header";
import BottomNavigation from "./components/navigation/BottomNavigation";
import PageTransition from "./components/navigation/PageTransition";
import HypocampusProvider from "./providers/HypocampusProvider";

// Hauptseiten
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";

// Entdecken-Kategorie
import Explore from "./pages/Explore";
import ChallengeFeed from "./pages/ChallengeFeed";
import LiveMap from "./pages/LiveMap";
import CityClashPage from "./pages/CityClashPage";
import ChallengeDetail from "./pages/ChallengeDetail";

// Erstellen-Kategorie
import Dashboard from "./pages/Dashboard";
import ContentEditor from "./pages/ContentEditor";
import ChallengeEditor from "./pages/ChallengeEditor";
import Upload from "./pages/Upload";

// Community-Kategorie
import Shop from "./pages/Shop";
import Leaderboard from "./pages/Leaderboard";
import CreatorMarketplace from "./pages/CreatorMarketplace";

// Persönlich-Kategorie
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";

// System-Seiten
import HypocampusPage from "./pages/HypocampusPage";
import TriggerManagementPage from "./pages/TriggerManagementPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AvatarProvider>
        <HypocampusProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 pt-16 md:pb-0 pb-16">
                  <PageTransition>
                    <Routes>
                      {/* Hauptrouten */}
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      
                      {/* Entdecken-Kategorie - öffentlich zugänglich */}
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/feed" element={<ChallengeFeed />} />
                      <Route path="/map" element={<LiveMap />} />
                      <Route path="/city-clash" element={<CityClashPage />} />
                      <Route path="/challenge/:id" element={<ChallengeDetail />} />
                      
                      {/* Erstellen-Kategorie - mit Rollenbeschränkungen */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/content-editor" element={
                        <ProtectedRoute>
                          <ContentEditor />
                        </ProtectedRoute>
                      } />
                      <Route path="/challenge-editor" element={
                        <ProtectedRoute roleRequired="creator">
                          <ChallengeEditor />
                        </ProtectedRoute>
                      } />
                      <Route path="/upload/:id" element={
                        <ProtectedRoute>
                          <Upload />
                        </ProtectedRoute>
                      } />
                      
                      {/* Community-Kategorie - öffentlich zugänglich */}
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/creator-marketplace" element={<CreatorMarketplace />} />
                      
                      {/* Persönlich-Kategorie - öffentlich zugänglich */}
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/wallet" element={<Wallet />} />
                      
                      {/* System-Seiten - mit Rollenbeschränkungen */}
                      <Route path="/hypocampus" element={<HypocampusPage />} />
                      <Route path="/trigger-management" element={
                        <ProtectedRoute roleRequired="brand">
                          <TriggerManagementPage />
                        </ProtectedRoute>
                      } />

                      {/* Umleitungen für alte Routen */}
                      <Route path="/creator-dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/brand-dashboard" element={
                        <ProtectedRoute roleRequired="brand">
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/enterprise" element={
                        <ProtectedRoute roleRequired="enterprise">
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/livemap" element={<LiveMap />} />
                      <Route path="/challenge-feed" element={<ChallengeFeed />} />

                      {/* 404 Seite */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageTransition>
                </main>
                <BottomNavigation />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </HypocampusProvider>
      </AvatarProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
