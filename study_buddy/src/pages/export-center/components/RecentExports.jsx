import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentExports = ({ className = '' }) => {
  const recentExports = [
    {
      id: 'export-1',
      title: 'Machine Learning Study Guide',
      format: 'PDF',
      size: '2.4 MB',
      createdAt: '2025-01-15T10:30:00Z',
      documentsCount: 2,
      highlightsCount: 41,
      downloadUrl: '#'
    },
    {
      id: 'export-2', 
      title: 'Algorithm Notes',
      format: 'DOCX',
      size: '1.8 MB',
      createdAt: '2025-01-12T14:15:00Z',
      documentsCount: 1,
      highlightsCount: 18,
      downloadUrl: '#'
    },
    {
      id: 'export-3',
      title: 'Research Highlights',
      format: 'TXT',
      size: '156 KB',
      createdAt: '2025-01-10T09:45:00Z',
      documentsCount: 3,
      highlightsCount: 67,
      downloadUrl: '#'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString();
  };

  const getFormatIcon = (format) => {
    const icons = {
      PDF: 'FileText',
      DOCX: 'FileEdit',
      TXT: 'Type',
      CSV: 'Table'
    };
    return icons?.[format] || 'File';
  };

  const getFormatColor = (format) => {
    const colors = {
      PDF: 'text-red-600',
      DOCX: 'text-blue-600', 
      TXT: 'text-gray-600',
      CSV: 'text-green-600'
    };
    return colors?.[format] || 'text-muted-foreground';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Recent Exports
        </h3>
        
        {recentExports?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Download" size={24} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-muted-foreground">No exports yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your exported study materials will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentExports?.map((exportItem) => (
              <div
                key={exportItem?.id}
                className="flex items-center space-x-4 p-4 border border-border rounded-academic hover:bg-accent transition-colors"
              >
                <div className={`w-10 h-10 rounded-academic flex items-center justify-center bg-muted ${getFormatColor(exportItem?.format)}`}>
                  <Icon name={getFormatIcon(exportItem?.format)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground truncate">
                      {exportItem?.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getFormatColor(exportItem?.format)}`}>
                      {exportItem?.format}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>{exportItem?.size}</span>
                    <span>•</span>
                    <span>{exportItem?.documentsCount} documents</span>
                    <span>•</span>
                    <span>{exportItem?.highlightsCount} highlights</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDate(exportItem?.createdAt)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => window.open(exportItem?.downloadUrl, '_blank')}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreVertical"
                    onClick={() => console.log('Show export options')}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {recentExports?.length > 0 && (
          <div className="text-center mt-4">
            <Button variant="ghost" size="sm">
              View All Exports
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentExports;