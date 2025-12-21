import React, { useEffect, useState, useCallback } from 'react';
import { Project } from '../../types/portfolio';
import BeforeAfterSlider from './BeforeAfterSlider';
import QuoteForm from '../QuoteForm';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [showConsultModal, setShowConsultModal] = useState(false);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedGalleryIndex === null && !showConsultModal) {
      if (e.key === 'Escape') onClose();
      return;
    }
    
    if (showConsultModal) {
        if (e.key === 'Escape') setShowConsultModal(false);
        return;
    }

    if (!project) return;

    if (e.key === 'ArrowRight') {
      setSelectedGalleryIndex((prev) => 
        prev !== null ? (prev + 1) % project.gallery.length : null
      );
    } else if (e.key === 'ArrowLeft') {
      setSelectedGalleryIndex((prev) => 
        prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null
      );
    } else if (e.key === 'Escape') {
      setSelectedGalleryIndex(null);
    }
  }, [selectedGalleryIndex, project, onClose, showConsultModal]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-5xl max-h-full overflow-y-auto rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-black/10 rounded-full transition-colors group"
        >
          <svg className="w-6 h-6 text-gray-800 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col">
          {/* Main Comparison Area */}
          <div className="p-4 md:p-10 bg-gray-50">
             <div className="mb-6 text-center">
                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">{project.niche} Restoration</span>
                 <h2 className="font-serif text-3xl md:text-5xl text-gray-900 leading-tight">{project.title}</h2>
                 <p className="text-gray-500 mt-2 italic font-serif">{project.location}</p>
             </div>
             <BeforeAfterSlider 
                beforeUrl={project.beforeImage} 
                afterUrl={project.afterImage} 
             />
             <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-12 h-[1px] bg-gray-200"></div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Slide to compare</p>
                <div className="w-12 h-[1px] bg-gray-200"></div>
             </div>
          </div>

          {/* Details Area */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-10">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">The Transformation</h4>
                  <p className="text-xl text-gray-700 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {project.gallery.length > 0 && (
                   <div>
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Project Details</h4>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Click to expand</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {project.gallery.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="group relative rounded-2xl overflow-hidden aspect-video shadow-md cursor-pointer bg-gray-100"
                              onClick={() => setSelectedGalleryIndex(idx)}
                            >
                                <img 
                                    src={img.url} 
                                    alt={img.label} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                                {img.label && (
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-[10px] text-white/90 font-bold uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            {img.label}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                   </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 shadow-sm">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Specifications</h4>
                    <ul className="space-y-5">
                        <li className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Service Type</span>
                            <span className="text-gray-900 font-medium">{project.niche}</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Completion</span>
                            <span className="text-gray-900 font-medium font-serif italic text-lg">{new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Location</span>
                            <span className="text-gray-900 font-medium">{project.location}</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-black p-8 rounded-[32px] text-white shadow-2xl shadow-black/20 group cursor-pointer overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83L19.07 19H4.93L12 5.83z"/></svg>
                    </div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Start Your Project</h4>
                    <p className="text-sm mb-8 leading-relaxed font-light text-gray-300">Inspired by this transformation? Let's discuss how we can elevate your home.</p>
                    <button 
                        onClick={() => setShowConsultModal(true)}
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xl active:scale-[0.98]"
                    >
                        Schedule Consult
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {selectedGalleryIndex !== null && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
            <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                onClick={() => setSelectedGalleryIndex(null)}
            ></div>
            
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <span className="text-white/40 font-serif italic text-xl">0{selectedGalleryIndex + 1}</span>
                    <div className="w-8 h-[1px] bg-white/20"></div>
                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">{project.gallery[selectedGalleryIndex].label || 'Project Detail'}</span>
                </div>
                <button 
                    onClick={() => setSelectedGalleryIndex(null)}
                    className="text-white/60 hover:text-white transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Main Image Container */}
            <div className="relative w-full max-w-6xl aspect-video group">
                {/* Navigation Arrows */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGalleryIndex((prev) => prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null);
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-4 text-white/20 hover:text-white transition-all hidden md:block"
                >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGalleryIndex((prev) => prev !== null ? (prev + 1) % project.gallery.length : null);
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-4 text-white/20 hover:text-white transition-all hidden md:block"
                >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
                </button>

                <img 
                    src={project.gallery[selectedGalleryIndex].url} 
                    alt={project.gallery[selectedGalleryIndex].label}
                    className="w-full h-full object-contain select-none animate-in zoom-in-95 duration-500"
                />
            </div>

            {/* Bottom Controls / Indicator */}
            <div className="absolute bottom-12 flex items-center gap-6">
                <div className="flex gap-2">
                    {project.gallery.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedGalleryIndex(idx)}
                            className={`h-1 transition-all duration-500 rounded-full ${selectedGalleryIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
                <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    {selectedGalleryIndex + 1} / {project.gallery.length}
                </div>
            </div>
        </div>
      )}

      {/* Consult/Quote Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowConsultModal(false)}
          ></div>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl animate-in zoom-in-95 duration-300">
             <div className="absolute top-4 right-4 z-10">
                <button 
                    onClick={() => setShowConsultModal(false)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             <QuoteForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
