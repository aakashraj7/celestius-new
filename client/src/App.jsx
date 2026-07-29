import React, { useState } from 'react';
import logoImg from './assets/logo.png';
import constructionImg from './assets/construction.png';
import { 
  Instagram, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Code2, 
  Rocket, 
  Users, 
  ArrowUpRight,
  Hammer
} from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const email = "celestius.club@gmail.com";
  const instagramUrl = "https://www.instagram.com/celestius_cit/";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative selection:bg-celestius-gold selection:text-black font-sans">
      
      {/* Subtle Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 204, 0, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 204, 0, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <img 
            src={logoImg} 
            alt="Celestius Logo" 
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        {/* CIT Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-celestius-gold" />
          Student Tech Club @ CIT
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-10 sm:py-16 flex flex-col items-center">
        
        {/* Status & Progress Bar Header */}
        <div className="w-full max-w-lg mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-celestius-gold/10 border border-celestius-gold/30 text-celestius-gold text-xs font-semibold tracking-wider uppercase mb-3">
            <Hammer className="w-3.5 h-3.5 animate-bounce" />
            <span>Platform v2.0 • Under Active Construction</span>
          </div>

          {/* Animated Progress Indicator */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1 relative">
            <div className="bg-gradient-to-r from-yellow-500 via-celestius-gold to-yellow-300 h-full w-[40%] rounded-full transition-all duration-1000 relative">
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
            </div>
          </div>
          <div className="flex justify-between w-full text-[11px] text-gray-400 mt-1.5 font-mono">
            <span>System Initialization</span>
            <span className="text-celestius-gold font-semibold">40% Complete</span>
          </div>
        </div>

        {/* Integrated Illustration Container */}
        <div className="relative w-full max-w-md sm:max-w-lg mb-10 flex justify-center items-center group">
          {/* Subtle architectural guide lines to integrate illustration into page background */}
          <div className="absolute -inset-x-8 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-celestius-gold/20 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 -left-4 w-[1px] bg-gradient-to-b from-transparent via-celestius-gold/15 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 -right-4 w-[1px] bg-gradient-to-b from-transparent via-celestius-gold/15 to-transparent pointer-events-none" />

          {/* Blueprint Illustration */}
          <img 
            src={constructionImg} 
            alt="Celestius Under Construction" 
            className="relative z-10 w-full max-h-[280px] sm:max-h-[340px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>

        {/* Main Headline & Copy */}
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Building the Next Era of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-celestius-gold-light to-celestius-gold bg-clip-text text-transparent">
              Student Innovation
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Celestius is CIT's flagship student tech club. We are engineering a brand-new digital ecosystem for developers, designers, and innovators. Stay connected as we prepare for launch!
          </p>
        </div>

        {/* What's Coming Preview Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-celestius-gold/40 transition-colors flex items-start gap-3 text-left">
            <div className="p-2 rounded-lg bg-celestius-gold/10 text-celestius-gold shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-0.5">Hackathons & Labs</h3>
              <p className="text-xs text-gray-400 leading-normal">Hands-on coding challenges & tech workshops.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-celestius-gold/40 transition-colors flex items-start gap-3 text-left">
            <div className="p-2 rounded-lg bg-celestius-gold/10 text-celestius-gold shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-0.5">Project Incubator</h3>
              <p className="text-xs text-gray-400 leading-normal">Showcasing student-built apps & open source.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-celestius-gold/40 transition-colors flex items-start gap-3 text-left">
            <div className="p-2 rounded-lg bg-celestius-gold/10 text-celestius-gold shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-0.5">Tech Network</h3>
              <p className="text-xs text-gray-400 leading-normal">Mentorship, peer learning & industry talks.</p>
            </div>
          </div>
        </div>

        {/* Social Connect & CTA Actions */}
        <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm text-center">
          <h2 className="text-sm uppercase tracking-wider text-celestius-gold font-semibold mb-4 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Get In Touch & Follow Our Journey
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Instagram Button */}
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-celestius-gold text-black font-semibold text-sm hover:bg-celestius-gold-light transition-all shadow-lg shadow-celestius-gold/10 group"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Email Contact / Copy Button */}
            <div className="w-full sm:w-1/2 relative">
              <button 
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 transition-all group"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Mail className="w-4 h-4 text-celestius-gold" />}
                <span className="truncate">{copied ? 'Email Copied!' : 'Email Us'}</span>
                {!copied && <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 mt-3 font-mono">
            {email}
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 py-6 px-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-3">
        <p>© {new Date().getFullYear()} Celestius Tech Club, CIT. All rights reserved.</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-celestius-gold transition-colors flex items-center gap-1">
            <Instagram className="w-3.5 h-3.5" /> @celestius_cit
          </a>
          <span>•</span>
          <a href={`mailto:${email}`} className="hover:text-celestius-gold transition-colors flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> {email}
          </a>
        </div>
      </footer>
    </div>
  );
}





