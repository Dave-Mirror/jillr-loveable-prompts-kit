
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { AvatarProvider } from "./contexts/AvatarContext";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import ChallengeDetail from "./pages/ChallengeDetail";
import Upload from "./pages/Upload";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import Wallet from "./pages/Wallet";
import Shop from "./pages/Shop";
import Leaderboard from "./pages/Leaderboard";
import LiveMap from "./pages/LiveMap";
import Index from "./pages/Index";
import ContentEditor from "./pages/ContentEditor";
import ChallengeEditor from "./pages/ChallengeEditor";
import BottomNavigation from "./components/navigation/BottomNavigation";
import PageTransition from "./components/navigation/PageTransition";
import CreatorMarketplace from "./pages/CreatorMarketplace";
import ChallengeFeed from "./pages/ChallengeFeed";
import HypocampusPage from "./pages/HypocampusPage";
import TriggerManagementPage from "./pages/TriggerManagementPage";
import HypocampusProvider from "./providers/HypocampusProvider";
import CityClashPage from "./pages/CityClashPage";

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
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/challenge/:id" element={<ChallengeDetail />} />
                      <Route path="/upload/:id" element={
                        <ProtectedRoute>
                          <Upload />
                        </ProtectedRoute>
                      } />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/map" element={<LiveMap />} />
                      <Route path="/city-clash" element={<CityClashPage />} />
                      <Route path="/content-editor" element={<ContentEditor />} />
                      <Route path="/challenge-editor" element={<ChallengeEditor />} />
                      <Route path="/creator-marketplace" element={<CreatorMarketplace />} />
                      <Route path="/feed" element={<ChallengeFeed />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/hypocampus" element={<HypocampusPage />} />
                      <Route path="/trigger-management" element={<TriggerManagementPage />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />

                      {/* Umleitungen für alte Routen */}
                      <Route path="/creator-dashboard" element={<Dashboard />} />
                      <Route path="/brand-dashboard" element={<Dashboard />} />
                      <Route path="/enterprise" element={<Dashboard />} />
                      <Route path="/livemap" element={<LiveMap />} />
                      <Route path="/challenge-feed" element={<ChallengeFeed />} />

                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
