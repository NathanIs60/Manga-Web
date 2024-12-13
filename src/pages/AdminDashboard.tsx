import React, { useState } from 'react';
import { Ban, Plus, Users, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { useTranslation } from '../lib/translations';
import { MangaUploader } from '../components/admin/MangaUploader';

export function AdminDashboard() {
  const { users, banUser, unbanUser, addManga, updateMangaStatus, theme } = useAuthStore();
  const [showUsers, setShowUsers] = useState(false);
  const [showBanned, setShowBanned] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const t = useTranslation(users[0]?.language || 'en');

  const handleBanUser = (userId: string) => {
    banUser(userId);
  };

  const handleUnbanUser = (userId: string) => {
    unbanUser(userId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{t('adminDashboard')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'
        }`}>
          <h2 className="text-lg font-semibold mb-4">{t('userManagement')}</h2>
          <div className="space-y-4">
            <button 
              onClick={() => {
                setShowUsers(!showUsers);
                setShowBanned(false);
              }}
              className={`flex items-center gap-2 w-full p-2 text-left rounded ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5 text-gray-500" />
              <span>{t('viewAllUsers')}</span>
            </button>
            <button 
              onClick={() => {
                setShowBanned(!showBanned);
                setShowUsers(false);
              }}
              className={`flex items-center gap-2 w-full p-2 text-left rounded text-red-600 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Ban className="h-5 w-5" />
              <span>{t('bannedUsers')}</span>
            </button>
          </div>

          {showUsers && (
            <div className="mt-4 space-y-2">
              {users.filter(u => !u.banned).map(user => (
                <div key={user.id} className={`flex justify-between items-center p-2 rounded ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.email}
                    </div>
                  </div>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {showBanned && (
            <div className="mt-4 space-y-2">
              {users.filter(u => u.banned).map(user => (
                <div key={user.id} className={`flex justify-between items-center p-2 rounded ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.email}
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnbanUser(user.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'
        }`}>
          <h2 className="text-lg font-semibold mb-4">{t('contentManagement')}</h2>
          <div className="space-y-4">
            <button 
              onClick={() => setShowUploader(!showUploader)}
              className={`flex items-center gap-2 w-full p-2 text-left rounded text-blue-600 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>{t('addNewManga')}</span>
            </button>
          </div>

          {showUploader && (
            <div className="mt-4">
              <MangaUploader />
            </div>
          )}
        </div>

        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'
        }`}>
          <h2 className="text-lg font-semibold mb-4">{t('translationStatus')}</h2>
          <div className="space-y-2">
            <div className={`flex justify-between items-center p-2 rounded ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}>
              <span>{t('pendingReviews')}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                theme === 'dark' 
                  ? 'bg-yellow-900/50 text-yellow-100' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                5
              </span>
            </div>
            <div className={`flex justify-between items-center p-2 rounded ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}>
              <span>{t('approved')}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                theme === 'dark' 
                  ? 'bg-green-900/50 text-green-100' 
                  : 'bg-green-100 text-green-800'
              }`}>
                12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}