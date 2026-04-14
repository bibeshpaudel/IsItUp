/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AppRedirect from './pages/AppRedirect';
import Docs from './pages/Docs';
import { VersionUpdateToast } from './components/VersionUpdateToast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
        <VersionUpdateToast />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<AppRedirect />} />
          <Route path="/docs" element={<Docs />} />
          {/* Catch-all route for any unmatched URLs renders the 404 block */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
