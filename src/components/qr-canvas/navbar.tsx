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
  Info,
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { QrScannerModal } from './qr-scanner-modal';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";

const Logo = ({ className = "h-8" }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
      <div className="absolute inset-0 bg-primary rounded-2xl rotate-6 opacity-20 animate-pulse" />
      <div className="absolute inset-0 bg-primary rounded-2xl -rotate-3 transition-transform group-hover:rotate-0" />
      <span className="relative font-headline font-black text-white text-lg">QR</span>
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
    { label: 'FAQ', href: '/faq', icon: HelpCircle },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary relative py-1",
                  pathname === item.href ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "text-foreground/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
             <button 
                onClick={toggleTheme}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 text-foreground/70 hover:text-primary transition-all hover:scale-105"
                aria-label="Toggle Theme"
             >
               {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>

             <button 
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/25"
             >
              <Scan className="w-4.5 h-4.5" />
              <span className="hidden sm:inline">Scanner</span>
             </button>

             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden w-11 h-11 rounded-2xl bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 flex items-center justify-center text-foreground/70">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] glass-card p-0 overflow-hidden text-foreground border-l border-white/20">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-8 border-b border-white/10 text-left flex flex-row items-center justify-between">
                      <div className="space-y-1">
                        <SheetTitle>Studio Menu</SheetTitle>
                        <SheetDescription>Access professional QR tools.</SheetDescription>
                        <Logo />
                      </div>
                      <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <X className="w-5 h-5" />
                      </button>
                    </SheetHeader>
                    <nav className="flex-1 p-8 flex flex-col gap-8">
                      {navItems.map((item) => (
                        <Link 
                          key={item.label} 
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-5 text-sm font-black uppercase tracking-[0.25em] transition-all p-4 rounded-2xl",
                            pathname === item.href ? "bg-primary/10 text-primary border border-primary/20" : "text-foreground/50 hover:bg-secondary"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
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
