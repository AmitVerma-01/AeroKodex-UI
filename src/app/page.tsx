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
            <span className="section-label">Education & Training</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">STEM & Aerospace Programs</h2>
            <p className="text-secondary max-w-2xl mx-auto text-lg">
              Empowering the next generation of innovators with practical, hands-on learning experiences in aerospace technology and core engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            {/* Junior Program */}
            <div className="group relative rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="aspect-16/10 relative overflow-hidden bg-muted">
                <Image
                  src="/CoverImage-AeroKodex-Junior1.webp"
                  alt="AeroKodex Junior Program"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full program-chip-junior text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    Class 4 – 8
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-3xl font-extrabold text-white mb-2">Junior Program</p>
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
                      <svg className="w-5 h-5 program-check-junior mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/workshops" className="mt-auto w-full py-4 text-center rounded-xl font-bold transition-colors program-cta-junior">
                  Explore Junior Workshops →
                </Link>
              </div>
            </div>

            {/* Senior Program */}
            <div className="group relative rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="aspect-16/10 relative overflow-hidden bg-muted">
                <Image
                  src="/CoverImage-AeroKodex-Senior1.webp"
                  alt="AeroKodex Senior Program"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full program-chip-senior text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    Class 9 – 12
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-3xl font-extrabold text-white mb-2">Senior Program</p>
                  <p className="text-white/80 text-sm">Advanced engineering principles for tomorrow&apos;s aerospace innovators.</p>
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
                      <svg className="w-5 h-5 program-check-senior mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/workshops" className="mt-auto w-full py-4 text-center rounded-xl font-bold transition-colors program-cta-senior">
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
            <span className="section-label">Research Hub</span>
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
          <div className="flex-1 bg-card rounded-sm p-8 min-h-75 flex items-center justify-center border border-border">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold block mb-2">Facility Spotlight</span>
              <div className="text-2xl font-bold text-primary">Kushinagar Research Hub</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <span className="section-label">Request a Quote</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">Get a custom quote for your next aerospace project</h2>
              <p className="text-secondary max-w-2xl text-lg leading-relaxed mb-8">
                Share your project details and our engineering team will prepare a tailored quotation for advanced composite fabrication, materials, or training services.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Rapid response within 24 hours',
                  'Detailed material and fabrication estimates',
                  'Support for custom engineering and workshop packages',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-foreground">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent mr-3 text-xs font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/quote" className="inline-block px-10 py-4 bg-accent text-white font-bold rounded-sm hover:bg-primary-accent transition-smooth">
                Request a Quote
              </Link>
            </div>
            <div className="rounded-4xl overflow-hidden border border-border shadow-sm bg-gradient-to-br from-accent/10 via-surface to-background">
              <div className="p-12">
                <div className="text-sm uppercase tracking-[0.3em] text-secondary font-bold mb-4">Fast Quote Support</div>
                <div className="text-3xl font-extrabold text-foreground mb-6">AeroKodex Quote Desk</div>
                <p className="text-secondary leading-relaxed mb-8">
                  Our quote desk helps you move from concept to production with confidence, whether you need material sourcing, precision components, or expert consultation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center">1</div>
                    <div>
                      <p className="font-bold text-foreground">Submit your requirements</p>
                      <p className="text-secondary text-sm">Provide key details about your project scope and materials.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center">2</div>
                    <div>
                      <p className="font-bold text-foreground">Review our proposal</p>
                      <p className="text-secondary text-sm">Receive a customized quote with lead-time and pricing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center">3</div>
                    <div>
                      <p className="font-bold text-foreground">Kick off production</p>
                      <p className="text-secondary text-sm">Start your order once the quote is approved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-surface-alt border-t border-border">
        <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">Ready to start your project?</h2>
          <p className="text-secondary mb-10 text-lg">
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
