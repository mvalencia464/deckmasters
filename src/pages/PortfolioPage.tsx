import React, { useState, useMemo } from 'react';
import { MOCK_PROJECTS } from '../constants/portfolio';
import { Project, ServiceNiche } from '../types/portfolio';
import ProjectCard from '../components/portfolio/ProjectCard';
import ProjectModal from '../components/portfolio/ProjectModal';
import AdminProjectForm from '../components/portfolio/AdminProjectForm';
import { useAuth } from '../context/AuthContext';

// Define niches locally or import if shared. Importing from constants is better.
import { NICHES } from '../constants/portfolio';

const PortfolioPage: React.FC<{ onOpenQuote?: () => void }> = ({ onOpenQuote }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedNiche, setSelectedNiche] = useState<ServiceNiche | 'All'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAuthenticated } = useAuth();

  const filteredProjects = useMemo(() => {
    if (selectedNiche === 'All') return projects;
    return projects.filter(p => p.niche === selectedNiche);
  }, [selectedNiche, projects]);

  const handleNicheChange = (niche: ServiceNiche | 'All') => {
    setSelectedNiche(niche);
  };

  const handleAddProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  const handleDeleteProject = async (projectToDelete: Project) => {
    if (!window.confirm(`Are you sure you want to delete "${projectToDelete.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    // 1. Optimistically update UI
    const updatedProjects = projects.filter(p => p.id !== projectToDelete.id);
    setProjects(updatedProjects);

    try {
      // 2. Sync with GitHub
      const response = await fetch('/.netlify/functions/save-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projects: updatedProjects,
          action: 'delete'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete project on server');
      }

      // Success - UI is already updated
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete project from server. Please try again.');
      // Revert UI if failed
      setProjects(projects);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-stone-950 text-stone-100 selection:bg-orange-600 selection:text-white">
      {/* Loading Overlay */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-stone-900 p-8 rounded-sm border border-stone-800 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold uppercase tracking-widest text-stone-400">Deleting project...</p>
          </div>
        </div>
      )}

      {/* Admin Button - Floating or integrated - Only visible to admins */}
      {/* Admin Button - Floating or integrated - Only visible to admins */}
      {isAuthenticated && (
        <div className="fixed bottom-6 left-6 z-[100]">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="bg-stone-900 text-orange-600 p-4 rounded-full shadow-2xl border border-orange-600 hover:scale-110 hover:bg-orange-600 hover:text-white transition-all duration-300 group"
            title="Project Studio"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </div>
      )}

      {/* Hero Section - Adapted to EPSAK Brand but keeping EliteCraft Aesthetic */}
      <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center border-b border-white/5">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-orange-900/10 border border-orange-900/30 text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 animate-in slide-in-from-bottom duration-500">
          <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
          Excellence in Craftsmanship
        </div>
        <h1 className="font-display font-bold uppercase text-5xl md:text-7xl text-white mb-8 max-w-5xl mx-auto leading-[0.9] animate-in slide-in-from-bottom duration-700 delay-100 tracking-tight">
          Spaces built for <br />
          <span className="text-stone-600">Alaska's finest moments.</span>
        </h1>
        <p className="text-lg text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200">
          Our curated portfolio showcases the precision, artistry, and vision we bring to every home. Quality you can feel, transformations you can see.
        </p>
      </header>

      {/* Filter Bar */}
      <section className="px-6 max-w-7xl mx-auto mb-20 sticky top-0 z-30 py-6 bg-stone-950/90 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handleNicheChange('All')}
            className={`px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${selectedNiche === 'All' ? 'bg-orange-600 text-white border-orange-600' : 'bg-transparent text-stone-500 border-stone-800 hover:border-stone-600 hover:text-white'}`}
          >
            All Works
          </button>
          {NICHES.map(niche => (
            <button
              key={niche}
              onClick={() => handleNicheChange(niche)}
              className={`px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${selectedNiche === niche ? 'bg-orange-600 text-white border-orange-600' : 'bg-transparent text-stone-500 border-stone-800 hover:border-stone-600 hover:text-white'}`}
            >
              {niche}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="animate-in fade-in slide-in-from-bottom-12 duration-1000"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <ProjectCard
                  project={project}
                  onClick={setActiveProject}
                  onDelete={handleDeleteProject}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-stone-900/50 rounded-sm border border-dashed border-stone-800">
            <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-800">
              <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-stone-500 font-display uppercase tracking-widest text-sm">Curating new projects for this category...</p>
            {isAuthenticated && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="mt-6 text-orange-600 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
              >
                Add a project now
              </button>
            )}
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenQuote={onOpenQuote}
      />

      {/* Admin Studio Modal */}
      {isAdminOpen && isAuthenticated && (
        <AdminProjectForm
          onAddProject={handleAddProject}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
