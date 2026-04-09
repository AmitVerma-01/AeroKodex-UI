'use client';

import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-6 pt-32">
      <div className="max-w-md w-full bg-card border border-border p-10 shadow-sm animate-fade-in rounded-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl dark:text-slate-900">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">AEROKODEX</span>
          </Link>
          <h2 className="text-2xl font-bold text-foreground">Sign in to your account</h2>
          <p className="text-sm text-secondary mt-2">Access your quotes, bookings and certificates.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Email Address</label>
            <input
              type="email"
              className="w-full p-4 text-sm border border-border focus:outline-none focus:border-primary transition-colors bg-input text-foreground rounded-sm"
              placeholder="e.g. engineer@industrial.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Password</label>
              <Link href="/auth/reset" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
            </div>
            <input
              type="password"
              className="w-full p-4 text-sm border border-border focus:outline-none focus:border-primary transition-colors bg-input text-foreground rounded-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="w-4 h-4 border-border rounded accent-primary" />
            <label htmlFor="remember" className="ml-2 text-xs text-secondary font-medium">Remember me for 30 days</label>
          </div>

          <button className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm">
            Secure Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-secondary">
            Don&apos;t have an account?
            <Link href="/auth/register" className="ml-2 font-bold text-primary hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
