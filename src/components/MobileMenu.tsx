import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { useTranslation } from '../lib/translations';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useAuthStore();
  const t = useTranslation(user?.language || 'en');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 shadow-lg">
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">{t('menu')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-4">
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            {t('home')}
          </Link>
          <Link
            to="/browse"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            {t('browse')}
          </Link>
          <Link
            to="/latest"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            {t('latest')}
          </Link>
          <Link
            to="/popular"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            {t('popular')}
          </Link>

          {user ? (
            <>
              <Link
                to="/settings"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onClose}
              >
                {t('settings')}
              </Link>
              {(user.role === 'admin' || user.role === 'translator') && (
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={onClose}
                >
                  {t('dashboard')}
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={onClose}
            >
              {t('login')}
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}