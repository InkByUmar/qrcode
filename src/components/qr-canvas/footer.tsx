"use client"

import React from 'react';
import Link from 'next/link';
import { CopyrightYear } from './copyright-year';
import { Shield, Lock, Zap } from 'lucide-react';

const Logo = ({ className = "h-7" }: { className?: string }) => (
  <div className={className}>
    <div className="font-headline font-black text-xl tracking-tighter uppercase leading-none">
      <span className="text-foreground">QR</span> <span className="text-primary ml-0.5">CANVAS</span>
    </div>
  </div>
);

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-secondary/20 py-16 md:py-24 mt-20 relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <Logo />
            <p className="text-sm text-foreground/50 font-medium leading-relaxed max-w-sm">
              The world's most artistic professional QR studio. Create high-resolution branded assets instantly for personal and business use. 100% free and permanent.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/30">
                <Shield className="w-3.5 h-3.5 text-primary" /> Secure
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/30">
                <Lock className="w-3.5 h-3.5 text-primary" /> Private
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/30">
                <Zap className="w-3.5 h-3.5 text-primary" /> Instant
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Studio</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/single" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Single QR</Link>
                <Link href="/bulk" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Bulk Mode</Link>
                <Link href="/" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Live Scanner</Link>
              </nav>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Resources</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/faq" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Knowledge Base</Link>
                <Link href="/about" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">About Studio</Link>
                <Link href="/about" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Mission</Link>
              </nav>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Legal</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/privacy" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Privacy Policy</Link>
                <Link href="/terms" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Terms of Service</Link>
                <Link href="/cookies" className="text-[11px] font-bold text-foreground/50 hover:text-primary transition-colors uppercase tracking-widest">Cookie Policy</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center gap-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">SSL SECURE</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">GDPR COMPLIANT</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">PWA READY</span>
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
              &copy; <CopyrightYear /> QR CANVAS. PROFESSIONAL BRANDING STUDIO.
            </p>
            <p className="text-[9px] font-medium text-foreground/20 uppercase tracking-widest">
              Built with precision for global marketing teams.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
