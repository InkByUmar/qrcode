"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  Scan, 
  Sun, 
  Moon,
  Home,
  QrCode,
  Layers,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { QrScannerModal } from './qr-scanner-modal';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";

const Logo = ({ className = "h-8" }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_8px_rgba(37,211,102,0.3)]"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="100" height="100" rx="20" fill="#25D366" />
        <text 
          x="50%" 
          y="52%" 
          dominantBaseline="central" 
          textAnchor="middle" 
          fontSize="48" 
          fontWeight="900" 
          fill="white" 
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          QR
        </text>
      </svg>
    </div>
    <div className="font-headline font-black text-xl tracking-tighter uppercase leading-none">
      <span className="text-foreground">QR</span> <span className="text-primary ml-0.5">CANVAS</span>
    </div>
  </div>
);

export function Navbar() {
  const pathname = usePathname();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('qr_canvas_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('qr_canvas_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Single QR', href: '/single', icon: QrCode },
    { label: 'Bulk Mode', href: '/bulk', icon: Layers },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-border bg-background/80 backdrop-blur-2xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-foreground/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
             <button 
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary border border-border text-foreground/70 hover:text-primary transition-all"
                aria-label="Toggle Theme"
             >
               {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>

             <button 
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
             >
              <Scan className="w-4 h-4" />
              <span className="hidden xs:inline">Scanner</span>
             </button>

             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground/70">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background border-border p-0 overflow-hidden text-foreground">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-border text-left">
                      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                      <SheetDescription className="sr-only">Access studio tools and information pages.</SheetDescription>
                      <Logo />
                    </SheetHeader>
                    <nav className="flex-1 p-6 flex flex-col gap-6">
                      {navItems.map((item) => (
                        <Link 
                          key={item.label} 
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] transition-all",
                            pathname === item.href ? "text-primary" : "text-foreground/50"
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </header>
      <QrScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </>
  );
}