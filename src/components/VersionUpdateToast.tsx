import React from 'react';
import { RefreshCw, X } from 'lucide-react';
import { useVersionCheck } from '../hooks/useVersionCheck';

export const VersionUpdateToast: React.FC = () => {
  const { updateAvailable, reloadApp } = useVersionCheck();
  // Allow user to temporarily dismiss without updating
  const [dismissed, setDismissed] = React.useState(false);

  if (!updateAvailable || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-white p-4 rounded-xl shadow-2xl flex items-start gap-4 max-w-sm w-full">
        <div className="bg-blue-500/20 p-2 rounded-full mt-1">
          <RefreshCw className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold mb-1 text-slate-100">Update Available</h4>
          <p className="text-xs text-slate-300 mb-3">
            A new version of this application has been deployed. Refresh to apply the latest updates and bug fixes!
          </p>
          <div className="flex gap-2">
            <button
              onClick={reloadApp}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              Update Now
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/50"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
