const WorkshopsPage = () => {
  const workshops = [
    {
      id: 1,
      title: "Advanced Composite Fabrication",
      duration: "2 Weeks",
      difficulty: "Advanced",
      date: "May 15, 2026",
      location: "Kanpur Training Center",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "CNC Programming for Aerospace",
      duration: "1 Week",
      difficulty: "Intermediate",
      date: "June 10, 2026",
      location: "Mechanical Lab 1",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Drone Engineering & Systems",
      duration: "3 Weeks",
      difficulty: "Intermediate",
      date: "July 05, 2026",
      location: "Aerospace Hub",
      image: "https://images.unsplash.com/photo-1473960104372-8af7f8236a21?q=80&w=2080&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Education & Training</span>
          <h1 className="text-5xl font-extrabold mb-6">Specialized Aerospace Workshops</h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Elevate your expertise with industry-leading technical training. Our workshops combine theoretical depth 
            with hands-on fabrication experience.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="bg-white group rounded-sm border border-border overflow-hidden hover-lift shadow-sm">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                  {workshop.duration}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                   <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${workshop.difficulty === 'Advanced' ? 'text-red-600 border-red-200 bg-red-50' : 'text-blue-600 border-blue-200 bg-blue-50'}`}>
                    {workshop.difficulty}
                   </span>
                   <span className="text-xs text-secondary">{workshop.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{workshop.title}</h3>
                <p className="text-sm text-secondary mb-8 leading-relaxed">
                  Join our intensive certification course focused on industry standards and advanced methodologies.
                </p>
                <div className="flex items-center text-xs text-secondary font-medium mb-8">
                   <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   {workshop.location}
                </div>
                <button className="w-full py-4 bg-slate-50 hover:bg-primary hover:text-white border border-border font-bold text-sm transition-smooth uppercase tracking-widest">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Training CTA */}
      <section className="py-24 bg-slate-50 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold mb-6">In-House Training Solutions</h2>
           <p className="text-secondary mb-10 text-lg">
             We provide customized training programs for corporate teams and academic institutions. 
             Programs can be tailored to specific aerospace fabrication needs.
           </p>
           <button className="px-8 py-4 border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-smooth uppercase tracking-widest text-sm">
             Request Proposal
           </button>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;
