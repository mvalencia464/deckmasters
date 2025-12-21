import React, { useState } from 'react';
import { analyzeProjectImage } from '../../services/geminiService';
import { Project, ServiceNiche, ProjectImage } from '../../types/portfolio';
import { NICHES } from '../../constants/portfolio';

interface AdminProjectFormProps {
  onAddProject: (project: Project) => void;
  onClose: () => void;
}

const ADMIN_PIN = 'password1234'; // Simple protection for prototype. Move to env var in production.

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({ onAddProject, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');

  // Existing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [beforeFile, setBeforeFile] = useState<{ data: string, name: string, type: string } | null>(null);

  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [afterFile, setAfterFile] = useState<{ data: string, name: string, type: string } | null>(null);

  const [galleryImages, setGalleryImages] = useState<ProjectImage[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: 'Anchorage, AK',
    niche: 'Kitchen' as ServiceNiche,
    date: new Date().toISOString().split('T')[0]
  });

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect PIN');
      setPinInput('');
    }
  };

  const compressImage = (file: File): Promise<{ data: string, name: string, type: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1200;

          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG at 80% quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          const base64Data = dataUrl.split(',')[1];

          resolve({
            data: base64Data,
            name: file.name.replace(/\.[^/.]+$/, "") + ".jpg", // Force jpg extension
            type: 'image/jpeg'
          });
        };
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately using raw file
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'before') setBeforePreview(reader.result as string);
      else setAfterPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Compress in background for upload
    const compressed = await compressImage(file);

    if (type === 'before') {
      setBeforeFile(compressed);
    } else {
      setAfterFile(compressed);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // For gallery, we just store local preview for now, 
        // real implementation would upload these too
        setGalleryImages(prev => [...prev, { url: result, label: '' }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateGalleryLabel = (index: number, label: string) => {
    setGalleryImages(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], label };
      return updated;
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadToHighLevel = async (fileData: string, fileName: string, fileType: string) => {
    try {
      const response = await fetch('/.netlify/functions/upload-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileData,
          fileName,
          mimeType: fileType
        })
      });

      if (!response.ok) {
        // If 404 (local dev without functions), warn but don't crash
        if (response.status === 404) {
          console.warn("Backend function not found (likely local dev). Using data URI fallback.");
          return `data:${fileType};base64,${fileData}`;
        }

        // Try to get error message from response
        let errorMessage = `Upload failed with status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Ignore JSON parse error, stick to status code
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result.url;
    } catch (error) {
      console.error('Upload failed, falling back to local preview:', error);
      // Fallback for demo/local purposes
      return `data:${fileType};base64,${fileData}`;
    }
  };

  const handleAiPrefill = async () => {
    if (!afterFile) {
      alert("Please upload an 'After' image first!");
      return;
    }

    setIsAnalyzing(true);
    // Use local base64 for Gemini analysis (faster than waiting for upload)
    const result = await analyzeProjectImage(afterFile.data, afterFile.type);
    setIsAnalyzing(false);

    if (result) {
      setFormData({
        ...formData,
        title: result.title || '',
        description: result.description || '',
        location: result.location || 'Anchorage, AK',
        niche: (result.niche as ServiceNiche) || 'Kitchen',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile) return;

    setIsUploading(true);
    setUploadStatus('Uploading Before Image...');

    try {
      // 1. Upload Before Image
      const beforeUrl = await uploadToHighLevel(beforeFile.data, beforeFile.name, beforeFile.type);

      setUploadStatus('Uploading After Image...');
      // 2. Upload After Image
      const afterUrl = await uploadToHighLevel(afterFile.data, afterFile.name, afterFile.type);

      setUploadStatus('Finalizing...');

      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        beforeImage: beforeUrl,
        afterImage: afterUrl,
        gallery: galleryImages, // Note: Gallery images are still local base64 in this prototype
        featured: false
      };

      console.log('New Project Created:', newProject);

      // CRITICAL: Prevent saving if images are still Base64 (Upload failed)
      if (beforeUrl.startsWith('data:') || afterUrl.startsWith('data:')) {
        alert('Cannot publish to GitHub: Image upload failed. Please try again with smaller images or check your connection.');
        setIsUploading(false);
        setUploadStatus('');
        return;
      }

      // Save to GitHub via Netlify Function
      setUploadStatus('Saving to GitHub...');
      const saveResponse = await fetch('/.netlify/functions/save-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: newProject })
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save project to GitHub. Please try again.');
      }

      onAddProject(newProject);
      alert('Project Published! The site is now rebuilding and will update in a few minutes.');

      onClose();
    } catch (error) {
      alert(`Failed to upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  };

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900">Studio Access</h2>
              <p className="text-gray-500 text-sm mt-2">Enter PIN to manage portfolio</p>
            </div>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center text-2xl font-bold px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Enter PIN"
                autoFocus
              />
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="flex-1 py-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Unlock</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold">Project Studio</h2>
            <p className="text-gray-500 text-sm">Add a new masterpiece to the EPSAK gallery</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Main Transformation Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Before Image</label>
              <div className="relative aspect-video rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group hover:border-primary transition-colors">
                {beforePreview ? (
                  <img src={beforePreview} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select 'Before'</p>
                  </div>
                )}
                <input type="file" onChange={(e) => handleImageUpload(e, 'before')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">After Image</label>
              <div className="relative aspect-video rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group hover:border-primary transition-colors">
                {afterPreview ? (
                  <img src={afterPreview} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select 'After'</p>
                  </div>
                )}
                <input type="file" onChange={(e) => handleImageUpload(e, 'after')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>
          </div>

          {/* AI Magic Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAiPrefill}
              disabled={isAnalyzing || !afterPreview}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${isAnalyzing ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95'}`}
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Consulting Gemini AI...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Draft Metadata with AI
                </>
              )}
            </button>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-50">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Modern Aspen Kitchen"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Niche</label>
                <select
                  value={formData.niche}
                  onChange={e => setFormData({ ...formData, niche: e.target.value as ServiceNiche })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium appearance-none"
                >
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Transformation Narrative</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                placeholder="Describe the artisan details and material choices..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Completion Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* Supporting Gallery Section */}
          <div className="space-y-6 pt-8 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Supporting Gallery</h3>
                <p className="text-xs text-gray-500 mt-1">Upload close-ups or detail shots (optional)</p>
              </div>
              <div className="relative">
                <button type="button" className="px-5 py-3 bg-gray-100 text-gray-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add Details
                </button>
                <input type="file" multiple onChange={handleGalleryUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                      <img src={img.url} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Detail Label</label>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={img.label}
                        onChange={e => updateGalleryLabel(idx, e.target.value)}
                        placeholder="e.g. Italian marble grains"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-10">
            <button type="button" onClick={onClose} className="flex-1 py-5 font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest text-xs">Discard</button>
            <button
              type="submit"
              disabled={isUploading}
              className={`flex-[2] py-5 bg-black text-white rounded-[24px] font-bold shadow-2xl shadow-black/20 hover:bg-primary transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${isUploading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  {uploadStatus || 'Processing...'}
                </>
              ) : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectForm;
