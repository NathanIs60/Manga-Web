import React from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { useTranslation } from '../../lib/translations';

interface ReaderSettingsProps {
  onClose: () => void;
}

export function ReaderSettings({ onClose }: ReaderSettingsProps) {
  const { user, updateReaderStyle, theme } = useAuthStore();
  const t = useTranslation(user?.language || 'en');

  const handleReaderStyleChange = (style: 'modern' | 'classic' | 'scroll') => {
    if (user) {
      updateReaderStyle(user.id, style);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('readerStyle')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
            user?.readerStyle === 'modern'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            <input
              type="radio"
              name="readerStyle"
              checked={user?.readerStyle === 'modern'}
              onChange={() => handleReaderStyleChange('modern')}
              className="sr-only"
            />
            <span>{t('modernReader')}</span>
          </label>

          <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
            user?.readerStyle === 'classic'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            <input
              type="radio"
              name="readerStyle"
              checked={user?.readerStyle === 'classic'}
              onChange={() => handleReaderStyleChange('classic')}
              className="sr-only"
            />
            <span>{t('classicReader')}</span>
          </label>

          <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
            user?.readerStyle === 'scroll'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            <input
              type="radio"
              name="readerStyle"
              checked={user?.readerStyle === 'scroll'}
              onChange={() => handleReaderStyleChange('scroll')}
              className="sr-only"
            />
            <span>Scroll View</span>
          </label>
        </div>
      </div>
    </div>
  );
}