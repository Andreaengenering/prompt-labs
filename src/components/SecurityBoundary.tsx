
import { ReactNode, Component, ErrorInfo } from 'react';
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorId: string;
}

class SecurityBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorId: Math.random().toString(36).substr(2, 9)
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Security: Generate unique error ID for tracking
    const errorId = Math.random().toString(36).substr(2, 9);
    
    // Security: Log error without exposing sensitive details
    console.error('Security boundary caught error:', {
      errorId,
      message: error.message,
      timestamp: new Date().toISOString(),
      // Don't log stack trace in production for security
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    return { hasError: true, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Security: Additional error logging for monitoring
    console.error('Error boundary details:', {
      errorId: this.state.errorId,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // Security: Show user-friendly error message
    toast.error('A security error occurred. Please refresh the page.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              A security error occurred. Please refresh the page or contact support if the issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Refresh Page
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Error ID: {this.state.errorId}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityBoundary;
