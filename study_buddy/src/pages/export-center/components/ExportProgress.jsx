import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportProgress = ({ 
  isExporting, 
  progress, 
  isComplete, 
  downloadUrl, 
  onDownload, 
  onEmailDelivery,
  onStartNew,
  className = '' 
}) => {
  const getProgressMessage = () => {
    if (isComplete) return 'Export completed successfully!';
    if (progress < 25) return 'Preparing export...';
    if (progress < 50) return 'Processing highlights...';
    if (progress < 75) return 'Formatting content...';
    if (progress < 100) return 'Finalizing document...';
    return 'Almost done...';
  };

  const getEstimatedTime = () => {
    if (isComplete) return '';
    const remaining = 100 - progress;
    const seconds = Math.ceil(remaining / 10);
    return `~${seconds} seconds remaining`;
  };

  if (!isExporting && !isComplete) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          {isComplete ? (
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          ) : (
            <Icon name="Download" size={32} color="var(--color-primary)" />
          )}
        </div>
        
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
          {isComplete ? 'Export Ready!' : 'Generating Export'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {getProgressMessage()}
        </p>

        {/* Progress Bar */}
        {!isComplete && (
          <div className="w-full max-w-md mx-auto mb-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {progress}% • {getEstimatedTime()}
            </div>
          </div>
        )}

        {/* Completion Actions */}
        {isComplete && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                iconName="Download"
                onClick={onDownload}
                className="min-w-[140px]"
              >
                Download Now
              </Button>
              <Button
                variant="outline"
                iconName="Mail"
                onClick={onEmailDelivery}
                className="min-w-[140px]"
              >
                Email to Me
              </Button>
            </div>
            
            <Button
              variant="ghost"
              iconName="Plus"
              onClick={onStartNew}
              size="sm"
            >
              Create Another Export
            </Button>
          </div>
        )}

        {/* Processing Info */}
        {!isComplete && (
          <div className="text-xs text-muted-foreground max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Info" size={12} />
              <span>Processing your highlights and formatting the document</span>
            </div>
            <p>Large exports may take longer. You can safely close this tab and return later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportProgress;