import React, { useRef } from 'react';
import Button from '../../../components/ui/Button';


const ImportButton = ({ onImport, loading }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target?.files);
    if (files?.length > 0) {
      onImport(files);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Desktop Floating Action Button */}
      <Button
        variant="default"
        size="lg"
        iconName="Upload"
        onClick={handleClick}
        loading={loading}
        className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-shadow hidden md:flex rounded-full w-14 h-14 p-0"
      />
      
      {/* Mobile Import Button */}
      <div className="md:hidden fixed bottom-20 left-4 right-4 z-50">
        <Button
          variant="default"
          size="lg"
          iconName="Upload"
          onClick={handleClick}
          loading={loading}
          fullWidth
          className="shadow-lg"
        >
          Import Document
        </Button>
      </div>
    </>
  );
};

export default ImportButton;