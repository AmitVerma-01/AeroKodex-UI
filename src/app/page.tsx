import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aerospace Grade Materials & Technical Excellence",
  description:
    "AeroKodex Systems delivers aerospace-grade composite fabrication, precision engineering, and technical training from Kushinagar, India.",
};

export default function Home() {
  const workshops = [
    {
      title: "Advanced Composite Fabrication",
      duration: "2 Weeks",
      date: "May 15, 2026",
    },
    {
      title: "CNC Programming for Aerospace",
      duration: "1 Week",
      date: "June 10, 2026",
    },
    {
      title: "Drone Engineering & Systems",
      duration: "3 Weeks",
      date: "July 05, 2026",
    },
  ];

  const projects = [
    {
      title: "Satellite Chassis Fabrication",
      year: "2024",
      type: "Aerospace",
    },
    {
      title: "High-Speed Wind Tunnel Models",
      year: "2024",
      type: "Aerodynamics",
    },
    {
      title: "Solar-Powered UAV Structures",
      year: "2025",
      type: "Defense",
    },
  ];

  const testimonials = [
    {
      quote: "AeroKodex delivered compliant composite assemblies ahead of schedule with zero deviations.",
      name: "Program Director, Defense OEM",
    },
    {
      quote: "Their technical training elevated our lab team to AS9100D-ready standards in weeks.",
      name: "Head of R&D, Aerospace Institute",
    },
    {
      quote: "The batch traceability and material data sheets were impeccable for audit review.",
      name: "Quality Lead, UAV Manufacturer",
    },
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AeroKodex Systems",
    url: "https://aerokodex.com",
    logo: "https://aerokodex.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-512-000-000",
      contactType: "sales",
      areaServed: "IN",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 45, Industrial Area Phase II",
      addressLocality: "Kushinagar",
      addressRegion: "Uttar Pradesh",
      postalCode: "208001",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <Capabilities />

      {/* Featured Workshops */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Workshops</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Technical Programs</h2>
            </div>
            <Link href="/workshops" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              Explore Workshops
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <div key={workshop.title} className="bg-card border border-border rounded-sm p-8 hover-lift">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{workshop.duration}</span>
                <h3 className="text-xl font-bold mt-4 mb-2 text-foreground">{workshop.title}</h3>
                <p className="text-sm text-secondary">Next intake: {workshop.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recent Project Highlights</h2>
            </div>
            <Link href="/projects" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              View Portfolio
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="bg-surface border border-border rounded-sm p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{project.type} • {project.year}</span>
                <h3 className="text-xl font-bold mt-4 text-foreground">{project.title}</h3>
                <p className="text-sm text-secondary mt-3">Fabrication, testing, and program delivery with full traceability.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Client Trust</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trusted by Aerospace Leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.name} className="bg-muted border border-border rounded-sm p-8">
                <p className="text-sm text-secondary leading-relaxed">"{item.quote}"</p>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mt-6">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="inline-block px-10 py-4 bg-accent text-white font-bold rounded-sm hover:bg-primary-accent transition-smooth">
              Get a Detailed Quote
            </Link>
            <Link href="/workshops" className="inline-block px-10 py-4 border border-white/40 text-white font-bold rounded-sm hover:bg-white hover:text-slate-900 transition-smooth">
              Explore Workshops
            </Link>
            <Link
              href="https://wa.me/91512000000?text=Hello%20AeroKodex%20Systems%2C%20I%20would%20like%20to%20discuss%20a%20project."
              className="inline-block px-10 py-4 bg-emerald-600 text-white font-bold rounded-sm hover:bg-emerald-700 transition-smooth"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
