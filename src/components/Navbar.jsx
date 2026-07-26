import React from 'react';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  return (
    <header className="w-full pt-8 pb-4 px-6 md:px-16 flex items-center justify-between z-30 relative bg-black">
      {/* Official Celestius Logo Asset */}
      <a href="#" className="flex items-center">
        <img 
          src={logoImg} 
          alt="Celestius" 
          className="h-9 sm:h-10 w-auto object-contain"
        />
      </a>

      {/* Navigation items matching original website */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white">
        <a href="#we" className="hover:text-celestius-gold transition-colors underline decoration-white underline-offset-8">We</a>
        <a href="#events" className="hover:text-celestius-gold transition-colors">Events</a>
        <a href="#projects" className="hover:text-celestius-gold transition-colors">Projects</a>
        <a href="#blogs" className="hover:text-celestius-gold transition-colors">Blogs</a>
        <a href="#timeline" className="hover:text-celestius-gold transition-colors">Timeline</a>
      </nav>
    </header>
  );
}
