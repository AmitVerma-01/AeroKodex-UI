'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-smooth ${
        showSurfaceNav
          ? 'glass-effect shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center transition-smooth group-hover:scale-105">
            <span className="text-white font-bold text-xl dark:text-slate-900">A</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg leading-none tracking-tight transition-smooth ${logoTextColor}`}>AEROKODEX</span>
            <span className={`text-[10px] tracking-widest font-medium uppercase transition-smooth ${logoSubColor}`}>Systems</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-smooth ${linkColor}`}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle isScrolled={isScrolled} />
          <Link
            href="/contact"
            className={`px-5 py-2 rounded-sm border font-semibold uppercase tracking-wider text-sm transition-smooth ${
              showSurfaceNav
                ? 'border-primary text-primary hover:bg-primary hover:text-white'
                : 'border-white/40 text-white hover:bg-white hover:text-slate-900'
            }`}
          >
            Contact
          </Link>
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
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full text-center px-5 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-smooth text-sm font-semibold uppercase tracking-wider mt-4"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
