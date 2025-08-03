import React from 'react';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilter, onFilterChange, documentCounts }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All Documents', 
      count: documentCounts?.total 
    },
    { 
      key: 'recent', 
      label: 'Recent', 
      count: documentCounts?.recent 
    },
    { 
      key: 'pdf', 
      label: 'PDF', 
      count: documentCounts?.pdf 
    },
    { 
      key: 'doc', 
      label: 'Word', 
      count: documentCounts?.doc 
    },
    { 
      key: 'highlighted', 
      label: 'With Highlights', 
      count: documentCounts?.highlighted 
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters?.map((filter) => (
        <Button
          key={filter?.key}
          variant={activeFilter === filter?.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter?.key)}
          className="text-sm"
        >
          {filter?.label}
          {filter?.count > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              activeFilter === filter?.key 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {filter?.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default FilterChips;