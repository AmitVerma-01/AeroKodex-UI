'use client';

import { useState, FormEvent } from 'react';
import { inquiriesApi } from '@/lib/api';

const SERVICE_TYPES = ['Custom Fabrication', 'Material Supply', 'Technical Consulting', 'Workshop Training'];
const MATERIAL_GRADES = ['High-Modulus Carbon Fiber', 'Aluminum 7075-T6', 'Titanium Grade 5', 'Epoxy Resin Systems', 'Custom Alloy'];
const TIMELINES = ['Urgent (< 1 week)', '1–2 Weeks', '1 Month', '2–3 Months', 'Flexible'];
const BUDGETS = ['< ₹50,000', '₹50,000 – ₹2L', '₹2L – ₹10L', '₹10L+', 'Budget TBD'];

const QuotePage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Step 1
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [productInterest, setProductInterest] = useState('');

  // Step 2
  const [specifications, setSpecifications] = useState('');
  const [quantity, setQuantity] = useState('');
  const [materialPreferences, setMaterialPreferences] = useState(MATERIAL_GRADES[0]);

  // Step 3
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState(TIMELINES[2]);
  const [budgetRange, setBudgetRange] = useState(BUDGETS[4]);

  const steps = [
    { id: 1, title: 'Service Details' },
    { id: 2, title: 'Specifications' },
    { id: 3, title: 'Contact & Submit' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData();
    fd.append('service_type', serviceType);
    fd.append('product_interest', productInterest);
    fd.append('specifications', specifications);
    fd.append('quantity', quantity);
    fd.append('material_preferences', materialPreferences);
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('company', company);
    fd.append('timeline', timeline);
    fd.append('budget_range', budgetRange);

    try {
      await inquiriesApi.quote(fd);
      setSubmitted(true);
    } catch (err: unknown) {
      const e = err as Record<string, string[]>;
      const msgs = Object.values(e).flat().filter((v): v is string => typeof v === 'string');
      setError(msgs[0] || 'Submission failed. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-background min-h-screen py-24 pt-32 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center px-6">
          <div className="w-20 h-20 bg-accent/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Quote Request Submitted</h2>
          <p className="text-secondary mb-2">Your request has been received by our engineering team.</p>
          <p className="text-secondary mb-10 text-sm">We will analyze your specifications and respond within <strong>24 hours</strong> with a detailed quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setSubmitted(false); setStep(1); setServiceType(SERVICE_TYPES[0]); setSpecifications(''); setName(''); setEmail(''); }}
              className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary-accent transition-smooth"
            >
              Submit Another
            </button>
            <a href="/" className="px-8 py-4 border border-border text-foreground font-bold uppercase tracking-widest text-xs rounded-sm hover:border-primary transition-smooth">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-24 pt-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Engineering RFQ</span>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-foreground">Request a Professional Quote</h1>
          <p className="text-secondary">Provide your project details and our engineering team will respond within 24 hours.</p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-border z-0" />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-smooth border-2 ${
                  step > s.id ? 'bg-accent text-white border-accent' : step === s.id ? 'bg-primary text-white border-primary' : 'bg-card text-secondary border-border'
                }`}
              >
                {step > s.id ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : s.id}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${step === s.id ? 'text-primary' : 'text-secondary'}`}>{s.title}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-sm text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-card border border-border p-10 lg:p-14 animate-fade-in rounded-sm">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-foreground">What service are you looking for?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICE_TYPES.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setServiceType(opt)}
                      className={`p-6 border text-left transition-smooth hover:shadow-sm rounded-sm ${serviceType === opt ? 'bg-primary/5 border-primary text-primary' : 'bg-surface border-border hover:border-primary'}`}
                    >
                      <div className={`font-bold text-sm uppercase tracking-widest mb-1 ${serviceType === opt ? 'text-primary' : 'text-foreground'}`}>{opt}</div>
                      <div className="text-xs text-secondary">Aerospace grade quality assurance.</div>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Product / Specific Item Interest <span className="text-secondary/50">(optional)</span></label>
                  <input
                    type="text"
                    value={productInterest}
                    onChange={(e) => setProductInterest(e.target.value)}
                    className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm"
                    placeholder="e.g. Carbon Fiber Sheet 2mm, CNC Drone Frame"
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-foreground">Technical Specifications</h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Detailed Specifications <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={5}
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm"
                    placeholder="Describe your technical requirements, tolerances, surface finish, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Dimensions / Quantity</label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm"
                    placeholder="e.g. 500mm × 500mm, 10 units"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Material Grade Preferred</label>
                  <select
                    value={materialPreferences}
                    onChange={(e) => setMaterialPreferences(e.target.value)}
                    className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary appearance-none rounded-sm"
                  >
                    {MATERIAL_GRADES.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-foreground">Contact & Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Email <span className="text-red-500">*</span></label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm" placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Phone <span className="text-secondary/50">(optional)</span></label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm" placeholder="+91 000 000 0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Company <span className="text-secondary/50">(optional)</span></label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm" placeholder="Organisation Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Project Timeline</label>
                    <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary appearance-none rounded-sm">
                      {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Budget Range</label>
                    <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary appearance-none rounded-sm">
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-10 border-t border-border">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${step === 1 ? 'text-border cursor-not-allowed' : 'text-secondary hover:text-primary'}`}
              >
                Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 2 && !specifications.trim()) {
                      setError('Please describe your technical specifications.');
                      return;
                    }
                    setError('');
                    setStep(step + 1);
                  }}
                  className="px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary-accent transition-smooth rounded-sm"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 flex items-center gap-2"
                >
                  {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {loading ? 'Submitting…' : 'Submit Request'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotePage;
