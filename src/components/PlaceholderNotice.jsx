import React from 'react';

export default function PlaceholderNotice() {
  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-black via-zinc-950/50 to-black relative overflow-hidden z-20">
      
      {/* Subtle Divider Line with Central Gold Glow */}
      <div className="max-w-7xl mx-auto mb-16 relative flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
        <div className="absolute w-32 h-[2px] bg-gradient-to-r from-transparent via-celestius-gold to-transparent shadow-[0_0_12px_#FFCC00]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative group p-8 sm:p-10 md:p-12 rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-center overflow-hidden transition-all duration-500 hover:border-amber-500/40">
          
          {/* Subtle Corner Glow Accent */}
          <div 
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-48 h-48 bg-celestius-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-celestius-gold/20 transition-all duration-500"
          />

          {/* Understated Header Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-celestius-gold text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-celestius-gold animate-pulse motion-reduce:animate-none"></span>
            Under Active Development
          </div>

          {/* Main Placeholder Headings */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Something new is being forged.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light mb-8">
            The new <span className="text-white font-medium">Celestius</span> experience is currently under development. 
            Our developers, designers, and creators are crafting a next-generation platform for our community.
          </p>

          {/* Decorative Forge Progress Bar (No fake completion percentages) */}
          <div className="max-w-md mx-auto relative pt-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
              <span className="flex items-center gap-1.5 text-celestius-gold font-medium">
                <span className="text-xs">⚡</span> FORGE_IN_PROGRESS
              </span>
              <span className="text-zinc-500 tracking-wider">CELESTIUS_V2</span>
            </div>

            {/* Glowing Track */}
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-[1px] relative">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-celestius-gold to-yellow-300 rounded-full shadow-[0_0_12px_rgba(255,204,0,0.8)] animate-forge-spark motion-reduce:animate-none"
                style={{ width: '65%' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
