'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Materials', href: '/products' },
    { name: 'Capabilities', href: '/#capabilities' },
    { name: 'Industries', href: '/industries' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-smooth ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight text-foreground">AEROKODEX</span>
            <span className="text-[10px] tracking-widest text-secondary font-medium uppercase">Systems</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary hover:text-primary dark:hover:text-primary-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact"
            className="px-5 py-2 rounded-sm border border-primary text-primary hover:bg-primary hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-400 dark:hover:text-slate-900 transition-smooth text-sm font-semibold uppercase tracking-wider"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle (Placeholder) */}
        <div className="md:hidden">
          <button className="text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
