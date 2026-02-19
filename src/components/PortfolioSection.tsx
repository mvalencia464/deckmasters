import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  niche: string;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  gallery?: Array<{ url: string; label: string }>;
  date: string;
  featured?: boolean;
  testimonial?: {
    quote: string;
    author: string;
    rating: number;
  };
}

interface PortfolioSectionProps {
  projects: PortfolioProject[];
  testimonialsData?: any;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects, testimonialsData }) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const portfolioCategories = [
    {
      name: 'New Build',
      projects: projects.filter(p => p.niche === 'New Build'),
      description: 'From ground-up construction to multi-level designs engineered for Alaska.'
    },
    {
      name: 'Resurfacing',
      projects: projects.filter(p => p.niche === 'Resurfacing'),
      description: 'Transform aging decks with modern materials and design.'
    },
    {
      name: 'Railing & Features',
      projects: projects.filter(p => p.niche === 'Railing' || p.niche === 'Commercial'),
      description: 'Custom railings, cable systems, and structural upgrades.'
    },
    {
      name: 'Covered Decks',
      projects: projects.filter(p => p.niche === 'Covered Deck'),
      description: 'Year-round outdoor living with pergolas and solariums.'
    }
  ];

  const nonEmptyCategories = portfolioCategories.filter(cat => cat.projects.length > 0);

  const allGalleryImages = selectedProject 
    ? [selectedProject.beforeImage, selectedProject.afterImage, ...(selectedProject.gallery?.map(g => g.url) || [])]
    : [];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allGalleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedProject, allGalleryImages.length]);

  return (
    <>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-stone-900 relative overflow-hidden">
        {/* Decorative border at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-orange-600"></div>
                <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-bold uppercase leading-[0.8] mb-4">
                Built to <br /> <span className="text-stone-500">Endure.</span>
              </h2>
              <p className="text-stone-400 text-lg max-w-lg mt-6">
                Over 100+ complete projects across Anchorage, engineered for Alaska's unique climate and built to outlast a lifetime of Alaskan summers.
              </p>
            </div>
          </div>

          {/* Portfolio Categories Grid */}
          <div className="space-y-24">
            {nonEmptyCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="mb-12">
                  <div className="mb-4">
                    <h3 className="text-3xl md:text-4xl font-display font-bold uppercase">{category.name}</h3>
                  </div>
                  <p className="text-stone-400 text-lg max-w-2xl mb-8">{category.description}</p>
                  <div className="h-[1px] w-20 bg-orange-600/50"></div>
                </div>

                {/* Projects Grid for this Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {category.projects.map((project) => (
                    <div
                      key={project.id}
                      className="relative aspect-square overflow-hidden group cursor-pointer border border-stone-800"
                      onClick={() => {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                      }}
                    >
                      <img
                        src={project.afterImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-0 group-hover:grayscale-[0.5]"
                      />
                      <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                        <div className="mb-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px] bg-orange-600/10 px-3 py-1 mb-4 inline-block">
                            {project.niche}
                          </span>
                          <h3 className="text-2xl font-display font-bold uppercase text-white mb-2">{project.title}</h3>
                          <p className="text-stone-400 text-sm leading-relaxed mb-6">{project.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all delay-100">
                          View Case Study <ArrowRight className="w-3 h-3 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Portfolio CTA */}
          <div className="mt-20 text-center border-t border-stone-800 pt-12">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 border border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-white font-bold uppercase text-xs tracking-widest transition-all duration-300"
            >
              Explore Complete Portfolio <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-stone-900 border border-stone-800 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Image Gallery */}
              <div>
                <div className="relative aspect-square mb-6 overflow-hidden bg-stone-800 border border-stone-700">
                  <img
                    src={allGalleryImages[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Navigation */}
                  {allGalleryImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-600 text-white p-2 transition-colors z-10"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-600 text-white p-2 transition-colors z-10"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-black/50 px-4 py-2 rounded">
                        {currentImageIndex + 1} / {allGalleryImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allGalleryImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {allGalleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`aspect-square overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex ? 'border-orange-600' : 'border-stone-700 hover:border-orange-600/50'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="mb-8">
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-xs bg-orange-600/10 px-3 py-1 inline-block mb-4">
                      {selectedProject.niche}
                    </span>
                    <h2 className="text-4xl font-display font-bold uppercase mb-4">{selectedProject.title}</h2>
                    <div className="flex items-center gap-2 text-stone-400">
                      <span>📍 {selectedProject.location}</span>
                      {selectedProject.date && (
                        <span className="text-sm">• {new Date(selectedProject.date).getFullYear()}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-display font-bold uppercase mb-4 text-stone-300">Project Overview</h3>
                    <p className="text-stone-400 leading-relaxed mb-6">{selectedProject.description}</p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8 p-6 bg-orange-600/5 border border-orange-600/20 rounded-sm">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">Project Highlights</h3>
                    <ul className="space-y-2 text-sm text-stone-400">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span>Engineered for sub-zero performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span>Seismic-rated footings & connections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span>Handcrafted with precision and attention to detail</span>
                      </li>
                    </ul>
                  </div>

                  {/* Testimonial if available */}
                  {selectedProject.testimonial && (
                    <div className="mb-8 p-6 bg-stone-800/50 border border-stone-700 rounded-sm">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(selectedProject.testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                        ))}
                      </div>
                      <p className="text-stone-300 italic mb-3">"{selectedProject.testimonial.quote}"</p>
                      <p className="text-sm font-bold text-stone-400">— {selectedProject.testimonial.author}</p>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex gap-4 pt-8 border-t border-stone-800">
                  <a
                    href="/quote"
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-widest py-3 text-center transition-colors"
                  >
                    Get a Quote
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 border border-stone-700 hover:border-orange-600 text-stone-400 hover:text-white font-bold uppercase tracking-widest py-3 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioSection;
