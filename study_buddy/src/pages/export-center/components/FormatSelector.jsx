import React from 'react';
import Icon from '../../../components/AppIcon';

const FormatSelector = ({ selectedFormat, onFormatChange, className = '' }) => {
  const formatOptions = [
    {
      id: 'pdf',
      name: 'PDF Study Guide',
      description: 'Formatted document with highlights and notes',
      icon: 'FileText',
      features: ['Page references', 'Color coding', 'Table of contents'],
      recommended: true
    },
    {
      id: 'docx',
      name: 'Word Document',
      description: 'Editable document for further customization',
      icon: 'FileEdit',
      features: ['Editable text', 'Custom formatting', 'Comments support'],
      recommended: false
    },
    {
      id: 'txt',
      name: 'Plain Text',
      description: 'Simple text file with highlights only',
      icon: 'Type',
      features: ['Lightweight', 'Universal compatibility', 'Easy sharing'],
      recommended: false
    },
    {
      id: 'csv',
      name: 'CSV Spreadsheet',
      description: 'Structured data for analysis and import',
      icon: 'Table',
      features: ['Data analysis', 'Import to Excel', 'Structured format'],
      recommended: false
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Choose Export Format
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formatOptions?.map((format) => (
            <div
              key={format?.id}
              className={`
                relative p-4 border-2 rounded-academic cursor-pointer transition-all duration-200
                ${selectedFormat === format?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-accent'
                }
              `}
              onClick={() => onFormatChange(format?.id)}
            >
              {format?.recommended && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Recommended
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className={`
                  w-12 h-12 rounded-academic flex items-center justify-center
                  ${selectedFormat === format?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={format?.icon} size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{format?.name}</h4>
                    {selectedFormat === format?.id && (
                      <Icon name="Check" size={16} color="var(--color-primary)" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    {format?.description}
                  </p>
                  
                  <div className="space-y-1">
                    {format?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="Check" size={12} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatSelector;