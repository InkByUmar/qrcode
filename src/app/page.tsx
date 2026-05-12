
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
  Maximize
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
    { label: 'Branded QR', href: '#features', action: () => scrollToGenerator('single') },
    { label: 'Pro Suite', href: '#pricing', action: () => scrollTo('pricing') },
    { label: 'SEO Guide', href: '#guide' },
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
          
          {/* DESKTOP NAV */}
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
             <button 
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-5 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                aria-label="Open QR Scanner Tool"
             >
              <Scan className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="hidden xs:inline">Scan Tool</span>
             </button>
             <button 
                onClick={() => scrollTo('pricing')}
                className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                title="Upgrade to Pro Plan"
             >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upgrade Pro</span>
             </button>

             {/* MOBILE NAV TOGGLE */}
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary transition-colors shrink-0" aria-label="Toggle Navigation Menu">
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
                          className="text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-primary flex items-center justify-between group"
                        >
                          {item.label}
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                        </a>
                      ))}
                    </nav>

                    <div className="p-6 border-t border-white/5 space-y-4">
                      <button 
                        onClick={() => {
                          setIsScannerOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                      >
                        <Scan className="w-4 h-4 text-primary" />
                        Live QR Scanner
                      </button>
                      <button 
                        onClick={() => {
                          scrollTo('pricing');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-xs tracking-widest uppercase shadow-xl"
                      >
                        Get Pro Access
                      </button>
                    </div>
                  </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-20 md:py-32 relative">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 animate-in fade-in zoom-in duration-1000 border-primary/20">
            <Sparkles className="w-3.5 h-3.5 fill-primary/30" />
            <span>THE INDUSTRY STANDARD FOR BRANDED QR CODES</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-headline font-black mb-10 leading-[1.1] md:leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
            Professional Branded <br className="hidden md:block" />
            <span className="text-primary italic underline decoration-white/20 underline-offset-8">QR Code Generator & Bulk Tool</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            The world's most powerful <span className="text-white font-medium">Image-Integrated QR Studio</span>. Create high-resolution custom codes with logos, background visuals, and automated batch processing.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> High-Res PNG & SVG
            </div>
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> AI Reliability Guard
            </div>
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Batch Processing
            </div>
          </div>
        </div>

        {/* TOP AD PLACEMENT */}
        <NativeAdBanner />

        <div id="generator" className="relative z-10 scroll-mt-24">
          <QrGeneratorContainer activeMode={generatorMode} onModeChange={setGeneratorMode} />
        </div>
      </section>

      {/* MID-PAGE AD PLACEMENT */}
      <NativeAdBanner />

      {/* PRICING SECTION */}
      <section id="pricing" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative scroll-mt-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-6 border-primary/20">
            <Crown className="w-4 h-4 fill-primary/20" />
            <span>MARKETING ASSETS FOR ENTERPRISE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Professional Generation Plans</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            From independent creators to global marketing agencies, our professional QR suite scales with your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10">
          {/* FREE PLAN */}
          <div className="glass-card p-10 md:p-14 rounded-[3rem] border-white/5 hover:border-white/10 transition-all duration-500 group">
            <div className="mb-10">
              <h3 className="text-2xl font-headline font-bold text-white mb-2">Basic Creator</h3>
              <p className="text-white/40 text-xs font-black uppercase tracking-widest">Essential tools for single assets</p>
            </div>
            <div className="flex items-end gap-2 mb-10">
              <span className="text-5xl font-headline font-black text-white">$0</span>
              <span className="text-white/40 text-sm mb-2 uppercase font-bold tracking-widest">/ Always Free</span>
            </div>
            <ul className="space-y-6 mb-12">
              <PricingItem text="Static Branded QR Generation" active />
              <PricingItem text="Custom Logo Embedding" active />
              <PricingItem text="Standard Bulk Mode (10 items)" active />
              <PricingItem text="Standard PNG Export" active />
              <PricingItem text="Advanced Analytics" active={false} />
              <PricingItem text="Vector SVG Support" active={false} />
            </ul>
            <button 
              onClick={() => scrollToGenerator('single')}
              className="w-full py-5 rounded-2xl border border-white/10 text-white/70 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Start Free Generation
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="p-[2px] rounded-[3rem] bg-gradient-to-br from-primary via-primary/50 to-transparent shadow-2xl shadow-primary/20 transform lg:scale-105">
            <div className="bg-[#060907] p-10 md:p-14 rounded-[3rem] h-full flex flex-col relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="mb-10 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-headline font-bold text-white">Agency Pro</h3>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/30">Most Popular</span>
                </div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">For brands & marketing experts</p>
              </div>
              <div className="flex items-end gap-2 mb-10 relative z-10">
                <span className="text-5xl font-headline font-black text-white">$19</span>
                <span className="text-white/40 text-sm mb-2 uppercase font-bold tracking-widest">/ Month</span>
              </div>
              <ul className="space-y-6 mb-12 relative z-10 flex-1">
                <PricingItem text="Everything in Creator" active />
                <PricingItem text="Unlimited Bulk Asset Processing" active icon={<RefreshCcw className="w-4 h-4 text-primary" />} />
                <PricingItem text="Master Vector SVG Exports" active icon={<Maximize className="w-4 h-4 text-primary" />} />
                <PricingItem text="White-Label Export Pipeline" active icon={<ShieldCheck className="w-4 h-4 text-primary" />} />
                <PricingItem text="Real-time Scannability Guard" active icon={<BarChart3 className="w-4 h-4 text-primary" />} />
                <PricingItem text="Priority Render Priority" active icon={<Zap className="w-4 h-4 text-primary" />} />
              </ul>
              <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all relative z-10">
                Unlock Agency Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE SECTION */}
      <section id="guide" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative scroll-mt-24">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black tracking-[0.3em] text-primary mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            <span>QR MARKETING RESOURCE HUB</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Master Branded QR Engagement</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Discover technical insights on using high-density QR codes and image-integrated patterns to maximize your marketing campaign ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
          <BlogCard 
            step="01"
            title="Image QR Marketing"
            description="Branded QR codes with background visuals see up to 40% higher scan rates. Learn how to optimize contrast for 100% reliability."
            icon={<ImageIcon className="w-5 h-5" />}
          />
          <BlogCard 
            step="02"
            title="Density Guard Tech"
            description="Our advanced error correction engine (Level H) ensures your QR patterns remain functional even with complex logo overlays."
            icon={<Shield className="w-5 h-5" />}
          />
          <BlogCard 
            step="03"
            title="Bulk Automation"
            description="Automate the generation of hundreds of branded codes in seconds. Perfect for inventory tracking and large retail campaigns."
            icon={<Layers className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* BULK INFO SECTION */}
      <section id="bulk-mode-info" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative overflow-hidden scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="space-y-8">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/30">
              <Layers className="w-7 h-7 md:w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight">
              Enterprise QR Batch <br/><span className="text-primary">Production Studio</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Generate hundreds of professional, high-resolution QR codes in a single organized bundle. Designed for retail, agencies, and enterprise logistics.
            </p>
            <ul className="space-y-4">
              {[
                "Bulk brand style injection",
                "High-resolution 1024px PNG exports",
                "Automated asset naming conventions",
                "Real-time scannability validation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] md:text-sm font-medium text-white/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => scrollToGenerator('bulk')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
            >
              Launch Bulk Generator <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
             <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/10 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.2)] animate-float">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/60" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="h-3 md:h-4 w-3/4 bg-white/10 rounded-full" />
                  <div className="h-3 md:h-4 w-1/2 bg-white/10 rounded-full" />
                  <div className="grid grid-cols-3 gap-3 md:gap-4 py-6 md:py-8">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="aspect-square bg-primary/10 rounded-xl border border-primary/30 flex items-center justify-center">
                        <QrIcon className="w-5 h-5 md:w-6 md:h-6 text-primary/50" />
                      </div>
                    ))}
                  </div>
                  <div className="h-10 md:h-12 w-full bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-[10px] md:text-xs tracking-widest shadow-xl">
                    BATCH EXPORTING ASSETS...
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PRE-FAQ AD PLACEMENT */}
      <NativeAdBanner />

      {/* FEATURES SECTION */}
      <section id="features" className="container mx-auto px-6 py-32 relative overflow-hidden bg-white/[0.01] scroll-mt-24">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 text-white">Professional Studio Features</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Enterprise-grade QR tools for free. From <span className="text-white font-bold">Image QR styling</span> to professional scanning utilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Real-Time Visual Editor"
            description="Our live rendering studio updates your design instantly. Get visual feedback on colors, module shapes, and logo positioning."
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-primary" />}
            title="Branded Image QR"
            description="Create unique QR codes with full-image backgrounds. Perfect for high-end marketing materials and billboard designs."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="High Reliability Guard"
            description="Automatic Level H (High Density) error correction ensures your artistic codes scan perfectly across all devices."
          />
          <FeatureCard 
            icon={<Scan className="w-6 h-6 text-primary" />}
            title="Integrated QR Scanner"
            description="A professional-grade live scanner built into your dashboard. Decode any QR code or barcode instantly from your browser."
          />
          <FeatureCard 
            icon={<Download className="w-6 h-6 text-primary" />}
            title="Vector SVG Exports"
            description="Download high-resolution 1024px PNG or vector SVG formats for print, digital screens, and large-scale marketing."
          />
          <FeatureCard 
            icon={<LayoutGrid className="w-6 h-6 text-primary" />}
            title="Multi-Type Support"
            description="Instantly generate pre-configured templates for WhatsApp, YouTube, WiFi, Business Cards, and more."
          />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="container mx-auto px-6 py-32 max-w-4xl scroll-mt-24">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Professional QR FAQ</h2>
          <p className="text-white/60 mt-4 italic text-sm md:text-base">Technical insights for the QR Canvas Studio</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary transition-all py-6 text-[15px] md:text-base">What is an Image QR code?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              An Image QR code integrates a visual background directly into the QR pattern. Our studio uses proprietary Level H error correction to ensure these artistic codes scan perfectly even with complex visuals.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary py-6 text-[15px] md:text-base">How does the Integrated Scanner work?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              Our Studio Scanner uses your device's camera to decode QR codes in real-time. It supports multi-format detection and works entirely within the browser for maximum data privacy and security.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary py-6 text-[15px] md:text-base">Is Bulk Mode free for commercial projects?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              Yes, our free tier supports bulk generation for up to 10 assets at once for any commercial project. Enterprise users can upgrade to the Professional plan for unlimited batch processing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-24">
            <div className="lg:col-span-1 space-y-6 md:space-y-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary border border-primary/30 shadow-lg">
                  <CustomScannerLogo className="w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tighter text-white">QRCanvas</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                The global standard for <span className="text-white font-medium">Professional Branded QR Code Generation</span>. Engineered for agencies, brands, and marketers.
              </p>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
               <FooterCol title="QR Solutions" links={['Image QR Generator', 'Bulk Processor', 'Live Scan Tool', 'Logo QR Studio']} />
               <FooterCol title="Studio Resources" links={['Marketing Guide', 'API Documentation', 'Scannability Tips', 'Design Standards']} />
               <FooterCol title="Technical" links={['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Security Protocol']} />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60 text-center md:text-left">
              &copy; <CopyrightYear /> QR CANVAS STUDIO. ALL RIGHTS RESERVED. PROFESSIONAL EDITION.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              <span>Optimized for Search Engines</span>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/30" />
              <span>v6.5.0 Enterprise Build</span>
            </div>
          </div>
        </div>
      </footer>
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <Toaster />
    </main>
  );
}

