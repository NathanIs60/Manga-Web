import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { AdminDashboard } from './pages/AdminDashboard';
import { TranslatorDashboard } from './pages/TranslatorDashboard';
import { SearchResults } from './pages/SearchResults';
import { MangaDetail } from './pages/MangaDetail';
import { MangaReader } from './components/reader/MangaReader';
import { AuthGuard } from './components/AuthGuard';
import { useAuthStore } from './lib/store';

export default function App() {
  const theme = useAuthStore((state) => state.theme);

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/manga/:mangaId" element={<MangaDetail />} />
          <Route path="/manga/:mangaId/chapter/:chapterId" element={<MangaReader />} />
          <Route
            path="/settings"
            element={
              <AuthGuard allowedRoles={['user', 'translator', 'admin']}>
                <Settings />
              </AuthGuard>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthGuard allowedRoles={['admin']}>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/translator"
            element={
              <AuthGuard allowedRoles={['translator']}>
                <TranslatorDashboard />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}