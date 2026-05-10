"use client"

import React from 'react';
import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { Toaster } from '@/components/ui/toaster';
import { QrCode, Shield, Zap, Palette, Layers, Smartphone, Sparkles, Globe, ArrowRight, CheckCircle2, Star, Scan } from 'lucide-react';
import { CopyrightYear } from '@/components/qr-canvas/copyright-year';
import { QrScannerModal } from '@/components/qr-canvas/qr-scanner-modal';

export default function Home() {
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);

  return (
    <main className="min-h-screen premium-gradient selection:bg-primary/30 selection:text-white">
      {/* GLOBAL TOP AD BANNER */}
      <div className="w-full bg-black/40 backdrop-blur-md py-4 border-b border-white/[0.05] flex justify-center">
        <div className="w-full max-w-[728px] h-[90px] bg-white/[0.02] rounded-2xl border border-dashed border-white/[0.1] flex flex-col items-center justify-center group cursor-help overflow-hidden relative mx-4">
           <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.6em] font-bold">Premium Global Display Ad</span>
           <p className="text-[11px] text-muted-foreground/20 mt-1 italic">Professional Monetization Space • 728x90</p>
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <QrCode className="text-primary-foreground w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-headline font-bold tracking-tight text-white leading-none">
                QR <span className="text-primary">Canvas</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.4em] text-primary/60 uppercase mt-1">SaaS Pro Edition</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-12">
            {['Generator', 'Features', 'API', 'Templates'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsScannerOpen(true)}
               className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80"
             >
               <Scan className="w-4 h-4 text-primary" />
               Scan QR
             </button>
             <button className="text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Join Pro
             </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-24 md:py-32 relative">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 animate-in fade-in zoom-in duration-1000 border-primary/20">
            <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
            <span>THE NEXT GENERATION OF QR BRANDING</span>
          </div>
          <h1 className="text-6xl md:text-[92px] font-headline font-black mb-10 leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30">
            Design Codes That <br />
            <span className="text-primary italic underline decoration-white/10 underline-offset-8">Demand Attention</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-12">
            The world's most advanced <span className="text-white font-medium">Free QR Code Generator</span> with Logo and Background support. Now with live scanning and smart templates.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> No Account Needed
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> WhatsApp Support
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Lifetime Free
            </div>
          </div>
        </div>

        <div id="generator" className="relative z-10 scroll-mt-24">
          <QrGeneratorContainer />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <div className="container mx-auto px-6 py-20 border-y border-white/[0.05] bg-white/[0.01]">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
          {['FORBES', 'TECHCRUNCH', 'THE VERGE', 'WIRED', 'GIZMODO'].map(logo => (
            <span key={logo} className="text-2xl font-black tracking-tighter">{logo}</span>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="container mx-auto px-6 py-32 relative overflow-hidden">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Built for Creators & Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Every feature you need to create custom QR codes with background images and brand logos in one beautiful interface.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Instant Live Engine"
            description="Our real-time rendering engine updates your design as you type. Zero lag, 100% visual feedback."
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-primary" />}
            title="Premium Branding"
            description="Upload center logos and full-canvas background images with precision opacity controls."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="High Reliability"
            description="Automatic Level H Error Correction forces your codes to scan even with heavy visual branding."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-primary" />}
            title="WhatsApp Ready"
            description="Generate dedicated wa.me links with custom messages. Perfect for business automation."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-primary" />}
            title="Vector Fidelity"
            description="Export in pixel-perfect SVG or high-resolution 1024px PNG for billboards and print media."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-primary" />}
            title="Omni-Scanner Support"
            description="Rigorously tested to work across iOS 15+, Android 12+, and all legacy scanner hardware."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/40 py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tighter text-white">QR Canvas</span>
              </div>
              <p className="text-sm text-muted-foreground/60 leading-relaxed font-light">
                Setting the global standard for <span className="text-white">Free QR Code Generators</span>. Built with cutting-edge technology for creators, agencies, and enterprise brands.
              </p>
              <div className="flex gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                    <Star className="w-3 h-3 text-primary" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
               <FooterCol title="Product" links={['QR Generator', 'Logo Support', 'Background Engine', 'History Tool']} />
               <FooterCol title="Resources" links={['Guidebook', 'API Reference', 'Brand Assets', 'Security Whitepaper']} />
               <FooterCol title="Legal" links={['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Disclaimer']} />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
              &copy; <CopyrightYear /> QR CANVAS PRO SUITE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6 text-muted-foreground/40 text-[10px] font-black uppercase tracking-widest">
              <span>Made with ❤️ for the Global Brand Community</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <span>v5.0.0 Enterprise</span>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group glass-card p-12 rounded-[2.5rem] hover:bg-white/[0.06] transition-all duration-700 border-white/[0.05] hover:border-primary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 mb-10 shadow-2xl shadow-black/40 ring-1 ring-primary/20">
        {icon}
      </div>
      <h3 className="text-2xl font-headline font-bold mb-5 text-white group-hover:text-primary transition-colors duration-500">{title}</h3>
      <p className="text-muted-foreground/70 leading-relaxed font-light text-sm group-hover:text-white/80 transition-colors duration-500">{description}</p>
      <div className="mt-10 flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-700">
        EXPLORE FEATURE <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-8">
      <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/50">{title}</h4>
      <ul className="space-y-5">
        {links.map(l => (
          <li key={l}><a href="#" className="text-sm text-muted-foreground/60 hover:text-primary transition-all duration-300 font-light hover:pl-2">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
