const ProjectsPage = () => {
  const projects = [
    {
      title: "Solar-Powered UAV Structures",
      industry: "Defense & Research",
      year: "2025",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Satellite Chassis Fabrication",
      industry: "Space Sector",
      year: "2024",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"
    },
    {
      title: "High-Speed Wind Tunnel Models",
      industry: "Aerodynamics",
      year: "2024",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
       <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
             <div className="max-w-2xl">
                <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Portfolio</span>
                <h1 className="text-5xl font-extrabold tracking-tight">Technical Proof of <span className="text-primary italic">Excellence.</span></h1>
             </div>
             <div className="flex space-x-4">
                <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1">All Work</button>
                <button className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary pb-1 transition-colors">Aerospace</button>
                <button className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary pb-1 transition-colors">Defense</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((proj, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 mb-8 border border-border transition-smooth group-hover:shadow-2xl group-hover:shadow-primary/5">
                   <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 block">{proj.industry} • {proj.year}</span>
                     <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{proj.title}</h3>
                   </div>
                   <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-smooth">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </div>
                </div>
              </div>
            ))}
          </div>
       </section>

       <section className="py-24 bg-slate-50 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
             <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-secondary">Certification</h4>
                <p className="text-sm text-secondary leading-relaxed">AS9100D Certified processes ensuring the highest quality in aerospace fabrication.</p>
             </div>
             <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-secondary">Client Trust</h4>
                <p className="text-sm text-secondary leading-relaxed">Trusted by over 20+ government and private defense organizations across India.</p>
             </div>
             <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-secondary">Technology</h4>
                <p className="text-sm text-secondary leading-relaxed">Utilization of the latest in multi-axis CNC and high-pressure autoclave curing.</p>
             </div>
          </div>
       </section>
    </div>
  );
};

export default ProjectsPage;
