'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { projectsApi, Project, PaginatedResponse } from '@/lib/api';

const CATEGORY_MAP: Record<string, string> = {
  'All Work': '',
  'Fabrication': 'FABRICATION',
  'Material Supply': 'MATERIAL_SUPPLY',
  'Development': 'DEVELOPMENT',
  'Training': 'TRAINING',
  'Research': 'RESEARCH',
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Work');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const categoryValue = CATEGORY_MAP[selectedCategory];
      const params = categoryValue ? { category: categoryValue } : {};
      const data: PaginatedResponse<Project> = await projectsApi.getList(params);
      setProjects(data.results);
    } catch (err) {
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="bg-background min-h-screen">
       <section className="py-24 pt-32 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
             <div className="max-w-2xl">
                <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Portfolio</span>
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground">Technical Proof of <span className="text-primary italic">Excellence.</span></h1>
             </div>
             <div className="flex flex-wrap gap-3">
                {Object.keys(CATEGORY_MAP).map((category) => {
                   const active = category === selectedCategory;
                   return (
                      <button
                         key={category}
                         onClick={() => setSelectedCategory(category)}
                         aria-pressed={active}
                         className={`px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-smooth border ${active ? 'border-primary bg-primary text-white shadow-sm' : 'border-border text-secondary hover:text-primary hover:border-primary/40 hover:bg-surface'}`}
                      >
                         {category}
                      </button>
                   );
                })}
             </div>
          </div>

          {error && (
            <div className="text-center py-24">
              <p className="text-secondary mb-4">{error}</p>
              <button onClick={loadProjects} className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-primary-accent transition-smooth">
                Retry
              </button>
            </div>
          )}

          {loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-muted mb-8 rounded-sm"></div>
                  <div className="h-4 bg-muted w-1/3 mb-2 rounded-sm"></div>
                  <div className="h-6 bg-muted w-2/3 rounded-sm"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-24 border border-border rounded-sm bg-card">
              <h3 className="font-bold text-lg text-foreground mb-2">No projects found for this category</h3>
              <p className="text-sm text-secondary">Please explore our other work.</p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {projects.map((proj) => (
                <Link href={`/projects/${proj.slug}`} key={proj.id} className="group cursor-pointer block">
                  <div className="aspect-[16/9] overflow-hidden bg-muted mb-8 border border-border transition-smooth group-hover:shadow-2xl group-hover:shadow-primary/5 rounded-sm relative">
                    {proj.featured_image ? (
                       <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-sm font-bold uppercase tracking-widest text-secondary/30">
                          No Image
                       </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                     <div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 block">
                         {proj.industry} {proj.completed_date && `• ${new Date(proj.completed_date).getFullYear()}`}
                       </span>
                       <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
                     </div>
                     <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white text-foreground transition-smooth rounded-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
       </section>

       <section className="py-24 bg-muted border-t border-border">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
             <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-accent">Certification</h4>
                <p className="text-sm text-secondary leading-relaxed">AS9100D Certified processes ensuring the highest quality in aerospace fabrication.</p>
             </div>
             <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-accent">Client Trust</h4>
                <p className="text-sm text-secondary leading-relaxed">Trusted by over 20+ government and private defense organizations across India.</p>
             </div>
             <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-accent">Technology</h4>
                <p className="text-sm text-secondary leading-relaxed">Utilization of the latest in multi-axis CNC and high-pressure autoclave curing.</p>
             </div>
          </div>
       </section>
    </div>
  );
};

export default ProjectsPage;
