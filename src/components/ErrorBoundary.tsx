import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught runtime error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 text-cream font-mono">
          <div className="bg-ink border border-alert/30 p-8 rounded-xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-alert/20 rounded-full flex items-center justify-center text-alert shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Application Error</h1>
                <p className="text-sm text-white/50">Something went wrong under the hood.</p>
              </div>
            </div>
            
            <div className="bg-ink/50 border border-white/10 rounded-md p-4 mb-6 overflow-auto max-h-48 text-xs text-alert/80">
              {this.state.error?.message || "Unknown error occurred"}
            </div>

            <button
              className="w-full py-3 bg-white text-ink font-semibold rounded-md transition-colors hover:bg-white/90 text-sm"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
