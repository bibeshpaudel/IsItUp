import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ink text-cream font-mono p-6 text-center">
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
        <h1 className="text-6xl md:text-8xl font-bold text-accent relative z-10 flex items-center justify-center">
          404
        </h1>
      </div>
      <h2 className="text-2xl md:text-3xl font-light mb-4 text-white">Page not found</h2>
      <p className="text-white/50 max-w-md mx-auto mb-8 text-sm leading-relaxed">
        We couldn't locate the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      
      <Link 
        to="/" 
        className="px-6 py-3 bg-ink border border-border text-cream text-sm rounded-md transition-all hover:bg-white/10 hover:border-accent hover:text-accent flex items-center gap-2"
      >
        <span>←</span> Back to Home
      </Link>
    </div>
  );
};
