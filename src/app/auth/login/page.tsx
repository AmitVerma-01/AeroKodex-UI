'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const errObj = err as Record<string, unknown>;
      const msg =
        (errObj?.non_field_errors as string[])?.[0] ||
        (errObj?.detail as string) ||
        'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-6 pt-32">
      <div className="max-w-md w-full bg-card border border-border p-10 shadow-sm animate-fade-in rounded-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">AEROKODEX</span>
          </Link>
          <h2 className="text-2xl font-bold text-foreground">Sign in to your account</h2>
          <p className="text-sm text-secondary mt-2">Access your quotes, bookings and certificates.</p>
        </div>

        {error && (
          <div className="alert-error mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-sm border border-border focus:outline-none focus:border-primary transition-colors bg-input text-foreground rounded-sm"
              placeholder="e.g. engineer@industrial.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                Password
              </label>
              <Link href="/auth/reset" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-sm border border-border focus:outline-none focus:border-primary transition-colors bg-input text-foreground rounded-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? 'Signing In…' : 'Secure Sign In'}
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
