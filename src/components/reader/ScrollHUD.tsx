import React from 'react';
import { ArrowUp, Settings, Home, List } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScrollHUDProps {
  currentPage: number;
  totalPages: number;
  onSettingsClick: () => void;
  onScrollToTop: () => void;
}

export function ScrollHUD({
  currentPage,
  totalPages,
  onSettingsClick,
  onScrollToTop
}: ScrollHUDProps) {
  return (
    <>
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-50">
        <div className="container mx-auto flex justify-between items-center text-white">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            <Home className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-4">
            <button className="hover:text-blue-400 transition-colors">
              <List className="h-6 w-6" />
            </button>
            <button 
              onClick={onSettingsClick}
              className="hover:text-blue-400 transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={onScrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all transform hover:scale-110 z-50"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      {/* Page Counter */}
      <div className="fixed bottom-6 left-6 px-4 py-2 rounded-full bg-black/50 text-white text-sm z-50">
        {currentPage} / {totalPages}
      </div>
    </>
  );
}