import React from 'react';
import { MangaCard } from '../MangaCard';
import { useMangaStore } from '../../lib/mangaStore';

interface RelatedMangaProps {
  genres: string[];
  currentMangaId: string;
}

export function RelatedManga({ genres, currentMangaId }: RelatedMangaProps) {
  const { getRelatedManga } = useMangaStore();
  const relatedManga = getRelatedManga(genres, currentMangaId).slice(0, 4);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedManga.map((manga) => (
          <MangaCard key={manga.id} {...manga} />
        ))}
      </div>
    </div>
  );
}