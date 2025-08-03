import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DocumentHeader = ({ 
  document, 
  onExport, 
  onDelete, 
  onShare,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const exportOptions = [
    { value: 'pdf', label: 'Export as PDF' },
    { value: 'docx', label: 'Export as Word' },
    { value: 'txt', label: 'Export as Text' },
    { value: 'highlights', label: 'Export Highlights Only' }
  ];

  const handleBack = () => {
    navigate('/document-dashboard');
  };

  const handleExport = (format) => {
    onExport(format);
    setShowMobileMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      onDelete();
      navigate('/document-dashboard');
    }
    setShowMobileMenu(false);
  };

  const handleShare = () => {
    onShare();
    setShowMobileMenu(false);
  };

  if (!document) {
    return (
      <div className={`bg-card border-b border-border ${className}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={handleBack}
            />
            <div>
              <h1 className="font-heading text-xl font-semibold text-muted-foreground">
                No Document Selected
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={handleBack}
              className="shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-xl font-semibold text-foreground truncate">
                {document.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <span>{document.totalPages || 15} pages</span>
                <span>•</span>
                <span>{document.fileSize || '2.4 MB'}</span>
                <span>•</span>
                <span>Last opened {new Date(document.lastOpened || Date.now())?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 shrink-0">
            <Select
              options={exportOptions}
              value=""
              onChange={handleExport}
              placeholder="Export"
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              onClick={handleShare}
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={handleDelete}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => handleExport('pdf')}
                className="w-full justify-start"
              >
                Export as PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="FileText"
                onClick={() => handleExport('docx')}
                className="w-full justify-start"
              >
                Export as Word
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Highlighter"
                onClick={() => handleExport('highlights')}
                className="w-full justify-start"
              >
                Export Highlights
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Share2"
                onClick={handleShare}
                className="w-full justify-start"
              >
                Share Document
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={handleDelete}
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                Delete Document
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentHeader;