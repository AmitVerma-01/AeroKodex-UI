'use client';

import { useState } from 'react';

const ProjectsPage = () => {
   const [selectedCategory, setSelectedCategory] = useState('All Work');
   const categories = ['All Work', 'Aerospace', 'Defense'];

   const projects = [
      {
         title: "Solar-Powered UAV Structures",
         industry: "Defense & Research",
         year: "2025",
         category: "Defense",
         image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2070&auto=format&fit=crop"
      },
      {
         title: "Satellite Chassis Fabrication",
         industry: "Space Sector",
         year: "2024",
         category: "Aerospace",
         image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"
      },
      {
         title: "High-Speed Wind Tunnel Models",
         industry: "Aerodynamics",
         year: "2024",
         category: "Aerospace",
         image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop"
      }
   ];

   const visibleProjects = selectedCategory === 'All Work'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="bg-background min-h-screen">
       <section className="py-24 pt-32 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
             <div className="max-w-2xl">
                <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Portfolio</span>
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground">Technical Proof of <span className="text-primary italic">Excellence.</span></h1>
             </div>
                   <div className="flex flex-wrap gap-3">
                        {categories.map((category) => {
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

               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {visibleProjects.map((proj, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden bg-muted mb-8 border border-border transition-smooth group-hover:shadow-2xl group-hover:shadow-primary/5 rounded-sm">
                   <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 block">{proj.industry} • {proj.year}</span>
                     <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
                   </div>
                   <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white text-foreground transition-smooth rounded-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </div>
                </div>
              </div>
            ))}
          </div>
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
