
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { QrScannerModal } from '@/components/qr-canvas/qr-scanner-modal';
import { Toaster } from '@/components/ui/toaster';
import { 
  Shield, 
  Zap, 
  Palette, 
  Layers, 
  CheckCircle2, 
  Download,
  LayoutGrid,
  ImageIcon,
  Menu,
  Scan,
  TrendingUp,
  ShieldCheck,
  Lock,
  Globe,
  ArrowRight,
  Smartphone,
  CloudLightning,
  Monitor
} from 'lucide-react';
import { CopyrightYear } from '@/components/qr-canvas/copyright-year';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import Script from 'next/script';

/**
 * Advanced Professional Logo: Green Box with Black QR
 */
const CustomScannerLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_8px_rgba(38,234,86,0.3)]"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="100" height="100" rx="20" fill="#26EA56" />
        <text 
          x="50%" 
          y="52%" 
          dominantBaseline="central" 
          textAnchor="middle" 
          fontSize="48" 
          fontWeight="900" 
          fill="black" 
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          QR
        </text>
      </svg>
    </div>
    <div className="font-headline font-black text-xl md:text-2xl tracking-tighter uppercase leading-none">
      <span className="text-white">QR</span> <span className="text-primary ml-0.5">CANVAS</span>
    </div>
  </div>
);

/**
 * Adsterra Skyscraper Banner 160x600
 */
