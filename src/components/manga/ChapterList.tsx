import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuthStore } from '../../lib/store';

interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  read?: boolean;
}

interface ChapterListProps {
  mangaId: string;
  chapters: Chapter[];
}

export function ChapterList({ mangaId, chapters }: ChapterListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useAuthStore();
  const displayedChapters = isExpanded ? chapters : chapters.slice(0, 10);

  return (
    <div className={`mt-8 rounded-lg shadow-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Chapters</h2>
      </div>

      <div className="divide-y dark:divide-gray-700">
        {displayedChapters.map((chapter) => (
          <Link
            key={chapter.id}
            to={`/manga/${mangaId}/chapter/${chapter.id}`}
            className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              chapter.read ? 'text-gray-500 dark:text-gray-400' : ''
            }`}
          >
            <div>
              <span className="font-medium">
                Chapter {chapter.number}
              </span>
              {chapter.title && (
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  - {chapter.title}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{chapter.releaseDate}</span>
            </div>
          </Link>
        ))}
      </div>

      {chapters.length > 10 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-center text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show All {chapters.length} Chapters
            </>
          )}
        </button>
      )}
    </div>
  );
}