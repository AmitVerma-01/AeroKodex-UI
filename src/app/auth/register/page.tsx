'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useRef } from 'react';
import { authApi } from '@/lib/api';

const RegisterPage = () => {
  const router = useRouter();

  // step 1 fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // step 2 OTP
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // ---- helpers -------------------------------------------------------------

  const startCooldown = () => {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[idx] = value;
    setOtp(next);
    if (value && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  // ---- step 1: register ----------------------------------------------------

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        email,
        username,
        phone_number: phone,
        password,
        password_confirm: passwordConfirm,
      });
      setStep(2);
      startCooldown();
    } catch (err: unknown) {
      const e = err as Record<string, unknown>;
      const msgs = Object.values(e)
        .flat()
        .filter((v): v is string => typeof v === 'string');
      setError(msgs[0] || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---- step 2: verify OTP --------------------------------------------------

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the full 6-digit code.'); return; }

    setLoading(true);
    try {
      await authApi.verifyOtp({ email, otp: code });
      router.push('/auth/login?verified=1');
    } catch (err: unknown) {
      const e = err as Record<string, unknown>;
      const msgs = Object.values(e).flat().filter((v): v is string => typeof v === 'string');
      setError(msgs[0] || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    try {
      await authApi.resendOtp({ email });
      startCooldown();
    } catch {
      setError('Failed to resend OTP. Please try again shortly.');
    }
  };

  // ---- render --------------------------------------------------------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-6 pt-32">
      <div className="max-w-md w-full bg-card border border-border p-10 shadow-sm animate-fade-in-up rounded-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">AEROKODEX</span>
          </Link>
          <h2 className="text-2xl font-bold text-foreground">
            {step === 1 ? 'Create your account' : 'Verify your email'}
          </h2>
          <p className="text-sm text-secondary mt-2">
            {step === 1 ? 'Join the AeroKodex technical community.' : `We've sent a 6-digit code to ${email}`}
          </p>
        </div>

        {error && (
          <div className="alert-error mb-6">
            {error}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label htmlFor="username" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Full Name</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="reg-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Email Address</label>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="work@company.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Phone Number <span className="text-secondary/60">(optional)</span></label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="+91 000 000 0000"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="reg-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Set Password</label>
              <input
                id="reg-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Minimum 8 characters"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Creating Account…' : 'Continue to OTP'}
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form className="animate-fade-in" onSubmit={handleVerify}>
            <div className="flex justify-between space-x-2 mb-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[i]}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-14 border border-border text-center text-xl font-bold bg-input text-foreground focus:border-primary outline-none rounded-sm transition-colors"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Verifying…' : 'Verify & Create Account'}
            </button>
            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(Array(6).fill('')); setError(''); }}
                className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                Change Details
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-xs font-bold text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

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
