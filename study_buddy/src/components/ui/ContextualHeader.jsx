import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './Button';

const ContextualHeader = ({ title, subtitle, actions = [], showBackButton = false, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getDefaultContent = () => {
    switch (location.pathname) {
      case '/document-dashboard':
        return {
          title: 'Document Dashboard',
          subtitle: 'Manage and organize your study materials',
          actions: [
            { 
              label: 'Import Document', 
              variant: 'default', 
              iconName: 'Upload',
              onClick: () => console.log('Import document')
            },
            { 
              label: 'New Folder', 
              variant: 'outline', 
              iconName: 'FolderPlus',
              onClick: () => console.log('Create folder')
            }
          ]
        };
      case '/document-viewer':
        return {
          title: 'Document Viewer',
          subtitle: 'Read and highlight your documents',
          showBackButton: true,
          actions: [
            { 
              label: 'Highlight', 
              variant: 'default', 
              iconName: 'Highlighter',
              onClick: () => console.log('Create highlight')
            },
            { 
              label: 'Export', 
              variant: 'outline', 
              iconName: 'Download',
              onClick: () => console.log('Export document')
            }
          ]
        };
      case '/highlights-library':
        return {
          title: 'Highlights Library',
          subtitle: 'Review and organize your saved highlights',
          actions: [
            { 
              label: 'Filter', 
              variant: 'outline', 
              iconName: 'Filter',
              onClick: () => console.log('Filter highlights')
            },
            { 
              label: 'Export All', 
              variant: 'default', 
              iconName: 'Download',
              onClick: () => console.log('Export all highlights')
            }
          ]
        };
      case '/export-center':
        return {
          title: 'Export Center',
          subtitle: 'Generate formatted study materials',
          actions: [
            { 
              label: 'New Export', 
              variant: 'default', 
              iconName: 'Plus',
              onClick: () => console.log('Create new export')
            },
            { 
              label: 'Templates', 
              variant: 'outline', 
              iconName: 'FileTemplate',
              onClick: () => console.log('Manage templates')
            }
          ]
        };
      default:
        return {
          title: 'Study Buddy',
          subtitle: 'Your academic companion',
          actions: []
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent?.title;
  const finalSubtitle = subtitle || defaultContent?.subtitle;
  const finalActions = actions?.length > 0 ? actions : defaultContent?.actions;
  const finalShowBackButton = showBackButton || defaultContent?.showBackButton;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={`sticky top-16 z-[1001] bg-background border-b border-border ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {finalShowBackButton && (
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={handleBackClick}
                className="shrink-0"
              />
            )}
            <div className="min-w-0">
              <h1 className="font-heading text-2xl font-semibold text-foreground truncate">
                {finalTitle}
              </h1>
              {finalSubtitle && (
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {finalSubtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {finalActions?.map((action, index) => (
              <Button
                key={index}
                variant={action?.variant || 'default'}
                size={action?.size || 'sm'}
                iconName={action?.iconName}
                iconPosition={action?.iconPosition || 'left'}
                onClick={action?.onClick}
                disabled={action?.disabled}
                loading={action?.loading}
                className={`hidden sm:flex ${action?.className || ''}`}
              >
                {action?.label}
              </Button>
            ))}
            
            {/* Mobile action menu */}
            {finalActions?.length > 0 && (
              <div className="sm:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreVertical"
                  onClick={() => console.log('Show mobile actions menu')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextualHeader;