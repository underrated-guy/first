import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  documents,
  availableTags 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'document', label: 'By Document' },
    { value: 'page', label: 'By Page Number' }
  ];

  const colorOptions = [
    { value: 'all', label: 'All Colors' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'pink', label: 'Pink' },
    { value: 'orange', label: 'Orange' }
  ];

  const documentOptions = [
    { value: 'all', label: 'All Documents' },
    ...documents?.map(doc => ({ value: doc?.id, label: doc?.name }))
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters?.tags || [];
    const updatedTags = currentTags?.includes(tag)
      ? currentTags?.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', updatedTags);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      sortBy: 'newest',
      document: 'all',
      color: 'all',
      tags: [],
      dateRange: { start: '', end: '' }
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 overflow-y-auto
        md:static md:w-64 md:border-l-0 md:border-r md:transform-none md:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Filters
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={clearAllFilters}
                className="text-muted-foreground"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="X"
                onClick={onClose}
                className="md:hidden"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
              className="mb-4"
            />
          </div>

          {/* Document Filter */}
          <div className="mb-6">
            <Select
              label="Document"
              options={documentOptions}
              value={filters?.document}
              onChange={(value) => handleFilterChange('document', value)}
              searchable
              className="mb-4"
            />
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <Select
              label="Highlight Color"
              options={colorOptions}
              value={filters?.color}
              onChange={(value) => handleFilterChange('color', value)}
              className="mb-4"
            />
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Date Range</h4>
            <div className="space-y-3">
              <Input
                type="date"
                label="From"
                value={filters?.dateRange?.start || ''}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters?.dateRange,
                  start: e?.target?.value
                })}
              />
              <Input
                type="date"
                label="To"
                value={filters?.dateRange?.end || ''}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters?.dateRange,
                  end: e?.target?.value
                })}
              />
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">Tags</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableTags?.map((tag) => (
                  <Checkbox
                    key={tag}
                    label={tag}
                    checked={(filters?.tags || [])?.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="Clock"
                onClick={() => handleFilterChange('quickFilter', 'today')}
                className="justify-start"
              >
                Today's Highlights
              </Button>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="Calendar"
                onClick={() => handleFilterChange('quickFilter', 'week')}
                className="justify-start"
              >
                This Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="Star"
                onClick={() => handleFilterChange('quickFilter', 'favorites')}
                className="justify-start"
              >
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;