import React, { useState, useEffect, useRef } from 'react';
import clubLogo from './assets/logo.png';
import logoImg from './assets/logo.png';
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
  Hammer,
  Terminal,
  Cpu,
  Activity,
  Wifi,
  Settings,
  AlertCircle,
  Shield,
  RotateCcw,
  Globe,
  Linkedin,
  Github
} from 'lucide-react';

// Simulates Vite build/compilation logs during loader progress
const getLoaderLogs = (val) => {
  const lines = [
    `$ npm run build:celestius-hub`,
    `> celestius-new@2.0.0 build`,
    `> vite build`
  ];
  if (val > 15) lines.push(`✓ 128 modules transformed.`);
  if (val > 35) lines.push(`rendering chunks...`);
  if (val > 55) lines.push(`dist/assets/index.js   171.82 kB`);
  if (val > 75) lines.push(`dist/assets/index.css   34.72 kB`);
  if (val >= 95) {
    lines.push(`✓ built in 2.64s`);
    lines.push(`[SYSTEM] Standby active. Check back soon!`);
  }
  return lines;
};

// Interactive Developer Blueprint Grid Background (with Parallax and Routing Packets)
function DeveloperGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize drifting code tokens (faint programming symbols)
    const tokens = [];
    const tokenSymbols = ['</>', '{}', 'const', 'git', 'npm', 'js', 'node', 'api', 'db', 'code', 'cit', '[]', '=>', 'import', 'export', 'main', 'dev'];
    const tokenCount = Math.min(45, Math.floor((width * height) / 32000));
    
    for (let i = 0; i < tokenCount; i++) {
      tokens.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        symbol: tokenSymbols[i % tokenSymbols.length],
        alpha: Math.random() * 0.35 + 0.15,
        fontSize: Math.floor(Math.random() * 4) + 11,
      });
    }

    // Grid size
    const gridSize = 65;

    // Initialize data packets running along grid lines
    const packets = [];
    const packetCount = 20;

    const initPacket = (p = {}) => {
      const axis = Math.random() > 0.5 ? 'x' : 'y';
      const dir = Math.random() > 0.5 ? 1 : -1;
      
      let lineCoordinate;
      if (axis === 'x') {
        const lineIndex = Math.floor(Math.random() * (height / gridSize));
        lineCoordinate = lineIndex * gridSize;
      } else {
        const lineIndex = Math.floor(Math.random() * (width / gridSize));
        lineCoordinate = lineIndex * gridSize;
      }

      p.axis = axis;
      p.dir = dir;
      p.line = lineCoordinate;
      p.speed = Math.random() * 1.5 + 1.0;
      p.length = Math.floor(Math.random() * 20) + 15;
      p.alpha = Math.random() * 0.5 + 0.25;

      if (axis === 'x') {
        p.x = dir === 1 ? -p.length : width + p.length;
        p.y = lineCoordinate;
      } else {
        p.x = lineCoordinate;
        p.y = dir === 1 ? -p.length : height + p.length;
      }
      return p;
    };

    for (let i = 0; i < packetCount; i++) {
      packets.push(initPacket({}));
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Create subtle parallax shift based on mouse position
      const parallaxX = mouse.x !== -1000 ? (mouse.x - width / 2) * -0.015 : 0;
      const parallaxY = mouse.y !== -1000 ? (mouse.y - height / 2) * -0.015 : 0;

      // 1. Draw Tech Blueprint Grid Lines (offset by parallax)
      ctx.strokeStyle = 'rgba(255, 204, 0, 0.015)';
      ctx.lineWidth = 0.5;
      
      const startX = (parallaxX % gridSize) - gridSize;
      const startY = (parallaxY % gridSize) - gridSize;

      // Vertical grid lines
      for (let x = startX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Horizontal grid lines
      for (let y = startY; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw moving tech data packets (aligned to parallax)
      packets.forEach((p) => {
        // Move packet
        if (p.axis === 'x') {
          p.x += p.speed * p.dir;
          if (p.dir === 1 && p.x > width + p.length) initPacket(p);
          else if (p.dir === -1 && p.x < -p.length) initPacket(p);
        } else {
          p.y += p.speed * p.dir;
          if (p.dir === 1 && p.y > height + p.length) initPacket(p);
          else if (p.dir === -1 && p.y < -p.length) initPacket(p);
        }

        const renderX = p.x + (p.axis === 'y' ? parallaxX : 0);
        const renderY = p.y + (p.axis === 'x' ? parallaxY : 0);
        const renderLine = p.line + (p.axis === 'x' ? parallaxY : parallaxX);

        ctx.beginPath();
        if (p.axis === 'x') {
          ctx.moveTo(renderX, renderLine);
          ctx.lineTo(renderX - (p.length * p.dir), renderLine);
        } else {
          ctx.moveTo(renderLine, renderY);
          ctx.lineTo(renderLine, renderY - (p.length * p.dir));
        }
        
        ctx.strokeStyle = `rgba(255, 204, 0, ${p.alpha * 0.3})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Draw bright data head
        ctx.beginPath();
        if (p.axis === 'x') {
          ctx.arc(renderX, renderLine, 1.25, 0, Math.PI * 2);
        } else {
          ctx.arc(renderLine, renderY, 1.25, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(255, 204, 0, ${p.alpha * 1.5 > 1 ? 1 : p.alpha * 1.5})`;
        ctx.fill();
      });

      // 3. Draw drifting code tokens (offset by parallax)
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      tokens.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;

        if (t.x < -40) t.x = width + 40;
        if (t.x > width + 40) t.x = -40;
        if (t.y < -40) t.y = height + 40;
        if (t.y > height + 40) t.y = -40;

        const renderTX = t.x + parallaxX;
        const renderTY = t.y + parallaxY;

        const distToMouse = Math.hypot(mouse.x - renderTX, mouse.y - renderTY);
        const isNearMouse = distToMouse < 120;
        
        ctx.save();
        ctx.font = `${t.fontSize}px monospace`;
        if (isNearMouse) {
          ctx.fillStyle = 'rgba(255, 204, 0, 0.8)';
          ctx.shadowColor = 'rgba(255, 204, 0, 0.3)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${t.alpha})`;
        }
        
        ctx.fillText(t.symbol, renderTX, renderTY);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const email = "celestius.club@gmail.com";
  const instagramUrl = "https://www.instagram.com/celestius_cit/";

  // Form State
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'refund' | null

  // Intro Loader State
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Typewriter Badge state
  const [badgeText, setBadgeText] = useState('');
  
  useEffect(() => {
    const fullText = "Under Active Construction";
    let index = 0;
    let isDeleting = false;
    let speed = 100;
    let timer;
    
    const type = () => {
      const current = fullText.substring(0, index);
      setBadgeText(current);
      
      if (!isDeleting && index < fullText.length) {
        index++;
        speed = 100;
      } else if (isDeleting && index > 0) {
        index--;
        speed = 50;
      } else if (!isDeleting && index === fullText.length) {
        isDeleting = true;
        speed = 2500; // Hold typed text
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        speed = 500; // Delay before typing again
      }
      
      timer = setTimeout(type, speed);
    };
    
    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, []);

  // Simulation loader progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // fade out wait
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 140);
    return () => clearInterval(timer);
  }, []);

  const getLoadingMessage = (val) => {
    if (val < 25) return "Initializing core modules...";
    if (val < 50) return "Page is currently under construction...";
    if (val < 75) return "Setting up developer sandbox framework...";
    if (val < 95) return "Syncing network database parameters...";
    return "System ready. Check back soon!";
  };

  // Live Diagnostics Telemetry State
  const [metrics, setMetrics] = useState({ ping: 12, temp: 34.2, load: 24 });
  const [logs, setLogs] = useState([
    "SYS_INIT: Booting Club Celestius Hub...",
    "SYS_INIT: Establishing secure connection to dev sandbox servers...",
    "SYS_INIT: Node mapping active. Connection Latency 12ms.",
    "SYS_CORE: Synchronizing React compiler and packages...",
    "SYS_CORE: Local port 3000 listening for requests... OK"
  ]);

  const consoleRef = useRef(null);

  // Simulated live logging activity
  useEffect(() => {
    const logTemplates = [
      "SYS_WEB: Caching static assets. 182 files loaded successfully.",
      "SYS_DB: Connecting to local databases... CONNECTED",
      "SYS_SEC: Integrity checked. Security protocols active.",
      "SYS_EVT: Loading future events: Athena's Hack, Build-A-Thon...",
      "SYS_INC: Scanning incubator projects... 4 active items found.",
      "SYS_NET: Port verified. Ready to synchronize network updates.",
      "SYS_CORE: Re-indexing source repositories... Temp 34.5°C",
      "SYS_API: Webhook verified with Instagram API.",
      "SYS_ENG: Compiler synchronization status: 100% aligned.",
      "SYS_ASSEMBLY: Mounting code sandbox ecosystem..."
    ];

    const interval = setInterval(() => {
      // Vary metrics slightly
      setMetrics({
        ping: Math.floor(Math.random() * 5) + 10,
        temp: parseFloat((33.5 + Math.random() * 1.5).toFixed(1)),
        load: Math.floor(Math.random() * 12) + 18
      });

      // Add a random log
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs((prev) => {
        const next = [...prev, `[${timeStr}] ${randomLog}`];
        if (next.length > 30) next.shift(); // Keep logs buffer manageable
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Autoscroll terminal console container internally (does not scroll page)
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailInput) {
      setErrorMsg('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative selection:bg-celestius-gold selection:text-black font-sans overflow-x-hidden">
      
      {/* Intro Loading Screen Overlay */}
      {loading && (
        <div className={`fixed inset-0 bg-[#020204] z-50 flex flex-col items-center justify-center p-6 transition-opacity duration-700 ease-out select-none ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <DeveloperGridBackground />
          
          {/* Ambient center tech glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-celestius-gold/5 blur-3xl pointer-events-none animate-pulse" />

          <div className="relative flex flex-col items-center max-w-md w-full text-center">
            
            {/* High-tech Compiling Console box */}
            <div className="w-full max-w-sm bg-zinc-950/90 border border-zinc-800 rounded-2xl overflow-hidden p-5 text-left shadow-2xl backdrop-blur-xl border-glow-gold mb-6">
              
              {/* Terminal Title */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-celestius-gold" />
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">CELESTIUS_BUILD_SYSTEM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <span className="w-1.5 h-1.5 rounded-full bg-celestius-gold animate-ping" />
                </div>
              </div>

              {/* Vite compilation logs */}
              <div className="font-mono text-[11px] text-zinc-500 min-h-[120px] space-y-1.5 select-none leading-relaxed">
                {getLoaderLogs(progress).map((line, idx) => {
                  let color = "text-zinc-500";
                  if (line.startsWith("✓")) color = "text-emerald-400";
                  if (line.startsWith(">")) color = "text-zinc-400";
                  if (line.startsWith("[SYSTEM]")) color = "text-celestius-gold font-bold";
                  return (
                    <div key={idx} className={color}>
                      {line}
                    </div>
                  );
                })}
              </div>

              {/* Progress Slider */}
              <div className="mt-5 border-t border-zinc-900 pt-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1.5">
                  <span>COMPILING ASSETS</span>
                  <span className="font-semibold text-celestius-gold">{progress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden p-[1px] border border-zinc-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-celestius-gold rounded-full transition-all duration-150 ease-out" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>

            </div>

            {/* Sub-label */}
            <p className="text-xs font-mono text-zinc-500 tracking-wider">
              Student developer community sandbox compiling. Please check back soon.
            </p>

          </div>
        </div>
      )}
      
      {/* Background Network Graph and Ambient Glowing Tech Accents */}
      <DeveloperGridBackground />
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-yellow-500/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-amber-500/3 blur-[120px] pointer-events-none" />

      {/* Subtle Space Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 204, 0, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 204, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-celestius-gold to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src={logoImg} 
              alt="Celestius Logo" 
              className="relative h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-xl"
            />
          </div>
        </div>

        {/* CIT Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-zinc-400 font-medium hover:border-celestius-gold/30 hover:text-white transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celestius-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-celestius-gold"></span>
          </span>
          Student Tech Club @ CIT
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-10 sm:py-14 flex flex-col items-center">
        
        {/* Under Active Construction Typewriter Header Text */}
        <div className="flex items-center gap-2.5 mb-8 tracking-[0.25em] uppercase text-xs font-mono select-none">
          <Hammer className="w-3.5 h-3.5 text-celestius-gold animate-bounce shrink-0" />
          <span className="font-bold text-celestius-gold min-h-[16px] flex items-center">
            {badgeText}
            <span className="animate-pulse font-light text-celestius-gold ml-[2px]">|</span>
          </span>
        </div>

        {/* Core Layout Split: Orbiting Engine & Telemetry Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full mb-16">
          
          {/* LEFT: Central Tech Blueprint Schematic panel */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
            
            {/* The Blueprint Card wrapper */}
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl backdrop-blur-xl border-glow-gold">
              
              {/* Corner crosshairs for a drafting/tech blueprint look */}
              <div className="absolute top-3 left-3 text-zinc-700 font-mono text-[9px]">stk_ref: cit_cel_01</div>
              <div className="absolute top-3 right-3 text-zinc-700 font-mono text-[9px]">ping: stable</div>
              <div className="absolute bottom-3 left-3 text-zinc-700 font-mono text-[9px]">port: 3000</div>
              <div className="absolute bottom-3 right-3 text-zinc-700 font-mono text-[9px]">cpu: active</div>

              {/* Decorative Tech Grid Lines inside card */}
              <div className="absolute inset-8 border border-zinc-900 pointer-events-none rounded-2xl flex items-center justify-center">
                <div className="absolute w-full h-[1px] bg-zinc-900/60" />
                <div className="absolute h-full w-[1px] bg-zinc-900/60" />
                <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-zinc-900/50" />
              </div>

              <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-900 pb-3 mt-4">
                <span>[ CORE_SANDBOX ]</span>
                <span className="text-celestius-gold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-celestius-gold animate-ping" />
                  STANDBY
                </span>
              </div>

              {/* Central Logo Panel (Glossy shine sweep + float + hover scale) */}
              <div className="relative z-10 w-[200px] h-[110px] sm:w-[240px] sm:h-[130px] rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-5 shadow-[0_0_20px_rgba(0,0,0,0.7)] group overflow-hidden animate-logo-float hover:scale-[1.03] hover:border-celestius-gold/30 transition-all duration-300 animate-shine-reflection">
                {/* Logo Image */}
                <img 
                  src={clubLogo} 
                  alt="Celestius Core" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,204,0,0.12)] relative z-10 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* Static readable badges - completely stable, no rotation! */}
              <div className="w-full grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-zinc-900">
                <div className="bg-zinc-900/40 border border-zinc-800 px-2.5 py-2 rounded-xl flex flex-col items-center gap-1 shadow-md text-center group hover:border-celestius-gold/30 transition-all select-none">
                  <Code2 className="w-4 h-4 text-celestius-gold" />
                  <span className="text-[9px] font-bold text-white font-mono tracking-wider">CODE</span>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 px-2.5 py-2 rounded-xl flex flex-col items-center gap-1 shadow-md text-center group hover:border-celestius-gold/30 transition-all select-none">
                  <Hammer className="w-4 h-4 text-celestius-gold animate-pulse" />
                  <span className="text-[9px] font-bold text-white font-mono tracking-wider">BUILD</span>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 px-2.5 py-2 rounded-xl flex flex-col items-center gap-1 shadow-md text-center group hover:border-celestius-gold/30 transition-all select-none">
                  <Users className="w-4 h-4 text-celestius-gold" />
                  <span className="text-[9px] font-bold text-white font-mono tracking-wider">SHARE</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: High-tech System telemetry & progress stats */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* System Title */}
            <div>
              <div className="text-celestius-gold text-xs font-mono font-bold tracking-[0.3em] uppercase mb-1">
                Platform v2.0
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white font-sans">
                Something New is <br />
                <span className="animate-text-shimmer text-glow-gold">
                  Under Construction
                </span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-xl">
                Our dev portal is currently under active construction. We will be back online soon with a brand-new hub engineered for student developers and creators. Check back soon for deployment updates!
              </p>
            </div>

            {/* Simulated Live Diagnostic Logger Console */}
            <div className="w-full bg-zinc-950/90 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
              
              {/* Console Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-celestius-gold" />
                  <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-300">CELESTIUS_DIAGNOSTICS_V2.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Telemetry Stats Rows */}
              <div className="grid grid-cols-3 gap-1 px-4 py-3 bg-zinc-950 border-b border-zinc-900 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wifi className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>LATENCY: <strong className="text-green-400">{metrics.ping}ms</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Cpu className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>LOAD: <strong className="text-yellow-400">{metrics.load}%</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Activity className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>CORE TEMP: <strong className="text-orange-400">{metrics.temp}°C</strong></span>
                </div>
              </div>

              {/* Logs Content Window */}
              <div ref={consoleRef} className="p-4 h-[120px] overflow-y-auto font-mono text-[11px] text-zinc-400 space-y-1.5 select-none scrollbar-thin">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span className="text-celestius-gold shrink-0">&gt;</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Visual Progress Indicator */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 animate-spin text-celestius-gold" />
                  DEPLOYING MODULES
                </span>
                <span className="text-celestius-gold font-bold">40% COMPLETE</span>
              </div>
              
              {/* Progress Track */}
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden p-[1px] border border-zinc-800">
                <div className="h-full bg-gradient-to-r from-amber-600 via-celestius-gold to-yellow-300 rounded-full shadow-[0_0_10px_#FFCC00] animate-forge-spark" style={{ width: '40%' }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mt-1.5">
                <span>EST: Q3 2026</span>
                <span>SYSTEM STATE: STABLE</span>
              </div>
            </div>

          </div>

        </div>

        {/* What's Coming Preview Cards */}
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-center text-zinc-300 mb-8 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-celestius-gold" /> What We Are Engineering
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-celestius-gold transition-colors">Hackathons & Labs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Hands-on coding challenges and collaborative technology workshops.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-celestius-gold transition-colors">Project Incubator</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Supporting student ideas from blueprints to finished open-source projects.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-celestius-gold transition-colors">Tech Network</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Connecting curious minds through mentorship and industry networking.
              </p>
            </div>
          </div>

        </div>

        {/* Redesigned Stay Updated & Social Panel */}
        <div className="w-full max-w-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl text-center relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-celestius-gold/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-celestius-gold/5 rounded-full blur-2xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="inline-flex p-2.5 rounded-full bg-celestius-gold/10 border border-celestius-gold/20 text-celestius-gold mb-4 animate-bounce">
            <Sparkles className="w-5 h-5" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide mb-2 uppercase font-sans">
            Stay Tuned
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mb-6 max-w-md mx-auto">
            Subscribe below to receive updates and notifications as we prepare for release.
          </p>

          {/* Subscribed Success Box / Form */}
          {subscribed ? (
            <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 animate-fade-in flex flex-col items-center gap-2 max-w-md mx-auto">
              <Check className="w-8 h-8 p-1.5 rounded-full bg-green-500 text-black font-extrabold" />
              <h4 className="text-sm font-bold text-white">Initialization Complete!</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You've successfully subscribed. We'll send deployment logs to <strong className="text-white">{emailInput}</strong> as we approach release.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-2.5 mb-6">
              <div className="flex-grow relative">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your developer email..." 
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-celestius-gold/50 focus:ring-1 focus:ring-celestius-gold/30 transition-all font-light"
                />
                {errorMsg && (
                  <div className="absolute left-1 -bottom-5 text-[10px] text-red-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-celestius-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-celestius-gold-light hover:shadow-[0_0_15px_rgba(255,204,0,0.3)] active:scale-95 transition-all shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 pt-4 border-t border-white/5 max-w-md mx-auto">
            {/* Instagram Button */}
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold text-xs hover:bg-white/[0.08] hover:border-celestius-gold/30 transition-all group"
            >
              <Instagram className="w-4 h-4 text-celestius-gold group-hover:rotate-12 transition-transform duration-300" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Email Contact / Copy Button */}
            <div className="w-full sm:w-1/2">
              <button 
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold text-xs hover:bg-white/[0.08] hover:border-celestius-gold/30 transition-all group"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Mail className="w-4 h-4 text-celestius-gold" />}
                <span className="truncate">{copied ? 'Email Copied!' : 'Email Us'}</span>
                {!copied && <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
              </button>
            </div>
          </div>

          <p className="text-[10px] text-zinc-600 mt-4 font-mono select-all">
            {email}
          </p>

        </div>

      </main>

      {/* Redesigned 3-Column Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-zinc-950/40 backdrop-blur-md pt-12 pb-6 px-6 text-left mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative group w-fit">
              <div className="absolute -inset-1 bg-gradient-to-r from-celestius-gold to-yellow-500 rounded-xl blur opacity-35 transition duration-500"></div>
              <img 
                src={clubLogo} 
                alt="Celestius Logo" 
                className="relative h-12 w-auto object-contain rounded-xl border border-celestius-gold/35 shadow-[0_0_15px_rgba(255,204,0,0.25)]"
              />
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              <strong className="text-white font-semibold">Club Celestius</strong> is a student-run community driving innovation, open source, and collaboration through technology and shared knowledge
            </p>
          </div>

          {/* Column 2: Social Connect */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-normal tracking-[0.25em] text-zinc-500 uppercase">
              Social Connect
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Follow our channels to stay up to date.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 3: Legalities & Policies */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-normal tracking-[0.25em] text-zinc-500 uppercase">
              Terms & Legalities
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-2">
              Read our policies regarding your personal records, registration parameters, and payment processing rules.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button 
                onClick={() => setActiveModal('privacy')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-celestius-gold/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:shadow-[0_0_12px_rgba(255,204,0,0.05)] active:scale-95 group"
              >
                <Shield className="w-3.5 h-3.5 text-celestius-gold group-hover:rotate-12 transition-transform duration-300" />
                <span>Privacy Policy</span>
              </button>
              <button 
                onClick={() => setActiveModal('refund')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-red-500/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.05)] active:scale-95 group"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-500 group-hover:-rotate-45 transition-transform duration-300" />
                <span>Refund Policy</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-1.5 font-light">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span>© 2026 Celestius CIT. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider">
            <span className="text-zinc-400">CIT.CLUB_CELESTIUS</span>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>VERIFIED_PAYMENT_PORTAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals rendering */}
      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 border-t-2 border-t-celestius-gold rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all z-10"
              aria-label="Close modal"
            >
              <span className="text-xl font-light">×</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-celestius-gold/10 border border-celestius-gold/30 text-celestius-gold shadow-[0_0_15px_rgba(255,204,0,0.1)]">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  Privacy Policy
                </h2>
                <span className="text-[10px] font-mono text-celestius-gold tracking-[0.2em] font-semibold mt-1 block uppercase">
                  CONFIDENTIAL DATA PROTOCOL
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base text-left leading-relaxed mb-8 border-b border-white/5 pb-6">
              At Club Celestius, we implement robust measures to protect your digital records and ensure a secure registration pipeline.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-celestius-gold/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-celestius-gold">
                  <Check className="w-4 h-4 p-0.5 rounded-full bg-celestius-gold text-black font-extrabold" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    1. Confidentiality
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  All student details collected during registration (name, email address, phone number, and department) are kept strictly confidential and stored on encrypted databases.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-celestius-gold/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-celestius-gold">
                  <Check className="w-4 h-4 p-0.5 rounded-full bg-celestius-gold text-black font-extrabold" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    2. Zero Sharing
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Your data is never shared, sold, leased, or distributed to third-party advertisers, sponsors, or outer corporate organizations. Your consent remains absolute.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-celestius-gold/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-celestius-gold">
                  <Check className="w-4 h-4 p-0.5 rounded-full bg-celestius-gold text-black font-extrabold" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    3. Operational Purpose
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Data gathered is solely utilized for verification, generating certificate credentials, and distributing workshop coordinate links and source code repositories.
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 italic">
              By joining the PromptVerse workshop, you affirm consent to these secure parameters.
            </p>
          </div>
        </div>
      )}

      {/* Refund Policy Modal */}
      {activeModal === 'refund' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 border-t-2 border-t-red-500 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all z-10"
              aria-label="Close modal"
            >
              <span className="text-xl font-light">×</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  Refund Policy
                </h2>
                <span className="text-[10px] font-mono text-red-500 tracking-[0.2em] font-semibold mt-1 block uppercase">
                  REGISTRATION POLICY
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base text-left leading-relaxed mb-8 border-b border-white/5 pb-6">
              Please review our registration guidelines before completing your booking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-red-500/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    1. Booking Commitments
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  All workshop bookings are final. Since seats are limited and event resources are allocated in advance, we are unable to process cancellations or refunds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-red-500/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    2. Absence & Schedule
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  We are unable to issue refunds or transfer registration passes due to personal absences, schedule conflicts, or technical connectivity issues during the live sessions.
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 italic">
              By finalizing your registration, you acknowledge and agree to these terms.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
