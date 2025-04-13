
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ChallengeDetail from "./pages/ChallengeDetail";
import Upload from "./pages/Upload";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";

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
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/challenge/:id" element={<ChallengeDetail />} />
                <Route path="/upload/:id" element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                } />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
