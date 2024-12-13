import React, { useState } from 'react';
import { Upload, MessageSquare, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../lib/store';

export function TranslatorDashboard() {
  const { user, addTranslationNotes } = useAuthStore();
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && user) {
      // In a real app, this would upload the file to a server
      alert('File uploaded successfully!');
      setSelectedFile(null);
    }
  };

  const handleSaveNotes = () => {
    if (notes.trim() && user) {
      addTranslationNotes('manga-1', notes);
      alert('Notes saved successfully!');
      setNotes('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Translator Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Upload Translation</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : 'Drag and drop your translation files here, or click to select files'}
              </p>
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer inline-block"
              >
                Select Files
              </label>
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  className="mt-4 ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Translation Notes</h2>
          <div className="space-y-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-2 border rounded-md resize-none"
              placeholder="Add notes about your translation..."
            />
            <button
              onClick={handleSaveNotes}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Save Notes
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-2">
            {[
              { title: 'One Piece - Chapter 1084', status: 'approved' },
              { title: 'Jujutsu Kaisen - Chapter 252', status: 'pending' },
              { title: 'My Hero Academia - Chapter 402', status: 'pending' }
            ].map((submission, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded"
              >
                <span>{submission.title}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    submission.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {submission.status === 'approved' && (
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                  )}
                  {submission.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}