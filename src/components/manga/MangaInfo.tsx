import React, { useState } from 'react';
import { Heart, Share2, BookOpen, Star } from 'lucide-react';
import { useAuthStore } from '../../lib/store';

interface MangaInfoProps {
  manga: {
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
  };
}

export function MangaInfo({ manga }: MangaInfoProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { theme } = useAuthStore();

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="md:flex">
        {/* Cover Image */}
        <div className="md:w-1/3">
          <img
            src={manga.cover}
            alt={manga.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Manga Details */}
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{manga.rating.toFixed(1)}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Author:</span>
              <span className="ml-2">{manga.author}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Artist:</span>
              <span className="ml-2">{manga.artist}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <span className="ml-2">{manga.status}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Year:</span>
              <span className="ml-2">{manga.releaseYear}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {manga.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className={`text-gray-600 dark:text-gray-300 ${
              !isDescriptionExpanded ? 'line-clamp-3' : ''
            }`}>
              {manga.description}
            </p>
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm mt-2"
            >
              {isDescriptionExpanded ? 'Show less' : 'Read more'}
            </button>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <BookOpen className="h-5 w-5" />
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
}