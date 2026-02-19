import React from 'react';
import { Project } from '../../types/portfolio';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ResponsiveImage from '../ResponsiveImage';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onDelete }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      onClick={() => onClick(project)}
      className="group cursor-pointer bg-stone-900 rounded-sm overflow-hidden border border-stone-800 hover:border-orange-600 transition-all duration-300 flex flex-col h-full relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
         {/* Main Image */}
         <ResponsiveImage
           src={project.afterImage}
           alt={project.title}
           className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
           sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px"
           priority={false}
         />

        {/* Interaction Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-orange-600 px-6 py-3 rounded-sm shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
            <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              View Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </div>
        </div>

        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="bg-stone-950/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm border border-stone-800">
            {project.niche}
          </span>
        </div>

        {/* Admin Delete Button */}
        {isAuthenticated && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            className="absolute top-6 right-6 z-20 bg-stone-950/90 text-red-500 p-2.5 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 border border-stone-800 hover:border-red-500"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {project.featured && (
          <div className="absolute bottom-6 left-6">
            <div className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-lg">
              Featured Work
            </div>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-display font-bold uppercase text-2xl text-white leading-tight group-hover:text-orange-500 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-stone-400 text-sm mt-3 flex items-center gap-2 font-medium">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </p>

        <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-0.5">Completed</span>
            <span className="text-sm font-semibold text-stone-300">
              {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
