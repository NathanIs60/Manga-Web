import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, Settings, User, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { SearchBar } from './SearchBar';
import { MobileMenu } from './MobileMenu';
import { useTranslation } from '../lib/translations';

export function Header() {
  const { user, logout, theme, toggleTheme } = useAuthStore();
  const location = useLocation();
  const isSettingsPage = location.pathname === '/settings';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslation(user?.language || 'en');

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b ${
        theme === 'dark' 
          ? 'bg-gray-900/95 border-gray-700 text-white' 
          : 'bg-white/95 border-gray-200'
      } backdrop-blur supports-[backdrop-filter]:bg-opacity-60`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>MangaVerse</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/browse" className="text-sm font-medium hover:text-blue-600">{t('browse')}</Link>
              <Link to="/latest" className="text-sm font-medium hover:text-blue-600">{t('latest')}</Link>
              <Link to="/popular" className="text-sm font-medium hover:text-blue-600">{t('popular')}</Link>
            </nav>
          </div>
          
          {!isSettingsPage && (
            <div className="flex-1 px-4 max-w-xl mx-auto">
              <SearchBar />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/settings" className="text-sm font-medium hover:text-blue-600">
                    <Settings className="h-5 w-5" />
                  </Link>
                  {(user.role === 'admin' || user.role === 'translator') && (
                    <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      {t('dashboard')}
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                  <User className="h-5 w-5" />
                  {t('login')}
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}