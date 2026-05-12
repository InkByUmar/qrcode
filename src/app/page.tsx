
"use client"

import React, { useState } from 'react';
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
 * Standard Adsterra Banner Slot
 */
const AdsterraBanner = ({ className }: { className?: string }) => (
  <div className={cn("container mx-auto px-6 py-12 flex flex-col items-center animate-reveal", className)}>
    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">Advertisement</div>
    <div 
      className="w-full max-w-5xl min-h-[100px] md:min-h-[250px] bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden hover:bg-white/[0.05] transition-all relative"
    >
      <div className="flex flex-col items-center gap-4 text-white/10 animate-fade-pulse">
        <Zap className="w-8 h-8" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Adsterra Studio Slot</span>
      </div>
    </div>
  </div>
);

/**
 * Adsterra Native Banner Integration
 */
const AdsterraNativeBanner = ({ className }: { className?: string }) => (
  <div className={cn("container mx-auto px-6 py-12 flex flex-col items-center animate-reveal", className)}>
    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">Recommendations</div>
    <div className="w-full max-w-5xl bg-white/[0.03] border border-white/5 rounded-3xl p-4 md:p-8">
      <div id="container-8a0d2340102217c81755459d2df8b6d0"></div>
      <Script 
        async 
        data-cfasync="false" 
        src="https://archaicmsflip.com/8a0d2340102217c81755459d2df8b6d0/invoke.js" 
        strategy="afterInteractive"
      />
    </div>
  </div>
);

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
    { label: 'Studio', href: '#generator', action: () => { setGeneratorMode('single'); scrollTo('generator'); } },
    { label: 'How it Works', href: '#how-to-use', action: () => scrollTo('how-to-use') },
    { label: 'PWA Features', href: '#pwa-features', action: () => scrollTo('pwa-features') },
    { label: 'FAQ', href: '#faq', action: () => scrollTo('faq') },
  ];

  const faqs = [
    {
      q: "Are the QR codes generated here permanent?",
      a: "Yes, our QR codes are static, meaning they encode data directly into the pattern and will never expire. They will work as long as the destination (like a URL) is active."
    },
    {
      q: "Can I add my business logo for free?",
      a: "Absolutely. You can upload any logo in PNG or JPG format. Our engine automatically adjusts error correction to 'Level H' to ensure your code works perfectly with branding."
    },
    {
      q: "Is there a limit on bulk generation?",
      a: "No. You can process batches of QR codes for free. We support high-resolution exports for all users to ensure professional print quality."
    },
    {
      q: "Is this app safe to add to my home screen?",
      a: "Yes. QR CANVAS is a Progressive Web App (PWA). Adding it to your home screen provides a native experience without needing a large app store download. It's fast, lightweight, and secure."
    },
    {
      q: "What file formats do you support for export?",
      a: "We provide high-resolution PNG as standard. SVG Vector format is also available for professionals who need infinitely scalable assets for large-scale print."
    }
  ];

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/80 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-700">
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
             >
              <Scan className="w-4 h-4 text-primary" />
              <span className="hidden xs:inline">Scan Tool</span>
             </button>

             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
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

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-20 md:py-32 relative">
        <div className="max-w-5xl mx-auto text-center mb-12 relative z-10 animate-reveal">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 border-primary/20 animate-float-subtle">
            <CloudLightning className="w-3.5 h-3.5 fill-primary/30" />
            <span>PREMIUM PWA-READY STUDIO EDITION</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-headline font-black mb-10 leading-[1.1] md:leading-[1] tracking-tight text-white">
            Professional artistic <br />
            <span className="text-primary italic">QR CANVAS Studio</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Create high-resolution QR codes with integrated branding. Optimized for <span className="text-white font-medium">mobile installation</span> and <span className="text-white font-medium">bulk production</span>.
          </p>
        </div>

        {/* Adsterra Header Banner */}
        <AdsterraBanner className="mb-10" />
        
        {/* Top Native Banner Integrated Here */}
        <AdsterraNativeBanner className="mb-20" />

        <div id="generator" className="relative z-10 scroll-mt-24 animate-reveal stagger-3">
          <QrGeneratorContainer activeMode={generatorMode} onModeChange={setGeneratorMode} />
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <section id="how-to-use" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="text-center mb-24 animate-reveal">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Master Production Guide</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Four simple steps to generate high-resolution, branded QR assets for your campaigns.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { step: '01', icon: LayoutGrid, title: 'Choose Content', desc: 'Select from URL, WiFi, vCard, or WhatsApp templates.' },
            { step: '02', icon: Palette, title: 'Style Pattern', desc: 'Customize dot shapes and corner styles for a unique look.' },
            { step: '03', icon: ImageIcon, title: 'Add Branding', desc: 'Upload your brand logo and set a custom background image.' },
            { step: '04', icon: Download, title: 'Export Asset', desc: 'Download high-res PNG or professional SVG vector files.' },
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
              <h4 className="text-xl font-headline font-bold text-white mb-4">{item.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Adsterra Native Banner Integration */}
      <AdsterraNativeBanner />

      {/* PWA INSTALLATION SECTION */}
      <section id="pwa-features" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24 bg-primary/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-reveal">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] font-black tracking-widest text-primary uppercase animate-pulse">
                <Smartphone className="w-3.5 h-3.5" /> Native Experience
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight">
                No App Store Needed. <br />
                <span className="text-primary">Install in 2 Seconds.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                QR CANVAS is built with Progressive Web App technology. Add it to your home screen for instant access, even offline. No large downloads, just a professional studio in your pocket.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/10 transition-colors">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Desktop Ready</h5>
                    <p className="text-white/40 text-xs">Run as a standalone app on Mac, PC, or Linux.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary/10 transition-colors">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Ultra Fast</h5>
                    <p className="text-white/40 text-xs">Instant loading with cached studio assets.</p>
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
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Installed App</p>
                      <h4 className="text-xl font-headline font-black text-white uppercase tracking-tighter leading-none">
                        <span className="text-white">QR</span> <span className="text-primary">CANVAS</span>
                      </h4>
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <p className="text-[9px] text-white/30 font-medium leading-relaxed uppercase tracking-widest">
                        Offline Access Enabled<br />
                        Native Studio Render
                      </p>
                   </div>
                   <div className="absolute bottom-8 w-40 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-[9px] uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90 transition-colors cursor-pointer active:scale-95">
                     Launch Studio
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adsterra Middle Banner */}
      <AdsterraBanner />

      {/* FAQ SECTION */}
      <section id="faq" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="max-w-3xl mx-auto animate-reveal">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6 uppercase">Studio FAQ</h2>
            <p className="text-white/50 text-sm md:text-base font-medium">Common questions about static QR codes and studio usage.</p>
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

      {/* Adsterra Bottom Banner */}
      <AdsterraBanner className="py-20" />

      {/* SECURITY & PRIVACY SECTION */}
      <section id="policies" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: Lock, title: 'Zero-Data Policy', desc: "We never store your input data. All QR processing happens in your browser's local memory and is cleared when you close the tab." },
            { icon: ShieldCheck, title: 'Permanent Ownership', desc: "Codes generated here are 100% static. They belong to you forever and do not rely on our platform to stay active." },
            { icon: TrendingUp, title: 'Campaign Intelligence', desc: "Track engagement via high-resolution asset integration, providing deep campaign intelligence without compromising privacy." },
          ].map((policy, i) => (
            <div key={i} className="space-y-6 animate-reveal stagger-1 group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <policy.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-headline font-bold text-white">{policy.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                {policy.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <CustomScannerLogo />
            <div className="flex flex-wrap justify-center items-center gap-8">
               <a href="#how-to-use" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">How it Works</a>
               <a href="#faq" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">FAQ</a>
               <a href="#policies" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Privacy & Terms</a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center space-y-5">
            <div className="flex justify-center gap-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90 animate-fade-pulse stagger-1">SSL SECURE</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90 animate-fade-pulse stagger-2">GDPR COMPLIANT</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90 animate-fade-pulse stagger-3">PWA READY</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
              &copy; <CopyrightYear /> QR CANVAS. ALL RIGHTS RESERVED. PROFESSIONAL STUDIO EDITION.
            </p>
          </div>
        </div>
      </footer>
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <Toaster />
    </main>
  );
}
