'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authApi, workshopsApi, DashboardData, Booking } from '@/lib/api';

const DashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([authApi.getDashboard(), workshopsApi.getUserBookings()])
      .then(([dash, bookingsResp]) => {
        setDashData(dash);
        setBookings(bookingsResp.results);
      })
      .catch(console.error)
      .finally(() => setLoadingData(false));
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-3">
          <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-secondary font-medium">Loading dashboard…</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const stats = dashData?.stats || { workshop_bookings: 0, quote_requests: 0, saved_products_wishlist: 0 };

  return (
    <div className="bg-background min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">Member Portal</p>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
              Welcome, {user?.username}
            </h1>
            <p className="text-secondary mt-1 text-sm">{user?.email} · <span className="capitalize">{user?.role}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 border border-border text-secondary font-bold text-xs uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-smooth rounded-sm"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: 'Workshop Bookings', value: stats.workshop_bookings, icon: '✦', link: '#bookings' },
            { label: 'Quote Requests', value: stats.quote_requests, icon: '◈', link: '/quote' },
            { label: 'Saved Products', value: stats.saved_products_wishlist, icon: '◇', link: '/products' },
          ].map(({ label, value, icon, link }) => (
            <Link key={label} href={link} className="group bg-card border border-border rounded-sm p-8 hover-lift shadow-sm hover:border-primary/30 transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">{label}</span>
                <span className="text-xl text-primary/30 group-hover:text-primary transition-colors">{icon}</span>
              </div>
              {loadingData ? (
                <div className="h-10 bg-muted animate-pulse rounded" />
              ) : (
                <div className="text-5xl font-extrabold text-foreground">{value}</div>
              )}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Bookings */}
          <div className="lg:col-span-2">
            <div id="bookings" className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-border flex justify-between items-center">
                <h2 className="font-bold text-foreground text-lg">Workshop Bookings</h2>
                <Link href="/workshops" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Browse More</Link>
              </div>
              {loadingData ? (
                <div className="p-8 space-y-4">
                  {[1, 2].map((i) => (<div key={i} className="h-16 bg-muted animate-pulse rounded-sm" />))}
                </div>
              ) : bookings.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-secondary text-sm mb-4">No workshop bookings yet.</p>
                  <Link href="/workshops" className="inline-block px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-primary-accent transition-smooth">
                    Explore Workshops
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="px-8 py-6 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-foreground mb-1">{booking.workshop_title}</div>
                        <div className="text-xs text-secondary">
                          {new Date(booking.workshop_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {booking.workshop_location}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${booking.payment_status === 'CONFIRMED' ? 'text-green-600 border-green-300 bg-green-50 dark:bg-green-950/20' : 'text-accent border-accent/20 bg-accent/10'}`}>
                        {booking.payment_status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Documents */}
            {dashData && dashData.documents.length > 0 && (
              <div className="bg-card border border-border rounded-sm overflow-hidden mt-8">
                <div className="px-8 py-6 border-b border-border">
                  <h2 className="font-bold text-foreground text-lg">My Documents</h2>
                </div>
                <div className="divide-y divide-border">
                  {dashData.documents.map((doc) => (
                    <div key={doc.id} className="px-8 py-5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-foreground text-sm">{doc.title}</div>
                        <div className="text-xs text-secondary capitalize">{doc.document_type.replace('_', ' ')}</div>
                      </div>
                      <span className="text-xs text-secondary">
                        {new Date(doc.uploaded_at).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-sm p-8">
              <h2 className="font-bold text-foreground text-lg mb-6">Profile</h2>
              <div className="space-y-4">
                {[
                  { label: 'Username', value: user?.username },
                  { label: 'Email', value: user?.email },
                  { label: 'Role', value: user?.role },
                  { label: 'Company', value: user?.profile?.company_name || '—' },
                  { label: 'Address', value: user?.profile?.address || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">{label}</div>
                    <div className="text-sm font-medium text-foreground capitalize">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/products" className="block w-full py-4 border border-border text-foreground font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-smooth rounded-sm text-center">
                Browse Products
              </Link>
              <Link href="/quote" className="block w-full py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest hover:bg-primary-accent transition-smooth rounded-sm text-center">
                New Quote Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
