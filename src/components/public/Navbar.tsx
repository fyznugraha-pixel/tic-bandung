'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700', '900'] });

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Destinasi Wisata', href: '/kategori' },
  { name: 'Calendar of Event', href: '/event' },
  { name: 'Transportasi', href: '/transportasi' },
  { name: 'Maps', href: '/peta' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Reset scroll state on navigation to prevent navbar jump/flicker
  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md py-3 border-b border-slate-200 shadow-sm' 
          : 'bg-transparent py-3 border-b border-transparent'
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <img src="/logo/tictransparan.png" alt="TIC Kota Bandung" className="h-10 md:h-12 w-auto" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group ${
                  isActive ? 'text-amber-700' : 'text-slate-600 hover:text-amber-600'
                }`}
              >
                {link.name}
                {/* Active Indicator & Hover Underline */}
                <span 
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 bg-amber-600 rounded-full transition-all duration-300 ${
                    isActive ? 'w-4 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-100'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side - Paket Wisata Button */}
        <div className="hidden lg:flex items-center gap-5">
          <Link 
            href="/paket-wisata"
            className="px-6 py-2.5 bg-[#3D7A5E] hover:bg-[#2c5c45] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            Paket Wisata
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-x-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ top: scrolled ? '64px' : '80px' }} // Adjust based on navbar height
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name}
                onClick={() => setIsOpen(false)} 
                className={`block px-4 py-3 rounded-xl font-bold transition-colors ${
                  isActive 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-amber-600'
                }`} 
                href={link.href}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-2 border-t border-slate-100">
            <Link 
              href="/paket-wisata"
              onClick={() => setIsOpen(false)}
              className="flex w-full justify-center px-4 py-3 bg-[#3D7A5E] text-white text-sm font-bold rounded-xl shadow-sm"
            >
              Paket Wisata
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}





