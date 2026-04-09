'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { workshopsApi, Workshop } from '@/lib/api';
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
  const [booking, setBooking] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ status: 'idle' });

  useEffect(() => {
    workshopsApi.getDetail(slug)
      .then(setWorkshop)
      .catch(() => setError('Workshop not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleBook = async () => {
    if (!isAuthenticated) { return; }
    setBooking({ status: 'loading' });
    try {
      await workshopsApi.book(slug);
      setBooking({ status: 'success', message: 'You are successfully booked! Check your dashboard for details.' });
      // Refresh workshop to update seat count
      const updated = await workshopsApi.getDetail(slug);
      setWorkshop(updated);
    } catch (err: unknown) {
      const e = err as Record<string, unknown>;
      const msgs = Object.values(e).flat().filter((v): v is string => typeof v === 'string');
      setBooking({ status: 'error', message: msgs[0] || 'Booking failed. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center pt-32">
        <div className="flex items-center space-x-3">
          <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-secondary font-medium">Loading workshop…</span>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Workshop Not Found</h1>
          <Link href="/workshops" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary-accent transition-smooth">
            Back to Workshops
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

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative bg-surface dark:bg-slate-950 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 mesh-grid opacity-10 pointer-events-none" />
        {workshop.image && (
          <div className="absolute inset-0 overflow-hidden">
            <img src={workshop.image} alt="" className="w-full h-full object-cover opacity-10" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-6">
          <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-secondary mb-8">
            <Link href="/workshops" className="hover:text-primary transition-colors">Workshops</Link>
            <span>/</span>
            <span className="text-primary">{workshop.title}</span>
          </nav>
          <div className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border mb-6 ${workshop.difficulty === 'Advanced' ? 'text-red-500 border-red-500/20 bg-red-500/10' : 'text-accent border-accent/20 bg-accent/10'}`}>
            {workshop.difficulty}
          </div>
          <h1 className="text-5xl font-extrabold mb-6 text-foreground tracking-tight">{workshop.title}</h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">{workshop.description}</p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details */}
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Duration', value: workshop.duration },
                { label: 'Location', value: workshop.location },
                { label: 'Date', value: formattedDate },
                { label: 'Time', value: formattedTime },
              ].map(({ label, value }) => (
                <div key={label} className="bg-card border border-border p-6 rounded-sm">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">{label}</div>
                  <div className="font-bold text-foreground text-sm">{value}</div>
                </div>
              ))}
            </div>

            {/* Category */}
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Category:</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                {workshop.category.name}
              </span>
            </div>
          </div>

          {/* Booking Card */}
          <div className="space-y-6">
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm">
              {/* Seats progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                  <span>Seats Available</span>
                  <span className={workshop.is_fully_booked ? 'text-red-500' : 'text-green-600'}>
                    {workshop.is_fully_booked ? 'Full' : `${workshop.seats_available} / ${workshop.total_seats}`}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-smooth ${workshop.is_fully_booked ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${Math.round((1 - workshop.seats_available / workshop.total_seats) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Price */}
              {isAuthenticated && workshop.price ? (
                <div className="mb-6 p-4 bg-muted rounded-sm">
                  <div className="text-[10px] text-secondary uppercase tracking-widest font-bold mb-1">Workshop Fee</div>
                  <div className="text-2xl font-extrabold text-primary">₹{parseFloat(workshop.price).toLocaleString('en-IN')}</div>
                </div>
              ) : !isAuthenticated ? (
                <div className="mb-6 p-4 bg-muted rounded-sm text-sm text-secondary text-center">
                  <Link href="/auth/login" className="text-primary font-bold hover:underline">Sign in</Link> to view pricing & book.
                </div>
              ) : null}

              {/* Booking status */}
              {booking.status === 'success' && (
                <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-sm text-green-700 dark:text-green-400 text-sm">
                  {booking.message}
                </div>
              )}
              {booking.status === 'error' && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-sm text-red-600 dark:text-red-400 text-sm">
                  {booking.message}
                </div>
              )}

              {/* CTA */}
              {isAuthenticated ? (
                <button
                  onClick={handleBook}
                  disabled={workshop.is_fully_booked || booking.status === 'loading' || booking.status === 'success'}
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {booking.status === 'loading' && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {booking.status === 'success' ? 'Booked ✓' : workshop.is_fully_booked ? 'Fully Booked' : booking.status === 'loading' ? 'Booking…' : 'Book Now'}
                </button>
              ) : (
                <Link href="/auth/login" className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm flex items-center justify-center">
                  Login to Book
                </Link>
              )}
            </div>

            <Link href="/contact" className="block w-full py-4 border border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/5 transition-smooth rounded-sm text-center">
              Request Custom Training
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetailPage;
