'use client';

import { useState } from 'react';

const QuotePage = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, title: 'Service Details' },
    { id: 2, title: 'Specifications' },
    { id: 3, title: 'Finalize' }
  ];

  return (
    <div className="bg-background min-h-screen py-24 pt-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Engineering RFQ</span>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-foreground">Request a Professional Quote</h1>
          <p className="text-secondary">Provide your project details and our engineering team will respond within 24 hours.</p>
        </div>

        {/* Multi-step Indicator */}
        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-smooth border-2 ${
                  step >= s.id ? 'bg-primary text-white border-primary' : 'bg-card text-secondary border-border'
                }`}
              >
                {s.id}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${step === s.id ? 'text-primary' : 'text-secondary'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-card border border-border p-10 lg:p-14 animate-fade-in rounded-sm">
          {step === 1 && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-foreground">What service are you looking for?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Custom Fabrication', 'Material Supply', 'Technical Consulting', 'Workshop Training'].map((opt) => (
                  <button key={opt} className="p-6 bg-surface border border-border hover:border-primary text-left transition-smooth hover:shadow-sm rounded-sm">
                    <div className="font-bold text-sm uppercase tracking-widest mb-1 text-foreground">{opt}</div>
                    <div className="text-xs text-secondary">Aerospace grade quality assurance.</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-foreground">Technical Specifications</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Dimensions / Quantity</label>
                   <input type="text" className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary rounded-sm" placeholder="e.g. 500mm x 500mm, 10 units" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Material Grade Required</label>
                   <select className="w-full p-4 text-sm border border-border bg-input text-foreground focus:outline-none focus:border-primary appearance-none rounded-sm">
                      <option>High-Modulus Carbon Fiber</option>
                      <option>Aluminum 7075-T6</option>
                      <option>Titanium Grade 5</option>
                   </select>
                 </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-10">
              <div className="w-16 h-16 bg-accent/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Ready to Submit</h3>
              <p className="text-secondary">Your specifications have been recorded. One last step to confirm your contact details.</p>
              <input type="text" className="w-full max-w-sm mx-auto p-4 text-sm border border-border bg-input text-foreground mt-4 rounded-sm" placeholder="Your Phone Number" />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-10 border-t border-border">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${step === 1 ? 'text-border' : 'text-secondary hover:text-primary'}`}
            >
              Back
            </button>
            <button
              onClick={() => step < 3 ? setStep(step + 1) : alert('Quote Submitted!')}
              className="px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary-accent transition-smooth rounded-sm"
            >
              {step === 3 ? 'Submit Request' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
