
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  showSignInPrompt?: boolean;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  showSignInPrompt = false, 
  requireAuth = false
}: ProtectedRouteProps) => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Security: Log authentication attempts for monitoring
    if (!loading && requireAuth && !user) {
      console.log('🚫 Unauthorized access attempt blocked', {
        timestamp: new Date().toISOString(),
        path: window.location.pathname
      });
    }
  }, [user, loading, requireAuth]);

  // Handle navigation only when auth state is resolved and not already on auth page
  useEffect(() => {
    if (!loading && requireAuth && (!user || !session) && !showSignInPrompt) {
      if (location.pathname !== '/auth') {
        console.log('🔄 Redirecting to auth page from:', location.pathname);
        navigate('/auth', { replace: true });
      }
    }
  }, [user, session, loading, requireAuth, showSignInPrompt, navigate, location.pathname]);

  if (loading) {
    console.log('⏳ Auth loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Show sign-in prompt if configured
  if (requireAuth && (!user || !session) && showSignInPrompt) {
    console.log('🔐 Showing sign-in prompt');
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

  // If auth is required but user is not authenticated, don't render anything
  // (navigation will happen via useEffect)
  if (requireAuth && (!user || !session)) {
    console.log('🔐 Auth required but user not authenticated, navigation handling...');
    return null;
  }

  // User is authenticated or auth is not required
  console.log('✅ Rendering protected content for user:', user?.email || 'anonymous');
  return <>{children}</>;
};

export default ProtectedRoute;
