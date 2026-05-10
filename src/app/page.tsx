"use client"

import React from 'react';
import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
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
  HelpCircle
} from 'lucide-react';
import { CopyrightYear } from '@/components/qr-canvas/copyright-year';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
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
            {['Generator', 'Bulk Mode', 'Features', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <button className="text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Go Pro
             </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - SEO H1 */}
      <section className="container mx-auto px-6 py-24 md:py-32 relative">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-10 animate-in fade-in zoom-in duration-1000 border-primary/20">
            <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
            <span>THE NEXT GENERATION OF QR BRANDING</span>
          </div>
          <h1 className="text-5xl md:text-[80px] font-headline font-black mb-10 leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30">
            Free QR Code Generator <br />
            <span className="text-primary italic underline decoration-white/10 underline-offset-8">with Logo & Bulk Support</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-12">
            The world's most advanced <span className="text-white font-medium">Bulk QR Maker</span>. Create professional codes with brand logos, custom backgrounds, and batch processing for business marketing.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Instant Bulk Mode
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Branded Templates
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

      {/* BULK QR EXPLANATION - SEO H2 */}
      <section id="bulk-mode" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
              <Layers className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
              Powerful Batch Processing for <br/><span className="text-primary">Enterprise QR Management</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Why generate codes one by one? Our <strong>Bulk QR Code Generator</strong> allows you to paste a list of URLs or text data and generate hundreds of branded assets in seconds.
            </p>
            <ul className="space-y-4">
              {[
                "Branded style injection across entire batches",
                "High-resolution PNG export in a single ZIP file",
                "Auto-naming assets based on input data",
                "Dynamic scannability checks for every code"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              Try Bulk Mode Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
             <div className="glass-card p-10 rounded-[3rem] border-white/10 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.15)] animate-float">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                  <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                  <div className="grid grid-cols-3 gap-4 py-8">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="aspect-square bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
                        <QrCode className="w-6 h-6 text-primary/40" />
                      </div>
                    ))}
                  </div>
                  <div className="h-12 w-full bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-xs tracking-widest">
                    BATCH EXPORTING...
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - SEO H2 */}
      <section id="features" className="container mx-auto px-6 py-32 relative overflow-hidden bg-white/[0.01]">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white">Why Choose Our Professional QR Maker?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We offer enterprise-grade customization tools for free. From <span className="text-white font-bold">QR codes with background images</span> to custom branding with logos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
      <section id="faq" className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-headline font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-4 italic">Everything you need to know about our QR engine</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="glass-card border-white/5 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary transition-all">Is this QR code generator truly free?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Yes, QR Canvas is 100% free for both personal and commercial use. You can generate unlimited single or bulk QR codes with no account required and no hidden fees.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="glass-card border-white/5 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary">How do I add my own logo to a QR code?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Simply go to the "Brand Identity" section in our generator, upload your image file (PNG, JPG, or SVG), and use the scaling slider to adjust the center logo size.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="glass-card border-white/5 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary">Can I use a background image for my QR code?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Absolutely! Our tool allows you to upload any image as a full-canvas background. We recommend using the "Opacity" slider to ensure there is enough contrast for scanners to read the code.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="glass-card border-white/5 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary">What is Bulk QR Mode?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Bulk Mode allows you to generate multiple QR codes at once. Just paste a list of URLs or text strings, and the engine will apply your branding to all of them and bundle them into a ZIP file.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="glass-card border-white/5 rounded-2xl px-6">
            <AccordionTrigger className="text-left text-white font-bold hover:text-primary">Do these QR codes expire?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              No, our QR codes are static, meaning the data is encoded directly into the pattern. They will never expire and will work as long as the underlying link or data is active.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
                Setting the global standard for <span className="text-white">Professional QR Code Generators</span>. Built with cutting-edge technology for creators, marketing agencies, and enterprise brands.
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
               <FooterCol title="Solutions" links={['Bulk Generator', 'Branded Codes', 'Logo Engine', 'Batch Export']} />
               <FooterCol title="Resources" links={['SEO Guide', 'API Reference', 'Brand Assets', 'Security Docs']} />
               <FooterCol title="Legal" links={['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Disclaimer']} />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
              &copy; <CopyrightYear /> QR CANVAS PRO SUITE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6 text-muted-foreground/40 text-[10px] font-black uppercase tracking-widest">
              <span>Optimized for Global Brand Excellence</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <span>v6.2.0 Enterprise SEO Edition</span>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
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
