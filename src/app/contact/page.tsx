import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach AeroKodex Systems for aerospace materials, fabrication, and technical training inquiries.",
};

const ContactPage = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AeroKodex Systems",
    url: "https://aerokodex.com/contact",
    telephone: "+91-512-000-000",
    email: "research@aerokodex.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 45, Industrial Area Phase II",
      addressLocality: "Kushinagar",
      addressRegion: "Uttar Pradesh",
      postalCode: "208001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.4499,
      longitude: 80.3319,
    },
    openingHours: "Mo-Fr 09:00-18:00",
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />

      <section className="relative z-10 py-24 pt-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left: Info */}
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8">
              Open Communication
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight leading-[0.95] text-foreground">
              Let&apos;s engineer the <br/><span className="text-primary italic">extreme together.</span>
            </h1>
            <p className="text-xl text-secondary mb-16 leading-relaxed max-w-lg">
              Our engineering team is ready to discuss technical specifications, fabrication timelines,
              and specialized materials for your next aerospace objective.
            </p>

            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-card shadow-lg shadow-primary/5 flex items-center justify-center rounded-sm border border-border shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Central Operations</h4>
                  <p className="text-secondary text-base leading-relaxed">
                    AeroKodex Systems, Plot 45<br/>
                    Industrial Area Phase II<br/>
                    Kushinagar, Uttar Pradesh 208001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-card shadow-lg shadow-primary/5 flex items-center justify-center rounded-sm border border-border shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Direct Inquiry</h4>
                  <p className="text-secondary text-base font-medium">research@aerokodex.com</p>
                  <p className="text-secondary text-sm mt-1">Response time: ≤ 24 hrs</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-card shadow-lg shadow-primary/5 flex items-center justify-center rounded-sm border border-border shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Call Support</h4>
                  <p className="text-secondary text-base">+91 512 000 000</p>
                  <p className="text-secondary text-sm mt-1">Mon-Fri, 09:00-18:00</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-card shadow-lg shadow-primary/5 flex items-center justify-center rounded-sm border border-border shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 6.75h7.5m-7.5 3h7.5m-7.5 3h7.5m-7.5 3h4.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5h15a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Business Hours</h4>
                  <p className="text-secondary text-base">Mon-Fri: 09:00-18:00</p>
                  <p className="text-secondary text-sm mt-1">Sat: 10:00-14:00 (by appointment)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-sm blur-2xl opacity-30" />
            <div className="relative bg-card p-12 lg:p-16 border border-border shadow-2xl shadow-primary/5 rounded-sm animate-fade-in-up">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Full Name</label>
                    <input type="text" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Email Address</label>
                    <input type="email" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Phone Number</label>
                    <input type="tel" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm" placeholder="+91 000 000 000" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Subject</label>
                    <input type="text" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm" placeholder="Composite supply inquiry" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Project Interest</label>
                  <select className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary appearance-none transition-all rounded-sm">
                    <option>Composite Materials Supply</option>
                    <option>CNC Fabrication & Prototyping</option>
                    <option>Workshop Training Enrollment</option>
                    <option>Technical Consultation</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Detailed Message</label>
                  <textarea rows={6} className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm" placeholder="Describe your project requirements..." required></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Attach File (optional)</label>
                  <input type="file" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm" />
                </div>

                <button className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-primary-accent transition-smooth shadow-lg shadow-primary/10 rounded-sm">
                  Transmit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Segment */}
      <section className="h-[420px] mt-20 relative border-t border-border bg-muted">
        <iframe
          title="AeroKodex Systems Map"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.823649333699!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47f5c0a7b7a1%3A0x9a2b1ed0ef6b5a1!2sKushinagar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1712750000000"
        />
      </section>
    </div>
  );
};

export default ContactPage;
