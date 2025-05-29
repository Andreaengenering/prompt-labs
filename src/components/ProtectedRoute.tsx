
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  showSignInPrompt?: boolean;
}

const ProtectedRoute = ({ children, showSignInPrompt = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user && showSignInPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access this feature</p>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
