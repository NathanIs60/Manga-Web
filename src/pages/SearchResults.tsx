import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MangaCard } from '../components/MangaCard';

const sampleManga = [
  {
    id: "1",
    title: "Demon Slayer",
    cover: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&q=80",
    rating: 4.8
  },
  {
    id: "2",
    title: "Attack on Titan",
    cover: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80",
    rating: 4.9
  },
  {
    id: "3",
    title: "Jujutsu Kaisen",
    cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80",
    rating: 4.7
  }
];

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter manga based on search query
  const filteredManga = sampleManga.filter(manga =>
    manga.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      
      {filteredManga.length === 0 ? (
        <p className="text-gray-500">No manga found matching your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredManga.map((manga) => (
            <MangaCard key={manga.id} {...manga} />
          ))}
        </div>
      )}
    </div>
  );
}