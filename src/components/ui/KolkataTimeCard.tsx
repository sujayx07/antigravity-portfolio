"use client";

import React, { useState, useEffect } from 'react';

const KolkataTimeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const time = formatTime(currentTime);
  const [timeStr, ampm] = time.split(' ');
  const [hours, minutes] = timeStr.split(':');

  return (
    <div className="h-full w-full overflow-hidden relative flex flex-col">

      {/* ======= MOBILE LAYOUT (< md) — clean stacked, zero overlap ======= */}
      <div className="md:hidden h-full w-full flex flex-col justify-between p-6 relative">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

        {/* Top: label row */}
        <div className="flex items-center justify-between relative z-10">
          <h3 className="text-lg font-display italic text-white/70">Local Time.</h3>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#00ffc3]/80 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffc3] animate-pulse shadow-[0_0_8px_rgba(0,255,195,0.8)]" />
            Kolkata
          </div>
        </div>

        {/* Middle: time digits */}
        <div className="flex items-end relative z-10">
          <div className="flex font-display text-white italic tracking-tighter">
            <div className="text-[4.5rem] leading-none">{hours.charAt(0)}</div>
            <div className="text-[4.5rem] leading-none">{hours.charAt(1)}</div>
            <div className="text-[3rem] mt-2 text-white/40 animate-pulse leading-none">:</div>
            <div className="text-[4.5rem] leading-none">{minutes.charAt(0)}</div>
            <div className="text-[4.5rem] leading-none">{minutes.charAt(1)}</div>
          </div>
          <div className="text-lg font-mono text-white/40 uppercase tracking-widest mb-2 ml-2">{ampm}</div>
        </div>

        {/* Bottom: date */}
        <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase relative z-10">
          {getFormattedDate(currentTime)}
        </div>
      </div>

      {/* ======= DESKTOP LAYOUT (md+) — original hover sliding animation ======= */}
      <div
        className="group hidden md:block relative h-full w-full overflow-hidden transition-all duration-700 bg-transparent"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 transition-opacity duration-700 group-hover:opacity-40" />

        <div className="relative flex h-full w-full items-center">
          <div className="absolute h-full w-full bg-gradient-to-tr from-black/60 via-transparent to-transparent" />

          {/* Logo — fades out on hover */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-10 group-hover:opacity-0 group-hover:scale-95 z-20 pointer-events-none">
            <div className="w-28 h-28 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
              <img src="/logo/white-sx07.png" alt="sujayx07" className="w-16 object-contain opacity-80" />
            </div>
          </div>

          {/* Time Display — slides left and grows on hover */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[200px] lg:group-hover:-translate-x-[260px] group-hover:scale-[1.05] pointer-events-none">
            <div className="flex font-display text-white italic tracking-tighter mix-blend-difference">
              <div className="text-7xl lg:text-[7rem] leading-none">{hours.charAt(0)}</div>
              <div className="text-7xl lg:text-[7rem] leading-none">{hours.charAt(1)}</div>
              <div className="text-5xl lg:text-7xl mt-[1rem] animate-pulse text-white/40 leading-none">:</div>
              <div className="text-7xl lg:text-[7rem] leading-none">{minutes.charAt(0)}</div>
              <div className="text-7xl lg:text-[7rem] leading-none">{minutes.charAt(1)}</div>
              <div className="text-2xl mt-auto mb-5 ml-2 text-white/50 uppercase font-mono tracking-widest leading-none">{ampm}</div>
            </div>
          </div>

          {/* Location label — slides in from right on hover */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 z-30 text-right flex flex-col items-end pointer-events-none">
            <h3 className="text-3xl font-display italic mb-2 text-white">Local Time.</h3>
            <div className="text-sm text-[#00ffc3]/80 font-mono tracking-wider uppercase flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffc3] animate-pulse shadow-[0_0_10px_rgba(0,255,195,0.8)]" />
                Kolkata, India
              </div>
              <div className="text-white/60">{getFormattedDate(currentTime)}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

    </div>
  );
};

export default KolkataTimeCard;
