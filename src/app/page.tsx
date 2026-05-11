"use client"

import React, { useState } from 'react';
import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { QrScannerModal } from '@/components/qr-canvas/qr-scanner-modal';
import { Toaster } from '@/components/ui/toaster';
import { 
  QrCode, 
  Shield, 
  Zap, 
  Palette, 
  Layers, 
  Smartphone, 
  Sparkles, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Download,
  FileJson,
  LayoutGrid,
  HelpCircle,
  BookOpen,
  MousePointer2,
  Settings,
  Image as ImageIcon,
  QrCode as QrIcon,
  Menu,
  X,
  ExternalLink,
  Crown,
  BarChart3,
  RefreshCcw,
  ShieldCheck,
  Scan
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
    { label: 'Generator', href: '#generator', action: () => scrollToGenerator('single') },
    { label: 'Bulk Mode', href: '#bulk-mode-info', action: () => scrollToGenerator('bulk') },
    { label: 'Pro Features', href: '#pricing', action: () => scrollTo('pricing') },
    { label: 'Guide', href: '#guide' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToGenerator('single')}>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <QrCode className="text-primary-foreground w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-headline font-bold tracking-tight text-white leading-none">
                QR <span className="text-primary">Canvas</span>
              </span>
            </div>
          </div>
          
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10">
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

          <div className="flex items-center gap-3 md:gap-4">
             <button 
                onClick={() => setIsScannerOpen(true)}
                className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
             >
              <Scan className="w-4 h-4 text-primary" />
              Scan QR
             </button>
             <button 
                onClick={() => scrollTo('pricing')}
                className="hidden sm:block text-[10px] font-black uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
             >
              Go Pro
             </button>

             {/* MOBILE NAV TOGGLE */}
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary transition-colors">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10 p-0 overflow-hidden">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <QrCode className="text-primary-foreground w-4 h-4" />
                        </div>
                        <SheetTitle className="text-white font-headline font-bold text-xl">QR Canvas</SheetTitle>
                      </div>
                    </SheetHeader>
                    
                    <nav className="flex-1 p-6 flex flex-col gap-8">
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
                          className="text-sm font-black uppercase tracking-[0.2em] text-white/60 hover:text-primary flex items-center justify-between group"
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
                        onClick={() => scrollTo('pricing')}
                        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-xs tracking-widest uppercase shadow-xl"
                      >
                        Go Pro
                      </button>
                      <p className="text-[10px] text-center text-white/30 uppercase font-bold tracking-widest">
                        v6.2.0 Enterprise SEO
                      </p>
                    </div>
                  </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </header>

      {/* HERO SECTION - SEO H1 */}
      <section className="container mx-auto px-6 py-20 md:py-32 relative">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 animate-in fade-in zoom-in duration-1000 border-primary/20">
            <Sparkles className="w-3.5 h-3.5 fill-primary/30" />
            <span>THE NEXT GENERATION OF QR BRANDING</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-headline font-black mb-10 leading-[1.1] md:leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
            Free QR Code Generator <br className="hidden md:block" />
            <span className="text-primary italic underline decoration-white/20 underline-offset-8">with Logo & Bulk Support</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            The world's most advanced <span className="text-white font-medium">Bulk QR Maker</span>. Create professional codes with brand logos, custom backgrounds, and batch processing for business marketing.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Instant Bulk Mode
            </div>
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Branded Templates
            </div>
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Lifetime Free
            </div>
          </div>
        </div>

        <div id="generator" className="relative z-10 scroll-mt-24">
          <QrGeneratorContainer activeMode={generatorMode} onModeChange={setGeneratorMode} />
        </div>
      </section>

      {/* GO PRO SECTION - NEW */}
      <section id="pricing" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative scroll-mt-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-6 border-primary/20">
            <Crown className="w-4 h-4 fill-primary/20" />
            <span>ELEVATE YOUR BRAND IDENTITY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Unlock Professional QR Tools</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Move beyond static codes. Our Pro Suite gives marketing agencies and brands the power of dynamic content and deep analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10">
          {/* FREE PLAN */}
          <div className="glass-card p-10 md:p-14 rounded-[3rem] border-white/5 hover:border-white/10 transition-all duration-500 group">
            <div className="mb-10">
              <h3 className="text-2xl font-headline font-bold text-white mb-2">Essential</h3>
              <p className="text-white/40 text-xs font-black uppercase tracking-widest">Always free for creators</p>
            </div>
            <div className="flex items-end gap-2 mb-10">
              <span className="text-5xl font-headline font-black text-white">$0</span>
              <span className="text-white/40 text-sm mb-2 uppercase font-bold tracking-widest">/ Lifetime</span>
            </div>
            <ul className="space-y-6 mb-12">
              <PricingItem text="Static QR Generation" active />
              <PricingItem text="Custom Colors & Shapes" active />
              <PricingItem text="Logo Upload Support" active />
              <PricingItem text="Standard Bulk Mode (100 items)" active />
              <PricingItem text="Editable Dynamic Links" active={false} />
              <PricingItem text="Advanced Scan Analytics" active={false} />
            </ul>
            <button 
              onClick={() => scrollToGenerator('single')}
              className="w-full py-5 rounded-2xl border border-white/10 text-white/70 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Current Plan
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="p-[2px] rounded-[3rem] bg-gradient-to-br from-primary via-primary/50 to-transparent shadow-2xl shadow-primary/20 transform lg:scale-105">
            <div className="bg-[#060907] p-10 md:p-14 rounded-[3rem] h-full flex flex-col relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="mb-10 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-headline font-bold text-white">Professional</h3>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/30">Most Popular</span>
                </div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">For serious brands & agencies</p>
              </div>
              <div className="flex items-end gap-2 mb-10 relative z-10">
                <span className="text-5xl font-headline font-black text-white">$19</span>
                <span className="text-white/40 text-sm mb-2 uppercase font-bold tracking-widest">/ Month</span>
              </div>
              <ul className="space-y-6 mb-12 relative z-10 flex-1">
                <PricingItem text="Everything in Essential" active />
                <PricingItem text="Unlimited Bulk Processing" active icon={<RefreshCcw className="w-4 h-4 text-primary" />} />
                <PricingItem text="Dynamic Editable QR Codes" active icon={<RefreshCcw className="w-4 h-4 text-primary" />} />
                <PricingItem text="White-Label (No QRCanvas Branding)" active icon={<ShieldCheck className="w-4 h-4 text-primary" />} />
                <PricingItem text="Real-time Scan Analytics & Geos" active icon={<BarChart3 className="w-4 h-4 text-primary" />} />
                <PricingItem text="Priority Cloud Rendering" active icon={<Zap className="w-4 h-4 text-primary" />} />
              </ul>
              <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all relative z-10">
                Start Pro Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE & BLOG SECTION - SEO H2 */}
      <section id="guide" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black tracking-[0.3em] text-primary mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            <span>EXPERT RESOURCE CENTER</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Mastering the Art of QR Branding</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            From technical setup to marketing strategy, learn how to leverage QR Canvas for maximum engagement and brand growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
          <BlogCard 
            step="01"
            title="Design with Purpose"
            description="Choose the right QR type for your goal. Use vCards for networking, WiFi for hospitality, and URLs for marketing. Our templates provide the perfect foundation for any use case."
            icon={<Settings className="w-5 h-5" />}
          />
          <BlogCard 
            step="02"
            title="Enhance Scannability"
            description="High contrast is key. When using background images, use our opacity slider to ensure the QR dots remain clear. We automatically set Level H error correction to protect your brand assets."
            icon={<ImageIcon className="w-5 h-5" />}
          />
          <BlogCard 
            step="03"
            title="Scale with Bulk Mode"
            description="For agencies and enterprise users, use Batch Processing. Paste a list of unique destination URLs and generate branded codes in one organized bundle with synchronized naming."
            icon={<Layers className="w-5 h-5" />}
          />
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-white/10 bg-white/[0.02] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-headline font-bold text-white">Why Your Brand Needs Custom QR Codes</h3>
              <div className="space-y-6">
                <p className="text-white/70 leading-relaxed text-sm md:text-base">
                  Generic black-and-white QR codes are often ignored by modern consumers. Customizing your codes with a logo and brand colors can increase scan rates by up to <strong>40%</strong>. It builds trust by showing users exactly who they are interacting with.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="p-4 md:p-5 rounded-2xl bg-white/10 border border-white/20">
                    <span className="text-xl md:text-2xl font-black text-primary block mb-1">94M+</span>
                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-white/60 tracking-widest">Active QR Users</span>
                  </div>
                  <div className="p-4 md:p-5 rounded-2xl bg-white/10 border border-white/20">
                    <span className="text-xl md:text-2xl font-black text-primary block mb-1">30%</span>
                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-white/60 tracking-widest">Scan Increase</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-lg md:text-xl font-headline font-bold text-white flex items-center gap-3">
                <Star className="w-5 h-5 text-primary" /> Pro Tips for 2025
              </h4>
              <ul className="space-y-4 md:space-y-5">
                <li className="flex gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-[13px] md:text-sm text-white/70 leading-relaxed"><strong className="text-white">Avoid Complexity:</strong> Keep your URLs short or use our AI Refiner to ensure the QR grid stays clean and fast-scanning.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-[13px] md:text-sm text-white/70 leading-relaxed"><strong className="text-white">Print Quality:</strong> Always use the SVG export for large format prints like banners or signage to ensure zero pixelation at any size.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-[13px] md:text-sm text-white/70 leading-relaxed"><strong className="text-white">Mobile Context:</strong> Test your codes in various lighting conditions to guarantee a 100% success rate for your customers.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BULK QR EXPLANATION - SEO H2 */}
      <section id="bulk-mode-info" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative overflow-hidden scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="space-y-8">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/30">
              <Layers className="w-7 h-7 md:w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight">
              Powerful Batch Processing for <br/><span className="text-primary">Enterprise QR Management</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Why generate codes one by one? Our <strong>Bulk QR Code Generator</strong> allows you to paste a list of URLs or text data and generate hundreds of branded assets in seconds.
            </p>
            <ul className="space-y-4">
              {[
                "Branded style injection across entire batches",
                "High-resolution PNG export in a single ZIP file",
                "Auto-naming assets based on input data",
                "Dynamic scannability checks for every code"
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
              Try Bulk Mode Now <ArrowRight className="w-4 h-4" />
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
                    BATCH EXPORTING...
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - SEO H2 */}
      <section id="features" className="container mx-auto px-6 py-32 relative overflow-hidden bg-white/[0.01] scroll-mt-24">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 text-white">Why Choose Our Professional QR Maker?</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We offer enterprise-grade customization tools for free. From <span className="text-white font-bold">QR codes with background images</span> to custom branding with logos and vector exports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Real-Time Visual Engine"
            description="Our live rendering engine updates your design as you type. Get instant feedback on colors, shapes, and logo placement."
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-primary" />}
            title="Premium Visual Branding"
            description="Upload center logos and full-canvas background images with precision opacity controls for a truly unique brand asset."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Reliable Error Correction"
            description="Automatic Level H (High Density) Error Correction ensures your branded codes scan perfectly even with heavy visuals."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-primary" />}
            title="Multilingual & Global"
            description="Supports all global characters and specific data types like WiFi, WhatsApp, vCard, and Payment Links."
          />
          <FeatureCard 
            icon={<Download className="w-6 h-6 text-primary" />}
            title="High-Resolution Exports"
            description="Download in print-ready SVG vector format or high-resolution 1024px PNG for billboards and business cards."
          />
          <FeatureCard 
            icon={<LayoutGrid className="w-6 h-6 text-primary" />}
            title="Smart Templates"
            description="Instantly apply pre-configured templates for Restaurants, WiFi, Instagram, and more to save time."
          />
        </div>
      </section>

      {/* FAQ SECTION - SEO H2 & SCHEMA */}
      <section id="faq" className="container mx-auto px-6 py-32 max-w-4xl scroll-mt-24">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-white/60 mt-4 italic text-sm md:text-base">Everything you need to know about our professional QR engine</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary transition-all py-6 text-[15px] md:text-base">Is this QR code generator truly free?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              Yes, QRCanvas is 100% free for both personal and commercial use. You can generate unlimited single or bulk QR codes with no account required and no hidden fees.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary py-6 text-[15px] md:text-base">How do I add my own logo to a QR code?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              Simply go to the "Brand Identity" section in our generator, upload your image file (PNG, JPG, or SVG), and use the scaling slider to adjust the center logo size.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary py-6 text-[15px] md:text-base">Can I use a background image for my QR code?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              Absolutely! Our tool allows you to upload any image as a full-canvas background. We recommend using the "Opacity" slider to ensure there is enough contrast for scanners to read the code.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary py-6 text-[15px] md:text-base">What is Bulk QR Mode?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              Bulk Mode allows you to generate multiple QR codes at once. Just paste a list of URLs or text strings, and the engine will apply your branding to all of them and bundle them into a ZIP file for easy distribution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="glass-card border-white/10 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary py-6 text-[15px] md:text-base">Do these QR codes expire?</AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-sm md:text-[15px]">
              No, our QR codes are static, meaning the data is encoded directly into the pattern. They will never expire and will work as long as the underlying link or data remains active.
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
                  <QrIcon className="w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tighter text-white">QRCanvas</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Setting the global standard for <span className="text-white font-medium">Professional QR Code Generators</span>. Built with cutting-edge technology for creators, marketing agencies, and global enterprise brands.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer shadow-md">
                    <Star className="w-3 h-3 text-primary" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
               <FooterCol title="Solutions" links={['Bulk Generator', 'Branded Codes', 'Logo Engine', 'Batch Export']} />
               <FooterCol title="Resources" links={['SEO Guide', 'API Reference', 'Brand Assets', 'Security Docs']} />
               <FooterCol title="Legal" links={['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Disclaimer']} />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60 text-center md:text-left">
              &copy; <CopyrightYear /> QR CANVAS PRO SUITE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              <span>Optimized for Global Brand Excellence</span>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/30" />
              <span>v6.2.0 Enterprise SEO Edition</span>
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
      <div className="mt-8 md:mt-10 flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-700">
        EXPLORE FEATURE <ArrowRight className="w-3 h-3" />
      </div>
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
      <div className="mt-6 md:mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all duration-500">
        Read Full Article <ArrowRight className="w-3 h-3" />
      </div>
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
