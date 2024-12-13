import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturedManga() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80"
        alt="Featured Manga"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full max-w-lg flex-col justify-center text-white">
            <h1 className="text-4xl font-bold">One Piece</h1>
            <p className="mt-4 text-lg text-gray-200">
              Follow Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, the One Piece.
            </p>
            <Link
              to="/manga/one-piece"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Read Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}