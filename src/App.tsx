import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route } from "wouter";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";
import { MainLayout } from "@/components/layout/main-layout";

// Pages
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import AIAssets from "./pages/ai-assets";
import Vulnerabilities from "./pages/vulnerabilities";
import Monitoring from "./pages/monitoring";
import Compliance from "./pages/compliance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Route path="/auth" component={Auth} />
          
          <Route path="/">
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          </Route>
          
          <Route path="/ai-assets">
            <ProtectedRoute>
              <MainLayout>
                <AIAssets />
              </MainLayout>
            </ProtectedRoute>
          </Route>
          
          <Route path="/vulnerabilities">
            <ProtectedRoute>
              <MainLayout>
                <Vulnerabilities />
              </MainLayout>
            </ProtectedRoute>
          </Route>
          
          <Route path="/monitoring">
            <ProtectedRoute>
              <MainLayout>
                <Monitoring />
              </MainLayout>
            </ProtectedRoute>
          </Route>
          
          <Route path="/compliance">
            <ProtectedRoute>
              <MainLayout>
                <Compliance />
              </MainLayout>
            </ProtectedRoute>
          </Route>
          
          {/* Catch-all for 404 */}
          <Route>
            <NotFound />
          </Route>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
