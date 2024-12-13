import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { useAuthStore } from '../../../lib/store';

interface MangaUploaderProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function MangaUploader({ onClose, onSuccess }: MangaUploaderProps) {
  const { theme } = useAuthStore();
  const [mangaData, setMangaData] = useState({
    title: '',
    description: '',
    author: '',
    artist: '',
    status: 'ongoing',
    genres: [] as string[],
    cover: null as File | null
  });

  const handleCoverSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMangaData(prev => ({ ...prev, cover: file }));
    }
  };

  const handleGenreToggle = (genre: string) => {
    setMangaData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSave = async () => {
    if (!mangaData.title || !mangaData.cover) return;

    try {
      // Here you would typically upload the cover to your storage service
      // and save the manga data to your database
      
      onSuccess();
    } catch (error) {
      console.error('Failed to save manga:', error);
    }
  };

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-2xl rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">Add New Manga</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Cover Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <div className={`relative aspect-[2/3] border-2 border-dashed rounded-lg overflow-hidden ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}>
              {mangaData.cover ? (
                <img
                  src={URL.createObjectURL(mangaData.cover)}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Click to upload cover image
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Manga Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={mangaData.title}
                onChange={(e) => setMangaData(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
                className={`w-full rounded-lg border p-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={mangaData.description}
                onChange={(e) => setMangaData(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                rows={4}
                className={`w-full rounded-lg border p-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  value={mangaData.author}
                  onChange={(e) => setMangaData(prev => ({
                    ...prev,
                    author: e.target.value
                  }))}
                  className={`w-full rounded-lg border p-2 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Artist</label>
                <input
                  type="text"
                  value={mangaData.artist}
                  onChange={(e) => setMangaData(prev => ({
                    ...prev,
                    artist: e.target.value
                  }))}
                  className={`w-full rounded-lg border p-2 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={mangaData.status}
                onChange={(e) => setMangaData(prev => ({
                  ...prev,
                  status: e.target.value
                }))}
                className={`w-full rounded-lg border p-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="hiatus">On Hiatus</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Genres</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      mangaData.genres.includes(genre)
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={!mangaData.title || !mangaData.cover}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
              !mangaData.title || !mangaData.cover
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            <Plus className="h-4 w-4" />
            Add Manga
          </button>
        </div>
      </div>
    </div>
  );
}