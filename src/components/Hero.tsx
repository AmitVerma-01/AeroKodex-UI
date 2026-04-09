import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-900">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop" 
          alt="Aerospace Components" 
          className="w-full h-full object-cover animate-subtle-zoom"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Aerospace Grade Materials <br/>
            <span className="text-accent">& Technical Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
            AeroKodex Systems provides advanced composite fabrication, precision 
            engineering, and specialized solutions for the aerospace and defense sectors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/quote" 
              className="px-8 py-4 bg-primary-accent hover:bg-accent text-white rounded-sm font-bold transition-smooth text-center"
            >
              Get a Quote
            </Link>
            <Link 
              href="/workshops" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 rounded-sm font-bold transition-smooth text-center"
            >
              Explore Workshops
            </Link>
            <Link
              href="https://wa.me/91512000000?text=Hello%20AeroKodex%20Systems%2C%20I%20would%20like%20to%20discuss%20a%20project."
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm font-bold transition-smooth text-center"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Technical Grid */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-20 pointer-events-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 L100,0 M20,100 L100,20 M40,100 L100,40 M60,100 L100,60 M80,100 L100,80" stroke="white" strokeWidth="0.1" fill="none" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
