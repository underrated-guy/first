import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const HighlightCard = ({ highlight, onEdit, onDelete, onExport, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getHighlightColorClass = (color) => {
    const colorMap = {
      yellow: 'bg-yellow-100 border-yellow-300',
      green: 'bg-green-100 border-green-300',
      blue: 'bg-blue-100 border-blue-300',
      pink: 'bg-pink-100 border-pink-300',
      orange: 'bg-orange-100 border-orange-300'
    };
    return colorMap?.[color] || 'bg-yellow-100 border-yellow-300';
  };

  const truncateText = (text, maxLength = 150) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md
      ${isSelected ? 'ring-2 ring-primary' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(highlight?.id, e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <div className={`w-3 h-3 rounded-full border-2 ${getHighlightColorClass(highlight?.color)}`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground text-sm truncate">
              {highlight?.documentName}
            </h3>
            <p className="text-xs text-muted-foreground">
              Page {highlight?.pageNumber} • {formatDate(highlight?.createdAt)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0"
        />
      </div>
      {/* Highlighted Text */}
      <div className={`${getHighlightColorClass(highlight?.color)} rounded-md p-3 mb-3`}>
        <p className="text-sm text-foreground leading-relaxed">
          {isExpanded ? highlight?.text : truncateText(highlight?.text)}
        </p>
      </div>
      {/* Context (if available) */}
      {highlight?.context && (
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Context:</p>
          <p className="text-xs text-muted-foreground italic">
            "...{isExpanded ? highlight?.context : truncateText(highlight?.context, 100)}..."
          </p>
        </div>
      )}
      {/* User Notes */}
      {highlight?.notes && (
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Notes:</p>
          <p className="text-sm text-foreground">
            {isExpanded ? highlight?.notes : truncateText(highlight?.notes, 100)}
          </p>
        </div>
      )}
      {/* Tags */}
      {highlight?.tags && highlight?.tags?.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {highlight?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="xs"
            iconName="Edit"
            onClick={() => onEdit(highlight)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Download"
            onClick={() => onExport(highlight)}
          >
            Export
          </Button>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="Trash2"
          onClick={() => onDelete(highlight?.id)}
          className="text-destructive hover:text-destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default HighlightCard;