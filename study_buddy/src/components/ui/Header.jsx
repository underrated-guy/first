import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-academic flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="var(--color-primary-foreground)" />
            </div>
            <span className="font-heading font-semibold text-xl text-foreground">Study Buddy</span>
          </Link>
        </div>
      </header>
    );
  }

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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/document-dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-academic flex items-center justify-center">
            <Icon name="BookOpen" size={20} color="var(--color-primary-foreground)" />
          </div>
          <span className="font-heading font-semibold text-xl text-foreground">Study Buddy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-academic text-sm font-medium transition-colors duration-150 ease-out
                ${isActiveRoute(item?.path) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Search">
            Search
          </Button>
          <Button variant="ghost" size="sm" iconName="Settings">
            Settings
          </Button>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="var(--color-muted-foreground)" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          iconName={isMobileMenuOpen ? "X" : "Menu"}
        />
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-academic text-sm font-medium transition-colors duration-150 ease-out
                  ${isActiveRoute(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-3 py-3 rounded-academic text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 ease-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="Settings" size={18} />
                <span>Settings</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;