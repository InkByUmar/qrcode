
"use client"

import React, { useState } from 'react';
import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { QrScannerModal } from '@/components/qr-canvas/qr-scanner-modal';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
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
  Share,
  FileCode,
  ShieldAlert,
  Gavel,
  History
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

/**
 * Official 'QR' Studio Logo
 * This matches the generated PWA icons exactly for total brand consistency.
 */
const CustomScannerLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    aria-hidden="true"
    fill="currentColor"
  >
    {/* Finder Pattern: Top Left */}
    <path d="M0 0h35v35H0V0zm28 28V7H7v21h21zM11 11h13v13h-13z" />
    {/* Finder Pattern: Top Right */}
    <path d="M65 0h35v35H65V0zm28 28V7h-21v21h21zM76 11h13v13H76z" />
    {/* Finder Pattern: Bottom Left */}
    <path d="M0 65h35v35H0V65zm28 28V72H7v21h21zM11 76h13v13h-13z" />
    
    {/* Integrated "QR" Typography in Bottom Right */}
    <text 
      x="100" 
      y="98" 
      textAnchor="end" 
      fontSize="52" 
      fontWeight="950" 
      letterSpacing="-4"
      className="font-headline"
    >
      QR
    </text>
  </svg>
);

const NativeAdBanner = () => (
  <div className="container mx-auto px-6 py-12 flex justify-center">
    <div 
      id="container-8a0d2340102217c81755459d2df8b6d0" 
      className="w-full max-w-5xl min-h-[100px] bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden"
    >
      {/* Adsterra Native Banner Placeholder */}
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
    { label: 'Studio', href: '#generator', action: () => scrollToGenerator('single') },
    { label: 'How it Works', href: '#how-to-use', action: () => scrollTo('how-to-use') },
    { label: 'Bulk Export', href: '#bulk-info', action: () => scrollToGenerator('bulk') },
    { label: 'FAQ', href: '#faq', action: () => scrollTo('faq') },
    { label: 'Pro Suite', href: '#pricing', action: () => scrollTo('pricing') },
  ];

  const faqs = [
    {
      q: "Are the QR codes generated here permanent?",
      a: "Yes, our QR codes are static, meaning they encode data directly into the pattern and will never expire. They will work as long as the content (like a URL) is active."
    },
    {
      q: "Can I add my business logo for free?",
      a: "Absolutely. You can upload any logo in PNG or JPG format. Our engine automatically adjusts scannability settings to ensure your code works perfectly with branding."
    },
    {
      q: "How many QR codes can I generate in Bulk Mode?",
      a: "Our free tier allows up to 50 QR codes per batch. Agency Pro users have unlimited batch processing and higher resolution master exports."
    },
    {
      q: "What file formats do you support for export?",
      a: "We provide high-resolution PNG as standard. SVG Vector format is available for professionals who need infinitely scalable assets for large-scale print."
    },
    {
      q: "Is my data stored on your servers?",
      a: "No. We prioritize privacy. All QR generation happens locally in your browser, and we do not store the data you input into your QR codes."
    }
  ];

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToGenerator('single')}>
            <div className="w-10 h-10 md:w-11 md:h-11 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <CustomScannerLogo className="w-6 h-6 md:w-7 md:h-7 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-headline font-bold tracking-tight text-white leading-none uppercase">
                QR <span className="text-primary">Canvas</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 leading-none mt-1">Premium Studio</span>
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
                <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10 p-0 overflow-hidden text-white">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <CustomScannerLogo className="w-5 h-5 text-black" />
                        </div>
                        <SheetTitle className="text-white font-headline font-bold text-xl text-left uppercase">QR Canvas</SheetTitle>
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
            <span>ENTERPRISE-GRADE QR GENERATION SUITE</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-headline font-black mb-10 leading-[1.1] md:leading-[1] tracking-tight text-white">
            Branded Artistic <br />
            <span className="text-primary italic">QR Studio & Bulk Engine</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Professional high-resolution QR codes for marketing. Support for <span className="text-white font-medium">logos</span>, custom backgrounds, and <span className="text-white font-medium">bulk processing</span>.
          </p>
        </div>

        <NativeAdBanner />

        <div id="generator" className="relative z-10 scroll-mt-24">
          <QrGeneratorContainer activeMode={generatorMode} onModeChange={setGeneratorMode} />
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <section id="how-to-use" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">How to Create Professional QR Codes</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Follow these four simple steps to generate high-resolution, branded QR assets for your campaigns.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { step: '01', icon: LayoutGrid, title: 'Choose Content', desc: 'Select from URL, WiFi, vCard, or WhatsApp templates.' },
            { step: '02', icon: Palette, title: 'Style Pattern', desc: 'Customize dot shapes and corner styles for a unique look.' },
            { step: '03', icon: ImageIcon, title: 'Add Branding', desc: 'Upload your brand logo and set a custom background image.' },
            { step: '04', icon: Download, title: 'Export Asset', desc: 'Download high-res PNG or professional SVG vector files.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 relative group hover:border-primary/20 transition-all">
              <div className="absolute top-6 right-6 text-2xl font-black text-white/10 group-hover:text-primary/20 transition-all">{item.step}</div>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-headline font-bold text-white mb-4">{item.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                 <CustomScannerLogo className="w-5 h-5 text-black" />
               </div>
               <span className="font-headline font-bold text-xl text-white uppercase tracking-tighter">QRCanvas Studio</span>
            </div>
            <div className="flex items-center gap-8">
               <a href="#how-to-use" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">How it Works</a>
               <a href="#faq" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">FAQ</a>
               <a href="#policies" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Privacy</a>
               <a href="#policies" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Terms</a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
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
