import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HighlightsLibrary from './pages/highlights-library';
import Login from './pages/login';
import DocumentViewer from './pages/document-viewer';
import ExportCenter from './pages/export-center';
import DocumentDashboard from './pages/document-dashboard';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DocumentDashboard />} />
        <Route path="/highlights-library" element={<HighlightsLibrary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/document-viewer" element={<DocumentViewer />} />
        <Route path="/export-center" element={<ExportCenter />} />
        <Route path="/document-dashboard" element={<DocumentDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
