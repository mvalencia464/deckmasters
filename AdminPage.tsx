import React, { useState, useEffect } from 'react';
import { X, Folder, FileText, ChevronRight, ChevronDown, Layout, BarChart3 } from 'lucide-react';
import { AdvertisingPlan } from './src/components/admin/AdvertisingPlan';

interface PageData {
  slug: string;
  title: string;
  category?: string;
  layer?: number;
  content?: {
    intro?: string;
    sections?: Array<{
      title?: string;
      body?: string | string[];
      imagePlaceholder?: string;
    }>;
  };
  children?: string[];
}

import { useAuth } from './src/context/AuthContext';

interface AdminPageProps {
  pages: PageData[];
  navigate: (path: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ pages, navigate }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { isAuthenticated, login } = useAuth();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'advertising'>('overview');

  useEffect(() => {
    // Add noindex meta tag
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => {
      // Remove noindex meta tag on unmount
      document.head.removeChild(meta);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setLoginError(true);
    }
  };

  // Helper to build hierarchy tree
  const buildHierarchy = () => {
    const rootPages = pages.filter(p => p.layer === 2);
    return rootPages.map(root => ({
      ...root,
      childPages: (root.children || []).map(childSlug =>
        pages.find(p => p.slug === childSlug)
      ).filter(Boolean) as PageData[]
    }));
  };

  const hierarchy = buildHierarchy();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-stone-900 border border-stone-800 p-8 rounded-sm">
          <h1 className="text-2xl font-display font-bold uppercase mb-6 text-white text-center">
            <span className="text-orange-600">Admin</span> Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-stone-500 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 focus:border-orange-600 outline-none transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-xs font-bold uppercase tracking-wider">Incorrect Password</p>
            )}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-display font-bold uppercase tracking-widest py-3 hover:bg-orange-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pt-32 pb-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl font-display font-bold uppercase text-white">
            <span className="text-orange-600">Admin</span> Dashboard
          </h1>
          
          {/* Navigation Tabs */}
          <div className="flex bg-stone-900 p-1 rounded-sm border border-stone-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <Layout className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('advertising')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${
                activeTab === 'advertising'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Advertising
            </button>
          </div>
        </div>

        {activeTab === 'advertising' ? (
          <AdvertisingPlan />
        ) : (
          <div className="animate-fade-in">
            {/* Alternate Home Page Reference */}
            <section className="mb-16 border border-orange-800/30 bg-orange-950/20 p-8 rounded-sm">
              <h2 className="text-2xl font-display font-bold uppercase mb-4 border-b border-orange-800/30 pb-4 flex items-center gap-3">
                <span className="text-orange-600">Design Reference:</span> Alternate Home Page Hero
              </h2>
              <p className="text-stone-400 text-sm mb-6">
                Alternative hero image option for comparison. Click to view full size.
              </p>
              <div
                className="relative cursor-pointer group overflow-hidden rounded-sm border border-stone-800 hover:border-orange-600 transition-all"
                onClick={() => setPreviewImage('https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924ecfbe4747c8379e4732d.png')}
              >
                <img
                  src="https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924ecfbe4747c8379e4732d.png"
                  alt="Alternate Home Page Design"
                  className="w-full h-auto object-contain bg-stone-900 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="text-white text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-orange-600 px-4 py-2 rounded">
                    Click to Enlarge
                  </span>
                </div>
              </div>
            </section>

            {/* Design System Section */}
            <section className="mb-16 border border-stone-800 bg-stone-900/50 p-8 rounded-sm">
              <h2 className="text-2xl font-display font-bold uppercase mb-6 border-b border-stone-800 pb-4">Design System Quick View</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4">Colors</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-stone-950 border border-stone-800"></div>
                      <span className="text-xs uppercase">Stone 950 (Bg)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-600"></div>
                      <span className="text-xs uppercase">Orange 600 (Primary)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white"></div>
                      <span className="text-xs uppercase">White (Text)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-stone-400"></div>
                      <span className="text-xs uppercase">Stone 400 (Secondary Text)</span>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4">Typography</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-display font-bold text-2xl uppercase">Display Font <span className="text-stone-600">(Oswald)</span></p>
                      <span className="text-xs text-stone-500">font-display font-bold uppercase</span>
                    </div>
                    <div>
                      <p className="font-sans text-base">Body Copy (Sans) <span className="text-stone-600">(Inter)</span></p>
                      <span className="text-xs text-stone-500">font-sans</span>
                    </div>
                  </div>
                </div>

                {/* Components */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4">Components</h3>
                  <div className="space-y-4">
                    <button className="bg-orange-600 text-white px-6 py-3 font-bold uppercase text-xs tracking-widest hover:bg-orange-700 transition-all">
                      Primary Button
                    </button>
                    <div className="text-orange-600 font-bold text-sm uppercase tracking-widest">Link / Accent</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Website Directory */}
            <section className="mb-16">
              <h2 className="text-2xl font-display font-bold uppercase mb-6 border-b border-stone-800 pb-4">Website Directory & Assets</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-500 uppercase tracking-wider text-xs">
                      <th className="py-4 pr-8 font-bold w-1/3">Page Structure</th>
                      <th className="py-4 pl-8 font-bold">Images & Assets</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {pages.map((page) => (
                      <tr key={page.slug} className="group hover:bg-stone-900/30 transition-colors">
                        <td className="py-6 pr-8 align-top">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => navigate(page.slug)}
                              className="text-lg font-bold text-white hover:text-orange-600 text-left transition-colors"
                            >
                              {page.title}
                            </button>
                            <code className="text-xs text-stone-500 font-mono bg-stone-900 px-2 py-1 rounded w-fit">
                              {page.slug}
                            </code>
                            {page.category && (
                              <span className="text-xs uppercase tracking-widest text-orange-600 mt-1">
                                {page.category}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-6 pl-8 align-top">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {page.content?.sections?.map((section, idx) => {
                              if (!section.imagePlaceholder) return null;
                              return (
                                <div key={idx} className="flex gap-4 items-start p-3 border border-stone-800 bg-stone-900/50 rounded-sm">
                                  <div
                                    className="w-20 h-20 bg-stone-800 flex-shrink-0 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-stone-700"
                                    onClick={() => setPreviewImage(section.imagePlaceholder || null)}
                                  >
                                    {section.imagePlaceholder.startsWith('/') || section.imagePlaceholder.startsWith('http') ? (
                                      <img
                                        src={section.imagePlaceholder}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/333/666?text=Err';
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-xs text-stone-500 text-center p-1">
                                        No Preview
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-xs font-bold text-stone-300 line-clamp-1" title={section.title}>
                                      {section.title || "Untitled Section"}
                                    </span>
                                    <span className="text-[10px] text-stone-500 uppercase tracking-wider">Section Image</span>
                                    <a
                                      href={section.imagePlaceholder}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] text-orange-600 hover:underline truncate"
                                    >
                                      {section.imagePlaceholder.split('/').pop()}
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                            {(!page.content?.sections?.some(s => s.imagePlaceholder)) && (
                              <span className="text-stone-600 italic text-xs">No images found for this page.</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visual Hierarchy Tree */}
            <section>
              <h2 className="text-2xl font-display font-bold uppercase mb-10 border-b border-stone-800 pb-4">Site Hierarchy Visualizer</h2>

              <div className="p-8 border border-stone-800 bg-stone-900/20 rounded-sm overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Root Node */}
                  <div className="flex justify-center mb-12">
                    <div className="flex flex-col items-center relative">
                      <div className="bg-stone-800 border border-stone-700 px-6 py-4 rounded-sm z-10 flex items-center gap-3 shadow-lg">
                        <Folder className="w-5 h-5 text-orange-600" />
                        <span className="font-bold text-white tracking-wide">Home (Root)</span>
                      </div>
                      {/* Vertical Line Down */}
                      <div className="absolute top-full left-1/2 w-px h-12 bg-stone-700"></div>
                    </div>
                  </div>

                  {/* Level 2 Categories */}
                  <div className="flex justify-center gap-12 relative">
                    {/* Connecting Line for Level 2 */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-stone-700 -translate-y-6 mx-auto w-[90%]"></div>

                    {hierarchy.map((category, catIdx) => (
                      <div key={category.slug} className="flex flex-col items-center relative">
                        {/* Vertical Line Up to Horizontal Bar */}
                        <div className="absolute bottom-full left-1/2 w-px h-6 bg-stone-700"></div>

                        <div className="bg-stone-900 border border-stone-800 px-5 py-3 rounded-sm mb-8 min-w-[200px] text-center z-10 shadow-md">
                          <div className="text-xs uppercase text-orange-600 tracking-widest font-bold mb-1">Category</div>
                          <div className="font-bold text-white">{category.title}</div>
                        </div>

                        {/* Children (Level 3) */}
                        {category.childPages.length > 0 && (
                          <div className="relative flex flex-col items-start w-full pl-8 border-l border-stone-800 ml-8">
                            {category.childPages.map((child, childIdx) => (
                              <div key={child.slug} className="flex items-center gap-4 mb-4 relative">
                                {/* Horizontal Line to Child */}
                                <div className="absolute right-full top-1/2 w-4 h-px bg-stone-800"></div>

                                <div
                                  className="flex items-center gap-3 hover:bg-stone-800/50 p-2 rounded transition-colors cursor-pointer"
                                  onClick={() => navigate(child.slug)}
                                >
                                  <FileText className="w-4 h-4 text-stone-500" />
                                  <span className="text-sm text-stone-300 hover:text-white transition-colors">{child.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-8"
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-orange-600 transition-colors"
            onClick={() => setPreviewImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain border-2 border-stone-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;