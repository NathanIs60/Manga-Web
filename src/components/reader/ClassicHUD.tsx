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

export function ClassicHUD({ currentPage, totalPages, onPageChange }: HUDProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <Home className="h-5 w-5" />
          </Link>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <List className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}