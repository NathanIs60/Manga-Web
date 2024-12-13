import React from 'react';
import { useParams } from 'react-router-dom';
import { MetaTags } from '../components/SEO/MetaTags';
import { MangaInfo } from '../components/manga/MangaInfo';
import { ChapterList } from '../components/manga/ChapterList';
import { RelatedManga } from '../components/manga/RelatedManga';
import { useMangaStore } from '../lib/mangaStore';

export function MangaDetail() {
  const { mangaId } = useParams();
  const { getMangaById } = useMangaStore();
  const manga = getMangaById(mangaId || '');

  if (!manga) {
    return <div>Manga not found</div>;
  }

  return (
    <>
      <MetaTags
        title={`${manga.title} - Read on MangaVerse`}
        description={manga.description}
        image={manga.cover}
        keywords={`${manga.title}, manga, read manga, ${manga.genres.join(', ')}`}
      />

      <div className="container mx-auto px-4 py-8">
        <MangaInfo manga={manga} />
        <ChapterList mangaId={manga.id} chapters={manga.chapters} />
        <RelatedManga genres={manga.genres} currentMangaId={manga.id} />
      </div>
    </>
  );
}