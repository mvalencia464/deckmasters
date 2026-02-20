import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { mapAssetUrl } from '../utils/assetMapper';

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
  
  const thumbnail = mapAssetUrl(videoThumbnailUrl || thumbnailUrl || '');

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
        <div className="w-full aspect-[9/16] cursor-pointer" onClick={handlePlayClick}>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${author} testimonial video`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-orange-600" />
          )}
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
