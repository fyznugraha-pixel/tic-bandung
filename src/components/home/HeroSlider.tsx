"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

// Load elegant serif font for the Hero
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

const HERO_IMAGES = [
  {
    src: "/gedung-sate.webp",
    title: "Gedung Sate",
    desc: "Ikon bersejarah perpaduan arsitektur Eropa dan Nusantara di jantung kota.",
    link: "/destinasi/gedung-sate",
    position: "object-center"
  },
  {
    src: "/ASET VISUAL/Wisata Bandung/Nature Destination/Curug Dago/img-20240221-171009-091b388151cd1ce340b727799e9b4d41.webp",
    title: "Curug Dago",
    desc: "Air terjun tersembunyi peninggalan sejarah kerajaan Thailand.",
    link: "/destinasi/curug-dago",
    position: "object-center"
  },
  {
    src: "/ASET VISUAL/Wisata Bandung/Tourist village/The village of braga/IMG_5898.WEBP",
    title: "Jalan Braga",
    desc: "Jejak langkah kolonial dengan deretan kafe dan bangunan Art Deco.",
    link: "/destinasi/braga",
    position: "object-center"
  },
  {
    src: "/ASET VISUAL/jalan-asia-afrika.jpg",
    title: "Jalan Asia Afrika",
    desc: "Saksi bisu Konferensi Asia Afrika dengan pesona malam yang romantis.",
    link: "/destinasi/jalan-asia-afrika",
    position: "object-bottom"
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-gray-900">
      
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
      {HERO_IMAGES.map((img, index) => (
        <img
          key={index}
          alt={img.title}
          className={`absolute inset-0 w-full h-full object-cover ${img.position} z-0 transition-all duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          src={img.src}
        />
      ))}
      
      {/* Gradient Overlay for Text Readability (Darker on the left) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 transition-colors duration-1000"></div>
      
      {/* Content Container */}
      <div className="relative z-20 w-full h-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col justify-center">
        
        {/* Right Side: Dynamic Location Card - Pinned to Top Right (Below Navbar) */}
        <div className="hidden md:block absolute top-32 right-4 lg:right-12 w-[400px] z-30">
          {HERO_IMAGES.map((img, index) => (
            <div 
              key={`card-${index}`}
              className={`absolute top-0 right-0 w-full bg-black/40 backdrop-blur-md border border-white/20 p-8 rounded-2xl transition-all duration-1000 ease-in-out transform ${
                index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-[#C9971E] w-5 h-5" />
                <span className="text-white/90 font-bold uppercase tracking-widest text-xs">Sedang Ditampilkan</span>
              </div>
              <h3 className={`${montserrat.className} text-3xl font-bold text-white mb-3`}>{img.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                {img.desc}
              </p>
              <Link 
                href={img.link}
                className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:text-[#f5be45] transition-colors group"
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
            <h1 className={`${montserrat.className} text-6xl md:text-7xl lg:text-[100px] font-bold text-white leading-[1.05] mb-8 drop-shadow-xl animate-hero-title`}>
              Bandung,<br/>
              kota penuh<br/>
              <span className="italic text-[#f5be45]">pesona.</span>
            </h1>
            
            <div className="w-24 h-1 bg-[#f5be45] mb-8 animate-hero-line rounded-full"></div>
            
            <p className="text-lg md:text-xl text-white/90 max-w-md font-light leading-relaxed drop-shadow-md animate-hero-desc">
              Temukan harmoni antara megahnya warisan sejarah, kesejukan alam tropis, dan denyut nadi kreativitas tanpa batas.
            </p>
          </div>

        </div>

        {/* Custom Slider Indicators */}
        <div className="absolute bottom-8 left-4 md:left-12 flex gap-3">
          {HERO_IMAGES.map((_, index) => (
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
