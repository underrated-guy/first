import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedCount, 
  onSelectAll, 
  onDeselectAll, 
  onBulkExport, 
  onBulkDelete, 
  onCreateStudySet,
  totalCount 
}) => {
  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Word Document' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'json', label: 'JSON Data' }
  ];

  const [exportFormat, setExportFormat] = React.useState('pdf');

  const handleBulkExport = () => {
    onBulkExport(exportFormat);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="sticky top-32 z-30 bg-background border border-border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={onSelectAll}
              disabled={selectedCount === totalCount}
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={onDeselectAll}
            >
              Deselect All
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Export Format Selection */}
          <div className="flex items-center space-x-2">
            <Select
              options={exportFormatOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-32"
            />
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              onClick={handleBulkExport}
            >
              Export
            </Button>
          </div>

          {/* Other Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="BookOpen"
              onClick={onCreateStudySet}
            >
              Study Set
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={onBulkDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;