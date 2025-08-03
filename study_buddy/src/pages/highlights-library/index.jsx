import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualHeader from '../../components/ui/ContextualHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import HighlightCard from './components/HighlightCard';
import FilterPanel from './components/FilterPanel';
import BulkActions from './components/BulkActions';
import StatsOverview from './components/StatsOverview';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import QuickActions from './components/QuickActions';



const HighlightsLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedHighlights, setSelectedHighlights] = useState(new Set());
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Mock data for highlights
  const mockHighlights = [
    {
      id: 1,
      text: `Machine learning algorithms can be broadly categorized into supervised, unsupervised, and reinforcement learning approaches. Each category serves different purposes and requires different types of data preparation.`,
      documentName: "Introduction to Machine Learning",
      pageNumber: 23,
      color: "yellow",
      createdAt: new Date(2025, 0, 2, 14, 30),
      context: "This section introduces the fundamental concepts of machine learning and provides a framework for understanding different algorithmic approaches.",
      notes: "Important foundation concept - review before exam",
      tags: ["machine-learning", "algorithms", "fundamentals"]
    },
    {
      id: 2,
      text: `The mitochondria is often called the powerhouse of the cell because it generates most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.`,
      documentName: "Cell Biology Fundamentals",
      pageNumber: 45,
      color: "green",
      createdAt: new Date(2025, 0, 1, 10, 15),
      context: "Chapter 3 discusses cellular organelles and their specific functions within eukaryotic cells.",
      notes: "Classic definition - memorize for quiz",
      tags: ["biology", "cell-structure", "energy"]
    },
    {
      id: 3,
      text: `Quantum mechanics describes the behavior of matter and energy at the molecular, atomic, nuclear, and even smaller microscopic levels. It challenges our classical understanding of physics.`,
      documentName: "Modern Physics Concepts",
      pageNumber: 78,
      color: "blue",
      createdAt: new Date(2024, 11, 30, 16, 45),
      context: "Introduction to quantum theory and its implications for our understanding of the physical world.",
      notes: "Mind-bending concept - need to understand wave-particle duality",
      tags: ["physics", "quantum", "theory"]
    },
    {
      id: 4,
      text: `The Renaissance period marked a cultural rebirth in Europe, characterized by renewed interest in classical learning, humanism, and artistic innovation that would shape Western civilization.`,
      documentName: "European History Survey",
      pageNumber: 156,
      color: "pink",
      createdAt: new Date(2024, 11, 29, 9, 20),
      context: "Chapter 8 explores the transition from medieval to early modern Europe and the factors that contributed to cultural transformation.",
      notes: "Key period for understanding modern European development",
      tags: ["history", "renaissance", "culture"]
    },
    {
      id: 5,
      text: `Photosynthesis is the process by which plants and other organisms convert light energy into chemical energy that can later be released to fuel the organism's activities.`,
      documentName: "Plant Biology Textbook",
      pageNumber: 92,
      color: "green",
      createdAt: new Date(2024, 11, 28, 13, 10),
      context: "This chapter covers the fundamental processes that allow plants to create their own food using sunlight.",
      notes: "Essential process for all life on Earth - understand the chemical equation",
      tags: ["biology", "plants", "energy", "photosynthesis"]
    },
    {
      id: 6,
      text: `Object-oriented programming (OOP) is a programming paradigm based on the concept of objects, which can contain data and code: data in the form of fields, and code in the form of procedures.`,
      documentName: "Software Engineering Principles",
      pageNumber: 34,
      color: "orange",
      createdAt: new Date(2024, 11, 27, 11, 30),
      context: "Chapter 2 introduces fundamental programming paradigms and their applications in software development.",
      notes: "Core concept for understanding modern programming languages",
      tags: ["programming", "oop", "software-engineering"]
    }
  ];

  // Mock documents data
  const mockDocuments = [
    { id: 1, name: "Introduction to Machine Learning" },
    { id: 2, name: "Cell Biology Fundamentals" },
    { id: 3, name: "Modern Physics Concepts" },
    { id: 4, name: "European History Survey" },
    { id: 5, name: "Plant Biology Textbook" },
    { id: 6, name: "Software Engineering Principles" }
  ];

  // Extract available tags from highlights
  const availableTags = useMemo(() => {
    const tags = new Set();
    mockHighlights?.forEach(highlight => {
      highlight?.tags?.forEach(tag => tags?.add(tag));
    });
    return Array.from(tags)?.sort();
  }, []);

  // Filter state
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    document: 'all',
    color: 'all',
    tags: [],
    dateRange: { start: '', end: '' },
    quickFilter: null
  });

  // Filter and search highlights
  const filteredHighlights = useMemo(() => {
    let filtered = [...mockHighlights];

    // Search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(highlight =>
        highlight?.text?.toLowerCase()?.includes(query) ||
        highlight?.notes?.toLowerCase()?.includes(query) ||
        highlight?.documentName?.toLowerCase()?.includes(query) ||
        highlight?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
    }

    // Document filter
    if (filters?.document !== 'all') {
      filtered = filtered?.filter(highlight => {
        const doc = mockDocuments?.find(d => d?.name === highlight?.documentName);
        return doc?.id?.toString() === filters?.document;
      });
    }

    // Color filter
    if (filters?.color !== 'all') {
      filtered = filtered?.filter(highlight => highlight?.color === filters?.color);
    }

    // Tags filter
    if (filters?.tags?.length > 0) {
      filtered = filtered?.filter(highlight =>
        filters?.tags?.some(tag => highlight?.tags?.includes(tag))
      );
    }

    // Date range filter
    if (filters?.dateRange?.start || filters?.dateRange?.end) {
      filtered = filtered?.filter(highlight => {
        const highlightDate = new Date(highlight.createdAt);
        const startDate = filters?.dateRange?.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters?.dateRange?.end ? new Date(filters.dateRange.end) : null;

        if (startDate && highlightDate < startDate) return false;
        if (endDate && highlightDate > endDate) return false;
        return true;
      });
    }

    // Quick filters
    if (filters?.quickFilter) {
      const now = new Date();
      switch (filters?.quickFilter) {
        case 'today':
          filtered = filtered?.filter(highlight => {
            const highlightDate = new Date(highlight.createdAt);
            return highlightDate?.toDateString() === now?.toDateString();
          });
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered?.filter(highlight => 
            new Date(highlight.createdAt) >= weekAgo
          );
          break;
        case 'favorites':
          // Mock favorites logic
          filtered = filtered?.filter(highlight => highlight?.tags?.includes('favorites'));
          break;
      }
    }

    // Sort
    switch (filters?.sortBy) {
      case 'newest':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'document':
        filtered?.sort((a, b) => a?.documentName?.localeCompare(b?.documentName));
        break;
      case 'page':
        filtered?.sort((a, b) => a?.pageNumber - b?.pageNumber);
        break;
    }

    return filtered;
  }, [searchQuery, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const documentsWithHighlights = new Set(
      mockHighlights.map(h => h.documentName)
    )?.size;

    const highlightsThisWeek = mockHighlights?.filter(
      h => new Date(h.createdAt) >= weekAgo
    )?.length;

    // Find most highlighted document
    const documentCounts = {};
    mockHighlights?.forEach(h => {
      documentCounts[h.documentName] = (documentCounts?.[h?.documentName] || 0) + 1;
    });
    
    const mostHighlightedDocument = Object.keys(documentCounts)?.reduce((a, b) =>
      documentCounts?.[a] > documentCounts?.[b] ? a : b, 'None'
    );

    return {
      totalHighlights: mockHighlights?.length,
      documentsWithHighlights,
      highlightsThisWeek,
      mostHighlightedDocument: mostHighlightedDocument?.length > 20 
        ? mostHighlightedDocument?.substring(0, 20) + '...' 
        : mostHighlightedDocument
    };
  }, []);

  // Selection handlers
  const handleSelectHighlight = (id, isSelected) => {
    const newSelected = new Set(selectedHighlights);
    if (isSelected) {
      newSelected?.add(id);
    } else {
      newSelected?.delete(id);
    }
    setSelectedHighlights(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedHighlights(new Set(filteredHighlights.map(h => h.id)));
  };

  const handleDeselectAll = () => {
    setSelectedHighlights(new Set());
  };

  // Action handlers
  const handleEditHighlight = (highlight) => {
    console.log('Edit highlight:', highlight);
    // Navigate to edit modal or page
  };

  const handleDeleteHighlight = (id) => {
    console.log('Delete highlight:', id);
    // Show confirmation dialog and delete
  };

  const handleExportHighlight = (highlight) => {
    console.log('Export highlight:', highlight);
    // Export single highlight
  };

  const handleBulkExport = (format) => {
    console.log('Bulk export:', Array.from(selectedHighlights), 'Format:', format);
    // Export selected highlights
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete:', Array.from(selectedHighlights));
    // Show confirmation and delete selected
  };

  const handleCreateStudySet = () => {
    console.log('Create study set from:', Array.from(selectedHighlights));
    // Navigate to study set creation
  };

  const handleExportAll = async (format) => {
    console.log('Export all highlights in format:', format);
    // Export all highlights
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      console.log('Generate AI summary from highlights');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Determine empty state type
  const getEmptyStateType = () => {
    if (mockHighlights?.length === 0) return 'no-highlights';
    if (searchQuery?.trim() && filteredHighlights?.length === 0) return 'no-search-results';
    if (filteredHighlights?.length === 0) return 'no-filtered-results';
    return null;
  };

  const emptyStateType = getEmptyStateType();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualHeader />
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Stats Overview */}
            <StatsOverview stats={stats} />

            {/* Search Bar */}
            <SearchBar
              onSearch={setSearchQuery}
              onFilterToggle={() => setIsFilterPanelOpen(true)}
            />

            {/* Quick Actions */}
            {mockHighlights?.length > 0 && (
              <QuickActions
                onExportAll={handleExportAll}
                onGenerateSummary={handleGenerateSummary}
                onCreateStudySet={handleCreateStudySet}
                highlightCount={filteredHighlights?.length}
                isGeneratingSummary={isGeneratingSummary}
              />
            )}

            {/* Bulk Actions */}
            <BulkActions
              selectedCount={selectedHighlights?.size}
              totalCount={filteredHighlights?.length}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkExport={handleBulkExport}
              onBulkDelete={handleBulkDelete}
              onCreateStudySet={handleCreateStudySet}
            />

            {/* Highlights List */}
            {emptyStateType ? (
              <EmptyState type={emptyStateType} searchQuery={searchQuery} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredHighlights?.map((highlight) => (
                  <HighlightCard
                    key={highlight?.id}
                    highlight={highlight}
                    onEdit={handleEditHighlight}
                    onDelete={handleDeleteHighlight}
                    onExport={handleExportHighlight}
                    isSelected={selectedHighlights?.has(highlight?.id)}
                    onSelect={handleSelectHighlight}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Filter Panel - Desktop */}
          <div className="hidden md:block">
            <FilterPanel
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={setFilters}
              documents={mockDocuments}
              availableTags={availableTags}
            />
          </div>
        </div>
      </main>
      {/* Filter Panel - Mobile */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        documents={mockDocuments}
        availableTags={availableTags}
      />
      {/* Bottom Navigation */}
      <TabNavigation />
    </div>
  );
};

export default HighlightsLibrary;