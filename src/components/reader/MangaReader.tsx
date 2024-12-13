import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';
import { CardHUD } from './CardHUD';
import { ScrollHUD } from './ScrollHUD';
import { ReaderSettings } from './ReaderSettings';

export function MangaReader() {
  const { mangaId, chapterId } = useParams();
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // In a real app, fetch these from an API
  const pages = [
    'https://images.unsplash.com/photo-1612178537253-bccd437b730e',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477',
  ];

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (user?.readerStyle === 'scroll') {
    return (
      <div 
        ref={containerRef}
        className="min-h-screen bg-gray-900 overflow-y-auto"
      >
        <ScrollHUD
          currentPage={currentPage}
          totalPages={pages.length}
          onSettingsClick={() => setShowSettings(true)}
          onScrollToTop={scrollToTop}
        />
        
        <div className="pt-16 pb-8 space-y-4">
          {pages.map((page, index) => (
            <div 
              key={index}
              className="flex justify-center px-4"
            >
              <img
                src={page}
                alt={`Page ${index + 1}`}
                className="max-w-full h-auto"
                onLoad={() => {
                  if (index === currentPage - 1) {
                    setCurrentPage(index + 1);
                  }
                }}
              />
            </div>
          ))}
        </div>

        {showSettings && (
          <ReaderSettings
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900">
      <CardHUD
        mangaId={mangaId}
        chapterId={chapterId}
        currentPage={currentPage}
        totalPages={pages.length}
        onPageChange={handlePageChange}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={pages[currentPage - 1]}
          alt={`Page ${currentPage}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {showSettings && (
        <ReaderSettings
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}