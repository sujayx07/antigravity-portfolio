"use client";

import React, { useState, useEffect } from 'react';

const KolkataTimeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="h-full w-full overflow-hidden relative flex flex-col min-h-[16rem]">
      <div 
        className="group relative h-full w-full gap-2 overflow-hidden transition-all duration-700 bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 transition-opacity duration-700 group-hover:opacity-40"></div>
        
        {/* Gradient Overlay */}
        <div className="relative flex h-full w-full items-center">
          <div className="absolute h-full w-full bg-gradient-to-tr from-black/60 via-transparent to-transparent"></div>
          
          {/* Logo/Icon - fades out on hover */}
          <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-10 group-hover:opacity-0 group-hover:scale-95 z-20 pointer-events-none">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
              <img src="/logo/white-sx07.png" alt="sujayx07" className="w-12 md:w-16 object-contain opacity-80" />
            </div>
          </div>
          
          {/* Time Display - slides left and grows on hover */}
          <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[90px] md:group-hover:-translate-x-[200px] lg:group-hover:-translate-x-[260px] group-hover:scale-[1.05] pointer-events-none">
            <div className="flex font-display text-white italic tracking-tighter mix-blend-difference">
              <div className="text-6xl sm:text-7xl lg:text-[7rem] leading-none">{hours.charAt(0)}</div>
              <div className="text-6xl sm:text-7xl lg:text-[7rem] leading-none">{hours.charAt(1)}</div>
              <div className="text-4xl sm:text-5xl lg:text-7xl mt-[0.5rem] md:mt-[1rem] animate-pulse text-white/40 leading-none">:</div>
              <div className="text-6xl sm:text-7xl lg:text-[7rem] leading-none">{minutes.charAt(0)}</div>
              <div className="text-6xl sm:text-7xl lg:text-[7rem] leading-none">{minutes.charAt(1)}</div>
              <div className="text-xl sm:text-2xl mt-auto mb-2 md:mb-5 ml-2 text-white/50 uppercase font-mono tracking-widest leading-none">{ampm}</div>
            </div>
          </div>
          
          {/* Project Text - slides in from the right gracefully */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 z-30 text-right flex flex-col items-end pointer-events-none">
            <h3 className="text-2xl md:text-3xl font-display italic mb-2 text-white">Local Time.</h3>
            <div className="text-xs md:text-sm text-[#00ffc3]/80 font-mono tracking-wider uppercase flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffc3] animate-pulse shadow-[0_0_10px_rgba(0,255,195,0.8)]"></span>
                Kolkata, India
              </div>
              <div className="text-white/60">{getFormattedDate(currentTime)}</div>
            </div>
          </div>
          
        </div>
        
        {/* Bottom gradient for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default KolkataTimeCard;
