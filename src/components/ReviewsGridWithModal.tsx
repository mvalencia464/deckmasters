import React, { useState } from 'react';
import { Star } from 'lucide-react';
import TestimonialVideoCard from './TestimonialVideoCard';
import TestimonialImageModal from './TestimonialImageModal';
import { mapAssetUrl } from '../utils/assetMapper';

const ReviewsGridWithModal = ({ testimonialsData }) => {
    const [selectedReview, setSelectedReview] = useState(null);

    const filteredReviews = (testimonialsData.rawReviews as Array<{ text: string; author: string; rating: number; date: string; source: string; avatarUrl?: string; images?: string[]; videoUrl?: string; videoThumbnailUrl?: string }>)
        .filter(r => r.text && r.text.trim().length > 0 && r.rating >= 4)
        .map(review => ({
            ...review,
            // Map all image URLs to local assets
            images: review.images ? review.images.map(img => mapAssetUrl(img, false)) : []
        }))
        .sort((a, b) => {
            // Sort video testimonials (Erica Leman) to the top
            const aIsVideo = a.videoUrl ? 1 : 0;
            const bIsVideo = b.videoUrl ? 1 : 0;
            return bIsVideo - aIsVideo;
        });

    return (
        <>
            {/* Masonry grid using CSS columns — all reviews pulled verbatim from Testimonials.json */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filteredReviews.map((review, i) => {
                    // Check if this is a video testimonial
                    const isVideoTestimonial = review.videoUrl && typeof review.videoUrl === 'string';

                    return isVideoTestimonial ? (
                        // Video Testimonial Card
                        <TestimonialVideoCard key={i} {...review} />
                    ) : (
                        // Image/Text Testimonial Card
                        <div
                            key={i}
                            className="break-inside-avoid mb-4 bg-stone-900 border border-stone-800 overflow-hidden hover:border-orange-600/30 transition-all duration-300 group"
                        >
                            {/* Images Carousel - SIMPLIFIED */}
                            {review.images && review.images.length > 0 && (
                                <div
                                    className="w-full aspect-video cursor-pointer"
                                    onClick={() => setSelectedReview(review)}
                                >
                                    <img
                                        src={review.images[0]}
                                        alt={`${review.author} project`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, s) => (
                                        <Star key={s} className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-stone-300 text-sm leading-relaxed mb-5 font-light">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
                                    {/* Avatar circle */}
                                    <div className="w-8 h-8 rounded-full bg-orange-600/20 border border-orange-600/30 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {review.avatarUrl && (
                                            <img
                                                src={review.avatarUrl}
                                                alt={review.author}
                                                className="absolute inset-0 w-full h-full object-cover z-10"
                                                loading="lazy"
                                            />
                                        )}
                                        <span className="text-orange-500 text-xs font-bold uppercase z-0">
                                            {review.author ? review.author.charAt(0) : '?'}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-xs uppercase tracking-wider">{review.author}</div>
                                        <div className="text-stone-600 text-[10px] uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                            <svg className="w-2.5 h-2.5 fill-current text-stone-500" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                            Google Review
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedReview && selectedReview.images && (
                <TestimonialImageModal
                    isOpen={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                    images={selectedReview.images}
                    review={selectedReview}
                />
            )}
        </>
    );
};

export default ReviewsGridWithModal;
