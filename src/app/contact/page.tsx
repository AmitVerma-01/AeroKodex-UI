'use client';

import { useState, FormEvent } from 'react';
import { inquiriesApi } from '@/lib/api';

const SERVICE_OPTIONS = [
  'Composite Materials Supply',
  'CNC Fabrication & Prototyping',
  'Workshop Training Enrollment',
  'Technical Consultation',
  'Drone Frame Engineering',
  'R&D Partnership',
];

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service_interest: SERVICE_OPTIONS[0],
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMsg('');

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    try {
      await inquiriesApi.contact(fd);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', service_interest: SERVICE_OPTIONS[0], message: '' });
    } catch (err: unknown) {
      const e = err as Record<string, string[]>;
      const msgs = Object.values(e).flat().filter((v): v is string => typeof v === 'string');
      setErrorMsg(msgs[0] || 'Submission failed. Please try again.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />

      <section className="relative z-10 py-24 pt-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left: Info */}
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8">
              Open Communication
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight leading-[0.95] text-foreground">
              Let&apos;s engineer the <br /><span className="text-primary italic">extreme together.</span>
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
                    AeroKodex Systems, Plot 45<br />
                    Industrial Area Phase II<br />
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
                  <p className="text-secondary text-base">+91 512 000 0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-sm blur-2xl opacity-30" />
            <div className="relative bg-card p-12 lg:p-16 border border-border shadow-2xl shadow-primary/5 rounded-sm animate-fade-in-up">
              {status === 'success' ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center mx-auto border border-green-200 dark:border-green-800">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Transmitted</h3>
                  <p className="text-secondary text-sm">Our engineering team will respond within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary-accent transition-smooth">
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-sm text-red-600 dark:text-red-400 text-sm">
                      {errorMsg}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        type="text"
                        className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Email Address</label>
                      <input
                        required
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        type="email"
                        className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Phone <span className="text-secondary/50">(optional)</span></label>
                      <input
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        type="tel"
                        className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm"
                        placeholder="+91 000 000 0000"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Subject</label>
                      <input
                        value={form.subject}
                        onChange={(e) => set('subject', e.target.value)}
                        type="text"
                        className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm"
                        placeholder="General Inquiry"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Project Interest</label>
                    <select
                      value={form.service_interest}
                      onChange={(e) => set('service_interest', e.target.value)}
                      className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary appearance-none transition-all rounded-sm"
                    >
                      {SERVICE_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Detailed Message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      className="w-full bg-input border border-border p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-all rounded-sm"
                      placeholder="Describe your project requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-primary-accent transition-smooth shadow-lg shadow-primary/10 rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                    {loading ? 'Transmitting…' : 'Transmit Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Segment */}
      <section className="h-[400px] mt-20 relative border-t border-border bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground">Interactive Facility Map</h3>
          <p className="text-secondary text-sm mt-2 font-medium">Kushinagar Operations Hub</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
