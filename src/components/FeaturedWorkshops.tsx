'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { workshopsApi, Workshop, PaginatedResponse } from '@/lib/api';

export default function FeaturedWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        // Fetch workshops with limit of 3 for featured display
        const data: PaginatedResponse<Workshop> = await workshopsApi.getList({
          limit: '3',
        });
        setWorkshops(data.results);
      } catch (error) {
        console.error('Failed to load workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <section className="py-24 bg-surface border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Featured Workshops</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
              Hands-On Learning Experiences
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-surface border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-label">Featured Workshops</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            Hands-On Learning Experiences
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            Join our interactive workshops designed to inspire creativity and build real-world skills in aerospace and robotics.
          </p>
        </div>

        {/* Workshop Grid */}
        {workshops.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {workshops.map((workshop) => (
                <Link
                  key={workshop.id}
                  href={`/workshops/${workshop.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Workshop Card */}
                  <div className="flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {workshop.image ? (
                        <Image
                          src={workshop.image}
                          alt={workshop.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20">
                          <svg
                            className="w-16 h-16 text-accent/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/20 ${
                            workshop.difficulty === 'beginner'
                              ? 'bg-green-500/70'
                              : workshop.difficulty === 'intermediate'
                                ? 'bg-yellow-500/70'
                                : 'bg-red-500/70'
                          }`}
                        >
                          {workshop.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category */}
                      <div className="mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                          {workshop.category?.name || 'Workshop'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {workshop.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-secondary mb-4 line-clamp-2 flex-grow">
                        {workshop.description}
                      </p>

                      {/* Meta Info */}
                      <div className="space-y-2 mb-4 border-t border-border pt-4">
                        <div className="flex items-center text-sm text-secondary">
                          <svg
                            className="w-4 h-4 mr-2 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{formatDate(workshop.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-secondary">
                          <svg
                            className="w-4 h-4 mr-2 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{workshop.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-secondary">
                          <svg
                            className="w-4 h-4 mr-2 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{workshop.duration}</span>
                        </div>
                      </div>

                      {/* Seats Available */}
                      <div className="mb-4">
                        {workshop.is_fully_booked ? (
                          <div className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                            Fully Booked
                          </div>
                        ) : (
                          <div className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                            {workshop.seats_available} of {workshop.total_seats} seats available
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 bg-accent text-white hover:bg-primary">
                        View Workshop →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center">
              <Link
                href="/workshops"
                className="inline-block px-10 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-accent transition-colors"
              >
                View All Workshops
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No workshops available at this moment.</p>
            <Link href="/workshops" className="text-accent font-semibold hover:underline mt-4 inline-block">
              View all workshops →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
