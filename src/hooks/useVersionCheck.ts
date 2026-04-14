import { useState, useEffect } from 'react';

// Polling interval in ms (e.g. 10 minutes)
const POLL_INTERVAL = 10 * 60 * 1000;

export function useVersionCheck() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);

  useEffect(() => {
    let checkInterval: ReturnType<typeof setInterval>;

    const checkForUpdate = async () => {
      try {
        // Appending a timestamp query string bypasses the browser cache, ensuring we always hit the server
        const response = await fetch(`${import.meta.env.BASE_URL}version.json?t=${new Date().getTime()}`);
        if (!response.ok) return;

        const data = await response.json();
        const serverVersion = data.version;

        if (currentVersion === null) {
          // Initial load: Set the currently running version so we have something to compare against
          setCurrentVersion(serverVersion);
        } else if (serverVersion !== currentVersion) {
          // A mismatch means the server has a new build!
          setUpdateAvailable(true);
        }
      } catch (error) {
        console.error('Error checking for version updates', error);
      }
    };

    // Initial check on mount
    checkForUpdate();

    // Re-check automatically on polling interval
    checkInterval = setInterval(checkForUpdate, POLL_INTERVAL);

    // Also re-check whenever the user switches back to this tab
    const handleFocus = () => checkForUpdate();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [currentVersion]);

  const reloadApp = () => {
    // A hard reload helps bypass local caches
    window.location.reload();
  };

  return { updateAvailable, reloadApp };
}
