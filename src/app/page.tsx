
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
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  LayoutGrid,
  HelpCircle,
  BookOpen,
  Image as ImageIcon,
  QrCode as QrIcon,
  Menu,
  Crown,
  BarChart3,
  RefreshCcw,
  ShieldCheck,
  Scan,
  Maximize,
  Smartphone,
  AppWindow,
  Share
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

const CustomScannerLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <rect x="7" y="7" width="3" height="3" fill="currentColor" stroke="none" />
    <rect x="14" y="7" width="3" height="3" fill="currentColor" stroke="none" />
    <rect x="7" y="14" width="3" height="3" fill="currentColor" stroke="none" />
    <path d="M14 14h3v3h-3z" />
  </svg>
);

const NativeAdBanner = () => (
  <div className="container mx-auto px-6 py-12 flex justify-center">
    <div 
      id="container-8a0d2340102217c81755459d2df8b6d0" 
      className="w-full max-w-5xl min-h-[100px] bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden"
    >
      {/* Adsterra Native Banner Container */}
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

  const scrollToGenerator = (mode: 'single' | 'bulk') => {
    setGeneratorMode(mode);
    scrollTo('generator');
  };

  const navItems = [
    { label: 'QR Studio', href: '#generator', action: () => scrollToGenerator('single') },
    { label: 'Bulk Export', href: '#bulk-mode-info', action: () => scrollToGenerator('bulk') },
    { label: 'Download App', href: '#pwa-info', action: () => scrollTo('pwa-info') },
    { label: 'Pro Suite', href: '#pricing', action: () => scrollTo('pricing') },
    { label: 'Support FAQ', href: '#faq' },
  ];

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToGenerator('single')}>
            <div className="w-10 h-10 md:w-11 md:h-11 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <CustomScannerLogo className="text-primary-foreground w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-headline font-bold tracking-tight text-white leading-none">
                QR <span className="text-primary">Canvas</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 leading-none mt-1">Studio Pro</span>
            </div>
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
                className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-primary transition-all duration-300 relative group"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
             <button 
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-5 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
             >
              <Scan className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="hidden xs:inline">Scan Tool</span>
             </button>
             <button 
                onClick={() => scrollTo('pricing')}
                className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/20"
             >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upgrade Pro</span>
             </button>

             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10 p-0 overflow-hidden">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <CustomScannerLogo className="text-primary-foreground w-5 h-5" />
                        </div>
                        <SheetTitle className="text-white font-headline font-bold text-xl">QR Canvas Studio</SheetTitle>
                      </div>
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
                          className="text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-primary"
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
        <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 border-primary/20">
            <Sparkles className="w-3.5 h-3.5 fill-primary/30" />
            <span>DOWNLOAD THE MOBILE APP SUITE</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-headline font-black mb-10 leading-[1.1] md:leading-[1] tracking-tight text-white">
            Professional Branded <br />
            <span className="text-primary italic">QR App & Bulk Studio</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Install QR Canvas as a <span className="text-white font-medium">Native Mobile App</span>. Zero download from stores—simply add to your home screen for instant professional generation.
          </p>
        </div>

        <NativeAdBanner />

        <div id="generator" className="relative z-10 scroll-mt-24">
          <QrGeneratorContainer activeMode={generatorMode} onModeChange={setGeneratorMode} />
        </div>
      </section>

      {/* MOBILE APP (PWA) INFO SECTION */}
      <section id="pwa-info" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative overflow-hidden scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/20 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative glass-card rounded-[3rem] p-4 border-white/10 shadow-2xl overflow-hidden aspect-[9/16] max-w-[320px] mx-auto animate-float">
               <div className="h-full w-full bg-[#060907] rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40">
                   <CustomScannerLogo className="text-primary-foreground w-12 h-12" />
                 </div>
                 <div className="space-y-2">
                    <p className="font-headline font-bold text-xl text-white">QR Canvas</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Studio Edition</p>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary animate-pulse" />
                 </div>
                 <p className="text-[11px] text-white/40 leading-relaxed uppercase font-bold tracking-tighter">
                   Stand-alone Studio Ready
                 </p>
               </div>
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <Smartphone className="w-4 h-4" /> Professional PWA Suite
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight">
                Install the Studio <br /><span className="text-primary">Directly to Home Screen</span>
              </h2>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                Experience full-screen branded generation without the browser interface. Our PWA technology delivers 100% of the studio features in a fast, standalone mobile app.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <AppWindow className="w-6 h-6 text-primary" />
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">App-Like Interface</h4>
                <p className="text-xs text-white/40 leading-relaxed">No address bar. Just your premium QR studio tools optimized for vertical mobile screens.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <Share className="w-6 h-6 text-primary" />
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">One-Click Install</h4>
                <p className="text-xs text-white/40 leading-relaxed">Open in Safari or Chrome, tap Share, and select "Add to Home Screen" to download.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
               <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-4">How to Download</p>
               <div className="space-y-3">
                 <div className="flex items-center gap-3 text-xs text-white/70">
                   <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">1</span>
                   Open this site in your mobile browser
                 </div>
                 <div className="flex items-center gap-3 text-xs text-white/70">
                   <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">2</span>
                   Tap <span className="text-primary font-bold">"Share"</span> (iOS) or <span className="text-primary font-bold">"Menu"</span> (Android)
                 </div>
                 <div className="flex items-center gap-3 text-xs text-white/70">
                   <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">3</span>
                   Select <span className="text-primary font-bold">"Add to Home Screen"</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative scroll-mt-24">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Professional Generation Plans</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Independent creators and global agencies use our professional QR suite for high-end marketing campaigns.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="glass-card p-10 rounded-[3rem] border-white/5">
            <h3 className="text-2xl font-headline font-bold text-white mb-2">Basic Creator</h3>
            <div className="flex items-end gap-2 mb-10"><span className="text-5xl font-headline font-black text-white">$0</span></div>
            <ul className="space-y-6 mb-12">
              <li className="flex items-center gap-3 text-white/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Static Branded QR</li>
              <li className="flex items-center gap-3 text-white/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Bulk Mode (10 assets)</li>
            </ul>
          </div>
          <div className="p-[2px] rounded-[3rem] bg-primary/50 shadow-2xl">
            <div className="bg-[#060907] p-10 rounded-[3rem] h-full flex flex-col">
              <h3 className="text-2xl font-headline font-bold text-white mb-2">Agency Pro</h3>
              <div className="flex items-end gap-2 mb-10"><span className="text-5xl font-headline font-black text-white">$19</span></div>
              <ul className="space-y-6 mb-12 flex-1">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Bulk Processing</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> Master SVG Vector Exports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
               <CustomScannerLogo className="text-primary w-6 h-6" />
               <span className="font-headline font-bold text-xl text-white">QRCanvas Studio</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              &copy; <CopyrightYear /> QR CANVAS STUDIO. ALL RIGHTS RESERVED. MOBILE PWA EDITION.
            </p>
          </div>
        </div>
      </footer>
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <Toaster />
    </main>
  );
}
