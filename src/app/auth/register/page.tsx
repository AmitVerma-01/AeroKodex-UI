'use client';

import Link from 'next/link';
import { useState } from 'react';

const RegisterPage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-6 pt-32">
      <div className="max-w-md w-full bg-card border border-border p-10 shadow-sm animate-fade-in-up rounded-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl dark:text-slate-900">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">AEROKODEX</span>
          </Link>
          <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
          <p className="text-sm text-secondary mt-2">Join the AeroKodex technical community.</p>
        </div>

        <form className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Full Name</label>
                <input type="text" className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Email Address</label>
                <input type="email" className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm" placeholder="work@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Set Password</label>
                <input type="password" className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm" placeholder="Minimum 8 characters" />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm"
              >
                Continue to OTP
              </button>
            </>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                 <p className="text-sm text-secondary">We&apos;ve sent a 6-digit code to your email.</p>
              </div>
              <div className="flex justify-between space-x-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input key={i} type="text" maxLength={1} className="w-12 h-14 border border-border text-center text-xl font-bold bg-input text-foreground focus:border-primary outline-none rounded-sm" />
                ))}
              </div>
              <div className="mt-8">
                <button className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm">
                  Verify & Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full mt-4 text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                >
                  Change Details
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-secondary">
            Already have an account?
            <Link href="/auth/login" className="ml-2 font-bold text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
