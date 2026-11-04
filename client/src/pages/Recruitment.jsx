import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal,
  Cpu,
  Users,
  ArrowUpRight
} from 'lucide-react';

// Dynamic Bi-directional Scroll Reveal Component
function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.08,
  className = '',
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getHiddenTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 32px, 0) scale(0.97)';
      case 'fade-down':
        return 'translate3d(0, -32px, 0) scale(0.97)';
      case 'slide-left':
        return 'translate3d(-36px, 0, 0)';
      case 'slide-right':
        return 'translate3d(36px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.94)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const animStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getHiddenTransform(),
    filter: isVisible ? 'blur(0px)' : 'blur(4px)',
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    willChange: 'transform, opacity, filter',
    ...style
  };

  return (
    <div ref={ref} className={className} style={animStyle}>
      {children}
    </div>
  );
}

// Cipher characters for the retro-futuristic decryption transition
const CIPHER_CHARS = '01#/><*&%$~+=!';

export default function Recruitment({ 
  introCompleted = true, 
  setActivePage, 
  recruitmentOpenStatus = false,
  closedRoles = ['Backend Developer'],
  recruitmentStatusLoading = false
}) {
  const text1 = "SYNCING THE STATUS OF THE RECRUITMENT FROM CELESTIUS...";
  const text2 = "CONJUGATING LUMINARIES MATRIX...";

  // Lifecycle states: 'waiting' | 'decrypting-1' | 'holding-1' | 'morphing' | 'holding-2' | 'dissolving' | 'revealed'
  const [phase, setPhase] = useState(introCompleted ? 'decrypting-1' : 'waiting');
  const [displayText, setDisplayText] = useState('');

  // Scramble / Decrypt Helper that smoothly decodes from fromStr to toStr
  const runScramble = (fromStr, toStr, onProgress, onComplete, duration = 600) => {
    const fps = 36;
    const intervalTime = 1000 / fps;
    const totalFrames = Math.max(12, Math.round(duration / intervalTime));
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const rawProgress = frame / totalFrames;
      // Fluid ease-out curve inspired by ColorOS spring damping
      const progress = Math.min(1, 1 - Math.pow(1 - rawProgress, 3));

      let output = '';
      for (let i = 0; i < toStr.length; i++) {
        if (toStr[i] === ' ') {
          output += ' ';
          continue;
        }
        if (i < toStr.length * progress) {
          output += toStr[i];
        } else {
          output += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }
      }

      onProgress(output);

      if (frame >= totalFrames) {
        clearInterval(timer);
        onProgress(toStr);
        if (onComplete) onComplete();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  };

  // Master Orchestrator: waits for main Celestius intro to conclude, then executes the sequence
  useEffect(() => {
    if (!introCompleted) {
      setPhase('waiting');
      return;
    }

    // Organic calibrated delay after Celestius main intro clears the screen
    const initialDelay = setTimeout(() => {
      setPhase('decrypting-1');

      // Step 1: Decrypt into Text 1 (starting from cipher stream)
      const cancelScramble1 = runScramble('', text1, setDisplayText, () => {
        setPhase('holding-1');

        // Step 2: Hold Text 1 for user to read and absorb
        const hold1Timer = setTimeout(() => {
          setPhase('morphing');

          // Step 3: Decrypt / morph Text 1 into Text 2
          const cancelScramble2 = runScramble(text1, text2, setDisplayText, () => {
            setPhase('holding-2');

            // Step 4: Hold Text 2 with golden highlight
            const hold2Timer = setTimeout(() => {
              setPhase('dissolving');

              // Step 5: Smooth dissolve into the revealed content
              const dissolveTimer = setTimeout(() => {
                setPhase('revealed');
              }, 450);

              return () => clearTimeout(dissolveTimer);
            }, 1400);

            return () => clearTimeout(hold2Timer);
          }, 650);

          return () => cancelScramble2();
        }, 1500);

        return () => clearTimeout(hold1Timer);
      }, 550);

      return () => cancelScramble1();
    }, 250);

    return () => clearTimeout(initialDelay);
  }, [introCompleted]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28 text-left select-none">
      
      {/* Individual Custom Orchestrated Keyframes */}
      <style>{`
        /* Claude-Style 4 Working Dots Pulse */
        @keyframes claudeWorkingDots {
          0%, 100% {
            transform: scale(0.7);
            opacity: 0.25;
            filter: drop-shadow(0 0 0px rgba(255, 204, 0, 0));
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255, 204, 0, 0.85));
          }
        }

        /* 1. Top Horizontal Ruler Laser Draw */
        @keyframes rulerLaserDraw {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        /* 2. Left Display Title: Staggered Line Kinetic 3D Unfold */
        @keyframes lineKineticUnfold {
          0% {
            opacity: 0;
            transform: perspective(800px) rotateX(28deg) translateY(36px) scale(0.94);
            filter: blur(12px);
          }
          60% {
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: perspective(800px) rotateX(0deg) translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        /* 3. Vertical Divider Line: Laser Curtain Draw Down */
        @keyframes verticalLineDrawDown {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        /* 4. Right Side Section Headers: Horizontal Terminal Drift & Tracking Snap */
        @keyframes headerTerminalDrift {
          0% {
            opacity: 0;
            transform: translateX(-28px);
            letter-spacing: 0.22em;
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            letter-spacing: 0.05em;
            filter: blur(0px);
          }
        }

        /* 5. Right Side Narrative Paragraphs: Atmospheric Liquid Focus Dissolve */
        @keyframes paragraphAtmosphericMelt {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        /* 6. Community Button: Tactile Spring Pop (Clean - NO outer container shadow) */
        @keyframes buttonCleanPop {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.94);
          }
          65% {
            opacity: 1;
            transform: translateY(-2px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* 7. Centered Summary Table Rows: Staggered Matrix Slide */
        @keyframes summaryRowGlide {
          0% {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        /* 8. Bottom Ruler: Resolving Laser Draw */
        @keyframes bottomRulerResolve {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* 1. Centered Typographic Intro Animation with Claude-Style 4 Dots Pulse */}
      {phase !== 'revealed' && phase !== 'waiting' && (
        <div 
          className={`min-h-[52vh] flex flex-col items-center justify-center text-center px-4 transition-all duration-500 ease-out ${
            phase === 'dissolving' 
              ? 'opacity-0 scale-95 blur-md -translate-y-4' 
              : 'opacity-100 scale-100 blur-0 translate-y-0'
          }`}
        >
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Claude-Style 4 Pulsing Working Dots at the top of the text animation */}
            <div className="flex items-center justify-center gap-2.5">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]"
                  style={{
                    animation: 'claudeWorkingDots 1.4s ease-in-out infinite both',
                    animationDelay: `${idx * 0.18}s`
                  }}
                />
              ))}
            </div>

            {/* Unified Display Heading with Scramble Decryption & Phosphor Glow */}
            <h2 
              className="font-ndot text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-tight min-h-[1.4em]"
              style={{ 
                fontFamily: "'VT323', monospace",
                textShadow: '0 0 25px rgba(255, 204, 0, 0.22)'
              }}
            >
              {displayText.includes('LUMINARIES') ? (
                <>
                  {displayText.split('LUMINARIES')[0]}
                  <span className="text-[#FFCC00] font-bold">LUMINARIES</span>
                  {displayText.split('LUMINARIES')[1]}
                </>
              ) : (
                displayText
              )}
              <span className="inline-block w-2 sm:w-3.5 h-6 sm:h-9 bg-[#FFCC00] ml-2.5 align-middle animate-pulse" />
            </h2>

            {/* Subtle Tracking Status Line */}
            <p className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-[0.25em] transition-opacity duration-300">
              {(phase === 'decrypting-1' || phase === 'holding-1') && '[ VERIFYING REALTIME RECRUITMENT STATUS ]'}
              {(phase === 'morphing' || phase === 'holding-2') && '[ DECODING CONSTELLATION TELEMETRY BUFFER ]'}
              {phase === 'dissolving' && '[ MATRIX SYNCHRONIZED // MATERIALIZING CONTENT ]'}
            </p>

          </div>
        </div>
      )}

      {/* 2. Main Revealed Content (Enhanced Element-by-Element Orchestrated Cascade) */}
      {phase === 'revealed' && (
        <div className="space-y-16">
          
          {/* Top HR Ruler: Laser draw from center */}
          <div 
            style={{ 
              animation: 'rulerLaserDraw 0.65s cubic-bezier(0.16, 1, 0.3, 1) both',
              transformOrigin: 'center' 
            }}
          >
            <hr className="border-t border-white/10" />
          </div>

          {/* Open Architectural Editorial Grid with Staggered Multi-Tier Animations */}
          <section className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Line-by-Line Kinetic 3D Depth Unfold */}
              <div className="lg:col-span-6 space-y-6">
                <h1 
                  className="font-ndot text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.92]"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  <span 
                    className="block text-white"
                    style={{ 
                      animation: 'lineKineticUnfold 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
                      willChange: 'transform, opacity, filter'
                    }}
                  >
                    2026 SIGNED OFF.
                  </span>
                  <span 
                    className="block text-zinc-600 pt-1"
                    style={{ 
                      animation: 'lineKineticUnfold 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both',
                      willChange: 'transform, opacity, filter'
                    }}
                  >
                    PLEASE WAIT FOR
                  </span>
                  <span 
                    className="block text-[#FFCC00] pt-1"
                    style={{ 
                      animation: 'lineKineticUnfold 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.34s both',
                      willChange: 'transform, opacity, filter'
                    }}
                  >
                    NEXT GEN 2027.
                  </span>
                </h1>
              </div>

              {/* Right Column: Custom Animated Hairline Divider + Asymmetric Content */}
              <div className="lg:col-span-6 relative space-y-8 lg:pl-12">
                
                {/* Vertical Hairline Divider: Laser curtain draw from top to bottom */}
                <div 
                  className="hidden lg:block absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 origin-top"
                  style={{ 
                    animation: 'verticalLineDrawDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both',
                    transformOrigin: 'top'
                  }} 
                />

                {/* Mobile horizontal divider */}
                <div 
                  className="block lg:hidden w-full h-[1px] bg-white/10 origin-center"
                  style={{ 
                    animation: 'rulerLaserDraw 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both',
                    transformOrigin: 'center'
                  }} 
                />

                {/* Right Block 1: Intake Sealed */}
                <div className="space-y-4">
                  <h2 
                    className="font-mono text-sm uppercase tracking-wider text-white font-bold flex items-center gap-2"
                    style={{ 
                      animation: 'headerTerminalDrift 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both',
                      willChange: 'transform, opacity, letter-spacing, filter'
                    }}
                  >
                    <Terminal className="w-4 h-4 text-[#FFCC00]" />
                    <span>THE 2026 INTAKE IS SEALED</span>
                  </h2>
                  <p 
                    className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed"
                    style={{ 
                      animation: 'paragraphAtmosphericMelt 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both',
                      willChange: 'transform, opacity, filter'
                    }}
                  >
                    The official recruitments of Celestius for 2026 have come to a conclusion. Every commit pushed, every micro-challenge answered, and every pitch delivered throughout our technical and non-technical rounds set a high benchmark.
                  </p>
                </div>

                {/* Right Block 2: Standby for Luminaries */}
                <div className="space-y-4">
                  <h2 
                    className="font-mono text-sm uppercase tracking-wider text-[#FFCC00] font-bold flex items-center gap-2"
                    style={{ 
                      animation: 'headerTerminalDrift 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.52s both',
                      willChange: 'transform, opacity, letter-spacing, filter'
                    }}
                  >
                    <Cpu className="w-4 h-4 text-[#FFCC00]" />
                    <span>STAND BY FOR THE NEXT GEN LUMINARIES</span>
                  </h2>
                  <div 
                    className="space-y-3"
                    style={{ 
                      animation: 'paragraphAtmosphericMelt 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.62s both',
                      willChange: 'transform, opacity, filter'
                    }}
                  >
                    <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
                      To all aspiring builders, designers, and future innovators: please wait for the Next Gen Luminaries for 2027. We are setting up heavier codebases, deeper AI architectures, bold creative productions, and unprecedented hackathon grounds.
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      Use this intermission to level up your craft, publish your personal projects, and sharpen your tools. When the next gen 2027 call arrives, we want to see what you can truly build.
                    </p>
                  </div>
                </div>

                {/* Right Block 3: Community CTA Button (Clean Pop - Zero outer container box) */}
                <div 
                  className="pt-2 space-y-3"
                  style={{ 
                    animation: 'buttonCleanPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.72s both',
                    willChange: 'transform, opacity'
                  }}
                >
                  <a
                    href="https://chat.whatsapp.com/HP3gqZe9BFPDqu1qowiurT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/15 hover:border-[#FFCC00]/70 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_28px_rgba(255,204,0,0.22)] active:scale-[0.98] cursor-pointer overflow-hidden backdrop-blur-md"
                  >
                    {/* Shimmer Light Sweep on Hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform ease-out pointer-events-none" />

                    {/* Subtle Radial Ambient Gold Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_center,rgba(255,204,0,0.12),transparent_70%)] pointer-events-none" />

                    {/* Left: Users Icon Badge */}
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FFCC00]/40 group-hover:bg-[#FFCC00]/10 transition-colors duration-200">
                      <Users className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#FFCC00] transition-colors duration-200" />
                    </div>

                    {/* Center: Monospace Typography */}
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.14em] text-zinc-200 group-hover:text-white transition-colors duration-200 uppercase">
                      JOIN CELESTIUS COMMUNITY
                    </span>

                    {/* Right: Circular Arrow Action Trigger */}
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-black group-hover:bg-[#FFCC00] group-hover:border-[#FFCC00] transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Join for the latest tech updates, event announcements, and official communications.
                  </p>
                </div>

              </div>

            </div>

            {/* Centered Summary Table with ScrollReveal Animation */}
            <ScrollReveal animation="fade-up" delay={80} duration={850} className="w-full">
              <div className="max-w-md mx-auto w-full pt-8 pb-4 space-y-3 font-mono text-xs text-zinc-400 border-t border-white/10">
                <div 
                  className="flex items-center justify-between py-1.5 border-b border-white/5"
                  style={{ 
                    animation: 'summaryRowGlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  <span className="text-zinc-500 uppercase tracking-wider">2026 INTAKE</span>
                  <span className="text-white font-bold tracking-wide">SELECTIONS FINALIZED</span>
                </div>
                <div 
                  className="flex items-center justify-between py-1.5 border-b border-white/5"
                  style={{ 
                    animation: 'summaryRowGlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  <span className="text-zinc-500 uppercase tracking-wider">CURRENT STATUS</span>
                  <span className="text-[#FFCC00] font-bold tracking-wide">LUMINARIES UPSKILLING</span>
                </div>
                <div 
                  className="flex items-center justify-between py-1.5"
                  style={{ 
                    animation: 'summaryRowGlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.34s both',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  <span className="text-zinc-500 uppercase tracking-wider">NEXT GENERATION</span>
                  <span className="text-sky-400 font-bold tracking-wide">NEXT GEN LUMINARIES 2027</span>
                </div>
              </div>

              {/* Ending HR Ruler: Resolving laser beam draw */}
              <div 
                className="max-w-md mx-auto w-full pt-4"
                style={{ 
                  animation: 'bottomRulerResolve 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.46s both',
                  transformOrigin: 'center'
                }}
              >
                <hr className="border-t border-white/10" />
              </div>
            </ScrollReveal>

          </section>

        </div>
      )}

    </div>
  );
}
