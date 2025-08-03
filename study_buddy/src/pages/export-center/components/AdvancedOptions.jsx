import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdvancedOptions = ({ options, onOptionsChange, className = '' }) => {
  const organizationOptions = [
    { value: 'document', label: 'By Document' },
    { value: 'chronological', label: 'Chronologically' },
    { value: 'color', label: 'By Highlight Color' },
    { value: 'page', label: 'By Page Number' }
  ];

  const handleOptionChange = (key, value) => {
    onOptionsChange({
      ...options,
      [key]: value
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Advanced Options
        </h3>
        
        <div className="space-y-6">
          {/* Title Page */}
          <div className="space-y-3">
            <Checkbox
              label="Include Title Page"
              description="Add a custom title page to your export"
              checked={options?.includeTitlePage || false}
              onChange={(e) => handleOptionChange('includeTitlePage', e?.target?.checked)}
            />
            
            {options?.includeTitlePage && (
              <div className="ml-6 space-y-3">
                <Input
                  label="Export Title"
                  placeholder="My Study Notes"
                  value={options?.exportTitle || ''}
                  onChange={(e) => handleOptionChange('exportTitle', e?.target?.value)}
                />
                <Input
                  label="Author Name"
                  placeholder="Your Name"
                  value={options?.authorName || ''}
                  onChange={(e) => handleOptionChange('authorName', e?.target?.value)}
                />
              </div>
            )}
          </div>

          {/* Organization */}
          <div>
            <Select
              label="Organization Method"
              description="How should highlights be organized in the export?"
              options={organizationOptions}
              value={options?.organization || 'document'}
              onChange={(value) => handleOptionChange('organization', value)}
            />
          </div>

          {/* Content Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Include in Export</h4>
            
            <Checkbox
              label="Highlight Colors"
              description="Preserve original highlight colors"
              checked={options?.includeColors || true}
              onChange={(e) => handleOptionChange('includeColors', e?.target?.checked)}
            />
            
            <Checkbox
              label="Page References"
              description="Show page numbers for each highlight"
              checked={options?.includePageRefs || true}
              onChange={(e) => handleOptionChange('includePageRefs', e?.target?.checked)}
            />
            
            <Checkbox
              label="Creation Dates"
              description="Include when highlights were created"
              checked={options?.includeDates || false}
              onChange={(e) => handleOptionChange('includeDates', e?.target?.checked)}
            />
            
            <Checkbox
              label="Personal Notes"
              description="Include your custom notes and comments"
              checked={options?.includeNotes || true}
              onChange={(e) => handleOptionChange('includeNotes', e?.target?.checked)}
            />
            
            <Checkbox
              label="Document Summaries"
              description="Add AI-generated summaries for each document"
              checked={options?.includeSummaries || false}
              onChange={(e) => handleOptionChange('includeSummaries', e?.target?.checked)}
            />
          </div>

          {/* Table of Contents */}
          <div>
            <Checkbox
              label="Generate Table of Contents"
              description="Create a navigable table of contents (PDF only)"
              checked={options?.includeTableOfContents || false}
              onChange={(e) => handleOptionChange('includeTableOfContents', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;