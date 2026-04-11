import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured Programs Section */}
      <section className="py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Education & Training</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">STEM & Aerospace Programs</h2>
            <p className="text-secondary max-w-2xl mx-auto text-lg">
              Empowering the next generation of innovators with practical, hands-on learning experiences in aerospace technology and core engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            {/* Junior Program */}
            <div className="group relative rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/CoverImage-AeroKodex-Junior1.webp"
                  alt="AeroKodex Junior Program"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-sky-500/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    Class 4 – 8
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-extrabold text-white mb-2">Junior Program</h3>
                  <p className="text-white/80 text-sm">Where curiosity meets aerospace science through engaging, hands-on build activities.</p>
                </div>
              </div>
              <div className="p-8 bg-card flex flex-col items-start">
                <ul className="space-y-4 mb-8 w-full">
                  {[
                    "Basic principles of flight & aerodynamics",
                    "Do-It-Yourself drone and glider assembly",
                    "Interactive STEM logic building",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-secondary">
                      <svg className="w-5 h-5 text-sky-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/workshops" className="mt-auto w-full py-4 text-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400 font-bold hover:bg-sky-500 hover:text-white transition-colors">
                  Explore Junior Workshops →
                </Link>
              </div>
            </div>

            {/* Senior Program */}
            <div className="group relative rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/CoverImage-AeroKodex-Senior1.webp"
                  alt="AeroKodex Senior Program"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-indigo-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    Class 9 – 12
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-extrabold text-white mb-2">Senior Program</h3>
                  <p className="text-white/80 text-sm">Advanced engineering principles for tomorrow's aerospace innovators.</p>
                </div>
              </div>
              <div className="p-8 bg-card flex flex-col items-start">
                <ul className="space-y-4 mb-8 w-full">
                  {[
                    "Advanced drone dynamics and flight control",
                    "Introduction to complex CAD & 3D Modeling",
                    "Programming autonomous flight missions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-secondary">
                      <svg className="w-5 h-5 text-indigo-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/workshops" className="mt-auto w-full py-4 text-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                  Explore Senior Workshops →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Capabilities />

      {/* Innovation Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Research Hub</span>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Advancing Aerospace Innovation</h2>
            <p className="text-secondary leading-relaxed mb-8">
              At AeroKodex Systems, we bridge the gap between advanced material science and practical application.
              Our facility is equipped with state-of-the-art technology to handle complex fabrication requirements.
            </p>
            <ul className="space-y-4">
              {[
                "Certified Quality Management",
                "Advanced Composite Research",
                "Educational Workshop Programs",
                "End-to-End Fabrication Support"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm font-medium text-foreground">
                  <svg className="w-5 h-5 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-card rounded-sm p-8 min-h-[300px] flex items-center justify-center border border-border">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold block mb-2">Facility Spotlight</span>
              <div className="text-2xl font-bold text-primary">Kushinagar Research Hub</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 dark:bg-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to start your project?</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Consult with our engineering team for custom fabrication and specialized material supply.
          </p>
          <Link href="/quote" className="inline-block px-10 py-4 bg-accent text-white font-bold rounded-sm hover:bg-primary-accent transition-smooth">
            Get a Detailed Quote
          </Link>
        </div>
      </section>
    </>
  );
}
