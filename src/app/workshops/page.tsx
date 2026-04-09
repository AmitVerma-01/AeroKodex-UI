'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { workshopsApi, Workshop, Category, PaginatedResponse } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const WorkshopsPage = () => {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load categories
  useEffect(() => {
    workshopsApi.getCategories().then(setCategories).catch(console.error);
  }, []);

  // Load workshops
  const loadWorkshops = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = selectedCategory === 'all' ? {} : { category: selectedCategory };
      const data: PaginatedResponse<Workshop> = await workshopsApi.getList(params);
      setWorkshops(data.results);
    } catch {
      setError('Failed to load workshops. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => { loadWorkshops(); }, [loadWorkshops]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface dark:bg-slate-950 py-24 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Education & Training</span>
          <h1 className="text-5xl font-extrabold mb-6 text-foreground">Specialized Aerospace Workshops</h1>
          <p className="text-secondary max-w-2xl text-lg leading-relaxed">
            Elevate your expertise with industry-leading technical training. Our workshops combine theoretical depth
            with hands-on fabrication experience.
          </p>
        </div>
      </section>

      {/* Filter */}
      {categories.length > 0 && (
        <div className="border-b border-border bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-smooth ${selectedCategory === 'all' ? 'bg-primary text-white' : 'text-secondary hover:text-primary bg-card border border-border'}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-smooth ${selectedCategory === cat.slug ? 'bg-primary text-white' : 'text-secondary hover:text-primary bg-card border border-border'}`}
              >
                {cat.name} {cat.workshop_count !== undefined && <span className="opacity-60">({cat.workshop_count})</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="text-secondary mb-4">{error}</p>
            <button onClick={loadWorkshops} className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-primary-accent transition-smooth">
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-sm overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && workshops.length === 0 && (
          <div className="text-center py-24 border border-border rounded-sm bg-card">
            <h3 className="font-bold text-lg text-foreground mb-2">No workshops scheduled</h3>
            <p className="text-sm text-secondary">New workshops are added regularly. Check back soon!</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && workshops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="bg-card group rounded-sm border border-border overflow-hidden hover-lift shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {workshop.image ? (
                    <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary/30 text-sm font-bold uppercase tracking-widest">No Image</div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                    {workshop.duration}
                  </div>
                  {workshop.is_fully_booked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-sm">Fully Booked</span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${workshop.difficulty === 'Advanced' ? 'text-red-500 border-red-500/20 bg-red-500/10' : 'text-accent border-accent/20 bg-accent/10'}`}>
                      {workshop.difficulty}
                    </span>
                    <span className="text-xs text-secondary">{formatDate(workshop.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{workshop.title}</h3>
                  <p className="text-sm text-secondary mb-4 leading-relaxed line-clamp-3">{workshop.description}</p>

                  {/* Seat availability */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
                      <span>Seats</span>
                      <span>{workshop.seats_available} of {workshop.total_seats} left</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.round((1 - workshop.seats_available / workshop.total_seats) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-secondary font-medium mb-6">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {workshop.location}
                  </div>

                  {/* Price (auth-gated) */}
                  {isAuthenticated && workshop.price && (
                    <div className="mb-4 text-sm font-bold text-primary">
                      ₹{parseFloat(workshop.price).toLocaleString('en-IN')}
                    </div>
                  )}

                  <Link
                    href={`/workshops/${workshop.slug}`}
                    className="block w-full py-4 bg-muted hover:bg-primary hover:text-white border border-border text-foreground font-bold text-sm transition-smooth uppercase tracking-widest text-center rounded-sm"
                  >
                    {isAuthenticated ? 'View & Book' : 'Learn More'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Training CTA */}
      <section className="py-24 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">In-House Training Solutions</h2>
          <p className="text-secondary mb-10 text-lg">
            We provide customized training programs for corporate teams and academic institutions.
            Programs can be tailored to specific aerospace fabrication needs.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-smooth uppercase tracking-widest text-sm rounded-sm">
            Request Proposal
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;
