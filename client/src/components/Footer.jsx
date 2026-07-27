import React from 'react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-10 px-6 md:px-16 bg-black border-t border-zinc-900 text-zinc-400 text-sm z-20 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Celestius Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={logoImg} 
            alt="Celestius" 
            className="h-6 w-auto object-contain opacity-90"
          />
        </div>

        {/* Center / Right: Tagline & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-light text-zinc-400">
          <span>Student-run. Built with curiosity.</span>
          <span className="hidden sm:inline text-zinc-400">•</span>
          <span>© {currentYear} Celestius</span>
        </div>

      </div>
    </footer>
  );
}
