'use client';

import Link from "next/link";
import { useMemo, useState } from "react";

const ProductsClient = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = false;

  const categories = ["All Items", "Materials", "Fabrication", "Development", "Training"];

  const products = [
    {
      id: 1,
      name: "High-Modulus Carbon Fiber Sheet",
      category: "Materials",
      slug: "carbon-fiber-sheet",
      tagline: "Ultra-stiff, lightweight composite",
      image: "https://images.unsplash.com/photo-1590674033140-107297920ab4?q=80&w=2070&auto=format&fit=crop",
      price: "$450.00",
    },
    {
      id: 2,
      name: "Aerospace Grade 7075 Aluminum",
      category: "Materials",
      slug: "aluminum-7075",
      tagline: "High-strength precision alloy",
      image: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1974&auto=format&fit=crop",
      price: "$320.00",
    },
    {
      id: 3,
      name: "Custom CNC Drone Frame",
      category: "Fabrication",
      slug: "cnc-drone-frame",
      tagline: "Precision engineered airframe",
      image: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=2070&auto=format&fit=crop",
      price: "$1200.00",
    },
    {
      id: 4,
      name: "High-Temp Epoxy Resin",
      category: "Materials",
      slug: "high-temp-epoxy",
      tagline: "Advanced thermal durability",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?q=80&w=2070&auto=format&fit=crop",
      price: "$220.00",
    },
    {
      id: 5,
      name: "Aero Composite R&D Pack",
      category: "Development",
      slug: "aero-rnd-pack",
      tagline: "Prototype kits and consulting bundle",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop",
      price: "$850.00",
    },
    {
      id: 6,
      name: "Composite Fabrication Bootcamp",
      category: "Training",
      slug: "composite-bootcamp",
      tagline: "Instructor-led lab program",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      price: "$650.00",
    },
  ];

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const categoryFiltered = selectedCategory === "All Items"
      ? products
      : products.filter((product) => product.category === selectedCategory);

    if (!normalized) {
      return categoryFiltered;
    }

    return categoryFiltered.filter((product) =>
      [product.name, product.tagline, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic Header */}
      <section className="relative py-32 pt-40 overflow-hidden bg-surface dark:bg-slate-950">
        <div className="absolute inset-0 mesh-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            Inventory & Capabilities
          </div>
          <h1 className="text-6xl font-extrabold mb-8 transition-smooth text-foreground tracking-tight leading-[0.9]">Materials & <br/>Fabrication.</h1>
          <p className="text-secondary max-w-2xl text-xl leading-relaxed">
            Sourcing and manufacturing high-integrity aerospace solutions based on rigid
            engineering standards and certified composite methodologies.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-wrap bg-muted p-1.5 rounded-sm border border-border">
            {categories.map((cat) => {
              const active = cat === selectedCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/40 ${active ? "bg-primary text-white shadow-sm" : "text-secondary hover:text-primary hover:bg-white/10"}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search materials, fabrication, training..."
              className="w-full lg:w-80 bg-input border border-border p-3 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm"
            />
            <Link
              href="/quote"
              className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary-accent transition-smooth text-center"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block bg-surface border border-border rounded-sm overflow-hidden hover-lift shadow-sm hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 shadow-sm rounded-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
                <p className="text-sm text-secondary mb-6 leading-relaxed">{product.tagline}</p>
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    {isLoggedIn ? `From ${product.price}` : "Sign in to view price"}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-smooth">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quality Badge Section */}
      <section className="py-24 border-t border-border bg-muted relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 border-2 border-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-xs font-black text-primary/30 uppercase tracking-[0.2em]">ISO</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Quality Management Systems</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Every material within our inventory is cataloged with full batch traceability and tested
            against ASTM standards for structural composite integrity.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductsClient;
