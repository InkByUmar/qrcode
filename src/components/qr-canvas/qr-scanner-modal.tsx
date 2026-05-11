"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Copy, CheckCircle2, X, RefreshCcw, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrScannerModal({ isOpen, onClose }: QrScannerModalProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // We use a timeout to ensure the Radix Dialog portal has fully mounted the DOM element
    const initTimeout = setTimeout(() => {
      if (isOpen && !scanResult && isMounted) {
        const readerElement = document.getElementById("reader");
        
        if (readerElement) {
          try {
            // Clean up any existing instance first
            if (scannerRef.current) {
              scannerRef.current.clear().catch(() => {});
            }

            const scanner = new Html5QrcodeScanner(
              "reader",
              { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
              },
              /* verbose= */ false
            );
            
            scanner.render((result) => {
              setScanResult(result);
              scanner.clear().catch(e => console.warn("Scanner clear failed", e));
            }, (error) => {
              // Standard scan failures are ignored to prevent console noise
            });

            scannerRef.current = scanner;
          } catch (err) {
            console.error("Scanner initialization failed", err);
          }
        }
      }
    }, 400); // Increased delay to ensure Radix portal is ready

    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.debug("Cleanup clear", err));
        scannerRef.current = null;
      }
    };
  }, [isOpen, scanResult]);

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setIsCopied(true);
      toast({ title: "Copied!", description: "Scan result copied to clipboard." });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const reset = () => {
    setScanResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass-card max-w-md border-white/10 p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-white/5">
          <DialogTitle className="text-white font-headline flex items-center gap-3">
            <Scan className="w-5 h-5 text-primary" />
            Live QR Scanner
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 p-6">
          {!scanResult ? (
            <div className="w-full relative aspect-square rounded-3xl overflow-hidden border-2 border-primary/20 bg-black/40 group">
              <div id="reader" className="w-full h-full"></div>
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 flex items-center justify-center">
                 <div className="w-64 h-64 border-2 border-primary/30 rounded-2xl animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Decoded Result</p>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 max-h-[150px] overflow-auto custom-scrollbar">
                  <p className="text-sm font-mono text-white break-all leading-relaxed">{scanResult}</p>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <Button onClick={handleCopy} className="w-full h-12 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                    {isCopied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {isCopied ? 'Copy to Clipboard' : 'Copy Result'}
                  </Button>
                  <Button variant="outline" onClick={reset} className="w-full h-12 border-white/10 hover:bg-white/5 rounded-xl text-xs font-black uppercase tracking-widest text-white/70">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Scan New Code
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center space-y-2">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">
              Enterprise Visual Intelligence
            </p>
            <p className="text-[9px] text-white/20 uppercase font-bold">
              Secure Local Processing • No Data Leaves Your Device
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
