import React from 'react';
import { ChevronLeft, ChevronRight, Settings, Home, List } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HUDProps {
  mangaId?: string;
  chapterId?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ModernHUD({ currentPage, totalPages, onPageChange }: HUDProps) {
  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="container mx-auto flex justify-between items-center text-white">
          <Link to="/" className="hover:text-blue-400">
            <Home className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-4">
            <button className="hover:text-blue-400">
              <List className="h-6 w-6" />
            </button>
            <button className="hover:text-blue-400">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="fixed inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="container mx-auto">
          <div className="flex justify-center items-center text-white gap-4">
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => onPageChange(Number(e.target.value))}
              className="w-64"
            />
          </div>
        </div>
      </div>
    </>
  );
}