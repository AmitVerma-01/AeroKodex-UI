'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { workshopsApi, Workshop, API_BASE } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Props {
  params: Promise<{ slug: string }>;
}

const WorkshopDetailPage = ({ params }: Props) => {
  const { slug } = use(params);
  const { isAuthenticated } = useAuth();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });

  useEffect(() => {
    workshopsApi
      .getDetail(slug)
      .then(setWorkshop)
      .catch(() => setError('Workshop not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleBook = async () => {
    if (!isAuthenticated) return;
    setBooking({ status: 'loading' });
    try {
      await workshopsApi.book(slug);
      setBooking({
        status: 'success',
        message: 'You are successfully booked! Check your dashboard for details.',
      });
      const updated = await workshopsApi.getDetail(slug);
      setWorkshop(updated);
    } catch (err: unknown) {
      const e = err as Record<string, unknown>;
      const msgs = Object.values(e)
        .flat()
        .filter((v): v is string => typeof v === 'string');
      setBooking({
        status: 'error',
        message: msgs[0] || 'Booking failed. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center pt-32">
        <div className="flex flex-col items-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-secondary font-medium text-sm">Loading workshop…</span>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-10 h-10 text-secondary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Workshop Not Found</h1>
          <p className="text-secondary text-sm mb-8">This workshop may have ended or the link is incorrect.</p>
          <Link
            href="/workshops"
            className="inline-block px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-primary-accent transition-smooth"
          >
            ← Back to Workshops
          </Link>
        </div>
      </div>
    );
  }

  const workshopDate = new Date(workshop.date);
  const formattedDate = workshopDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = workshopDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const seatPct = Math.round(
    (1 - workshop.seats_available / workshop.total_seats) * 100
  );

  const difficultyStyle =
    workshop.difficulty === 'Advanced'
      ? 'text-red-500 border-red-500/20 bg-red-500/10'
      : workshop.difficulty === 'Intermediate'
      ? 'text-amber-500 border-amber-500/20 bg-amber-500/10'
      : 'text-emerald-600 border-emerald-500/20 bg-emerald-500/10';

  const workshopImage = workshop.image
    ? workshop.image.startsWith('http')
      ? workshop.image
      : `${API_BASE.replace(/\/api\/?$/, '')}${workshop.image}`
    : null;

  return (
    <div className="bg-background min-h-screen">
      {/* ─── Full-bleed Hero ─── */}
      <section className="relative h-[65vh] min-h-[480px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {workshopImage ? (
            <Image
              src={workshopImage}
              alt={workshop.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-white/50 mb-8">
            <Link href="/workshops" className="hover:text-white transition-colors">
              Workshops
            </Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px]">{workshop.title}</span>
          </nav>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${difficultyStyle}`}>
              {workshop.difficulty}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border text-white/70 border-white/20 bg-white/5">
              {workshop.category?.name || 'Aerospace'}
            </span>
            {workshop.is_fully_booked && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-500 text-white">
                Fully Booked
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight max-w-3xl">
            {workshop.title}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{workshop.description}</p>
        </div>
      </section>

      {/* ─── Body ─── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: Details ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Duration',
                  value: workshop.duration,
                  icon: (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  label: 'Location',
                  value: workshop.location,
                  icon: (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  label: 'Date',
                  value: formattedDate,
                  icon: (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  label: 'Time',
                  value: formattedTime,
                  icon: (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{label}</span>
                  </div>
                  <div className="font-bold text-foreground text-sm leading-snug">{value}</div>
                </div>
              ))}
            </div>

            {/* What you'll learn */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                About This Workshop
              </h2>
              <p className="text-secondary leading-relaxed">{workshop.description}</p>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mr-2">Topics:</span>
                {[workshop.category?.name, workshop.difficulty, 'Aerospace'].filter(Boolean).map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* What to bring */}
            <div className="bg-muted border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Program Highlights</h2>
              <ul className="space-y-4">
                {[
                  'Hands-on practical sessions with real aerospace components',
                  'Expert instruction from industry professionals',
                  'Certificate of completion issued to all participants',
                  'All materials and equipment provided',
                  'Post-workshop access to session recordings and notes',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: Booking Card ── */}
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm sticky top-28">

              {/* Seat availability */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-secondary uppercase tracking-widest mb-3">
                  <span>Seats Available</span>
                  <span className={
                    workshop.is_fully_booked
                      ? 'text-red-500'
                      : workshop.seats_available <= 5
                      ? 'text-amber-500'
                      : 'text-emerald-600'
                  }>
                    {workshop.is_fully_booked ? 'Fully Booked' : `${workshop.seats_available} / ${workshop.total_seats}`}
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      workshop.is_fully_booked ? 'bg-red-500' : 'bg-primary'
                    }`}
                    style={{ width: `${seatPct}%` }}
                  />
                </div>
                {!workshop.is_fully_booked && workshop.seats_available <= 10 && (
                  <p className="text-xs text-amber-500 font-medium mt-2">
                    ⚡ Only {workshop.seats_available} seats remaining!
                  </p>
                )}
              </div>

              {/* Price */}
              {isAuthenticated && workshop.price ? (
                <div className="mb-6 p-5 bg-muted rounded-xl border border-border">
                  <div className="text-[10px] text-secondary uppercase tracking-widest font-bold mb-1">
                    Workshop Fee
                  </div>
                  <div className="text-3xl font-extrabold text-primary">
                    ₹{parseFloat(workshop.price).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-secondary mt-1">Inclusive of all materials</div>
                </div>
              ) : !isAuthenticated ? (
                <div className="mb-6 p-5 bg-muted rounded-xl border border-border text-center">
                  <svg className="w-6 h-6 text-secondary/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-sm text-secondary">
                    <Link href="/auth/login" className="text-primary font-bold hover:underline">
                      Sign in
                    </Link>{' '}
                    to view pricing & book.
                  </p>
                </div>
              ) : null}

              {/* Booking feedback */}
              {booking.status === 'success' && (
                <div className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {booking.message}
                  </div>
                </div>
              )}
              {booking.status === 'error' && (
                <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                  {booking.message}
                </div>
              )}

              {/* CTA */}
              {isAuthenticated ? (
                <button
                  onClick={handleBook}
                  disabled={
                    workshop.is_fully_booked ||
                    booking.status === 'loading' ||
                    booking.status === 'success'
                  }
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {booking.status === 'loading' && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {booking.status === 'success'
                    ? '✓ Booked'
                    : workshop.is_fully_booked
                    ? 'Fully Booked'
                    : booking.status === 'loading'
                    ? 'Booking…'
                    : 'Book Now'}
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-xl flex items-center justify-center"
                >
                  Login to Book
                </Link>
              )}

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <svg className="w-4 h-4 text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Secure booking — cancel anytime
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <svg className="w-4 h-4 text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Confirmation sent to your email
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="block w-full py-4 border-2 border-border text-foreground font-bold uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-smooth rounded-xl text-center"
            >
              Request Custom Training
            </Link>

            <Link
              href="/workshops"
              className="block w-full py-3 text-secondary font-medium text-xs text-center hover:text-primary transition-colors"
            >
              ← Back to all workshops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetailPage;
