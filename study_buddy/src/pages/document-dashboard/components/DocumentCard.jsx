import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, onDelete, onExport }) => {
  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'ppt': case'pptx':
        return 'Presentation';
      case 'txt':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onDelete(document.id);
  };

  const handleExport = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onExport(document.id);
  };

  return (
    <Link
      to={`/document-viewer?doc=${document.id}`}
      className="group block bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon 
            name={getFileIcon(document.type)} 
            size={20} 
            color="var(--color-primary)" 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {document.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {document.type?.toUpperCase()} • {formatDate(document.importDate)}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Highlighter" size={12} />
                <span>{document.highlightCount} highlights</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Eye" size={12} />
                <span>{document.views} views</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="xs"
                iconName="Download"
                onClick={handleExport}
                className="h-6 w-6 p-0"
              />
              <Button
                variant="ghost"
                size="xs"
                iconName="Trash2"
                onClick={handleDelete}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DocumentCard;