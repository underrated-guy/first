import React from 'react';
import DocumentCard from './DocumentCard';

const DocumentGrid = ({ documents, onDelete, onExport, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)]?.map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3 mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <div className="w-6 h-6 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents?.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDelete={onDelete}
          onExport={onExport}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;