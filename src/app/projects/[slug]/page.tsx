'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { projectsApi, Project } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

const ProjectDetailsPage = ({ params }: Props) => {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    projectsApi.getDetail(slug)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Project not found or failed to load.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen py-24 pt-32 max-w-7xl mx-auto px-6">
        <div className="animate-pulse space-y-8">
           <div className="h-4 bg-muted w-32 rounded-sm" />
           <div className="h-16 bg-muted w-2/3 rounded-sm" />
           <div className="aspect-[21/9] bg-muted rounded-sm" />
           <div className="h-40 bg-muted rounded-sm" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-secondary mb-8">{error}</p>
          <Link href="/projects" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary-accent transition-smooth">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const allImages = project.images ? [...project.images] : [];
  if (project.featured_image) {
    allImages.unshift({ id: 0, image: project.featured_image, caption: 'Featured Image', order: -1 });
  }

  const displayImage = allImages[activeImageIdx] || null;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative py-24 pt-32 bg-surface dark:bg-slate-950">
        <div className="absolute inset-0 mesh-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-secondary mb-8">
            <Link href="/projects" className="hover:text-primary transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-primary">{project.title}</span>
          </nav>
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
             <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                  {project.category_display}
                </div>
                <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-foreground leading-[1.1]">
                   {project.title}
                </h1>
                <p className="text-xl text-secondary leading-relaxed">
                   {project.description}
                </p>
             </div>
             
             <div className="bg-card border border-border p-8 rounded-sm w-full md:w-80 shrink-0 space-y-6">
                 <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Industry</h4>
                    <p className="font-bold text-sm text-foreground">{project.industry}</p>
                 </div>
                 {project.client_name && (
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Client</h4>
                        <p className="font-bold text-sm text-foreground">{project.client_name}</p>
                    </div>
                 )}
                 {project.completed_date && (
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Delivered</h4>
                        <p className="font-bold text-sm text-foreground">
                            {new Date(project.completed_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                    </div>
                 )}
                 {project.technologies_used && project.technologies_used.length > 0 && (
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies_used.map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-muted border border-border rounded-sm text-[10px] font-bold">
                                    {tech}
                                </span>
                            ))}
                        </div>
                     </div>
                 )}
             </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {allImages.length > 0 && (
         <section className="py-20 border-y border-border bg-muted">
             <div className="max-w-7xl mx-auto px-6">
                <div className="aspect-[21/9] bg-card border border-border rounded-sm overflow-hidden mb-6 shadow-xl">
                   <img src={displayImage?.image} className="w-full h-full object-cover" alt={displayImage?.caption || project.title} />
                </div>
                {allImages.length > 1 && (
                   <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                      {allImages.map((img, i) => (
                         <button 
                            key={i} 
                            onClick={() => setActiveImageIdx(i)}
                            className={`aspect-video rounded-sm overflow-hidden border-2 transition-smooth ${activeImageIdx === i ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                         >
                            <img src={img.image} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="" />
                         </button>
                      ))}
                   </div>
                )}
             </div>
         </section>
      )}

      {/* Details */}
      {(project.challenges || project.solutions) && (
          <section className="py-24 max-w-4xl mx-auto px-6">
             {project.challenges && (
                <div className="mb-16">
                   <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center">
                      <span className="w-8 h-px bg-primary mr-4" />
                      The Challenge
                   </h2>
                   <div className="prose prose-sm dark:prose-invert max-w-none text-secondary leading-relaxed">
                       {project.challenges.split('\n').map((para, i) => <p key={i}>{para}</p>)}
                   </div>
                </div>
             )}
             
             {project.solutions && (
                <div>
                   <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center">
                      <span className="w-8 h-px bg-primary mr-4" />
                      Engineering Solution
                   </h2>
                   <div className="prose prose-sm dark:prose-invert max-w-none text-secondary leading-relaxed">
                       {project.solutions.split('\n').map((para, i) => <p key={i}>{para}</p>)}
                   </div>
                </div>
             )}
          </section>
      )}

      <section className="py-24 bg-surface dark:bg-slate-950 border-t border-border text-center">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-foreground">Have a similar requirement?</h2>
            <p className="text-lg text-secondary mb-10">Our engineering team is ready to analyze your technical specifications and provide a detailed fabrication proposal.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/quote" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm">
                 Request a Quote
               </Link>
               <Link href="/contact" className="px-8 py-4 border border-border text-foreground font-bold uppercase tracking-widest text-xs hover:border-primary transition-smooth rounded-sm">
                 Contact Engineering
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
