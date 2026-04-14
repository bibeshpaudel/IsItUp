import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/apiClient';
import { NetworkError } from '../components/NetworkError';
import { FileText } from 'lucide-react';

export default function Docs() {
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [docsData, setDocsData] = useState<any>(null);

  const fetchDocs = async () => {
    setLoading(true);
    setNetworkError(false);
    
    // Simulate a call to an endpoint that explicitly doesn't exist to trigger a fetch failure
    // Notice we use a fake domain to force an immediate DNS/Network failure catching in our global wrap.
    const result = await apiClient.get('https://this-domain-is-100-percent-fake.com/api/docs');
    
    if (!result.success && result.isNetworkError) {
      setNetworkError(true);
    } else if (result.success) {
      setDocsData(result.data);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  if (networkError) {
    return <NetworkError onRetry={fetchDocs} />;
  }

  return (
    <div className="min-h-screen bg-ink text-cream font-mono p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" className="text-accent hover:text-accent/80 transition-colors">← Back</Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-accent" /> Developer Documentation
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center p-20 text-white/50 animate-pulse">
            Connecting to documentation server...
          </div>
        ) : (
          <div className="bg-paper border border-border rounded-lg p-8">
            <h2 className="text-xl mb-4">API Documentation Loaded!</h2>
            <pre className="text-xs text-white/70 bg-ink/50 p-4 rounded overflow-auto">
              {JSON.stringify(docsData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
