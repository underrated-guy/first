import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentDisplay = ({ 
  document, 
  highlights = [], 
  onHighlight, 
  onHighlightClick,
  selectedHighlight,
  className = '' 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);
  const [showHighlightToolbar, setShowHighlightToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const documentRef = useRef(null);

  const totalPages = document?.totalPages || 15;

  const highlightColors = [
    { name: 'Yellow', value: '#fef08a', class: 'bg-yellow-200' },
    { name: 'Green', value: '#bbf7d0', class: 'bg-green-200' },
    { name: 'Blue', value: '#bfdbfe', class: 'bg-blue-200' },
    { name: 'Pink', value: '#fbcfe8', class: 'bg-pink-200' },
    { name: 'Purple', value: '#e9d5ff', class: 'bg-purple-200' }
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount > 0 && selection?.toString()?.trim()) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      setSelectedText(selection?.toString()?.trim());
      setSelectionRange(range);
      setToolbarPosition({
        x: rect?.left + rect?.width / 2,
        y: rect?.top - 60
      });
      setShowHighlightToolbar(true);
      setIsSelecting(true);
    } else {
      setShowHighlightToolbar(false);
      setIsSelecting(false);
      setSelectedText('');
      setSelectionRange(null);
    }
  };

  const handleCreateHighlight = (color) => {
    if (selectedText && selectionRange) {
      const newHighlight = {
        id: Date.now(),
        text: selectedText,
        page: currentPage,
        color: color?.value,
        colorName: color?.name,
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        },
        note: '',
        createdAt: new Date()?.toISOString()
      };
      
      onHighlight(newHighlight);
      setShowHighlightToolbar(false);
      setIsSelecting(false);
      setSelectedText('');
      setSelectionRange(null);
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getCurrentPageHighlights = () => {
    return highlights?.filter(h => h?.page === currentPage);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target?.closest('.highlight-toolbar')) {
        setShowHighlightToolbar(false);
        setIsSelecting(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!document) {
    return (
      <div className={`flex items-center justify-center h-full bg-muted rounded-lg ${className}`}>
        <div className="text-center">
          <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No document selected</p>
          <p className="text-sm text-muted-foreground mt-1">Select a document to start reading</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-background ${className}`}>
      {/* Document Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ZoomOut"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          />
          <span className="text-sm font-medium min-w-[60px] text-center">
            {zoomLevel}%
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="ZoomIn"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          />
          <span className="text-sm font-medium min-w-[80px] text-center">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={() => setZoomLevel(100)}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Maximize2"
            onClick={() => console.log('Fullscreen')}
          />
        </div>
      </div>
      {/* Document Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div 
          ref={documentRef}
          className="mx-auto bg-white shadow-lg relative"
          style={{ 
            width: `${(8.5 * zoomLevel) / 100 * 96}px`,
            minHeight: `${(11 * zoomLevel) / 100 * 96}px`,
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center'
          }}
          onMouseUp={handleTextSelection}
        >
          {/* Document Page Content */}
          <div className="p-8 leading-relaxed text-foreground select-text">
            <h1 className="text-2xl font-heading font-semibold mb-6 text-center">
              {document.title}
            </h1>
            
            <div className="space-y-4 text-sm">
              <p>
                This is page {currentPage} of the document "{document.title}". 
                The document contains comprehensive study material covering various topics 
                related to the subject matter. Students can highlight important sections, 
                add notes, and extract key insights for better understanding.
              </p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur.
              </p>
              
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste 
                natus error sit voluptatem accusantium doloremque laudantium, totam rem 
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto 
                beatae vitae dicta sunt explicabo.
              </p>
              
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore 
                et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </div>

          {/* Existing Highlights Overlay */}
          {getCurrentPageHighlights()?.map((highlight) => (
            <div
              key={highlight?.id}
              className={`absolute cursor-pointer transition-opacity duration-200 ${
                selectedHighlight?.id === highlight?.id ? 'ring-2 ring-primary' : ''
              }`}
              style={{
                left: `${highlight?.position?.x}%`,
                top: `${highlight?.position?.y}%`,
                backgroundColor: highlight?.color,
                padding: '2px 4px',
                borderRadius: '2px',
                maxWidth: '200px'
              }}
              onClick={() => onHighlightClick(highlight)}
              title={highlight?.text}
            >
              <span className="text-xs text-gray-800 line-clamp-2">
                {highlight?.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Highlight Creation Toolbar */}
      {showHighlightToolbar && (
        <div
          className="highlight-toolbar fixed z-50 bg-white border border-border rounded-lg shadow-lg p-2"
          style={{
            left: `${toolbarPosition?.x}px`,
            top: `${toolbarPosition?.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-muted-foreground mr-2">
              Highlight:
            </span>
            {highlightColors?.map((color) => (
              <button
                key={color?.name}
                className={`w-6 h-6 rounded ${color?.class} border border-gray-300 hover:scale-110 transition-transform`}
                onClick={() => handleCreateHighlight(color)}
                title={`Highlight in ${color?.name}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDisplay;