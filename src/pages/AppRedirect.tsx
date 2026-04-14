import React, { useEffect } from 'react';

export default function AppRedirect() {
  useEffect(() => {
    // Redirect to external Blazor app
    window.location.href = window.location.origin;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream text-ink">
      <div className="flex flex-col items-center gap-4">
        <img src="/icon-animated.svg" alt="" className="w-10 h-10" />
        <p className="font-mono text-muted">Redirecting to application...</p>
      </div>
    </div>
  );
}
