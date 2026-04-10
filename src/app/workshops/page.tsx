'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { workshopsApi, Workshop, Category, PaginatedResponse } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

type Level = 'junior' | 'senior';

const LEVELS: { key: Level; label: string; grades: string; tagline: string; cover: string; accentFrom: string; accentTo: string; badge: string }[] = [
  {
    key: 'junior',
    label: 'Junior',
    grades: 'Class 4 – 8',
    tagline: 'Where curiosity meets aerospace science',
    cover: '/CoverImage-AeroKodex-Junior.webp',
    accentFrom: '#0ea5e9',
    accentTo: '#6366f1',
    badge: 'bg-sky-500',
  },
  {
    key: 'senior',
    label: 'Senior',
    grades: 'Class 9 – 12',
    tagline: 'Advanced engineering for tomorrow\'s innovators',
    cover: '/CoverImage-AeroKodex-Senior.webp',
    accentFrom: '#003366',
    accentTo: '#0ea5e9',
    badge: 'bg-indigo-600',
  },
];

const WorkshopsPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeLevel, setActiveLevel] = useState<Level>('junior');
  const [categories, setCategories] = useState<Category[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const levelInfo = LEVELS.find((l) => l.key === activeLevel)!;

  useEffect(() => {
    workshopsApi.getCategories().then(setCategories).catch(console.error);
  }, []);

  const loadWorkshops = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: { category?: string; level?: string } = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      params.level = activeLevel;
      const data: PaginatedResponse<Workshop> = await workshopsApi.getList(params);
      setWorkshops(data.results);
    } catch {
      setError('Failed to load workshops. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, activeLevel]);

  useEffect(() => { loadWorkshops(); }, [loadWorkshops]);

  // Reset category when level changes
  useEffect(() => { setSelectedCategory('all'); }, [activeLevel]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-background min-h-screen">

      {/* ─── Level Hero ─── */}
      <section className="relative h-[70vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
        {/* Cover image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={levelInfo.cover}
            alt={`AeroKodex ${levelInfo.label} Program`}
            fill
            priority
            className="object-cover transition-all duration-700"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)`,
            }}
          />
        </div>

        {/* Level switcher tabs — overlaid */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-28 pb-0 max-w-7xl mx-auto px-6 w-full">
          <div className="inline-flex rounded-full p-1 bg-black/40 backdrop-blur-md border border-white/10">
            {LEVELS.map((lv) => (
              <button
                key={lv.key}
                onClick={() => setActiveLevel(lv.key)}
                className={`
                  relative px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 focus:outline-none focus:ring-0
                  ${activeLevel === lv.key
                    ? 'text-white shadow-lg'
                    : 'text-white/60 hover:text-white/90'
                  }
                `}
              >
                {activeLevel === lv.key && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${lv.accentFrom}, ${lv.accentTo})` }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${lv.badge} ${activeLevel === lv.key ? 'opacity-100' : 'opacity-50'}`} />
                  {lv.label}
                  <span className="text-xs opacity-75 font-normal">{lv.grades}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${levelInfo.accentFrom}33, ${levelInfo.accentTo}33)`,
                border: `1px solid ${levelInfo.accentFrom}55`,
                color: levelInfo.accentFrom,
              }}
            >
              {levelInfo.grades} Program
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
              AeroKodex{' '}
              <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${levelInfo.accentFrom}, ${levelInfo.accentTo})` }}
              >
                {levelInfo.label}
              </span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{levelInfo.tagline}</p>
            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Hands-on Learning
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                Industry Certified
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                Expert Instructors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category filter bar ─── */}
      {categories.length > 0 && (
        <div className="sticky top-[60px] z-30 border-b border-border bg-surface/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mr-2">Filter:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-secondary hover:text-primary bg-card border border-border'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                  selectedCategory === cat.slug
                    ? 'bg-primary text-white shadow-md'
                    : 'text-secondary hover:text-primary bg-card border border-border'
                }`}
              >
                {cat.name}
                {cat.workshop_count !== undefined && (
                  <span className="ml-1.5 opacity-60">({cat.workshop_count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Workshop Grid ─── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {activeLevel === 'junior' ? 'Junior Workshops' : 'Senior Workshops'}
            </h2>
            <p className="text-secondary mt-2 text-sm">
              {activeLevel === 'junior'
                ? 'Designed for students in Class 4 – 8 to explore aerospace fundamentals'
                : 'Advanced programs for Class 9 – 12 students pursuing engineering excellence'}
            </p>
          </div>
          {!loading && !error && (
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              {workshops.length} program{workshops.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-24 bg-card border border-border rounded-xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-secondary mb-6">{error}</p>
            <button
              onClick={loadWorkshops}
              className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-primary-accent transition-smooth"
            >
              Retry
            </button>
          </div>
        )}

        {/* Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-7 space-y-4">
                  <div className="h-3 bg-muted rounded-full w-1/3" />
                  <div className="h-5 bg-muted rounded-full w-3/4" />
                  <div className="h-3 bg-muted rounded-full w-full" />
                  <div className="h-3 bg-muted rounded-full w-2/3" />
                  <div className="h-11 bg-muted rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && workshops.length === 0 && (
          <div className="text-center py-28 border border-border rounded-2xl bg-card">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-10 h-10 text-secondary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-foreground mb-3">No workshops scheduled yet</h3>
            <p className="text-secondary text-sm max-w-sm mx-auto">
              New {levelInfo.label} workshops are added regularly. Check back soon or join the waitlist.
            </p>
            <Link href="/contact" className="inline-block mt-8 px-8 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-primary-accent transition-smooth">
              Join Waitlist
            </Link>
          </div>
        )}

        {/* Workshop Cards */}
        {!loading && !error && workshops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift shadow-sm flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {workshop.image ? (
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    /* Fallback gradient with program badge */
                    <div
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${levelInfo.accentFrom}22, ${levelInfo.accentTo}22)`,
                      }}
                    >
                      <svg className="w-12 h-12 opacity-20 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}

                  {/* Overlays */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className="text-[10px] font-bold px-3 py-1 rounded-full text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${levelInfo.accentFrom}, ${levelInfo.accentTo})` }}
                    >
                      {levelInfo.label}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {workshop.duration}
                  </div>
                  {workshop.is_fully_booked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-5 py-2 uppercase tracking-widest rounded-full">
                        Fully Booked
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        workshop.difficulty === 'Advanced'
                          ? 'text-red-500 border-red-500/20 bg-red-500/10'
                          : workshop.difficulty === 'Intermediate'
                          ? 'text-amber-500 border-amber-500/20 bg-amber-500/10'
                          : 'text-emerald-600 border-emerald-500/20 bg-emerald-500/10'
                      }`}
                    >
                      {workshop.difficulty}
                    </span>
                    <span className="text-xs text-secondary">{formatDate(workshop.date)}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
                    {workshop.title}
                  </h3>
                  <p className="text-sm text-secondary mb-5 leading-relaxed line-clamp-2 flex-1">
                    {workshop.description}
                  </p>

                  {/* Seat Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">
                      <span>Seats</span>
                      <span className={workshop.seats_available <= 5 ? 'text-amber-500' : ''}>
                        {workshop.seats_available} of {workshop.total_seats} left
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-smooth"
                        style={{
                          width: `${Math.round((1 - workshop.seats_available / workshop.total_seats) * 100)}%`,
                          background: `linear-gradient(to right, ${levelInfo.accentFrom}, ${levelInfo.accentTo})`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-xs text-secondary mb-5">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {workshop.location}
                  </div>

                  {/* Auth-gated price */}
                  {isAuthenticated && workshop.price && (
                    <div className="mb-4 text-sm font-extrabold text-primary">
                      ₹{parseFloat(workshop.price).toLocaleString('en-IN')}
                    </div>
                  )}

                  <Link
                    href={`/workshops/${workshop.slug}`}
                    className="block w-full py-3.5 text-white text-sm font-bold rounded-xl text-center transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg, ${levelInfo.accentFrom}, ${levelInfo.accentTo})` }}
                  >
                    {isAuthenticated ? 'View & Book →' : 'Learn More →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── Quick Toggle to other level ─── */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEVELS.map((lv) => (
              <button
                key={lv.key}
                onClick={() => setActiveLevel(lv.key)}
                className={`relative group overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 ${
                  activeLevel === lv.key
                    ? 'border-primary shadow-xl scale-[1.02]'
                    : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={lv.cover} alt={lv.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="100vw" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)` }} />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">{lv.grades}</div>
                    <div className="text-xl font-extrabold text-white">{lv.label} Program</div>
                    <div className="text-xs text-white/70 mt-1">{lv.tagline}</div>
                  </div>
                  {activeLevel === lv.key && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${lv.accentFrom}, ${lv.accentTo})` }}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Custom Training CTA ─── */}
      <section className="py-24 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">In-School Programs</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Bring AeroKodex to Your School
          </h2>
          <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            We offer customized in-campus workshops and semester-long programs for schools across India.
            Tailored for both Junior (4–8) and Senior (9–12) students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-primary-accent transition-smooth uppercase tracking-wider text-sm"
            >
              Request a Proposal
            </Link>
            <Link
              href="/about"
              className="inline-block px-10 py-4 border-2 border-white/20 text-white font-bold rounded-full hover:border-white/40 hover:bg-white/5 transition-smooth uppercase tracking-wider text-sm"
            >
              About AeroKodex
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;
