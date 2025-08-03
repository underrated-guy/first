import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContentSelector = ({ selectedContent, onContentChange, className = '' }) => {
  const [selectAll, setSelectAll] = useState(false);

  const mockDocuments = [
    {
      id: 'doc-1',
      title: 'Introduction to Machine Learning',
      type: 'PDF',
      highlights: 23,
      pages: 45,
      lastModified: '2025-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=120&fit=crop'
    },
    {
      id: 'doc-2', 
      title: 'Data Structures and Algorithms',
      type: 'PDF',
      highlights: 18,
      pages: 67,
      lastModified: '2025-01-12',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=100&h=120&fit=crop'
    },
    {
      id: 'doc-3',
      title: 'Research Methodology in Computer Science',
      type: 'DOCX',
      highlights: 31,
      pages: 89,
      lastModified: '2025-01-10',
      thumbnail: 'https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.jpg?w=100&h=120&fit=crop'
    }
  ];

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      onContentChange('all-documents', mockDocuments?.map(doc => doc?.id));
    } else {
      onContentChange('custom', []);
    }
  };

  const handleDocumentSelect = (docId, checked) => {
    const currentSelected = selectedContent?.documents || [];
    let newSelected;
    
    if (checked) {
      newSelected = [...currentSelected, docId];
    } else {
      newSelected = currentSelected?.filter(id => id !== docId);
      setSelectAll(false);
    }
    
    onContentChange('custom', newSelected);
  };

  const handleScopeChange = (scope) => {
    onContentChange(scope, scope === 'all-highlights' ? mockDocuments?.map(doc => doc?.id) : []);
    if (scope !== 'custom') {
      setSelectAll(scope === 'all-highlights');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Select Content to Export
        </h3>
        
        {/* Scope Selection */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 p-3 border border-border rounded-academic hover:bg-accent transition-colors">
            <input
              type="radio"
              id="all-highlights"
              name="export-scope"
              checked={selectedContent?.scope === 'all-highlights'}
              onChange={() => handleScopeChange('all-highlights')}
              className="w-4 h-4 text-primary border-border focus:ring-primary"
            />
            <label htmlFor="all-highlights" className="flex-1 cursor-pointer">
              <div className="font-medium text-foreground">All Highlights</div>
              <div className="text-sm text-muted-foreground">Export highlights from all documents</div>
            </label>
            <div className="text-sm text-muted-foreground">
              {mockDocuments?.reduce((sum, doc) => sum + doc?.highlights, 0)} highlights
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-border rounded-academic hover:bg-accent transition-colors">
            <input
              type="radio"
              id="custom-selection"
              name="export-scope"
              checked={selectedContent?.scope === 'custom'}
              onChange={() => handleScopeChange('custom')}
              className="w-4 h-4 text-primary border-border focus:ring-primary"
            />
            <label htmlFor="custom-selection" className="flex-1 cursor-pointer">
              <div className="font-medium text-foreground">Custom Selection</div>
              <div className="text-sm text-muted-foreground">Choose specific documents</div>
            </label>
          </div>
        </div>

        {/* Document Selection */}
        {selectedContent?.scope === 'custom' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Select Documents</h4>
              <Checkbox
                label="Select All"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e?.target?.checked)}
                size="sm"
              />
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockDocuments?.map((doc) => (
                <div
                  key={doc?.id}
                  className="flex items-center space-x-3 p-3 border border-border rounded-academic hover:bg-accent transition-colors"
                >
                  <Checkbox
                    checked={(selectedContent?.documents || [])?.includes(doc?.id)}
                    onChange={(e) => handleDocumentSelect(doc?.id, e?.target?.checked)}
                  />
                  
                  <div className="w-12 h-14 bg-muted rounded flex items-center justify-center overflow-hidden shrink-0">
                    <Icon name="FileText" size={20} color="var(--color-muted-foreground)" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{doc?.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {doc?.highlights} highlights • {doc?.pages} pages • {doc?.type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Modified {doc?.lastModified}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSelector;