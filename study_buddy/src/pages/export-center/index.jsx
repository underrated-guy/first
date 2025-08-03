import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualHeader from '../../components/ui/ContextualHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import Button from '../../components/ui/Button';
import ContentSelector from './components/ContentSelector';
import FormatSelector from './components/FormatSelector';
import AdvancedOptions from './components/AdvancedOptions';
import ExportPreview from './components/ExportPreview';
import ExportProgress from './components/ExportProgress';
import RecentExports from './components/RecentExports';
import StepIndicator from './components/StepIndicator';

const ExportCenter = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExportComplete, setIsExportComplete] = useState(false);
  
  const [selectedContent, setSelectedContent] = useState({
    scope: 'all-highlights',
    documents: []
  });
  
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  
  const [advancedOptions, setAdvancedOptions] = useState({
    includeTitlePage: true,
    exportTitle: 'My Study Notes',
    authorName: '',
    organization: 'document',
    includeColors: true,
    includePageRefs: true,
    includeDates: false,
    includeNotes: true,
    includeSummaries: false,
    includeTableOfContents: false
  });

  const totalSteps = 4;

  const handleContentChange = (scope, documents = []) => {
    setSelectedContent({ scope, documents });
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleOptionsChange = (options) => {
    setAdvancedOptions(options);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          setIsExportComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleDownload = () => {
    // Simulate download
    console.log('Downloading export...');
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${advancedOptions?.exportTitle || 'study-notes'}.${selectedFormat}`;
    link?.click();
  };

  const handleEmailDelivery = () => {
    console.log('Sending export via email...');
    alert('Export will be sent to your email address shortly.');
  };

  const handleStartNew = () => {
    setCurrentStep(1);
    setIsExporting(false);
    setExportProgress(0);
    setIsExportComplete(false);
    setSelectedContent({ scope: 'all-highlights', documents: [] });
    setSelectedFormat('pdf');
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedContent?.scope === 'all-highlights' || 
               (selectedContent?.scope === 'custom' && selectedContent?.documents?.length > 0);
      case 2:
        return selectedFormat !== '';
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const contextualActions = [
    {
      label: 'Help',
      variant: 'ghost',
      iconName: 'HelpCircle',
      onClick: () => console.log('Show help')
    }
  ];

  const renderStepContent = () => {
    if (isExporting || isExportComplete) {
      return (
        <ExportProgress
          isExporting={isExporting}
          progress={exportProgress}
          isComplete={isExportComplete}
          onDownload={handleDownload}
          onEmailDelivery={handleEmailDelivery}
          onStartNew={handleStartNew}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <ContentSelector
            selectedContent={selectedContent}
            onContentChange={handleContentChange}
          />
        );
      case 2:
        return (
          <FormatSelector
            selectedFormat={selectedFormat}
            onFormatChange={handleFormatChange}
          />
        );
      case 3:
        return (
          <AdvancedOptions
            options={advancedOptions}
            onOptionsChange={handleOptionsChange}
          />
        );
      case 4:
        return (
          <div className="space-y-8">
            <ExportPreview
              selectedContent={selectedContent}
              selectedFormat={selectedFormat}
              options={advancedOptions}
            />
            <div className="text-center">
              <Button
                variant="default"
                size="lg"
                iconName="Download"
                onClick={handleStartExport}
                className="min-w-[200px]"
              >
                Generate Export
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualHeader
        title="Export Center"
        subtitle="Generate formatted study materials from your highlights"
        actions={contextualActions}
      />
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Step Indicator */}
          {!isExporting && !isExportComplete && (
            <StepIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              className="mb-8"
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border border-border p-6">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              {!isExporting && !isExportComplete && (
                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="outline"
                    iconName="ArrowLeft"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </div>

                  <Button
                    variant="default"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={handleNextStep}
                    disabled={currentStep === totalSteps || !canProceedToNext()}
                  >
                    {currentStep === totalSteps ? 'Review' : 'Next'}
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <RecentExports />
                
                {/* Quick Stats */}
                <div className="bg-card rounded-lg border border-border p-4">
                  <h4 className="font-medium text-foreground mb-3">Export Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Content:</span>
                      <span className="text-foreground">
                        {selectedContent?.scope === 'all-highlights' ? 'All highlights' : `${selectedContent?.documents?.length} docs`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="text-foreground uppercase">{selectedFormat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Options:</span>
                      <span className="text-foreground">
                        {Object.values(advancedOptions)?.filter(Boolean)?.length} enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TabNavigation />
    </div>
  );
};

export default ExportCenter;