import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAuthStore } from '../../../lib/store';
import { MangaUploader } from './MangaUploader';
import { MangaList } from './MangaList';
import { ChapterUploader } from './ChapterUploader';

export function MangaManager() {
  const [showUploader, setShowUploader] = useState(false);
  const [showChapterUploader, setShowChapterUploader] = useState(false);
  const [selectedMangaId, setSelectedMangaId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useAuthStore();

  return (
    <div className={`p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manga Management</h2>
        <button
          onClick={() => setShowUploader(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add New Manga
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search manga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300'
            }`}
          />
        </div>
      </div>

      {/* Manga List */}
      <MangaList
        searchQuery={searchQuery}
        onSelectManga={(mangaId) => {
          setSelectedMangaId(mangaId);
          setShowChapterUploader(true);
        }}
      />

      {/* New Manga Upload Modal */}
      {showUploader && (
        <MangaUploader
          onClose={() => setShowUploader(false)}
          onSuccess={() => {
            setShowUploader(false);
            // Refresh manga list
          }}
        />
      )}

      {/* Chapter Upload Modal */}
      {showChapterUploader && selectedMangaId && (
        <ChapterUploader
          mangaId={selectedMangaId}
          onClose={() => {
            setShowChapterUploader(false);
            setSelectedMangaId(null);
          }}
          onSuccess={() => {
            setShowChapterUploader(false);
            setSelectedMangaId(null);
            // Refresh manga list
          }}
        />
      )}
    </div>
  );
}