import React, { useState } from 'react';
import { Upload, Plus, Trash2, Save } from 'lucide-react';
import { useAuthStore } from '../../lib/store';

interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: string[];
}

interface MangaContent {
  id: string;
  title: string;
  cover: string;
  chapters: Chapter[];
}

export function MangaUploader() {
  const { theme } = useAuthStore();
  const [selectedManga, setSelectedManga] = useState<MangaContent | null>(null);
  const [newChapter, setNewChapter] = useState({
    number: 1,
    title: '',
    pages: [] as File[]
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewChapter(prev => ({
      ...prev,
      pages: [...prev.pages, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setNewChapter(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // In a real app, this would upload files to a server
    console.log('Saving chapter:', newChapter);
    alert('Chapter saved successfully!');
    setNewChapter({
      number: newChapter.number + 1,
      title: '',
      pages: []
    });
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${
      theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Upload Manga Chapter</h2>

      <div className="space-y-6">
        {/* Chapter Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chapter Number</label>
            <input
              type="number"
              value={newChapter.number}
              onChange={(e) => setNewChapter(prev => ({
                ...prev,
                number: parseInt(e.target.value)
              }))}
              className={`w-full rounded-md shadow-sm ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Chapter Title</label>
            <input
              type="text"
              value={newChapter.title}
              onChange={(e) => setNewChapter(prev => ({
                ...prev,
                title: e.target.value
              }))}
              className={`w-full rounded-md shadow-sm ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>

        {/* File Upload Area */}
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
          theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
        }`}>
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

        {/* Selected Files Preview */}
        {newChapter.pages.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Selected Pages ({newChapter.pages.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newChapter.pages.map((file, index) => (
                <div
                  key={index}
                  className={`relative group rounded-lg overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Page ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
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

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!newChapter.title || newChapter.pages.length === 0}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${
            !newChapter.title || newChapter.pages.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Chapter
        </button>
      </div>
    </div>
  );
}