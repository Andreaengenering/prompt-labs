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
    // Security: Set up comprehensive auth state management
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Security: Validate session integrity
        if (session) {
          try {
            // Verify session is still valid by making a test query
            const { error } = await supabase.from('profiles').select('id').limit(1);
            if (error && error.message.includes('JWT')) {
              console.warn('Invalid session detected, signing out');
              await supabase.auth.signOut();
              return;
            }
          } catch (error) {
            console.warn('Session validation failed:', error);
          }
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Check subscription status when user signs in
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            try {
              await supabase.functions.invoke('check-subscription');
            } catch (error) {
              console.log('Subscription check failed:', error);
            }
          }, 0);
        }

        // Security: Log authentication events for monitoring
        if (event === 'SIGNED_IN') {
          console.log('User signed in successfully', {
            userId: session?.user?.id,
            timestamp: new Date().toISOString()
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out', {
            timestamp: new Date().toISOString()
          });
        }
      }
    );

    // Get initial session with error handling
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting initial session:', error);
        toast.error('Authentication error. Please sign in again.');
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
