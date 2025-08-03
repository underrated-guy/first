import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, placeholder = "Search highlights, notes, and documents..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative mb-6">
      <div className={`
        flex items-center space-x-2 p-3 bg-card border border-border rounded-lg transition-all duration-200
        ${isSearchFocused ? 'ring-2 ring-primary border-primary' : 'hover:border-muted-foreground'}
      `}>
        {/* Search Icon */}
        <Icon 
          name="Search" 
          size={20} 
          className="text-muted-foreground shrink-0" 
        />

        {/* Search Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-sm"
        />

        {/* Clear Button */}
        {searchQuery && (
          <Button
            variant="ghost"
            size="xs"
            iconName="X"
            onClick={handleClearSearch}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          />
        )}

        {/* Filter Toggle */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Filter"
          onClick={onFilterToggle}
          className="shrink-0 md:hidden"
        >
          Filter
        </Button>
      </div>
      {/* Search Suggestions (when focused and has query) */}
      {isSearchFocused && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-2 py-1 font-medium">
              Search in:
            </div>
            <div className="space-y-1">
              <button className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded-md flex items-center space-x-2">
                <Icon name="Highlighter" size={16} />
                <span>Highlighted text</span>
              </button>
              <button className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded-md flex items-center space-x-2">
                <Icon name="StickyNote" size={16} />
                <span>Notes and comments</span>
              </button>
              <button className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded-md flex items-center space-x-2">
                <Icon name="FileText" size={16} />
                <span>Document names</span>
              </button>
              <button className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded-md flex items-center space-x-2">
                <Icon name="Tag" size={16} />
                <span>Tags</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;