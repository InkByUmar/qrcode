"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Html5Qrcode } from 'html5-qrcode';
import { Copy, CheckCircle2, X, RefreshCcw, Scan, Camera, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrScannerModal({ isOpen, onClose }: QrScannerModalProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [cameras, setCameras] = useState<{ id: string, label: string }[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-reader-container";

  useEffect(() => {
    if (isOpen && !scanResult) {
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length > 0) {
          const formattedCameras = devices.map(d => ({ id: d.id, label: d.label || `Camera ${devices.indexOf(d) + 1}` }));
          setCameras(formattedCameras);
          const backCamera = formattedCameras.find(c => c.label.toLowerCase().includes('back') || c.label.toLowerCase().includes('rear'));
          setSelectedCameraId(backCamera ? backCamera.id : formattedCameras[0].id);
        } else {
          setError("No cameras found on this device.");
        }
      }).catch(err => {
        console.error("Camera access error", err);
        setError("Please allow camera permissions to use the scanner.");
      });
    }
  }, [isOpen, scanResult]);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      if (!isOpen || !selectedCameraId || scanResult || !isMounted) return;
      
      setIsInitializing(true);
      setError(null);

      // DOM mount check delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const element = document.getElementById(scannerContainerId);
      if (!element) {
        setIsInitializing(false);
        return;
      }

      try {
        if (html5QrCodeRef.current) {
          await html5QrCodeRef.current.stop().catch(() => {});
        }

        const scanner = new Html5Qrcode(scannerContainerId);
        html5QrCodeRef.current = scanner;

        await scanner.start(
          selectedCameraId,
          {
            fps: 15,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          (decodedText) => {
            setScanResult(decodedText);
            scanner.stop().catch(err => console.debug("Scanner stop success failed", err));
          },
          () => {}
        );
        setIsInitializing(false);
      } catch (err) {
        console.error("Scanner failed to start", err);
        setError("Failed to start camera. It may be used by another app.");
        setIsInitializing(false);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(err => console.debug("Cleanup stop failed", err));
        html5QrCodeRef.current = null;
      }
    };
  }, [isOpen, selectedCameraId, scanResult]);

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setIsCopied(true);
      toast({ title: "Copied!", description: "Result copied to clipboard." });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setError(null);
  };

  const handleClose = () => {
    onClose();
    handleReset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="glass-card max-w-md border-white/10 p-0 overflow-hidden outline-none">
        <DialogHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
          <DialogTitle className="text-white font-headline flex items-center gap-3">
            <Scan className="w-5 h-5 text-primary" />
            QR Studio Scanner
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full text-white/50 hover:text-white hover:bg-white/5">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 p-6">
          {!scanResult ? (
            <div className="w-full space-y-6">
              {cameras.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    <Camera className="w-3 h-3" /> Select Camera
                  </div>
                  <Select value={selectedCameraId} onValueChange={setSelectedCameraId}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                      <SelectValue placeholder="Choose camera" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      {cameras.map(cam => (
                        <SelectItem key={cam.id} value={cam.id}>{cam.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="w-full relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-primary/20 bg-black/40 group shadow-2xl">
                <div id={scannerContainerId} className="w-full h-full"></div>
                
                {!isInitializing && !error && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                    <div className="w-64 h-64 border-2 border-primary/30 rounded-3xl relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_rgba(16,185,129,0.8)] scanner-line" />
                    </div>
                  </div>
                )}

                {isInitializing && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 z-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Accessing Camera...</p>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-6 p-10 text-center z-30">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <div className="space-y-2">
                       <p className="text-sm font-bold text-white">{error}</p>
                       <p className="text-[10px] text-white/40 uppercase font-medium">Please check permissions in browser settings.</p>
                    </div>
                    <Button variant="outline" onClick={() => window.location.reload()} className="h-10 border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
                      Retry Permissions
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleClose} 
                  className="w-full h-14 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Generator
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Decoded Insight</p>
                    <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Enterprise Validated</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 bg-black/40 rounded-2xl border border-white/5 max-h-[180px] overflow-auto custom-scrollbar relative z-10 shadow-inner">
                  <p className="text-base font-mono text-white break-all leading-relaxed">{scanResult}</p>
                </div>

                <div className="flex flex-col gap-3 pt-2 relative z-10">
                  <Button 
                    onClick={handleCopy} 
                    className="w-full h-16 bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.1em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {isCopied ? <CheckCircle2 className="w-5 h-5 mr-3" /> : <Copy className="w-5 h-5 mr-3" />}
                    {isCopied ? 'Copied to Clipboard' : 'Copy Result'}
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={handleReset} className="h-14 border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70">
                      <RefreshCcw className="w-4 h-4 mr-2 text-primary" />
                      Scan Again
                    </Button>
                    <Button variant="outline" onClick={handleClose} className="h-14 border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Finish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center space-y-2 pb-2">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
              Safe & Secure Scanning
            </p>
            <p className="text-[9px] text-white/10 uppercase font-bold max-w-[200px] mx-auto leading-relaxed">
              No data is stored on our servers. Processing occurs entirely in your browser.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
