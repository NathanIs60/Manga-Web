import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'translator' | 'admin';
export type Language = 'en' | 'es' | 'fr' | 'ja' | 'tr';
export type Theme = 'light' | 'dark';
export type ReaderStyle = 'modern' | 'classic' | 'scroll';

interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  language: Language;
  theme: Theme;
  readerStyle: ReaderStyle;
  password: string;
  banned?: boolean;
}

interface Manga {
  id: string;
  title: string;
  cover: string;
  status: 'pending' | 'approved' | 'rejected';
  translatorId?: string;
  notes?: string;
}

interface AuthState {
  user: Omit<User, 'password'> | null;
  users: User[];
  mangas: Manga[];
  theme: Theme;
  login: (email: string, password: string) => Omit<User, 'password'> | null;
  register: (email: string, username: string, password: string) => Omit<User, 'password'> | null;
  logout: () => void;
  updateUser: (userId: string, data: Partial<User>, currentPassword?: string) => boolean;
  updatePassword: (userId: string, currentPassword: string, newPassword: string) => boolean;
  banUser: (userId: string) => boolean;
  unbanUser: (userId: string) => boolean;
  addManga: (manga: Omit<Manga, 'id'>) => Manga;
  updateMangaStatus: (mangaId: string, status: Manga['status']) => boolean;
  addTranslationNotes: (mangaId: string, notes: string) => boolean;
  toggleTheme: () => void;
  updateReaderStyle: (userId: string, style: ReaderStyle) => boolean;
}

// Admin user credentials
const adminUser: User = {
  id: 'admin-1',
  email: 'admin@mangaverse.com',
  username: 'admin',
  role: 'admin',
  language: 'en',
  theme: 'light',
  readerStyle: 'modern',
  password: 'admin123'
};

// Sample translator
const translatorUser: User = {
  id: 'translator-1',
  email: 'translator@mangaverse.com',
  username: 'translator',
  role: 'translator',
  language: 'en',
  theme: 'light',
  readerStyle: 'modern',
  password: 'translator123'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [adminUser, translatorUser],
      mangas: [],
      theme: 'light',
      login: (email, password) => {
        const users = get().users;
        const user = users.find(u => u.email === email && u.password === password && !u.banned);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword });
          return userWithoutPassword;
        }
        return null;
      },
      register: (email, username, password) => {
        const users = get().users;
        if (users.some(u => u.email === email)) {
          return null;
        }
        const newUser: User = {
          id: `user-${users.length + 1}`,
          email,
          username,
          role: 'user',
          language: 'en',
          theme: get().theme,
          readerStyle: 'modern',
          password
        };
        set(state => ({ users: [...state.users, newUser] }));
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword });
        return userWithoutPassword;
      },
      logout: () => set({ user: null }),
      updateUser: (userId, data, currentPassword) => {
        const users = get().users;
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) return false;
        
        const user = users[userIndex];
        
        if (data.email && data.email !== user.email) {
          if (users.some(u => u.email === data.email)) {
            return false;
          }
        }
        
        if (currentPassword && currentPassword !== user.password) {
          return false;
        }
        
        const updatedUser = { ...user, ...data };
        const updatedUsers = [...users];
        updatedUsers[userIndex] = updatedUser;
        
        const { password: _, ...userWithoutPassword } = updatedUser;
        
        set({ 
          users: updatedUsers,
          user: get().user?.id === userId ? userWithoutPassword : get().user,
          theme: data.theme || get().theme
        });
        
        return true;
      },
      updatePassword: (userId, currentPassword, newPassword) => {
        const users = get().users;
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) return false;
        
        const user = users[userIndex];
        if (user.password !== currentPassword) {
          return false;
        }
        
        const updatedUser = { ...user, password: newPassword };
        const updatedUsers = [...users];
        updatedUsers[userIndex] = updatedUser;
        
        set({ users: updatedUsers });
        return true;
      },
      banUser: (userId) => {
        const users = get().users;
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) return false;
        
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], banned: true };
        
        set({ users: updatedUsers });
        return true;
      },
      unbanUser: (userId) => {
        const users = get().users;
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) return false;
        
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], banned: false };
        
        set({ users: updatedUsers });
        return true;
      },
      addManga: (manga) => {
        const newManga: Manga = {
          id: `manga-${get().mangas.length + 1}`,
          ...manga,
          status: 'pending'
        };
        set(state => ({ mangas: [...state.mangas, newManga] }));
        return newManga;
      },
      updateMangaStatus: (mangaId, status) => {
        const mangas = get().mangas;
        const mangaIndex = mangas.findIndex(m => m.id === mangaId);
        
        if (mangaIndex === -1) return false;
        
        const updatedMangas = [...mangas];
        updatedMangas[mangaIndex] = { ...updatedMangas[mangaIndex], status };
        
        set({ mangas: updatedMangas });
        return true;
      },
      addTranslationNotes: (mangaId, notes) => {
        const mangas = get().mangas;
        const mangaIndex = mangas.findIndex(m => m.id === mangaId);
        
        if (mangaIndex === -1) return false;
        
        const updatedMangas = [...mangas];
        updatedMangas[mangaIndex] = { ...updatedMangas[mangaIndex], notes };
        
        set({ mangas: updatedMangas });
        return true;
      },
      toggleTheme: () => {
        set(state => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (state.user) {
            const userId = state.user.id;
            state.updateUser(userId, { theme: newTheme });
          }
          return { theme: newTheme };
        });
      },
      updateReaderStyle: (userId, style) => {
        return get().updateUser(userId, { readerStyle: style });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);