const AdsterraSkyscraperBanner = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const scriptConfig = document.createElement('script');
      scriptConfig.type = 'text/javascript';
      scriptConfig.innerHTML = `
        atOptions = {
          'key' : 'ae8d80b67ecd20f2553ebdb46506c737',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      containerRef.current.appendChild(scriptConfig);

      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = "https://archaicmsflip.com/ae8d80b67ecd20f2553ebdb46506c737/invoke.js";
      scriptInvoke.async = true;
      containerRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return (
    <div className={cn("flex flex-col items-center animate-reveal", className)}>
      <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 text-center">Sponsored Content</div>
      <div 
        ref={containerRef}
        className="w-[160px] h-[600px] bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden"
      >
        <div className="flex flex-col items-center gap-2 text-white/10">
          <Zap className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Skyscraper Ad</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Adsterra Native Banner Component (4:1 / 4x1)
 */
const AdsterraNativeBanner = ({ className, id }: { className?: string, id: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create the container if it doesn't exist
      let adContainer = containerRef.current.querySelector('#container-8a0d2340102217c81755459d2df8b6d0');
      if (!adContainer) {
        adContainer = document.createElement('div');
        adContainer.id = 'container-8a0d2340102217c81755459d2df8b6d0';
        adContainer.className = "w-full flex items-center justify-center";
        containerRef.current.appendChild(adContainer);
      }

      if (adContainer && !adContainer.querySelector('script')) {
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = "https://archaicmsflip.com/8a0d2340102217c81755459d2df8b6d0/invoke.js";
        adContainer.appendChild(script);
      }
    }
  }, []);

  return (
    <div className={cn("container mx-auto px-6 animate-reveal", className)}>
      <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 text-center">Recommended For You</div>
      <div 
        ref={containerRef}
        id={id}
        className="min-h-[160px] md:aspect-[4/1] bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-center overflow-hidden relative"
      >
        <div id="container-8a0d2340102217c81755459d2df8b6d0" className="w-full flex items-center justify-center"></div>
        <div className="flex flex-col items-center gap-3 text-white/10 absolute pointer-events-none">
          <Layers className="w-8 h-8" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Native Content Stream</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [generatorMode, setGeneratorMode] = useState<'single' | 'bulk'>('single');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'QR Studio', href: '#generator', action: () => { setGeneratorMode('single'); scrollTo('generator'); } },
    { label: 'Bulk Mode', href: '#generator', action: () => { setGeneratorMode('bulk'); scrollTo('generator'); } },
    { label: 'Setup Guide', href: '#how-to-use', action: () => scrollTo('how-to-use') },
    { label: 'PWA Installation', href: '#pwa-features', action: () => scrollTo('pwa-features') },
    { label: 'FAQ', href: '#faq', action: () => scrollTo('faq') },
  ];

  const faqs = [
    {
      q: "Are the QR codes generated here permanent?",
      a: "Yes, our QR codes are static, meaning they encode data directly into the pattern and will never expire. They will work as long as the destination (like a URL) is active. No hidden subscription is required for permanent usage."
    },
    {
      q: "Can I add my business logo to a QR code for free?",
      a: "Absolutely. You can upload any logo in PNG or JPG format. Our professional generator automatically adjusts error correction to 'Level H' to ensure your code remains scannable even with central branding."
    },
    {
      q: "How does the bulk QR code generator work?",
      a: "Our bulk production engine allows you to paste a list of URLs or data strings. It then processes the entire batch using your active styling and logos, exporting them all in a single high-resolution ZIP file."
    },
    {
      q: "Is it safe to install the QR CANVAS PWA?",
      a: "Yes. QR CANVAS is a secure Progressive Web App (PWA). Adding it to your home screen provides a native-like experience with offline capabilities, without the need for a heavy app store download."
    },
    {
      q: "What file formats are available for download?",
      a: "We support high-resolution PNG for digital use and professional SVG Vector format for designers who need infinitely scalable assets for large-format printing."
    }
  ];

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* NAVIGATION - CHANGED TO FIXED POSITION */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/[0.05] bg-black/80 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setGeneratorMode('single'); scrollTo('generator'); }}>
            <CustomScannerLogo />
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    item.action();
                  }
                }}
                className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
             <button 
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/40 transition-all hover:scale-105"
                aria-label="Open QR Scanner Tool"
             >
              <Scan className="w-4 h-4 text-primary" />
              <span className="hidden xs:inline">Live Scanner</span>
             </button>

             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70" aria-label="Open Navigation Menu">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10 p-0 overflow-hidden text-white">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-white/5 text-left">
                      <CustomScannerLogo />
                    </SheetHeader>
                    <nav className="flex-1 p-6 flex flex-col gap-6">
                      {navItems.map((item) => (
                        <a 
                          key={item.label} 
                          href={item.href} 
                          onClick={(e) => {
                            if (item.action) {
                              e.preventDefault();
                              item.action();
                            }
                          }}
                          className="text-xs font-black uppercase tracking-[0.2em] text-white/50 hover:text-primary"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </header>

      {/* HERO SECTION - ADDED MARGIN TOP TO COMPENSATE FOR FIXED HEADER */}
      <section className="container mx-auto px-6 pt-32 pb-12 md:pt-48 relative text-center">
        <div className="max-w-5xl mx-auto relative z-10 animate-reveal">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 border-primary/20 animate-float-subtle">
            <CloudLightning className="w-3.5 h-3.5 fill-primary/30" />
            <span>PREMIUM PWA-READY QR STUDIO EDITION</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-headline font-black mb-10 leading-[1.1] md:leading-[1] tracking-tight text-white">
            Professional artistic <br />
            <span className="text-primary italic">QR Code Generator</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Create high-resolution, branded QR assets for your business. Optimized for <span className="text-white font-medium">mobile PWA installation</span> and <span className="text-white font-medium">high-volume bulk production</span>.
          </p>
        </div>
      </section>

      {/* NATIVE AD 1 */}
      <AdsterraNativeBanner className="mb-20" id="native-studio-top" />

      {/* GENERATOR STUDIO SECTION */}
      <section id="generator" className="container mx-auto px-6 pb-32 scroll-mt-32">
        <div className="relative z-10 animate-reveal stagger-3">
          <h2 className="sr-only">Professional QR Code Generator Tool</h2>
          <QrGeneratorContainer activeMode={generatorMode} onModeChange={setGeneratorMode} />
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <section id="how-to-use" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-32">
        <div className="text-center mb-24 animate-reveal">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6 uppercase tracking-tight">Professional Branding Guide</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Follow these four simple steps to generate high-resolution, premium QR code assets for your marketing campaigns.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { step: '01', icon: LayoutGrid, title: 'Input Content', desc: 'Select from URL, WiFi network, vCard contact, or WhatsApp templates.' },
            { step: '02', icon: Palette, title: 'Customize Style', desc: 'Fine-tune dot patterns and corner geometries for a unique brand look.' },
            { step: '03', icon: ImageIcon, title: 'Integrated Logo', desc: 'Upload your company logo and generate AI-powered artistic backgrounds.' },
            { step: '04', icon: Export, title: 'Studio Export', desc: 'Download high-definition PNG or professional SVG vector files for print.' },
          ].map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "glass-card p-8 rounded-[2.5rem] border-white/5 relative group hover:border-primary/20 transition-all hover:-translate-y-2 animate-reveal",
                i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : i === 2 ? "stagger-3" : "stagger-4"
              )}
            >
              <div className="absolute top-6 right-6 text-2xl font-black text-white/10 group-hover:text-primary/20 transition-all">{item.step}</div>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold text-white mb-4">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PWA INSTALLATION SECTION */}
      <section id="pwa-features" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-32 bg-primary/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-reveal">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] font-black tracking-widest text-primary uppercase animate-pulse">
                <Smartphone className="w-3.5 h-3.5" /> PWA Mobile Optimized
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight uppercase tracking-tight">
                Branded Studio <br />
                <span className="text-primary">In Your Pocket.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                QR CANVAS is engineered with Progressive Web App technology. Install it instantly on your home screen for high-speed access to your QR studio, even without an active internet connection.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/10 transition-colors">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Desktop Client</h4>
                    <p className="text-white/40 text-xs">Run as a native app on Windows, Mac, or Linux systems.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/10 transition-colors">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Instant Sync</h4>
                    <p className="text-white/40 text-xs">Access your generator presets instantly on any device.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end animate-reveal stagger-2">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[80px] -z-10 opacity-30 animate-pulse" />
              <div className="glass-card p-3 rounded-[3rem] border-white/10 shadow-2xl relative overflow-hidden w-full max-w-[280px] hover:scale-105 transition-transform duration-700">
                <div className="bg-black/80 rounded-[2.25rem] p-1 aspect-[9/16] relative overflow-hidden flex flex-col items-center justify-center border border-white/5">
                   <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/10 rounded-full" />
                   <CustomScannerLogo className="animate-float-subtle" />
                   <div className="mt-10 text-center space-y-3 px-8">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Installed PWA Edition</p>
                      <h4 className="text-xl font-headline font-black text-white uppercase tracking-tighter leading-none">
                        <span className="text-white">QR</span> <span className="text-primary">CANVAS</span>
                      </h4>
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <p className="text-[9px] text-white/30 font-medium leading-relaxed uppercase tracking-widest">
                        Offline Branding Enabled<br />
                        Native Performance Render
                      </p>
                   </div>
                   <div className="absolute bottom-8 w-40 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-[9px] uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90 transition-colors cursor-pointer active:scale-95">
                     Launch App
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NATIVE AD 2 */}
      <AdsterraNativeBanner className="py-24" id="native-faq-pre" />

      {/* FAQ SECTION */}
      <section id="faq" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-32">
        <div className="max-w-3xl mx-auto animate-reveal">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6 uppercase tracking-tight">Knowledge Base</h2>
            <p className="text-white/50 text-sm md:text-base font-medium">Frequently asked questions about professional QR code production and branding.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/5 bg-white/[0.02] rounded-3xl px-8 transition-all hover:bg-white/[0.04]">
                <AccordionTrigger className="text-left text-white hover:no-underline py-6">
                  <span className="text-base md:text-lg font-bold">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-8 text-sm md:text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECURITY & PRIVACY SECTION */}
      <section id="policies" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-32">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-10 flex-1">
            {[
              { icon: Lock, title: 'Zero-Storage Privacy', desc: "Your sensitive data never leaves your browser. All QR code generation is processed locally in memory for absolute security." },
              { icon: ShieldCheck, title: 'Static Permanent Codes', desc: "Every code generated here is 100% static. They will function forever and remain your property without recurring fees." },
              { icon: TrendingUp, title: 'Marketing Analytics', desc: "Bridge physical and digital marketing with high-resolution QR assets that integrate seamlessly into your campaign analytics tools." },
            ].map((policy, i) => (
              <div key={i} className="space-y-6 animate-reveal stagger-1 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <policy.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight">{policy.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {policy.desc}
                </p>
              </div>
            ))}
          </div>
          {/* Adsterra Vertical Skyscraper Column */}
          <div className="shrink-0 flex flex-col gap-8 sticky top-24">
            <AdsterraSkyscraperBanner />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <CustomScannerLogo />
            <div className="flex flex-wrap justify-center items-center gap-8">
               <a href="#how-to-use" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Setup Guide</a>
               <a href="#faq" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">FAQ</a>
               <a href="#policies" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Privacy Policy</a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center space-y-5">
            <div className="flex justify-center gap-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90 animate-fade-pulse stagger-1">SSL SECURE</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90 animate-fade-pulse stagger-2">GDPR COMPLIANT</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90 animate-fade-pulse stagger-3">PWA READY</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
              &copy; <CopyrightYear /> QR CANVAS. ALL RIGHTS RESERVED. PROFESSIONAL BRANDING STUDIO.
            </p>
          </div>
        </div>
      </footer>
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <Toaster />
    </main>
  );
}

// Dummy icon for SEO purposes in the map loop
const Export = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
