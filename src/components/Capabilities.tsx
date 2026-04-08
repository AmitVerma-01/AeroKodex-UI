const Capabilities = () => {
  const items = [
    {
      title: "Composite Fabrication",
      description: "Composite fabrication provides advanced composite fabrication, precision engineering and specialized solutions for the aerospace.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      link: "/products/fabrication"
    },
    {
      title: "CNC Machining",
      description: "AeroKodex Systems provides advanced mechanical fabrication, precision engineering and specialized solutions milling machine.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      link: "/products/cnc"
    },
    {
      title: "Aerospace Training",
      description: "Aerospace Training provides advanced composite fabrication, precessing, and aerospace and defense sectors.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 15l7.74-4.853a4.5 4.5 0 00-4.898-7.533L12 4.5 9.158 2.614a4.5 4.5 0 00-4.898 7.533z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V21M12 15l-3.333-2.083M12 15l3.333-2.083M9 19.5v-1.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v1.5M9 21h6" />
        </svg>
      ),
      link: "/workshops"
    }
  ];

  return (
    <section id="capabilities" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Capabilities</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 p-10 rounded-sm border border-border hover-lift group"
            >
              <div className="mb-6 bg-slate-50 dark:bg-slate-700 w-16 h-16 flex items-center justify-center rounded-sm transition-smooth group-hover:bg-primary/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-secondary dark:text-slate-400 mb-8 leading-relaxed">
                {item.description}
              </p>
              <a 
                href={item.link} 
                className="text-primary font-bold inline-flex items-center hover:translate-x-1 transition-transform"
              >
                Learn More 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
