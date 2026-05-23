"use client"

import React from 'react';
import Link from 'next/link';
import { CopyrightYear } from './copyright-year';

const Logo = ({ className = "h-8" }: { className?: string }) => (
  <div className={className}>
    <div className="font-headline font-black text-xl tracking-tighter uppercase leading-none">
      <span className="text-foreground">QR</span> <span className="text-primary ml-0.5">CANVAS</span>
    </div>
  </div>
);

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-20 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <Logo />
          <div className="flex flex-wrap justify-center items-center gap-8">
             <Link href="/single" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all">Single Studio</Link>
             <Link href="/bulk" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all">Bulk Mode</Link>
             <Link href="/faq" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all">FAQ</Link>
             <Link href="/about" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all">About Studio</Link>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center space-y-5">
          <div className="flex justify-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">SSL SECURE</span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">GDPR COMPLIANT</span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">PWA READY</span>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/40">
            &copy; <CopyrightYear /> QR CANVAS. PROFESSIONAL BRANDING STUDIO.
          </p>
        </div>
      </div>
    </footer>
  );
}
