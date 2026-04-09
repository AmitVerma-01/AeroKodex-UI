import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
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
               <div className="text-2xl font-bold text-primary">Kanpur Research Hub</div>
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
