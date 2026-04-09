'use client';

import Link from "next/link";
import { useState } from "react";

const ProductDetailsClient = () => {
  const isLoggedIn = false;
  const [activeVariant, setActiveVariant] = useState("1.0mm");

  const specs = [
    { label: "Material Type", value: "PAN-based Carbon Fiber" },
    { label: "Tensile Strength", value: "4800 MPa" },
    { label: "Density", value: "1.82 g/cm3" },
    { label: "Fiber Volume Fraction", value: "~60%" },
    { label: "Operating Temp", value: "-60C to 180C" },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 pt-28">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-secondary mb-10">
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span>Materials</span>
          <span>/</span>
          <span className="text-primary">Carbon Fiber Sheet</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted border border-border overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1590674033140-107297920ab4?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="High-Modulus Carbon Fiber Sheet"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted border border-border cursor-pointer hover:border-primary transition-colors rounded-sm" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 block">High-Tech Composites</span>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">High-Modulus Carbon Fiber Sheet (HM-CFS-800)</h1>
              <p className="text-lg text-secondary leading-relaxed">
                Ultra-stiff, lightweight composite engineered for high-stress aerospace environments.
                Provides exceptional strength-to-weight ratio and thermal stability.
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Select Thickness</h4>
              <div className="flex flex-wrap gap-2">
                {["0.5mm", "1.0mm", "2.0mm", "5.0mm"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`px-6 py-3 border text-xs font-bold uppercase tracking-widest transition-smooth rounded-sm ${activeVariant === v ? "bg-primary text-white border-primary" : "bg-card text-secondary border-border hover:border-primary"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Price / CTA */}
            <div className="p-8 bg-muted border border-border rounded-sm">
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-secondary uppercase tracking-widest font-bold">Price per unit</span>
                    <div className="text-3xl font-extrabold text-primary mt-1">$450.00</div>
                  </div>
                  <button className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm">
                    Add to RFQ
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-secondary mb-6 font-medium">Pricing is reserved for registered engineering partners.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/login" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm">
                      Sign In to View Price
                    </Link>
                    <Link href="/quote" className="px-8 py-4 border border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/5 transition-smooth rounded-sm">
                      Request Custom Quote
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Specs Table */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Technical Specifications</h4>
              <div className="border border-border rounded-sm overflow-hidden">
                {specs.map((spec, i) => (
                  <div key={spec.label} className={`flex justify-between p-4 text-sm ${i % 2 === 0 ? "bg-card" : "bg-muted"}`}>
                    <span className="text-secondary font-medium">{spec.label}</span>
                    <span className="font-bold text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Section */}
      <section className="bg-muted py-24 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-foreground">Related Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "High-Temp Epoxy Resin", desc: "Advanced adhesive for aerospace composites." },
              { title: "Aluminum 7075 Plates", desc: "High-strength aerospace alloy plates." },
              { title: "Titanium Grade 5", desc: "Aerospace-grade titanium stock." },
            ].map((item) => (
              <div key={item.title} className="bg-card p-6 border border-border rounded-sm hover-lift shadow-sm">
                <div className="aspect-video bg-muted mb-6 rounded-sm" />
                <h4 className="font-bold mb-2 text-foreground">{item.title}</h4>
                <p className="text-xs text-secondary mb-6">{item.desc}</p>
                <Link href="/products" className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:underline">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsClient;
