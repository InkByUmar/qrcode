
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
                <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10 p-0 overflow-hidden text-white">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <CustomScannerLogo className="text-primary-foreground w-5 h-5" />
                        </div>
                        <SheetTitle className="text-white font-headline font-bold text-xl text-left">QR Canvas Studio</SheetTitle>
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
                Install the QR Studio <br /><span className="text-primary">Directly to Your Home Screen</span>
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
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Common Questions</h2>
            <p className="text-white/50 text-base md:text-lg">Everything you need to know about professional QR generation and branding.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/5 bg-white/[0.02] rounded-2xl px-6 border overflow-hidden">
                <AccordionTrigger className="text-white hover:text-primary font-bold text-left py-6 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
            <div className="flex items-end gap-2 mb-10"><span className="text-5xl font-headline font-black text-white">$0</span><span className="text-white/40 font-bold mb-2">/FREE</span></div>
            <ul className="space-y-6 mb-12">
              <li className="flex items-center gap-3 text-white/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Static Branded QR</li>
              <li className="flex items-center gap-3 text-white/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Batch Processing (50 items)</li>
              <li className="flex items-center gap-3 text-white/70"><CheckCircle2 className="w-4 h-4 text-primary" /> Custom Logos & Backgrounds</li>
              <li className="flex items-center gap-3 text-white/70"><CheckCircle2 className="w-4 h-4 text-primary" /> High-Res PNG Exports</li>
            </ul>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-white font-bold" onClick={() => scrollTo('generator')}>Get Started Free</Button>
          </div>
          <div className="p-[2px] rounded-[3rem] bg-primary/50 shadow-2xl">
            <div className="bg-[#060907] p-10 rounded-[3rem] h-full flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-headline font-bold text-white">Agency Pro</h3>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30">Most Popular</span>
              </div>
              <div className="flex items-end gap-2 mb-10"><span className="text-5xl font-headline font-black text-white">$19</span><span className="text-white/40 font-bold mb-2">/ONE-TIME</span></div>
              <ul className="space-y-6 mb-12 flex-1">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Bulk Processing</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> Master SVG Vector Exports</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> Priority Processing Engine</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> Full Commercial Rights</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> White-label Bulk ZIP Naming</li>
              </ul>
              <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </section>

      {/* POLICIES SECTION */}
      <section id="policies" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-2xl font-headline font-bold text-white">Privacy Policy</h3>
            </div>
            <div className="text-white/50 text-sm leading-relaxed space-y-4">
              <p>At QR Canvas Studio, we prioritize your data privacy. All QR code generation processing occurs locally within your browser. We do not store, track, or share the information you input into your QR codes.</p>
              <p>We use local storage only to maintain your session history and preferences locally on your device. No personal data is transmitted to our servers during the generation process.</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <Gavel className="w-6 h-6" />
              <h3 className="text-2xl font-headline font-bold text-white">Terms of Service</h3>
            </div>
            <div className="text-white/50 text-sm leading-relaxed space-y-4">
              <p>By using QR Canvas Studio, you agree to generate QR codes that comply with local and international laws. We prohibit the use of our services to create malicious links or deceptive content.</p>
              <p>Free tier users are permitted for personal and non-commercial use. Commercial use and mass-marketing campaigns require an Agency Pro license.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
               <CustomScannerLogo className="text-primary w-6 h-6" />
               <span className="font-headline font-bold text-xl text-white">QRCanvas Studio</span>
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
