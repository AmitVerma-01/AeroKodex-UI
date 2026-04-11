'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { theme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const close = () => setUserMenuOpen(false);
    if (userMenuOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [userMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Materials', href: '/products' },
    { name: 'Workshops', href: '/workshops' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
  ];

  const showSurfaceNav = isScrolled || theme === 'light';
  const linkColor = showSurfaceNav ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white';
  const logoTextColor = showSurfaceNav ? 'text-foreground' : 'text-white';
  const logoSubColor = showSurfaceNav ? 'text-secondary' : 'text-white/60';

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-smooth ${
        showSurfaceNav ? 'glass-effect shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center transition-smooth group-hover:scale-105">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg leading-none tracking-tight transition-smooth ${logoTextColor}`}>AEROKODEX</span>
            <span className={`text-[10px] tracking-widest font-medium uppercase transition-smooth ${logoSubColor}`}>Systems</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={`text-sm font-medium transition-smooth ${linkColor}`}>
              {link.name}
            </Link>
          ))}
          <ThemeToggle isScrolled={isScrolled} />

          {isAuthenticated ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                id="user-menu-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-sm border font-semibold text-sm transition-smooth ${
                  showSurfaceNav
                    ? 'border-primary/20 text-foreground hover:border-primary'
                    : 'border-white/30 text-white hover:border-white/60'
                }`}
              >
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user?.username?.[0]?.toUpperCase()}</span>
                </div>
                <span className="hidden lg:inline max-w-30 truncate">{user?.username}</span>
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-sm shadow-xl animate-fade-in z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <div className="text-xs font-bold text-foreground truncate">{user?.username}</div>
                    <div className="text-[10px] text-secondary truncate">{user?.email}</div>
                  </div>
                  <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors font-medium">
                    <svg className="w-4 h-4 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    Dashboard
                  </Link>
                  <Link href="/quote" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors font-medium">
                    <svg className="w-4 h-4 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Get a Quote
                  </Link>
                  <div className="border-t border-border">
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-medium">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`text-sm font-semibold transition-smooth ${
                  showSurfaceNav ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                className={`px-5 py-2 rounded-sm border font-semibold uppercase tracking-wider text-sm transition-smooth ${
                  showSurfaceNav
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-white/40 text-white hover:bg-white hover:text-primary-accent'
                }`}
              >
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle isScrolled={isScrolled} />
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={`transition-smooth ${showSurfaceNav ? 'text-foreground' : 'text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden glass-effect bg-surface/85 border-t border-border backdrop-blur-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block text-sm font-medium text-secondary hover:text-primary transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="block text-sm font-medium text-secondary hover:text-primary transition-colors py-2">
                  Dashboard
                </Link>
                <button
                  onClick={(e) => { handleLogout(e); setIsMobileOpen(false); }}
                  className="block w-full text-left text-sm font-medium text-red-500 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setIsMobileOpen(false)} className="block text-sm font-medium text-secondary hover:text-primary transition-colors py-2">
                  Sign In
                </Link>
                <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="block w-full text-center px-5 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-smooth text-sm font-semibold uppercase tracking-wider mt-4">
                  Contact
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
