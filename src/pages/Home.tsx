import React from 'react';
import { MetaTags } from '../components/SEO/MetaTags';
import { FeaturedManga } from '../components/FeaturedManga';
import { MangaCard } from '../components/MangaCard';

const popularManga = [
  {
    id: "1",
    title: "Demon Slayer",
    cover: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&q=80",
    rating: 4.8
  },
  // ... other manga entries
];

export function Home() {
  return (
    <>
      <MetaTags
        title="MangaVerse - Read Manga Online"
        description="Read the latest manga online for free at MangaVerse. New chapters added daily!"
        keywords="manga, read manga, online manga, latest manga, popular manga, demon slayer, attack on titan"
      />
      
      <main>
        <FeaturedManga />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Popular Manga</h2>
            <a href="/popular" className="text-blue-600 hover:underline">View all</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularManga.map((manga) => (
              <MangaCard key={manga.id} {...manga} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}