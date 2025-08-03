import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DocumentHeader from './components/DocumentHeader';
import DocumentDisplay from './components/DocumentDisplay';
import HighlightsPanel from './components/HighlightsPanel';
import MobileBottomSheet from './components/MobileBottomSheet';
import Button from '../../components/ui/Button';

const DocumentViewer = () => {
  const [searchParams] = useSearchParams();
  const documentId = searchParams?.get('id') || '1';
  
  const [currentDocument, setCurrentDocument] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [showMobileHighlights, setShowMobileHighlights] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mock documents data
  const mockDocuments = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      type: 'pdf',
      totalPages: 15,
      fileSize: '2.4 MB',
      lastOpened: new Date(Date.now() - 86400000)?.toISOString(),
      uploadedAt: new Date(Date.now() - 604800000)?.toISOString(),
      category: 'Computer Science'
    },
    {
      id: '2',
      title: 'Advanced Statistics and Probability',
      type: 'pdf',
      totalPages: 22,
      fileSize: '3.1 MB',
      lastOpened: new Date(Date.now() - 172800000)?.toISOString(),
      uploadedAt: new Date(Date.now() - 1209600000)?.toISOString(),
      category: 'Mathematics'
    },
    {
      id: '3',
      title: 'Research Methodology in Social Sciences',
      type: 'pdf',
      totalPages: 18,
      fileSize: '1.8 MB',
      lastOpened: new Date(Date.now() - 259200000)?.toISOString(),
      uploadedAt: new Date(Date.now() - 1814400000)?.toISOString(),
      category: 'Social Sciences'
    }
  ];

  // Mock highlights data
  const mockHighlights = [
    {
      id: 1,
      text: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from and make predictions on data.",
      page: 1,
      color: '#fef08a',
      colorName: 'Yellow',
      position: { x: 15, y: 25 },
      note: 'Key definition for exam',
      createdAt: new Date(Date.now() - 3600000)?.toISOString()
    },
    {
      id: 2,
      text: "Supervised learning algorithms learn from labeled training data to make predictions on new, unseen data.",
      page: 2,
      color: '#bbf7d0',
      colorName: 'Green',
      position: { x: 20, y: 40 },
      note: 'Important concept',
      createdAt: new Date(Date.now() - 7200000)?.toISOString()
    },
    {
      id: 3,
      text: "Cross-validation is a technique used to assess how well a model will generalize to an independent dataset.",
      page: 3,
      color: '#bfdbfe',
      colorName: 'Blue',
      position: { x: 25, y: 35 },
      note: 'Remember for practical assignment',
      createdAt: new Date(Date.now() - 10800000)?.toISOString()
    },
    {
      id: 4,
      text: "Feature engineering is the process of selecting and transforming variables for your model.",
      page: 1,
      color: '#fbcfe8',
      colorName: 'Pink',
      position: { x: 30, y: 60 },
      note: '',
      createdAt: new Date(Date.now() - 14400000)?.toISOString()
    },
    {
      id: 5,
      text: "Overfitting occurs when a model learns the training data too well, including noise and outliers.",
      page: 4,
      color: '#e9d5ff',
      colorName: 'Purple',
      position: { x: 18, y: 45 },
      note: 'Common problem to avoid',
      createdAt: new Date(Date.now() - 18000000)?.toISOString()
    }
  ];

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load document and highlights
  useEffect(() => {
    const document = mockDocuments?.find(doc => doc?.id === documentId);
    setCurrentDocument(document);
    setHighlights(mockHighlights);
  }, [documentId]);

  const handleCreateHighlight = (highlight) => {
    setHighlights(prev => [...prev, highlight]);
  };

  const handleHighlightClick = (highlight) => {
    setSelectedHighlight(highlight);
    if (isMobile) {
      setShowMobileHighlights(true);
    }
  };

  const handleHighlightEdit = (highlightId, updates) => {
    setHighlights(prev => 
      prev?.map(h => h?.id === highlightId ? { ...h, ...updates } : h)
    );
  };

  const handleHighlightDelete = (highlightId) => {
    if (window.confirm('Are you sure you want to delete this highlight?')) {
      setHighlights(prev => prev?.filter(h => h?.id !== highlightId));
      if (selectedHighlight?.id === highlightId) {
        setSelectedHighlight(null);
      }
    }
  };

  const handleSummarizeAll = () => {
    console.log('Summarizing all highlights...');
    // Mock summary generation
    alert(`Generated summary from ${highlights?.length} highlights:\n\nKey concepts covered include machine learning fundamentals, supervised learning techniques, cross-validation methods, feature engineering processes, and overfitting prevention strategies.`);
  };

  const handleExportHighlights = (format) => {
    console.log(`Exporting highlights as ${format}...`);
    alert(`Exporting ${highlights?.length} highlights as ${format?.toUpperCase()} format...`);
  };

  const handleDocumentExport = (format) => {
    console.log(`Exporting document as ${format}...`);
    alert(`Exporting "${currentDocument?.title}" as ${format?.toUpperCase()} format...`);
  };

  const handleDocumentDelete = () => {
    console.log('Deleting document...');
    alert('Document deleted successfully!');
  };

  const handleDocumentShare = () => {
    console.log('Sharing document...');
    if (navigator.share) {
      navigator.share({
        title: currentDocument?.title,
        text: `Check out this document: ${currentDocument?.title}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Document link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Document Header */}
      <DocumentHeader
        document={currentDocument}
        onExport={handleDocumentExport}
        onDelete={handleDocumentDelete}
        onShare={handleDocumentShare}
      />
      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Document Display */}
        <div className={`${isMobile ? 'w-full' : 'w-2/3'} relative`}>
          <DocumentDisplay
            document={currentDocument}
            highlights={highlights}
            onHighlight={handleCreateHighlight}
            onHighlightClick={handleHighlightClick}
            selectedHighlight={selectedHighlight}
          />

          {/* Mobile Highlights Toggle */}
          {isMobile && (
            <div className="absolute bottom-4 right-4">
              <Button
                variant="default"
                size="lg"
                iconName="Highlighter"
                onClick={() => setShowMobileHighlights(true)}
                className="rounded-full shadow-lg"
              >
                Highlights ({highlights?.length})
              </Button>
            </div>
          )}
        </div>

        {/* Desktop Highlights Panel */}
        {!isMobile && (
          <div className="w-1/3">
            <HighlightsPanel
              highlights={highlights}
              onHighlightClick={handleHighlightClick}
              onHighlightEdit={handleHighlightEdit}
              onHighlightDelete={handleHighlightDelete}
              onSummarizeAll={handleSummarizeAll}
              onExportHighlights={handleExportHighlights}
              selectedHighlight={selectedHighlight}
            />
          </div>
        )}
      </div>
      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <MobileBottomSheet
          isOpen={showMobileHighlights}
          onClose={() => setShowMobileHighlights(false)}
          title={`Highlights (${highlights?.length})`}
        >
          <HighlightsPanel
            highlights={highlights}
            onHighlightClick={handleHighlightClick}
            onHighlightEdit={handleHighlightEdit}
            onHighlightDelete={handleHighlightDelete}
            onSummarizeAll={handleSummarizeAll}
            onExportHighlights={handleExportHighlights}
            selectedHighlight={selectedHighlight}
            className="h-full border-l-0"
          />
        </MobileBottomSheet>
      )}
    </div>
  );
};

export default DocumentViewer;