function PricingItem({ text, active, icon }: { text: string; active: boolean; icon?: React.ReactNode }) {
  return (
    <li className={cn("flex items-center gap-3 text-xs md:text-sm transition-opacity", active ? "text-white" : "text-white/20")}>
      {icon ? icon : (
        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", active ? "bg-primary/20 text-primary" : "bg-white/5 text-white/10")}>
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
      )}
      {text}
    </li>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group glass-card p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/10 transition-all duration-700 border-white/[0.1] hover:border-primary/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 mb-8 md:mb-10 shadow-2xl ring-1 ring-primary/40">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-headline font-bold mb-4 md:mb-5 text-white group-hover:text-primary transition-colors duration-500">{title}</h3>
      <p className="text-white/70 leading-relaxed font-light text-sm group-hover:text-white transition-colors duration-500">{description}</p>
    </div>
  );
}

function BlogCard({ step, title, description, icon }: { step: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
      <div className="flex justify-between items-start mb-8 md:mb-10">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl ring-1 ring-primary/40">
          {icon}
        </div>
        <span className="text-3xl md:text-4xl font-headline font-black text-white/10 group-hover:text-primary/20 transition-colors duration-500">{step}</span>
      </div>
      <h3 className="text-lg md:text-xl font-headline font-bold text-white mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-xs md:text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors">{description}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6 md:space-y-8 text-center md:text-left">
      <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-white/70">{title}</h4>
      <ul className="space-y-4 md:space-y-5">
        {links.map(l => (
          <li key={l}><a href="#" className="text-xs md:text-sm text-white/60 hover:text-primary transition-all duration-300 font-light hover:pl-2">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
