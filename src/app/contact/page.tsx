'use client';

const ContactPage = () => {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />

      <section className="relative z-10 py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Left: Info */}
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8">
              Open Communication
            </div>
            <h1 className="text-6xl font-extrabold mb-10 tracking-tight leading-[0.95] text-foreground">
              Let's engineer the <br/><span className="text-primary italic">extreme together.</span>
            </h1>
            <p className="text-xl text-secondary mb-16 leading-relaxed max-w-lg">
              Our engineering team is ready to discuss technical specifications, fabrication timelines, 
              and specialized materials for your next aerospace objective.
            </p>

            <div className="space-y-12">
              <div className="flex items-start space-x-8 -ml-2">
                <div className="w-14 h-14 bg-white shadow-xl shadow-primary/10 flex items-center justify-center rounded-sm border border-border">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Central Operations</h4>
                  <p className="text-secondary text-base leading-relaxed">
                    AeroKodex Systems, Plot 45<br/>
                    Industrial Area Phase II<br/>
                    Kanpur, Uttar Pradesh 208001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 -ml-2">
                <div className="w-14 h-14 bg-white shadow-xl shadow-primary/10 flex items-center justify-center rounded-sm border border-border">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Direct Inquiry</h4>
                  <p className="text-secondary text-base font-medium">research@aerokodex.com</p>
                  <p className="text-secondary text-sm mt-1">Response time: ≤ 24 hrs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-sm blur-2xl opacity-20" />
            <div className="relative bg-white p-12 lg:p-16 border border-border shadow-2xl rounded-sm animate-fade-in-up">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-border p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border border-border p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Project Interest</label>
                  <select className="w-full bg-slate-50 border border-border p-4 text-sm focus:outline-none focus:bg-white focus:border-primary appearance-none transition-all">
                    <option>Composite Materials Supply</option>
                    <option>CNC Fabrication & Prototyping</option>
                    <option>Workshop Training Enrollment</option>
                    <option>Technical Consultation</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Detailed Message</label>
                  <textarea rows={6} className="w-full bg-slate-50 border border-border p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all" placeholder="Describe your project requirements..."></textarea>
                </div>

                <button className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-primary-accent transition-smooth shadow-xl shadow-primary/20">
                  Transmit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Segment */}
      <section className="h-[500px] mt-20 relative grayscale opacity-40 hover:opacity-80 hover:grayscale-0 transition-smooth border-t border-border">
         <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10" />
         <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <div className="text-center group">
               <div className="w-16 h-1 w-1 bg-primary mx-auto mb-6 group-hover:w-32 transition-smooth" />
               <h3 className="text-3xl font-extrabold tracking-tight">Interactive Facility Map Loading</h3>
               <p className="text-secondary text-sm mt-2 font-medium">Strategic Center, Kanpur Hub</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ContactPage;
