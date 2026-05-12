
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
  CheckCircle2, 
  Download,
  LayoutGrid,
  ImageIcon,
  Menu,
  Crown,
  Scan,
  TrendingUp,
  ShieldCheck,
  Lock,
  Globe,
  Star,
  ArrowRight
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
 * Premium Brand Logo: Technical QR Geometry + Dual-tone Text
 */
const CustomScannerLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="relative w-9 h-9 flex items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-primary"
        aria-hidden="true"
        fill="currentColor"
      >
        {/* Finder Pattern: Top Left */}
        <path d="M0 5C0 2.23858 2.23858 0 5 0H30C32.7614 0 35 2.23858 35 5V30C35 32.7614 32.7614 35 30 35H5C2.23858 35 0 32.7614 0 30V5ZM28 28V7H7v21h21ZM11 11h13v13h-13z" />
        {/* Finder Pattern: Top Right */}
        <path d="M65 5C65 2.23858 67.2386 0 70 0H95C97.7614 0 100 2.23858 100 5V30C100 32.7614 97.7614 35 95 35H70C67.2386 35 65 32.7614 65 30V5ZM93 28V7H72v21h21ZM76 11h13v13H76z" />
        {/* Finder Pattern: Bottom Left */}
        <path d="M0 70C0 67.2386 2.23858 65 5 65H30C32.7614 65 35 67.2386 35 70V95C35 97.7614 32.7614 100 30 100H5C2.23858 100 0 97.7614 0 95V70ZM28 93V72H7v21h21ZM11 76h13v13h-13z" />
        {/* Stylized Data Bit */}
        <rect x="45" y="45" width="10" height="10" rx="2" />
      </svg>
      {/* Integrated White QR Branding in the empty right-side space */}
      <span className="absolute bottom-1 right-0 text-[14px] font-black text-white leading-none tracking-tighter select-none">
        QR
      </span>
    </div>
    <div className="font-headline font-black text-2xl tracking-tighter uppercase leading-none ml-1">
      <span className="text-white">QR</span> <span className="text-primary">CANVAS</span>
    </div>
  </div>
);

const NativeAdBanner = () => (
  <div className="container mx-auto px-6 py-12 flex justify-center">
    <div 
      className="w-full max-w-5xl min-h-[100px] bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden"
    >
      <div className="flex items-center gap-4 text-white/20">
        <Globe className="w-5 h-5" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Ad Placement Area</span>
      </div>
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
    { label: 'Bulk Mode', href: '#bulk-info', action: () => scrollToGenerator('bulk') },
    { label: 'Pricing', href: '#pricing', action: () => scrollTo('pricing') },
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
      q: "How many QR codes can I generate in Bulk Mode?",
      a: "The free tier allows up to 50 QR codes per batch. Agency Pro users have unlimited batch processing and higher resolution master exports."
    },
    {
      q: "What file formats do you support for export?",
      a: "We provide high-resolution PNG as standard. SVG Vector format is available for professionals who need infinitely scalable assets for large-scale print."
    },
    {
      q: "Is my data stored on your servers?",
      a: "No. We prioritize privacy. All QR generation happens locally in your browser (Client-Side), and we do not store the data you input."
    }
  ];

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToGenerator('single')}>
            <CustomScannerLogo className="h-10" />
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
                className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-primary transition-all duration-300"
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
                    <SheetHeader className="p-6 border-b border-white/5 text-left">
                      <CustomScannerLogo className="h-8" />
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
            Professional artistic <br />
            <span className="text-primary italic">QR CANVAS Studio</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Create high-resolution QR codes for your brand. Support for <span className="text-white font-medium">logos</span>, custom backgrounds, and <span className="text-white font-medium">bulk processing</span>.
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
            <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 relative group hover:border-primary/20 transition-all">
              <div className="absolute top-6 right-6 text-2xl font-black text-white/10 group-hover:text-primary/20 transition-all">{item.step}</div>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-headline font-bold text-white mb-4">{item.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Choose Your Studio Tier</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Professional tools for individuals and high-volume agencies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* FREE TIER */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Plan</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-headline font-bold text-white uppercase">Studio Lite</h3>
              <p className="text-6xl font-headline font-black text-white">FREE</p>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest">No credit card required</p>
            </div>
            <div className="space-y-4 pt-6 border-t border-white/5">
              {[
                'Standard Single QR Generation',
                'Up to 50 Bulk Batches',
                'Custom Logos & Colors',
                'High-Res PNG Exports',
                'Static Non-Expiring Codes'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="w-full h-14 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl">
              Currently Active
            </Button>
          </div>

          {/* PRO TIER */}
          <div className="p-10 rounded-[2.5rem] bg-primary/10 border border-primary/30 space-y-8 relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-6">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Recommended
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-headline font-bold text-white uppercase">Agency Pro</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-headline font-black text-white">$19</span>
                <span className="text-white/40 font-bold uppercase tracking-widest">/month</span>
              </div>
              <p className="text-xs text-primary font-black uppercase tracking-widest">Enterprise production suite</p>
            </div>
            <div className="space-y-4 pt-6 border-t border-white/10">
              {[
                'Unlimited Bulk Batching',
                'SVG Vector Exports (Master Quality)',
                'Priority AI Background Generation',
                'Advanced Campaign Analytics',
                'White-Label (No Studio Branding)',
                'Dedicated 24/7 Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white">
                  <Star className="w-4 h-4 text-primary shrink-0 fill-primary/20" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
              Unlock Agency Suite
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="max-w-3xl mx-auto">
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

      {/* SECURITY & PRIVACY SECTION */}
      <section id="policies" className="container mx-auto px-6 py-32 border-t border-white/[0.05] scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-headline font-bold text-white">Zero-Data Policy</h4>
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              We never store your input data. All QR processing happens in your browser's local memory and is cleared when you close the tab.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-headline font-bold text-white">Permanent Ownership</h4>
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              Codes generated here are 100% static. They belong to you forever and do not rely on our platform to stay active.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-headline font-bold text-white">Marketing Analytics</h4>
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              Agency Pro users can track engagement via server-side redirects, providing deep campaign intelligence without compromising privacy.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <CustomScannerLogo className="h-10" />
            <div className="flex flex-wrap justify-center items-center gap-8">
               <a href="#how-to-use" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">How it Works</a>
               <a href="#faq" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">FAQ</a>
               <a href="#pricing" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Pricing</a>
               <a href="#policies" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Privacy & Terms</a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center space-y-4">
            <div className="flex justify-center gap-6">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">SSL SECURE</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">GDPR COMPLIANT</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">PWA READY</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/10">
              &copy; <CopyrightYear /> QR CANVAS. ALL RIGHTS RESERVED. MOBILE PWA EDITION.
            </p>
          </div>
        </div>
      </footer>
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <Toaster />
    </main>
  );
}
