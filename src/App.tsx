import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import SecurityBoundary from "@/components/SecurityBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import PromptLab from "./pages/PromptLab";
import Templates from "./pages/Templates";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Academy from "./pages/Academy";
import Coach from "./pages/Coach";
import FeedbackPage from "./pages/Feedback";
import PolicyPage from "./pages/Policy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.message?.includes('JWT') || error?.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SecurityBoundary>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/prompt-lab" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <PromptLab />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/templates" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <Templates />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <Analytics />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/integrations" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <Integrations />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/coach"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <Coach />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <AppLayout>
                      <FeedbackPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="/academy" element={<Academy />} />
              <Route
                path="/policy"
                element={<PolicyPage />} // new Policy page route
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </SecurityBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
