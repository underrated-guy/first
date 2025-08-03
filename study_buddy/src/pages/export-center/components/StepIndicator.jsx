import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, className = '' }) => {
  const steps = [
    { id: 1, title: 'Select Content', icon: 'FolderOpen' },
    { id: 2, title: 'Choose Format', icon: 'FileText' },
    { id: 3, title: 'Configure Options', icon: 'Settings' },
    { id: 4, title: 'Preview & Export', icon: 'Download' }
  ];

  return (
    <div className={`${className}`}>
      {/* Mobile Step Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="text-sm text-muted-foreground">
            {steps?.[currentStep - 1]?.title}
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                ${currentStep >= step?.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : currentStep === step?.id - 1
                  ? 'border-primary text-primary bg-primary/10' :'border-border text-muted-foreground bg-background'
                }
              `}>
                {currentStep > step?.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              
              <div className="hidden lg:block">
                <div className={`text-sm font-medium ${
                  currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  Step {step?.id}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step?.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;