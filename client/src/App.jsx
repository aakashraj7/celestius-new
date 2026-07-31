import React, { useState, useEffect, useRef } from 'react';
import logoImg from './assets/logo.png';
import constructionImg from './assets/construction.png';
import { 
  Instagram, 
  Mail, 
  Check,
  Code2, 
  Users, 
  Activity,
  AlertCircle,
  Shield,
  RotateCcw,
  Globe,
  Linkedin,
  Github,
  Network,
  Gauge,
  Thermometer,
  Clock,
  X,
  Cog,
  Play,
  Pause
} from 'lucide-react';

// SVG Live Sparkline Graph for Telemetry Metrics
function SparklineGraph({ data, color = "#ffcc00" }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * 56;
    const y = 18 - ((val - min) / range) * 14;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <svg className="w-14 h-4 overflow-visible shrink-0" viewBox="0 0 56 18">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="transition-all duration-300"
      />
    </svg>
  );
}

// Segmented Cyber LED Matrix Progress Tracker
function SegmentedProgressTracker({ progress = 0 }) {
  const totalSegments = 20;
  const activeSegments = Math.round((progress / 100) * totalSegments);

  return (
    <div className="w-full flex gap-1.5 items-center my-2.5">
      {Array.from({ length: totalSegments }).map((_, idx) => {
        const isActive = idx < activeSegments;
        const isCurrent = idx === activeSegments - 1 && progress > 0;
        return (
          <div 
            key={idx} 
            className={`h-2.5 flex-1 rounded-sm transition-all duration-300 ${
              isActive 
                ? isCurrent 
                  ? 'bg-celestius-gold shadow-[0_0_12px_rgba(255,204,0,0.9)] animate-pulse' 
                  : 'bg-gradient-to-t from-amber-600 to-celestius-gold' 
                : 'bg-zinc-900/90 border border-zinc-800/80'
            }`}
          />
        );
      })}
    </div>
  );
}

