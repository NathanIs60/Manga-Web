import React from 'react';
import { ChevronLeft, ChevronRight, Settings, Home, List } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardHUDProps {
  mangaId?: string;
  chapterId?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSettingsClick: () => void;
}

export function CardHUD({ 
  currentPage, 
  totalPages, 
  onPageChange,
  onSettingsClick 
}: CardHUDProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
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

      {/* Side Navigation */}
      <div className="fixed inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto transition-all transform hover:scale-110"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto transition-all transform hover:scale-110"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-white gap-2">
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => onPageChange(Number(e.target.value))}
              className="w-64 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}