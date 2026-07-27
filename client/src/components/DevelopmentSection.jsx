import React from 'react';
import athenaImg from '../assets/athena.png';

export default function DevelopmentSection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 bg-black border-t border-zinc-900/60 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Athena Illustration (Wisdom, Strategy & What Comes Next) */}
        <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-start items-center">
          <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
            <img 
              src={athenaImg} 
              alt="Athena - Strategy, Wisdom & Knowledge representing Celestius"
              className="w-full max-h-[600px] object-contain bg-black select-none pointer-events-none"
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

        {/* Right Column: Under Development Message */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          
          {/* Small yellow label */}
          <div className="text-celestius-gold text-xs font-mono font-bold tracking-[0.25em] uppercase">
            CELESTIUS
          </div>

          {/* Large Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Something new is being forged.
          </h2>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl font-normal text-zinc-300 leading-relaxed max-w-xl">
            The new Celestius experience is currently under development.
          </p>

          {/* Additional Supporting Sentence */}
          <p className="text-base text-zinc-400 font-light leading-relaxed max-w-xl">
            We're building a new home for our community, projects, events, and ideas.
          </p>

        </div>

      </div>

    </section>
  );
}
