import React from 'react';
import Icon from '../../../components/AppIcon';

const ExportPreview = ({ selectedContent, selectedFormat, options, className = '' }) => {
  const mockHighlights = [
    {
      id: 1,
      text: "Machine learning is a subset of artificial intelligence that focuses on the development of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience.",
      document: "Introduction to Machine Learning",
      page: 12,
      color: "yellow",
      note: "Key definition - remember for exam",
      date: "2025-01-15"
    },
    {
      id: 2,
      text: "Supervised learning algorithms learn from labeled training data to make predictions or decisions without being explicitly programmed for the task.",
      document: "Introduction to Machine Learning", 
      page: 18,
      color: "blue",
      note: "Important concept for classification tasks",
      date: "2025-01-15"
    },
    {
      id: 3,
      text: "The time complexity of quicksort is O(n log n) on average, but can degrade to O(n²) in the worst case when the pivot is consistently the smallest or largest element.",
      document: "Data Structures and Algorithms",
      page: 45,
      color: "green",
      note: "Critical for algorithm analysis",
      date: "2025-01-12"
    }
  ];

  const getFormatName = () => {
    const formats = {
      pdf: 'PDF Study Guide',
      docx: 'Word Document',
      txt: 'Plain Text',
      csv: 'CSV Spreadsheet'
    };
    return formats?.[selectedFormat] || 'Unknown Format';
  };

  const getColorClass = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 border-yellow-300',
      blue: 'bg-blue-100 border-blue-300',
      green: 'bg-green-100 border-green-300',
      red: 'bg-red-100 border-red-300',
      purple: 'bg-purple-100 border-purple-300'
    };
    return colors?.[color] || 'bg-gray-100 border-gray-300';
  };

  const renderPreviewContent = () => {
    if (selectedFormat === 'csv') {
      return (
        <div className="font-mono text-xs">
          <div className="grid grid-cols-4 gap-2 p-2 bg-muted font-semibold">
            <div>Document</div>
            <div>Page</div>
            <div>Highlight</div>
            <div>Note</div>
          </div>
          {mockHighlights?.slice(0, 2)?.map((highlight, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 p-2 border-b border-border text-xs">
              <div className="truncate">{highlight?.document}</div>
              <div>{highlight?.page}</div>
              <div className="truncate">{highlight?.text?.substring(0, 50)}...</div>
              <div className="truncate">{highlight?.note}</div>
            </div>
          ))}
        </div>
      );
    }

    if (selectedFormat === 'txt') {
      return (
        <div className="font-mono text-sm space-y-4">
          {mockHighlights?.slice(0, 2)?.map((highlight, index) => (
            <div key={index}>
              <div className="font-semibold">{highlight?.document} - Page {highlight?.page}</div>
              <div className="mt-1">{highlight?.text}</div>
              {options?.includeNotes && highlight?.note && (
                <div className="mt-1 text-muted-foreground">Note: {highlight?.note}</div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // PDF/DOCX preview
    return (
      <div className="space-y-4">
        {options?.includeTitlePage && (
          <div className="text-center p-6 border-b border-border">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
              {options?.exportTitle || 'Study Notes Export'}
            </h1>
            {options?.authorName && (
              <p className="text-muted-foreground">by {options?.authorName}</p>
            )}
            <p className="text-sm text-muted-foreground mt-4">
              Generated on {new Date()?.toLocaleDateString()}
            </p>
          </div>
        )}
        <div className="space-y-6">
          {options?.organization === 'document' ? (
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
                Introduction to Machine Learning
              </h2>
              {mockHighlights?.filter(h => h?.document === "Introduction to Machine Learning")?.map((highlight, index) => (
                <div key={index} className={`p-3 rounded-academic border-l-4 mb-3 ${options?.includeColors ? getColorClass(highlight?.color) : 'bg-accent border-border'}`}>
                  <div className="text-sm text-foreground">{highlight?.text}</div>
                  {options?.includePageRefs && (
                    <div className="text-xs text-muted-foreground mt-2">Page {highlight?.page}</div>
                  )}
                  {options?.includeNotes && highlight?.note && (
                    <div className="text-xs text-muted-foreground mt-1 italic">Note: {highlight?.note}</div>
                  )}
                  {options?.includeDates && (
                    <div className="text-xs text-muted-foreground mt-1">Created: {highlight?.date}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            mockHighlights?.slice(0, 2)?.map((highlight, index) => (
              <div key={index} className={`p-3 rounded-academic border-l-4 ${options?.includeColors ? getColorClass(highlight?.color) : 'bg-accent border-border'}`}>
                <div className="text-sm font-medium text-foreground mb-1">{highlight?.document}</div>
                <div className="text-sm text-foreground">{highlight?.text}</div>
                {options?.includePageRefs && (
                  <div className="text-xs text-muted-foreground mt-2">Page {highlight?.page}</div>
                )}
                {options?.includeNotes && highlight?.note && (
                  <div className="text-xs text-muted-foreground mt-1 italic">Note: {highlight?.note}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Export Preview
        </h3>
        
        {/* Preview Header */}
        <div className="bg-muted p-4 rounded-academic mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-foreground">Format: {getFormatName()}</div>
            <Icon name="Eye" size={16} color="var(--color-muted-foreground)" />
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedContent?.scope === 'all-highlights' ?'All highlights from all documents'
              : `${(selectedContent?.documents || [])?.length} selected documents`
            }
          </div>
        </div>

        {/* Preview Content */}
        <div className="border border-border rounded-academic p-4 bg-background max-h-96 overflow-y-auto">
          {renderPreviewContent()}
        </div>

        {/* Preview Footer */}
        <div className="text-xs text-muted-foreground mt-2 text-center">
          This is a preview showing the first few highlights. The actual export will include all selected content.
        </div>
      </div>
    </div>
  );
};

export default ExportPreview;