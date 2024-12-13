import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface MangaCardProps {
  id: string;
  title: string;
  cover: string;
  rating: number;
  className?: string;
}

export function MangaCard({ id, title, cover, rating, className }: MangaCardProps) {
  return (
    <Link to={`/manga/${id}`} className={cn("group relative overflow-hidden rounded-lg", className)}>
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
        <img
          src={cover}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{title}</h3>
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}