import React, { useState, useCallback } from 'react';
import { X, Upload, Trash2, Save } from 'lucide-react';
import { useAuthStore } from '../../../lib/store';
import { useMangaStore } from '../../../lib/mangaStore';

interface ChapterUploaderProps {
  mangaId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ChapterUploader({ mangaId, onClose, onSuccess }: ChapterUploaderProps) {
  const { theme } = useAuthStore();
  const { getMangaById } = useMangaStore();
  const manga = getMangaById(mangaId);

  const [chapterData, setChapterData] = useState({
    number: (manga?.chapters.length || 0) + 1,
    title: '',
    pages: [] as File[]
  });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Sort files by name to maintain page order
    const sortedFiles = imageFiles.sort((a, b) => a.name.localeCompare(b.name));
    
    setChapterData(prev => ({
      ...prev,
      pages: [...prev.pages, ...sortedFiles]
    }));
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
    
    setChapterData(prev => ({
      ...prev,
      pages: [...prev.pages, ...sortedFiles]
    }));
  };

  const removePage = (index: number) => {
    setChapterData(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!chapterData.title || chapterData.pages.length === 0) return;

    try {
      // Here you would typically upload the files to your storage service
      // and save the chapter data to your database
      
      onSuccess();
    } catch (error) {
      console.error('Failed to save chapter:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-4xl rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">
            Add Chapter to {manga?.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Chapter Number
              </label>
              <input
                type="number"
                value={chapterData.number}
                onChange={(e) => setChapterData(prev => ({
                  ...prev,
                  number: parseInt(e.target.value)
                }))}
                className={`w-full rounded-lg border p-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Chapter Title
              </label>
              <input
                type="text"
                value={chapterData.title}
                onChange={(e) => setChapterData(prev => ({
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
          </div>

          {/* Page Upload Area */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Drag and drop your manga pages here, or click to select files
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="page-upload"
            />
            <label
              htmlFor="page-upload"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Pages
            </label>
          </div>

          {/* Page Preview */}
          {chapterData.pages.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">
                Pages ({chapterData.pages.length})
              </h3>
              <div className="grid grid-cols-6 gap-4">
                {chapterData.pages.map((file, index) => (
                  <div
                    key={index}
                    className="relative group aspect-[2/3]"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removePage(index)}
                        className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                      Page {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={!chapterData.title || chapterData.pages.length === 0}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
              !chapterData.title || chapterData.pages.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            <Save className="h-4 w-4" />
            Save Chapter
          </button>
        </div>
      </div>
    </div>
  );
}