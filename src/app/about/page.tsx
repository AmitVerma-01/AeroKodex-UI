const AboutPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/60 to-slate-900 z-10" />
        <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105 animate-subtle-zoom" alt="Aerospace research" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
           <div className="inline-block px-4 py-1.5 bg-accent/20 backdrop-blur-md border border-accent/30 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
             Engineering Legacy
           </div>
           <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-[0.9]">
             Defining the <br/><span className="text-accent underline decoration-white/10 decoration-8 underline-offset-8">Standard.</span>
           </h1>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="animate-fade-in">
             <h2 className="text-5xl font-extrabold mb-10 leading-[1.1] text-foreground">
               Precision is not an option; <br/><span className="text-primary italic">it is our architecture.</span>
             </h2>
             <p className="text-xl text-secondary leading-relaxed mb-12">
               Founded in the industrial heart of Kanpur, AeroKodex Systems bridges the gap between material scholarship and
               aerospace reality. We don&apos;t just supply parts; we engineer structural integrity for the world&apos;s most demanding environments.
             </p>
             <div className="flex gap-16 py-10 border-t border-border">
                <div>
                  <h4 className="text-5xl font-extrabold text-primary mb-2">150+</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Mission Critical Projects</p>
                </div>
                <div>
                  <h4 className="text-5xl font-extrabold text-primary mb-2">15k</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Sq. Ft. Specialized Lab</p>
                </div>
             </div>
           </div>

           <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-sm -rotate-2 group-hover:rotate-0 transition-smooth" />
              <div className="relative aspect-square rounded-sm overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5">
                  <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop" className="object-cover w-full h-full transition-smooth group-hover:scale-105" alt="Lab environment" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 opacity-80 text-accent">Tech Stack</p>
                     <h3 className="text-2xl font-bold text-white">Kanpur Center of Excellence</h3>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-surface dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="text-center mb-24">
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Foundational Ethics</span>
              <h2 className="text-5xl font-extrabold text-foreground">Our Core Pillars</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Zero Error Tolerance", desc: "In high-altitude flight, reliability is binary. We operate with AS9100D level precision across all fabrication lines." },
                { title: "Composite Evolution", desc: "Our R&D focuses on next-gen carbon fibers with tailored mechanical properties for satellite and UAV frameworks." },
                { title: "Knowledge Transfer", desc: "Beyond manufacturing, we empower the next generation of engineers through rigorous technical training programs." }
              ].map((val, i) => (
                <div key={i} className="group p-10 bg-surface-alt border border-border hover-lift backdrop-blur-sm rounded-sm">
                   <div className="w-12 h-1 bg-accent mb-8 group-hover:w-full transition-smooth" />
                   <h3 className="text-2xl font-bold text-foreground mb-6 leading-tight">{val.title}</h3>
                   <p className="text-secondary text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
