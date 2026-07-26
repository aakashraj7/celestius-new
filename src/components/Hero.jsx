import React from 'react';
import hephaestusImg from '../assets/hephaestus.png';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] flex items-center px-6 md:px-16 py-12 bg-black overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Recreated Typography matching original screenshot */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left">
          
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.06] select-none">
            <span className="block text-celestius-gold">Innovate.</span>
            <span className="block text-white">Share.</span>
            <span className="block text-celestius-gold">Collaborate</span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-lg sm:text-xl md:text-2xl font-normal text-white max-w-xl leading-relaxed">
            Club Celestius is a student-run community driving{' '}
            <span className="text-celestius-gold">innovation</span>, open source, and{' '}
            <span className="text-celestius-gold">collaboration</span> through technology and{' '}
            <span className="text-celestius-gold">shared knowledge.</span>
          </p>

        </div>

        {/* Right Column: Hephaestus ONLY (Occupying single statue position from original website) */}
        <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end items-center">
          
          <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
            <img 
              src={hephaestusImg} 
              alt="Hephaestus - Technology, Engineering & Creation representing Celestius"
              className="w-full max-h-[650px] object-contain bg-black select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
              }}
            />

            {/* Bottom edge subtle fade */}
            <div 
              aria-hidden="true" 
              className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" 
            />
          </div>

        </div>

      </div>

    </section>
  );
}
