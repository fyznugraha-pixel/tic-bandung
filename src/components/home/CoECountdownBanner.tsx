"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Clock, MapPin } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function CoECountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Target date: September 15, 2026, 23:59:59 (End of day)
    // Use the user's current year/month based on the context: 2026-09-15
    const targetDate = new Date("2026-09-15T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <section className="w-full bg-[#1b1c1a] relative overflow-hidden py-12 md:py-16">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9971E]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3D7A5E]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left side: Text & Info */}
        <div className="text-center lg:text-left flex-1 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#3D7A5E]/20 border border-[#3D7A5E]/30 text-[#4ade80] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Calendar className="w-4 h-4" />
            <span>Segera Dibuka</span>
          </div>
          
          <h2 className={`${montserrat.className} text-3xl md:text-5xl font-bold text-white mb-4 leading-tight`}>
            Pendaftaran Calendar of Event <span className="text-[#C9971E]">2027</span>
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            Punya event unggulan di Kota Bandung? Daftarkan segera untuk masuk ke dalam kurasi resmi Calendar of Event (CoE) Dinas Kebudayaan dan Pariwisata Kota Bandung tahun 2027.
          </p>

          <Link 
            href="/event" 
            className="inline-flex items-center justify-center gap-2 bg-[#C9971E] hover:bg-amber-600 active:scale-95 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            Daftar Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Right side: Countdown Timer Box */}
        <div className="w-full lg:w-auto shrink-0 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-white/80 font-medium mb-6">
            <Clock className="w-5 h-5 text-[#C9971E]" />
            <span>Batas Waktu Pendaftaran:</span>
          </div>

          {/* Countdown Grid */}
          <div className="flex justify-center gap-3 md:gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-[#C9971E] shadow-inner border border-slate-700/50">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 mt-2 uppercase tracking-wider font-bold">Hari</span>
            </div>
            
            <div className="text-2xl md:text-4xl font-bold text-slate-600 mt-4 md:mt-5">:</div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-white shadow-inner border border-slate-700/50">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 mt-2 uppercase tracking-wider font-bold">Jam</span>
            </div>
            
            <div className="text-2xl md:text-4xl font-bold text-slate-600 mt-4 md:mt-5">:</div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-white shadow-inner border border-slate-700/50">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 mt-2 uppercase tracking-wider font-bold">Menit</span>
            </div>

            <div className="text-2xl md:text-4xl font-bold text-slate-600 mt-4 md:mt-5">:</div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-[#3D7A5E] shadow-inner border border-slate-700/50">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 mt-2 uppercase tracking-wider font-bold">Detik</span>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-slate-500 font-medium bg-black/20 py-2 rounded-lg">
            Ditutup: 15 September 2026, 23:59 WIB
          </div>
        </div>
        
      </div>
    </section>
  );
}
