import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onImportClick }) => {
  const sampleDocuments = [
    "Research Paper Template",
    "Study Notes Format",
    "Academic Article Example"
  ];

  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="FolderOpen" size={32} color="var(--color-muted-foreground)" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No documents yet
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start building your study library by importing your first document. 
        Supported formats include PDF, Word, PowerPoint, and text files.
      </p>
      <Button
        variant="default"
        size="lg"
        iconName="Upload"
        onClick={onImportClick}
        className="mb-8"
      >
        Import Your First Document
      </Button>
      <div className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          Need inspiration? Try these sample documents:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {sampleDocuments?.map((doc, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => console.log(`Load sample: ${doc}`)}
              className="text-xs"
            >
              {doc}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;