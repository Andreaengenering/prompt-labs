
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 Setting up auth state listener...');
    
    // Single auth state management - let the listener handle everything
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event, session?.user?.email);
        
        // Update state immediately
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Security: Log authentication events for monitoring
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in successfully', {
            userId: session?.user?.id,
            timestamp: new Date().toISOString()
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out', {
            timestamp: new Date().toISOString()
          });
        }
      }
    );

    // Get initial session only once - don't call getSession separately
    // The auth listener will handle the initial state
    console.log('🔐 Auth provider initialized');

    return () => {
      console.log('🔐 Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Error signing out. Please try again.');
      } else {
        // Security: Clear any cached data
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.clear();
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      toast.error('An unexpected error occurred while signing out');
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = Boolean(user && session);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signOut, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
