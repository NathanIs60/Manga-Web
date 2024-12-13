import { create } from 'zustand';

interface Manga {
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  artist: string;
  status: string;
  rating: number;
  genres: string[];
  releaseYear: number;
  chapters: Array<{
    id: string;
    number: number;
    title: string;
    releaseDate: string;
    read?: boolean;
  }>;
}

interface MangaStore {
  mangas: Manga[];
  getMangaById: (id: string) => Manga | undefined;
  getRelatedManga: (genres: string[], currentId: string) => Manga[];
}

// Sample data
const sampleMangas: Manga[] = [
  {
    id: "1",
    title: "Demon Slayer",
    cover: "https://images.unsplash.com/photo-1612178537253-bccd437b730e",
    description: "In Taisho-era Japan, Tanjiro Kamado is a kindhearted boy who makes a living selling charcoal. But his peaceful life is shattered when a demon slaughters his entire family. His little sister Nezuko is the only survivor, but she has been transformed into a demon herself! Tanjiro sets out on a dangerous journey to find a way to return his sister to normal and destroy the demon who ruined his life.",
    author: "Koyoharu Gotouge",
    artist: "Koyoharu Gotouge",
    status: "Completed",
    rating: 4.8,
    genres: ["Action", "Fantasy", "Historical"],
    releaseYear: 2016,
    chapters: [
      { id: "1-1", number: 1, title: "Cruelty", releaseDate: "2016-02-15" },
      { id: "1-2", number: 2, title: "Training", releaseDate: "2016-02-22" },
      // Add more chapters...
    ]
  },
  // Add more manga...
];

export const useMangaStore = create<MangaStore>((set, get) => ({
  mangas: sampleMangas,
  getMangaById: (id) => get().mangas.find(manga => manga.id === id),
  getRelatedManga: (genres, currentId) => {
    return get().mangas
      .filter(manga => 
        manga.id !== currentId && 
        manga.genres.some(genre => genres.includes(genre))
      )
      .sort(() => Math.random() - 0.5);
  }
}));