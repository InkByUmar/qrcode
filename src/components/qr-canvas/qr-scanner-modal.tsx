"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Copy, CheckCircle2, X } from 'lucide-react';
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
    if (isOpen && !scanResult) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      
      scanner.render((result) => {
        setScanResult(result);
        scanner.clear();
      }, (error) => {
        // Silently ignore camera failures during scan
      });

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
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
      <DialogContent className="glass-card max-w-md border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white font-headline">Live QR Scanner</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          {!scanResult ? (
            <div id="reader" className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40"></div>
          ) : (
            <div className="w-full space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Scan Result</p>
                <p className="text-sm font-mono text-white break-all leading-relaxed">{scanResult}</p>
                <div className="flex gap-3">
                  <Button onClick={handleCopy} className="flex-1 bg-primary text-primary-foreground font-bold">
                    {isCopied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {isCopied ? 'Copied' : 'Copy Result'}
                  </Button>
                  <Button variant="outline" onClick={reset} className="border-white/10 hover:bg-white/5">
                    Scan Again
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium text-center">
            Point your camera at a QR code to decode instantly
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