// Developer Blueprint Grid & Interactive Canvas
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

    // Drifting code symbols
    const tokens = [];
    const tokenSymbols = ['</>', '{}', 'const', 'git', 'npm', 'js', 'node', 'api', 'db', 'code', 'cit', '[]', '=>', 'import', 'export', 'main', 'dev'];
    const tokenCount = Math.min(45, Math.floor((width * height) / 32000));
    
    for (let i = 0; i < tokenCount; i++) {
      tokens.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        symbol: tokenSymbols[i % tokenSymbols.length],
        alpha: Math.random() * 0.35 + 0.15,
        fontSize: Math.floor(Math.random() * 4) + 11,
      });
    }

    const gridSize = 65;

    // Moving tech data packets running along grid lines
    const packets = [];
    const packetCount = 22;

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
      p.length = Math.floor(Math.random() * 22) + 16;
      p.alpha = Math.random() * 0.5 + 0.3;

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

      const parallaxX = mouse.x !== -1000 ? (mouse.x - width / 2) * -0.015 : 0;
      const parallaxY = mouse.y !== -1000 ? (mouse.y - height / 2) * -0.015 : 0;

      // 1. Grid Lines
      ctx.strokeStyle = 'rgba(255, 204, 0, 0.025)';
      ctx.lineWidth = 0.5;
      
      const startX = (parallaxX % gridSize) - gridSize;
      const startY = (parallaxY % gridSize) - gridSize;

      for (let x = startX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = startY; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Moving Data Packets
      packets.forEach((p) => {
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
        
        ctx.strokeStyle = `rgba(255, 204, 0, ${p.alpha * 0.35})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.beginPath();
        if (p.axis === 'x') {
          ctx.arc(renderX, renderLine, 1.3, 0, Math.PI * 2);
        } else {
          ctx.arc(renderLine, renderY, 1.3, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(255, 204, 0, ${p.alpha * 1.5 > 1 ? 1 : p.alpha * 1.5})`;
        ctx.fill();
      });

      // 3. Drifting Code Tokens
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
        const isNearMouse = distToMouse < 130;
        
        ctx.save();
        ctx.font = `${t.fontSize}px monospace`;
        if (isNearMouse) {
          ctx.fillStyle = 'rgba(255, 204, 0, 0.9)';
          ctx.shadowColor = 'rgba(255, 204, 0, 0.4)';
          ctx.shadowBlur = 10;
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
  const email = "celestius.club@gmail.com";
  const instagramUrl = "https://www.instagram.com/celestius_cit/";
  const linkedinUrl = "https://www.linkedin.com/company/club-celestius-cit";
  const githubUrl = "https://github.com/Club-Celestius";

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'refund' | null

  // Intro Loader State
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Deployment Progress Bar Dynamic Fill State (0% -> 40% on load)
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  // Stream Control State for Logs Console
  const [isStreaming, setIsStreaming] = useState(true);

  // Mouse Spotlight Location
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Loader progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 14) + 8;
        return Math.min(100, prev + step);
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Smooth Deployment Progress Fill-Up Animation (0% -> 40% on load)
  useEffect(() => {
    if (loading) return;

    const target = 40;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= target) {
        setDeploymentProgress(target);
        clearInterval(interval);
      } else {
        setDeploymentProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [loading]);

  // Diagnostics Telemetry Sparkline History Data
  const [pingHistory, setPingHistory] = useState([14, 12, 11, 13, 10, 12, 11]);
  const [loadHistory, setLoadHistory] = useState([22, 18, 24, 19, 16, 20, 18]);
  const [tempHistory, setTempHistory] = useState([34.1, 34.4, 34.2, 34.6, 34.3, 34.5]);

  const [metrics, setMetrics] = useState({ ping: 11, temp: 34.3, load: 18 });
  const [logs, setLogs] = useState(() => {
    const now = new Date();
    const formatTime = (dt) => `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
    return [
      `[${formatTime(new Date(now - 14000))}] SYS_INIT: Booting Club Celestius Hub...`,
      `[${formatTime(new Date(now - 11000))}] SYS_ENG: React 18 compiler synchronization 100% aligned.`,
      `[${formatTime(new Date(now - 8000))}] SYS_EVT: Loading future events: Athena's Hack, Build-A-Thon...`,
      `[${formatTime(new Date(now - 5000))}] SYS_API: Webhook verified with Instagram API.`,
      `[${formatTime(new Date(now - 3000))}] SYS_SEC: Security integrity checked. SSL handshake OK.`,
      `[${formatTime(new Date(now - 1000))}] SYS_NET: Connection pool active. 12ms latency.`
    ];
  });

  const consoleRef = useRef(null);

  // Dynamic real-time telemetry streaming & sparkline update loop
  useEffect(() => {
    if (!isStreaming) return;

    const logTemplates = [
      "SYS_WEB: Caching static assets. 182 files loaded successfully.",
      "SYS_DB: PostgreSQL connection pool active... CONNECTED",
      "SYS_SEC: Integrity checked. Security protocols active.",
      "SYS_EVT: Loading future events: Athena's Hack, Build-A-Thon...",
      "SYS_INC: Scanning incubator projects... 4 active items found.",
      "SYS_NET: WebSocket gateway listening for client connections.",
      "SYS_CORE: Re-indexing source repositories... Temp 34.3°C",
      "SYS_API: Webhook verified with Instagram API.",
      "SYS_ENG: Vite HMR pipeline optimized for hot reload."
    ];

    const interval = setInterval(() => {
      const nextPing = Math.floor(Math.random() * 4) + 10;
      const nextLoad = Math.floor(Math.random() * 10) + 15;
      const nextTemp = parseFloat((33.8 + Math.random() * 1.0).toFixed(1));

      setMetrics({ ping: nextPing, temp: nextTemp, load: nextLoad });

      setPingHistory((prev) => [...prev.slice(1), nextPing]);
      setLoadHistory((prev) => [...prev.slice(1), nextLoad]);
      setTempHistory((prev) => [...prev.slice(1), nextTemp]);

      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs((prev) => {
        const next = [...prev, `[${timeStr}] ${randomLog}`];
        if (next.length > 35) next.shift();
        return next;
      });
    }, 2600);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Autoscroll terminal console
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col justify-between relative selection:bg-celestius-gold selection:text-black font-sans overflow-x-hidden">
      
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 204, 0, 0.04), transparent 80%)`
        }}
      />

      {/* Redesigned Minimalist High-Tech Intro Loader Screen */}
      {loading && (
        <div className={`fixed inset-0 bg-[#020204] z-50 flex flex-col items-center justify-center p-6 transition-all duration-700 ease-in-out select-none ${progress === 100 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <DeveloperGridBackground />
          
          {/* Ambient Glow Orbs */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-celestius-gold/10 blur-[150px] pointer-events-none animate-pulse-glow" />

          <div className="relative flex flex-col items-center max-w-md w-full text-center z-10">
            
            {/* Central Holographic Logo Container with Dual Spinning Orbital Gyro Rings */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Outer Counter-Spinning Orbit Ring */}
              <div className="absolute w-44 h-44 rounded-full border border-dashed border-celestius-gold/30 animate-spin pointer-events-none" style={{ animationDuration: '16s' }} />
              {/* Middle Pulse Ring */}
              <div className="absolute w-36 h-36 rounded-full border border-yellow-500/20 animate-ping pointer-events-none" />
              {/* Inner Fast Spinning Glowing Orbit Ring */}
              <div className="absolute w-32 h-32 rounded-full border-t-2 border-r-2 border-celestius-gold animate-spin pointer-events-none shadow-[0_0_25px_rgba(255,204,0,0.5)]" style={{ animationDuration: '3s' }} />
              
              {/* Celestius Logo Box */}
              <div className="relative p-5 rounded-3xl bg-zinc-950/90 border border-yellow-500/40 shadow-[0_0_40px_rgba(255,204,0,0.3)] backdrop-blur-2xl">
                <img 
                  src={logoImg} 
                  alt="Celestius Logo" 
                  className="h-16 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,204,0,0.5)] animate-subtle-float"
                />
              </div>
            </div>

            {/* Title Header */}
            <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-1 font-sans">
              CELESTIUS <span className="text-celestius-gold">V2.0</span>
            </h2>
            <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-7">
              Student Tech Club @ CIT
            </p>

            {/* 3 Sequential Initialization Pipeline Badges */}
            <div className="w-full max-w-xs space-y-2 mb-7 text-left font-mono text-[11px]">
              
              <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 border ${progress > 20 ? 'bg-yellow-500/10 border-yellow-500/30 text-white' : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-celestius-gold font-bold">01</span>
                  <span>Core Hub Engine</span>
                </div>
                {progress > 20 ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />}
              </div>

              <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 border ${progress > 55 ? 'bg-yellow-500/10 border-yellow-500/30 text-white' : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-celestius-gold font-bold">02</span>
                  <span>Telemetry & Sandbox</span>
                </div>
                {progress > 55 ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />}
              </div>

              <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 border ${progress > 85 ? 'bg-yellow-500/10 border-yellow-500/30 text-white' : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-celestius-gold font-bold">03</span>
                  <span>Platform Interface</span>
                </div>
                {progress > 85 ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />}
              </div>

            </div>

            {/* Progress Counter & Segmented Matrix Bar */}
            <div className="w-full max-w-xs">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1">
                <span className="tracking-wider uppercase">INITIALIZING HUB</span>
                <span className="font-bold text-celestius-gold text-xs">{progress}%</span>
              </div>
              <SegmentedProgressTracker progress={progress} />
            </div>

          </div>
        </div>
      )}
      
      {/* Background Canvas & Ambient Glowing Accents */}
      <DeveloperGridBackground />
      <div className="absolute top-[18%] left-[10%] w-[400px] h-[400px] rounded-full bg-yellow-500/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-amber-500/4 blur-[130px] pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="absolute -inset-1 bg-gradient-to-r from-celestius-gold to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <img 
              src={logoImg} 
              alt="Celestius Logo" 
              className="relative h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-xl border border-celestius-gold/30"
            />
          </div>
        </div>

        {/* CIT Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-zinc-300 font-medium hover:border-celestius-gold/30 hover:text-white transition-all shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celestius-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-celestius-gold"></span>
          </span>
          Student Tech Club @ CIT
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mb-16 text-left">
          
          {/* LEFT COLUMN: Branding, Text & Clean Borderless Construction Image */}
          <div className="lg:col-span-6 flex flex-col items-start justify-start">
            
            {/* PLATFORM V2.0 Capsule Badge */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-[10px] font-bold uppercase tracking-[0.2em] text-celestius-gold mb-5 font-mono select-none shadow-[0_0_15px_rgba(255,204,0,0.08)]">
              PLATFORM V2.0
            </div>

            {/* Ultra-Bold Highlighted Title Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.06] text-white font-sans mb-5">
              <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">Something New is</span> <br />
              <span className="animate-text-shimmer bg-gradient-to-r from-amber-300 via-yellow-400 to-celestius-gold bg-clip-text text-transparent font-black tracking-tight filter drop-shadow-[0_0_25px_rgba(255,204,0,0.6)]">
                Under Construction
              </span>
            </h1>

            {/* Description Subtitle */}
            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed mb-4">
              Our dev portal is currently under active construction. We will be back online soon with a brand-new hub engineered for student developers and creators.
            </p>

            {/* Clean Borderless Construction Barrier Graphic */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] h-[240px] flex items-center justify-center select-none cursor-pointer mb-5">
              <div className="absolute inset-x-8 bottom-2 h-14 bg-celestius-gold/15 rounded-full blur-2xl pointer-events-none" />
              
              <img 
                src={constructionImg} 
                alt="Under Construction Graphic" 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(255,204,0,0.22)] animate-subtle-float transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Plain Announcement Text Row */}
            <div className="text-xs text-zinc-300 font-light leading-relaxed max-w-md">
              We'll be back online soon with exciting features, better performance, and a smoother experience.
            </div>

          </div>

          {/* RIGHT COLUMN: Diagnostics Logger & Animated 0%->40% Deployment Progress Bar */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-5">
            
            {/* System Diagnostics Console */}
            <div className="w-full glass-panel-gold border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl border-glow-gold p-5">
              
              {/* Header bar with Stream Controls */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-4.5 h-4.5 text-celestius-gold shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">SYSTEM DIAGNOSTICS</span>
                    <span className="text-[9px] font-mono font-bold bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800">V2.0</span>
                  </div>
                </div>
                
                {/* Stream Pause/Play Toggle */}
                <button 
                  onClick={() => setIsStreaming(!isStreaming)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-celestius-gold/40 transition-all text-[10px] font-mono flex items-center gap-1.5"
                  title={isStreaming ? "Pause Live Log Stream" : "Resume Live Log Stream"}
                >
                  {isStreaming ? <Pause className="w-3 h-3 text-celestius-gold" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span>{isStreaming ? "LIVE" : "PAUSED"}</span>
                </button>
              </div>

              {/* Real-time SVG Sparkline Waveform Telemetry Cards */}
              <div className="grid grid-cols-4 gap-2 mb-4 font-mono text-[10px] pb-4 border-b border-zinc-800/80">
                
                {/* Network */}
                <div className="flex flex-col p-2 rounded-xl bg-black/40 border border-white/5 justify-between">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">NETWORK</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-emerald-400 font-bold">Stable</span>
                  </div>
                </div>
                
                {/* Latency with Live Sparkline */}
                <div className="flex flex-col p-2 rounded-xl bg-black/40 border border-white/5 justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">LATENCY</span>
                    <SparklineGraph data={pingHistory} color="#10b981" />
                  </div>
                  <span className="text-emerald-400 font-bold mt-1">{metrics.ping}ms</span>
                </div>

                {/* Load with Live Sparkline */}
                <div className="flex flex-col p-2 rounded-xl bg-black/40 border border-white/5 justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">LOAD</span>
                    <SparklineGraph data={loadHistory} color="#ffcc00" />
                  </div>
                  <span className="text-yellow-400 font-bold mt-1">{metrics.load}%</span>
                </div>

                {/* Temp with Live Sparkline */}
                <div className="flex flex-col p-2 rounded-xl bg-black/40 border border-white/5 justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">TEMP</span>
                    <SparklineGraph data={tempHistory} color="#f59e0b" />
                  </div>
                  <span className="text-yellow-400 font-bold mt-1">{metrics.temp}°C</span>
                </div>

              </div>

              {/* Real-time Syntax Highlighted Console Stream (Pure Logs ONLY) */}
              <div ref={consoleRef} className="h-[185px] overflow-y-auto font-mono text-[11px] text-zinc-300 space-y-2 select-none scrollbar-thin mb-4 bg-black/60 p-3.5 rounded-xl border border-white/10 shadow-inner">
                {logs.map((log, idx) => {
                  const match = log.match(/^\[([\d:]+)\]\s*(.*)$/);
                  const time = match ? match[1] : null;
                  const content = match ? match[2] : log;
                  const isLatest = idx === logs.length - 1;
                  return (
                    <div key={idx} className={`flex items-start gap-1.5 transition-all duration-300 ${isLatest ? 'text-celestius-gold font-semibold' : 'text-zinc-300'}`}>
                      <span className="text-celestius-gold shrink-0">&gt;</span>
                      {time && <span className="text-zinc-500 shrink-0">[{time}]</span>}
                      <span className="break-all">{content}</span>
                    </div>
                  );
                })}
              </div>

              {/* Console Footer */}
              <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-800/80 pt-3 text-zinc-400 uppercase tracking-wider">
                <span>STATUS: <strong className="text-emerald-400 font-bold">STABLE</strong></span>
                <span>LAST UPDATED: <strong className="text-emerald-400 font-bold">JUST NOW</strong></span>
              </div>

            </div>

            {/* Segmented Cyber Matrix Deployment Progress Tracker */}
            <div className="w-full glass-panel border border-zinc-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-white flex items-center gap-2 font-bold uppercase tracking-wider">
                  <Cog className="w-4.5 h-4.5 text-celestius-gold animate-spin" style={{ animationDuration: '6s' }} />
                  DEPLOYMENT PROGRESS
                </span>
                <span className="text-celestius-gold font-bold">{deploymentProgress}% COMPLETE</span>
              </div>
              
              {/* Segmented LED Matrix Progress Bar */}
              <SegmentedProgressTracker progress={deploymentProgress} />
              
              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                <span>EST: Q3 2026</span>
                <span>SYSTEM STATE: <strong className="text-emerald-400 font-bold">STABLE</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* What's Coming Preview Cards - Expanded to Full max-w-6xl Width */}
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-center text-zinc-300 mb-8">
          WHAT WE ARE ENGINEERING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mb-12">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-celestius-gold transition-colors">Innovative Events</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Hands-on hackathons, build-a-thons, and collaborative technology workshops.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Cog className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-celestius-gold transition-colors">Technical Guidance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Mentorship, code reviews, and structured learning roadmaps for student developers.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-celestius-gold transition-colors">Tech Networking &amp; Collaborations</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Connecting student creators with industry leaders and open-source project teams.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* 3-Column Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-zinc-950/40 backdrop-blur-md pt-12 pb-6 px-6 text-left mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative group w-fit cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="absolute -inset-1 bg-gradient-to-r from-celestius-gold to-yellow-500 rounded-xl blur opacity-35 transition duration-500"></div>
              <img 
                src={logoImg} 
                alt="Celestius Logo" 
                className="relative h-12 w-auto object-contain rounded-xl border border-celestius-gold/35 shadow-[0_0_15px_rgba(255,204,0,0.25)]"
              />
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              <strong className="text-white font-semibold">Club Celestius</strong> is a student-run community driving innovation, open source, and collaboration through technology and shared knowledge
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-normal tracking-[0.25em] text-zinc-500 uppercase">
              Social Connect
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Follow our channels to stay up to date.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              {/* Instagram */}
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>

              {/* Email */}
              <a 
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>

              {/* LinkedIn (Updated with official URL) */}
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>

              {/* GitHub (Updated with official URL) */}
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

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
              <span>VERIFIED_COMMUNITY_PORTAL</span>
            </div>
          </div>
        </div>
      </footer>

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
              <X className="w-5 h-5" />
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
              By joining Club Celestius events, you affirm consent to these secure parameters.
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
              <X className="w-5 h-5" />
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
              By joining Club Celestius events, you affirm consent to these terms.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
