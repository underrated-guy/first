import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualHeader from '../../components/ui/ContextualHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import SummaryStats from './components/SummaryStats';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import DocumentGrid from './components/DocumentGrid';
import EmptyState from './components/EmptyState';
import ImportButton from './components/ImportButton';
import Icon from '../../components/AppIcon';


const DocumentDashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [importLoading, setImportLoading] = useState(false);

  // Mock data for documents
  const mockDocuments = [
    {
      id: 1,
      title: "Advanced Machine Learning Concepts",
      type: "pdf",
      importDate: "2025-01-15T10:30:00Z",
      highlightCount: 23,
      views: 45,
      size: "2.4 MB",
      pages: 156
    },
    {
      id: 2,
      title: "Research Methodology Guidelines",
      type: "docx",
      importDate: "2025-01-12T14:20:00Z",
      highlightCount: 18,
      views: 32,
      size: "1.8 MB",
      pages: 89
    },
    {
      id: 3,
      title: "Statistical Analysis Presentation",
      type: "pptx",
      importDate: "2025-01-10T09:15:00Z",
      highlightCount: 12,
      views: 28,
      size: "3.2 MB",
      pages: 45
    },
    {
      id: 4,
      title: "Literature Review Notes",
      type: "txt",
      importDate: "2025-01-08T16:45:00Z",
      highlightCount: 7,
      views: 15,
      size: "0.5 MB",
      pages: 12
    },
    {
      id: 5,
      title: "Data Science Fundamentals",
      type: "pdf",
      importDate: "2025-01-05T11:30:00Z",
      highlightCount: 31,
      views: 67,
      size: "4.1 MB",
      pages: 234
    },
    {
      id: 6,
      title: "Academic Writing Standards",
      type: "docx",
      importDate: "2025-01-03T13:20:00Z",
      highlightCount: 15,
      views: 41,
      size: "1.2 MB",
      pages: 67
    }
  ];

  // Mock stats data
  const mockStats = {
    totalDocuments: mockDocuments?.length,
    totalHighlights: mockDocuments?.reduce((sum, doc) => sum + doc?.highlightCount, 0),
    studyHours: 47,
    weeklyDocuments: mockDocuments?.filter(doc => {
      const docDate = new Date(doc.importDate);
      const weekAgo = new Date();
      weekAgo?.setDate(weekAgo?.getDate() - 7);
      return docDate >= weekAgo;
    })?.length
  };

  // Calculate document counts for filters
  const documentCounts = {
    total: mockDocuments?.length,
    recent: mockDocuments?.filter(doc => {
      const docDate = new Date(doc.importDate);
      const weekAgo = new Date();
      weekAgo?.setDate(weekAgo?.getDate() - 7);
      return docDate >= weekAgo;
    })?.length,
    pdf: mockDocuments?.filter(doc => doc?.type === 'pdf')?.length,
    doc: mockDocuments?.filter(doc => doc?.type === 'docx')?.length,
    highlighted: mockDocuments?.filter(doc => doc?.highlightCount > 0)?.length
  };

  // Load documents on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocuments(mockDocuments);
      setFilteredDocuments(mockDocuments);
      setLoading(false);
    };

    loadDocuments();
  }, []);

  // Filter and search documents
  useEffect(() => {
    let filtered = [...documents];

    // Apply filter
    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'recent':
          const weekAgo = new Date();
          weekAgo?.setDate(weekAgo?.getDate() - 7);
          filtered = filtered?.filter(doc => new Date(doc.importDate) >= weekAgo);
          break;
        case 'pdf':
          filtered = filtered?.filter(doc => doc?.type === 'pdf');
          break;
        case 'doc':
          filtered = filtered?.filter(doc => doc?.type === 'docx');
          break;
        case 'highlighted':
          filtered = filtered?.filter(doc => doc?.highlightCount > 0);
          break;
        default:
          break;
      }
    }

    // Apply search
    if (searchTerm?.trim()) {
      filtered = filtered?.filter(doc =>
        doc?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  }, [documents, activeFilter, searchTerm]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleImport = async (files) => {
    setImportLoading(true);
    
    // Simulate file upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create new document entries
    const newDocuments = files?.map((file, index) => ({
      id: documents?.length + index + 1,
      title: file?.name?.replace(/\.[^/.]+$/, ""),
      type: file?.name?.split('.')?.pop()?.toLowerCase(),
      importDate: new Date()?.toISOString(),
      highlightCount: 0,
      views: 0,
      size: `${(file?.size / (1024 * 1024))?.toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 200) + 10
    }));

    setDocuments(prev => [...newDocuments, ...prev]);
    setImportLoading(false);
  };

  const handleDeleteDocument = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev?.filter(doc => doc?.id !== documentId));
    }
  };

  const handleExportDocument = (documentId) => {
    const document = documents?.find(doc => doc?.id === documentId);
    if (document) {
      console.log(`Exporting document: ${document.title}`);
      // Simulate export process
      alert(`Exporting "${document.title}" - this would trigger a download in a real app`);
    }
  };

  const handleImportClick = () => {
    // This will be handled by the ImportButton component
    console.log('Import button clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualHeader />
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Summary Statistics */}
        <SummaryStats stats={mockStats} />

        {/* Search and Filters */}
        <SearchBar onSearch={handleSearch} />
        <FilterChips
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          documentCounts={documentCounts}
        />

        {/* Document Grid or Empty State */}
        {documents?.length === 0 && !loading ? (
          <EmptyState onImportClick={handleImportClick} />
        ) : (
          <DocumentGrid
            documents={filteredDocuments}
            onDelete={handleDeleteDocument}
            onExport={handleExportDocument}
            loading={loading}
          />
        )}

        {/* No Results Message */}
        {documents?.length > 0 && filteredDocuments?.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No documents found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </main>
      {/* Import Button */}
      <ImportButton onImport={handleImport} loading={importLoading} />
      {/* Mobile Navigation */}
      <TabNavigation />
    </div>
  );
};

export default DocumentDashboard;