const Capabilities = () => {
  const items = [
    {
      title: "Composite Fabrication",
      description: "Advanced composite fabrication delivering precision-engineered aerospace structures with certified quality assurance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      link: "/products"
    },
    {
      title: "CNC Machining",
      description: "Multi-axis CNC machining for high-tolerance aerospace parts with sub-millimeter accuracy and batch traceability.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      link: "/products"
    },
    {
      title: "Materials Testing",
      description: "ASTM-aligned validation, batch traceability, and technical data reporting for critical material systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h6m-6 0a1.5 1.5 0 00-1.5 1.5v2.25a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5m-6 0V3m6 0V3m-6 6.75h6m-6 3.75h6m-9 3a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0021 16.5v-9A1.5 1.5 0 0019.5 6H4.5A1.5 1.5 0 003 7.5v9z" />
        </svg>
      ),
      link: "/products"
    },
    {
      title: "Aerospace Training",
      description: "Hands-on workshops in composite fabrication, drone engineering, and CNC programming for the next generation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      link: "/workshops"
    },
    {
      title: "R&D Consulting",
      description: "Design-for-manufacture guidance, prototyping support, and program readiness for aerospace programs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 4.012a7.5 7.5 0 019.176 9.176l-1.657 1.657a2.25 2.25 0 01-1.06.586l-3.217.804a2.25 2.25 0 00-1.591 1.591l-.804 3.217a2.25 2.25 0 01-.586 1.06l-1.657 1.657a7.5 7.5 0 01-9.176-9.176l1.657-1.657a2.25 2.25 0 011.06-.586l3.217-.804a2.25 2.25 0 001.591-1.591l.804-3.217a2.25 2.25 0 01.586-1.06l1.657-1.657z" />
        </svg>
      ),
      link: "/quote"
    }
  ];

  return (
    <section id="capabilities" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">What We Do</span>
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Capabilities</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-card p-10 rounded-sm border border-border hover-lift group"
            >
              <div className="mb-6 bg-muted w-16 h-16 flex items-center justify-center rounded-sm transition-smooth group-hover:bg-primary/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
              <p className="text-secondary mb-8 leading-relaxed">
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
