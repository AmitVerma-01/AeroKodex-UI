'use client';

import Link from 'next/link';
import { useState, FormEvent, useRef } from 'react';
import { authApi } from '@/lib/api';

const ResetPage = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp+new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[idx] = value;
    setOtp(next);
    if (value && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleRequestReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.passwordReset({ email });
      setStep(2);
    } catch (err: unknown) {
      const e = err as Record<string, string[]>;
      setError(Object.values(e).flat()[0] || 'Request failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) { setError('Enter the full 6-digit code.'); return; }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return; }

    setLoading(true);
    try {
      await authApi.passwordResetConfirm({ email, otp: code, new_password: newPassword });
      setSuccess('Password reset successfully! You can now sign in.');
    } catch (err: unknown) {
      const e = err as Record<string, string[]>;
      setError(Object.values(e).flat()[0] || 'Reset failed. Check your OTP and try again.');
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
              <span className="text-white font-bold text-xl dark:text-slate-900">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">AEROKODEX</span>
          </Link>
          <h2 className="text-2xl font-bold text-foreground">Reset Password</h2>
          <p className="text-sm text-secondary mt-2">
            {step === 1 ? 'Enter your email to receive a reset OTP.' : `Check ${email} for your OTP.`}
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center mx-auto border border-green-200 dark:border-green-800">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-secondary">{success}</p>
            <Link href="/auth/login" className="inline-block px-8 py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-primary-accent transition-smooth">
              Sign In
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-sm text-red-600 dark:text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleRequestReset} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Email Address</label>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {loading ? 'Sending…' : 'Send OTP'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleConfirmReset} className="space-y-6 animate-fade-in">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary block mb-3">Enter OTP</label>
                  <div className="flex justify-between space-x-2">
                    {[0,1,2,3,4,5].map((i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[i]}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="w-12 h-14 border border-border text-center text-xl font-bold bg-input text-foreground focus:border-primary outline-none rounded-sm transition-colors"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 text-sm border border-border bg-input text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary-accent transition-smooth rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {loading ? 'Resetting…' : 'Reset Password'}
                </button>
              </form>
            )}
          </>
        )}

        <div className="mt-8 pt-8 border-t border-border text-center">
          <Link href="/auth/login" className="text-sm font-bold text-primary hover:underline">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
