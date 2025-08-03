import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'no-highlights', searchQuery = '' }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-highlights':
        return {
          icon: 'Highlighter',
          title: 'No highlights yet',
          description: 'Start highlighting important text in your documents to build your study library.',
          actionText: 'Import Document',
          actionLink: '/document-dashboard',
          secondaryActionText: 'View Documents',
          secondaryActionLink: '/document-viewer'
        };
      case 'no-search-results':
        return {
          icon: 'Search',
          title: 'No highlights found',
          description: `No highlights match "${searchQuery}". Try adjusting your search terms or filters.`,
          actionText: 'Clear Search',
          actionLink: null,
          secondaryActionText: 'Reset Filters',
          secondaryActionLink: null
        };
      case 'no-filtered-results':
        return {
          icon: 'Filter',
          title: 'No highlights match filters',
          description: 'Try adjusting your filter criteria to see more highlights.',
          actionText: 'Clear Filters',
          actionLink: null,
          secondaryActionText: 'View All',
          secondaryActionLink: null
        };
      default:
        return {
          icon: 'Highlighter',
          title: 'No highlights',
          description: 'No highlights available.',
          actionText: 'Get Started',
          actionLink: '/document-dashboard'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      {/* Title */}
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      {/* Description */}
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {content?.description}
      </p>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {content?.actionLink ? (
          <Link to={content?.actionLink}>
            <Button variant="default" iconName="Plus">
              {content?.actionText}
            </Button>
          </Link>
        ) : (
          <Button 
            variant="default" 
            iconName="RotateCcw"
            onClick={() => window.location?.reload()}
          >
            {content?.actionText}
          </Button>
        )}

        {content?.secondaryActionText && (
          content?.secondaryActionLink ? (
            <Link to={content?.secondaryActionLink}>
              <Button variant="outline">
                {content?.secondaryActionText}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline"
              onClick={() => window.location?.reload()}
            >
              {content?.secondaryActionText}
            </Button>
          )
        )}
      </div>
      {/* Help Text */}
      <div className="mt-8 p-4 bg-muted rounded-lg max-w-md">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-warning shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground mb-1">
              Pro Tip
            </p>
            <p className="text-xs text-muted-foreground">
              {type === 'no-highlights' ?'Use different highlight colors to categorize your notes by topic or importance level.' :'Try using broader search terms or check your spelling for better results.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;