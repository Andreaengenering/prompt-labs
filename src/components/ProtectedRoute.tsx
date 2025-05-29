
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  showSignInPrompt?: boolean;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  showSignInPrompt = false, 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { user, loading, session } = useAuth();

  useEffect(() => {
    // Security: Log authentication attempts for monitoring
    if (!loading && requireAuth && !user) {
      console.log('Unauthorized access attempt blocked', {
        timestamp: new Date().toISOString(),
        path: window.location.pathname
      });
    }
  }, [user, loading, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Security: Strict authentication check with session validation
  if (requireAuth && (!user || !session)) {
    if (showSignInPrompt) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
          <div className="text-center max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access this feature. Your data is protected by enterprise-grade security.
            </p>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sign In Securely
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    
    // Security: Silent redirect for non-prompt protected routes
    window.location.href = '/auth';
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
