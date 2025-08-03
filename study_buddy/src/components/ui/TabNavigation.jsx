import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();
  
  const navigationItems = [
    { 
      label: 'Documents', 
      path: '/document-dashboard', 
      icon: 'FolderOpen',
      tooltip: 'Manage imported documents'
    },
    { 
      label: 'Reader', 
      path: '/document-viewer', 
      icon: 'FileText',
      tooltip: 'View and highlight documents'
    },
    { 
      label: 'Highlights', 
      path: '/highlights-library', 
      icon: 'Highlighter',
      tooltip: 'Review saved highlights'
    },
    { 
      label: 'Export', 
      path: '/export-center', 
      icon: 'Download',
      tooltip: 'Export study materials'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`
      fixed bottom-0 left-0 right-0 z-[1000] bg-background border-t border-border
      md:static md:border-t-0 md:bg-transparent md:flex md:items-center md:space-x-1
      ${className}
    `}>
      <div className="flex md:contents">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`
              flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[64px] text-xs font-medium transition-colors duration-150 ease-out
              md:flex-row md:space-x-2 md:px-4 md:py-2 md:min-h-0 md:rounded-academic md:text-sm
              ${isActiveRoute(item?.path) 
                ? 'text-primary bg-primary/10 md:bg-primary md:text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground md:hover:bg-accent'
              }
            `}
            title={item?.tooltip}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              className="md:w-4 md:h-4"
            />
            <span className="mt-1 md:mt-0">{item?.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;