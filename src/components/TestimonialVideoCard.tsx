import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface TestimonialVideoCardProps {
  videoUrl: string;
  thumbnailUrl?: string;
  videoThumbnailUrl?: string;
  author: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  onPlayClick?: () => void;
}

export default function TestimonialVideoCard({
  videoUrl,
  thumbnailUrl,
  videoThumbnailUrl,
  author,
  text,
  rating,
  avatarUrl,
  onPlayClick,
}: TestimonialVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const thumbnail = videoThumbnailUrl || thumbnailUrl;

  const handlePlayClick = () => {
    setIsPlaying(true);
    onPlayClick?.();
  };

  if (!videoUrl) {
    return null;
  }

  return (
    <div className="break-inside-avoid mb-4">
      {/* Video Card - Show thumbnail when not playing */}
      {!isPlaying ? (
        <div className="relative w-full bg-gray-900 overflow-hidden group cursor-pointer">
          {/* Thumbnail or Placeholder */}
          <div
            className="relative w-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden"
            onClick={handlePlayClick}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`${author} testimonial video`}
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-800 opacity-60" />
            )}

            {/* Play Button Overlay */}
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"
              aria-label={`Play ${author}'s testimonial video`}
            >
              <div className="bg-orange-600 hover:bg-orange-700 rounded-full p-4 transition-colors">
                <Play size={40} className="text-white fill-white" />
              </div>
            </button>

            {/* Author Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-orange-500">
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-white font-bold text-lg">{author}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Inline Video Player */
        <div className="relative w-full bg-black overflow-hidden">
          <div className="relative w-full aspect-[9/16] bg-black flex items-center justify-center">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>

            {/* Author Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-orange-500">
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-white font-bold text-lg">{author}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
