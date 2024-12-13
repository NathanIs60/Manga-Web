import React from 'react';
import { Edit2, Plus } from 'lucide-react';
import { useAuthStore } from '../../../lib/store';
import { useMangaStore } from '../../../lib/mangaStore';

interface MangaListProps {
  searchQuery: string;
  onSelectManga: (mangaId: string) => void;
}

export function MangaList({ searchQuery, onSelectManga }: MangaListProps) {
  const { theme } = useAuthStore();
  const { mangas } = useMangaStore();

  const filteredManga = mangas.filter(manga =>
    manga.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid gap-4">
      {filteredManga.map((manga) => (
        <div
          key={manga.id}
          className={`p-4 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={manga.cover}
              alt={manga.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{manga.title}</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {manga.chapters.length} Chapters
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSelectManga(manga.id)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Chapter
              </button>
              <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}