import React from 'react';
import { Project } from '../../types/portfolio';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 border border-gray-100 flex flex-col h-full translate-y-0 hover:-translate-y-2 relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Main Image */}
        <img 
          src={project.afterImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Interaction Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
            <span className="text-sm font-bold text-black uppercase tracking-widest flex items-center gap-2">
              Explore Transformation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </div>
        </div>

        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm border border-gray-100">
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
            className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur text-red-500 p-2.5 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all duration-300 border border-red-100"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        
        {project.featured && (
            <div className="absolute bottom-6 left-6">
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-lg">
                    Featured Work
                </div>
            </div>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mt-3 flex items-center gap-2 font-medium">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </p>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold mb-0.5">Completed</span>
              <span className="text-sm font-semibold text-gray-600 italic font-serif">
                {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 shadow-sm">
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
