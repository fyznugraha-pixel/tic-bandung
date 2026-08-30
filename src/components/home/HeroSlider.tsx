"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import { BlurText } from '@/components/ui/animations/BlurText';

// Load elegant serif font for the Hero
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

interface SliderData {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_link: string;
}

export default function HeroSlider({ sliders }: { sliders: SliderData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!sliders || sliders.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [sliders]);

  if (!sliders || sliders.length === 0) return null;

  return (
    <header className="relative w-full h-[65vh] min-h-[450px] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-gray-900">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-hero-title {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-hero-desc {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-hero-line {
          animation: fadeRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
          transform-origin: left;
        }
      `}} />

      {/* Background Images */}
      {sliders.map((slider, index) => (
        <img
          key={index}
          alt={slider.title}
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-all duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          src={encodeURI(slider.image_url)}
        />
      ))}
      
      {/* Gradient Overlay for Text Readability (Darker on the left) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 transition-colors duration-1000"></div>
      
      {/* Content Container */}
      <div className="relative z-20 w-full h-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col justify-center">
        
        {/* Right Side: Dynamic Location Card - Pinned to Top Right (Below Navbar) */}
        <div className="hidden md:block absolute top-32 right-4 lg:right-12 w-[400px] z-30">
          {sliders.map((slider, index) => (
            <div 
              key={index}
              className={`absolute top-0 right-0 w-full bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? "opacity-100 transform translate-y-0 translate-x-0" 
                  : "opacity-0 transform -translate-y-8 translate-x-8 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C9971E] flex items-center justify-center">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <span className="text-white/80 font-bold uppercase tracking-wider text-xs">Lokasi Saat Ini</span>
              </div>
              <h3 className={`${montserrat.className} text-3xl font-bold text-white mb-3`}>{slider.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                {slider.subtitle}
              </p>
              <Link 
                href={slider.button_link || '#'} 
                className="inline-flex items-center gap-2 text-[#C9971E] font-bold text-sm uppercase tracking-wider hover:text-white transition-colors group"
              >
                Lihat Destinasi 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 -mt-20">
          
          {/* Left Side: Huge Typography */}
          <div className="w-full md:w-1/2">
            <h1 className={`${montserrat.className} text-5xl md:text-7xl lg:text-[100px] font-bold text-white leading-[1.05] mb-8 drop-shadow-xl`}>
              <BlurText text="Bandung," delay={0} className="block" />
              <BlurText text="kota penuh" delay={0.2} className="block" />
              <span className="italic text-[#f5be45] block">
                <BlurText text="pesona." delay={0.4} />
              </span>
            </h1>
            
            <div className="w-24 h-1 bg-[#f5be45] mb-8 animate-hero-line rounded-full"></div>
            
            <p className="text-sm md:text-xl text-white/90 max-w-md font-light leading-relaxed drop-shadow-md animate-hero-desc">
              Temukan harmoni antara megahnya warisan sejarah, kesejukan alam tropis, dan denyut nadi kreativitas tanpa batas.
            </p>
          </div>

        </div>

        {/* Custom Slider Indicators */}
        <div className="absolute bottom-8 left-4 md:left-12 flex gap-3">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentIndex ? "w-12 bg-[#f5be45]" : "w-4 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </header>
  );
}
