import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationLayout = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-background flex flex-col ${className}`}>
      {/* Minimal Header */}
      <header className="w-full bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-academic flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="var(--color-primary-foreground)" />
            </div>
            <span className="font-heading font-semibold text-xl text-foreground">Study Buddy</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-border py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-caption">
            © 2025 Study Buddy. Empowering academic excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationLayout;