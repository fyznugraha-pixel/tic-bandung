'use client';

import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });

interface ModernHeroProps {
  breadcrumbText: string;
  title: React.ReactNode;
  highlightText?: string;
  highlightGradient?: string;
  description: string;
}

export function ModernHero({ breadcrumbText, title, highlightText, highlightGradient = "from-[#C9971E] to-[#e6b437]", description }: ModernHeroProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blobBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-fade-up {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-up-delay-1 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-up-delay-2 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }
        .animate-fade-right {
          animation: fadeRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-blob {
          animation: blobBounce 8s infinite ease-in-out;
        }
        .animate-blob-delay {
          animation: blobBounce 8s infinite ease-in-out 4s;
        }
      `}} />

      <section className="relative w-full min-h-[550px] flex items-center justify-center pt-8 pb-12 lg:pb-16">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9971E]/10 rounded-full blur-[100px] opacity-70 animate-blob mix-blend-multiply translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3D7A5E]/10 rounded-full blur-[100px] opacity-70 animate-blob-delay mix-blend-multiply -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center">
          <nav className="flex text-slate-500 text-sm mb-8 items-center gap-2 font-medium bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm animate-fade-up border border-white/50">
            <Link className="hover:text-[#C9971E] transition-colors" href="/">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9971E] font-bold">{breadcrumbText}</span>
          </nav>
          
          <h1 className={`${montserrat.className} text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-up-delay-1 leading-[1.1]`}>
            {title} {highlightText && (
              <>
                <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${highlightGradient}`}>{highlightText}</span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl font-light leading-relaxed animate-fade-up-delay-2">
            {description}
          </p>
        </div>
      </section>
    </>
  );
}



