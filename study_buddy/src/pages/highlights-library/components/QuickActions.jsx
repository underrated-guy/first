import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickActions = ({ 
  onExportAll, 
  onGenerateSummary, 
  onCreateStudySet,
  highlightCount,
  isGeneratingSummary = false 
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Word Document' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'json', label: 'JSON Data' }
  ];

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      await onExportAll(exportFormat);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Quick Stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Highlighter" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {highlightCount} highlights ready
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Export All */}
          <div className="flex items-center space-x-2">
            <Select
              options={exportFormatOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-32"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={handleExportAll}
              loading={isExporting}
              disabled={highlightCount === 0}
            >
              Export All
            </Button>
          </div>

          {/* Generate Summary */}
          <Button
            variant="default"
            size="sm"
            iconName="Sparkles"
            onClick={onGenerateSummary}
            loading={isGeneratingSummary}
            disabled={highlightCount === 0}
          >
            AI Summary
          </Button>

          {/* Create Study Set */}
          <Button
            variant="secondary"
            size="sm"
            iconName="BookOpen"
            onClick={onCreateStudySet}
            disabled={highlightCount === 0}
          >
            Study Set
          </Button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">
              <strong>Quick Actions:</strong> Export all highlights, generate AI-powered summaries, or create study sets for focused review.
            </p>
            <p>
              Use filters to narrow down highlights before performing bulk actions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;