import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HighlightsPanel = ({ 
  highlights = [], 
  onHighlightClick, 
  onHighlightEdit, 
  onHighlightDelete,
  onSummarizeAll,
  onExportHighlights,
  selectedHighlight,
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPage, setFilterPage] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [editNote, setEditNote] = useState('');

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'page', label: 'Page Number' },
    { value: 'color', label: 'Color' }
  ];

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Word Document' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'md', label: 'Markdown' }
  ];

  const getUniquePages = () => {
    const pages = [...new Set(highlights.map(h => h.page))]?.sort((a, b) => a - b);
    return [
      { value: '', label: 'All Pages' },
      ...pages?.map(page => ({ value: page?.toString(), label: `Page ${page}` }))
    ];
  };

  const getFilteredAndSortedHighlights = () => {
    let filtered = highlights;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(h => 
        h?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        (h?.note && h?.note?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Filter by page
    if (filterPage) {
      filtered = filtered?.filter(h => h?.page?.toString() === filterPage);
    }

    // Sort highlights
    switch (sortBy) {
      case 'oldest':
        return filtered?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'page':
        return filtered?.sort((a, b) => a?.page - b?.page);
      case 'color':
        return filtered?.sort((a, b) => a?.colorName?.localeCompare(b?.colorName));
      case 'recent':
      default:
        return filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const handleEditStart = (highlight) => {
    setEditingHighlight(highlight?.id);
    setEditNote(highlight?.note || '');
  };

  const handleEditSave = (highlight) => {
    onHighlightEdit(highlight?.id, { note: editNote });
    setEditingHighlight(null);
    setEditNote('');
  };

  const handleEditCancel = () => {
    setEditingHighlight(null);
    setEditNote('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getColorName = (colorValue) => {
    const colorMap = {
      '#fef08a': 'Yellow',
      '#bbf7d0': 'Green',
      '#bfdbfe': 'Blue',
      '#fbcfe8': 'Pink',
      '#e9d5ff': 'Purple'
    };
    return colorMap?.[colorValue] || 'Unknown';
  };

  const filteredHighlights = getFilteredAndSortedHighlights();

  return (
    <div className={`flex flex-col h-full bg-card border-l border-border ${className}`}>
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Highlights ({highlights?.length})
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Sparkles"
              onClick={onSummarizeAll}
              disabled={highlights?.length === 0}
            >
              Summarize All
            </Button>
            <Select
              options={exportFormatOptions}
              value=""
              onChange={(format) => onExportHighlights(format)}
              placeholder="Export"
              className="w-32"
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search highlights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
          
          <div className="flex space-x-2">
            <Select
              options={getUniquePages()}
              value={filterPage}
              onChange={setFilterPage}
              placeholder="All Pages"
              className="flex-1"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      {/* Highlights List */}
      <div className="flex-1 overflow-y-auto">
        {filteredHighlights?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="Highlighter" size={48} className="mb-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground mb-2">
              {highlights?.length === 0 ? 'No highlights yet' : 'No matching highlights'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {highlights?.length === 0 
                ? 'Select text in the document to create your first highlight'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredHighlights?.map((highlight) => (
              <div
                key={highlight?.id}
                className={`
                  bg-background border border-border rounded-lg p-3 cursor-pointer transition-all duration-200
                  ${selectedHighlight?.id === highlight?.id 
                    ? 'ring-2 ring-primary border-primary' :'hover:border-muted-foreground'
                  }
                `}
                onClick={() => onHighlightClick(highlight)}
              >
                {/* Highlight Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: highlight?.color }}
                      title={getColorName(highlight?.color)}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      Page {highlight?.page}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Edit2"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleEditStart(highlight);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Trash2"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onHighlightDelete(highlight?.id);
                      }}
                    />
                  </div>
                </div>

                {/* Highlighted Text */}
                <div className="mb-2">
                  <p className="text-sm text-foreground leading-relaxed">
                    "{highlight?.text}"
                  </p>
                </div>

                {/* Note Section */}
                {editingHighlight === highlight?.id ? (
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Add a note..."
                      value={editNote}
                      onChange={(e) => setEditNote(e?.target?.value)}
                      className="w-full"
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => handleEditSave(highlight)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {highlight?.note && (
                      <div className="bg-muted rounded p-2 mb-2">
                        <p className="text-xs text-muted-foreground">
                          {highlight?.note}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Timestamp */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(highlight?.createdAt)}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Sparkles"
                      onClick={(e) => {
                        e?.stopPropagation();
                        console.log('Summarize highlight:', highlight?.id);
                      }}
                    >
                      Summarize
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightsPanel;