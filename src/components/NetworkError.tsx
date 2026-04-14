import React from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
  fullScreen?: boolean;
}

export const NetworkError: React.FC<NetworkErrorProps> = ({ 
  onRetry, 
  message = "We couldn't connect to the server",
  fullScreen = true
}) => {
  const containerClasses = fullScreen 
    ? "flex flex-col items-center justify-center min-h-screen bg-ink w-full p-6" 
    : "flex flex-col items-center justify-center py-16 px-6 w-full";

  return (
    <div className={`${containerClasses} text-cream font-mono text-center`}>
      <div className="bg-ink border border-border p-8 rounded-xl max-w-sm w-full flex flex-col items-center shadow-2xl">
        <div className="w-16 h-16 bg-alert/10 rounded-full flex items-center justify-center mb-6 text-alert">
          <WifiOff size={32} />
        </div>
        
        <h3 className="text-xl text-white font-semibold mb-3">Connection Error</h3>
        <p className="text-sm text-white/50 mb-8 leading-relaxed">
          {message}. Please double check your internet connection or try again later.
        </p>

        <div className="flex gap-3 w-full">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="flex-1 py-2.5 px-4 bg-accent hover:bg-accent/90 text-ink font-semibold rounded-md transition-colors flex justify-center items-center gap-2 text-sm"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          )}
          <Link 
            to="/"
            className="flex-1 py-2.5 px-4 bg-transparent border border-border hover:bg-white/5 text-white rounded-md transition-colors text-sm flex justify-center items-center gap-2 no-underline"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};
