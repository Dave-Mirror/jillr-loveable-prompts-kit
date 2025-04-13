
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
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
import CreatorDashboard from "./pages/CreatorDashboard";
import Shop from "./pages/Shop";
import BrandDashboard from "./pages/BrandDashboard";
import EnterpriseDashboard from "./pages/EnterpriseDashboard";
import Leaderboard from "./pages/Leaderboard";
import LiveMap from "./pages/LiveMap";
import Index from "./pages/Index";
import ContentEditor from "./pages/ContentEditor";
import BottomNavigation from "./components/navigation/BottomNavigation";
import PageTransition from "./components/navigation/PageTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/challenge/:id" element={<ChallengeDetail />} />
                  <Route path="/upload/:id" element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  } />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/creator-dashboard" element={<CreatorDashboard />} />
                  <Route path="/brand-dashboard" element={<BrandDashboard />} />
                  <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/livemap" element={<LiveMap />} />
                  <Route path="/challenge-builder" element={<ContentEditor />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </main>
            <BottomNavigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
