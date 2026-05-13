
"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { 
  Copy, 
  CheckCircle2, 
  RefreshCcw, 
  Scan, 
  Camera, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  ImageIcon,
  Info,
  Share2,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORTED_FORMATS = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.DATA_MATRIX,
  Html5QrcodeSupportedFormats.AZTEC,
];

export function QrScannerModal({ isOpen, onClose }: QrScannerModalProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [cameras, setCameras] = useState<{ id: string, label: string }[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerContainerId = "qr-reader-container";

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch (_) {
      return text.startsWith('http://') || text.startsWith('https://');
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
      } catch (e) {
        // Suppress hardware release warnings
      } finally {
        html5QrCodeRef.current = null;
      }
    }
    const container = document.getElementById(scannerContainerId);
    if (container) container.innerHTML = "";
  };

  useEffect(() => {
    if (isOpen && cameras.length === 0) {
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length > 0) {
          const formattedCameras = devices.map(d => ({ id: d.id, label: d.label || `Camera ${devices.indexOf(d) + 1}` }));
          setCameras(formattedCameras);
          const backCamera = formattedCameras.find(c => c.label.toLowerCase().includes('back') || c.label.toLowerCase().includes('rear'));
          setSelectedCameraId(backCamera ? backCamera.id : formattedCameras[0].id);
        } else {
          setError("No hardware cameras identified.");
        }
      }).catch(() => {
        setError("Camera permissions required for live scanning.");
      });
    }
  }, [isOpen, cameras.length]);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      if (!isOpen || !selectedCameraId || scanResult || error || isProcessingFile || !isMounted) return;
      
      setIsInitializing(true);
      await stopScanner();
      
      try {
        const scanner = new Html5Qrcode(scannerContainerId, {
          formatsToSupport: SUPPORTED_FORMATS,
          verbose: false,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        });
        html5QrCodeRef.current = scanner;

        await scanner.start(
          selectedCameraId,
          {
            fps: 20, 
            qrbox: (viewWidth, viewHeight) => {
              const minDim = Math.min(viewWidth, viewHeight);
              return { width: minDim * 0.75, height: minDim * 0.75 };
            },
            aspectRatio: 1.0
          },
          (decodedText) => {
            if (isMounted) {
              setScanResult(decodedText);
              stopScanner();
            }
          },
          () => {} 
        );
        
        if (isMounted) setIsInitializing(false);
      } catch (err) {
        if (isMounted) {
          setError("Camera busy or unavailable.");
          setIsInitializing(false);
        }
      }
    };

    if (isOpen && !scanResult && !error && !isProcessingFile) {
      startScanner();
    }

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [isOpen, selectedCameraId, scanResult, error, isProcessingFile]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setError(null);
    setScanResult(null);

    await stopScanner();
    await new Promise(r => setTimeout(r, 400)); 

    const tempId = "qr-file-scan-temp";
    let tempDiv = document.getElementById(tempId);
    if (!tempDiv) {
      tempDiv = document.createElement('div');
      tempDiv.id = tempId;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      document.body.appendChild(tempDiv);
    }

    try {
      const fileScanner = new Html5Qrcode(tempId, {
        formatsToSupport: SUPPORTED_FORMATS,
        verbose: false
      });
      
      const decodedText = await fileScanner.scanFile(file, true);
      
      if (decodedText) {
        setScanResult(decodedText);
        toast({ title: "Import Successful", description: "QR matrix identified and decoded." });
      }
      
      fileScanner.clear();
    } catch (err: any) {
      setError("Matrix detection failed. Stylized codes require high resolution and sharp focus. Try a different angle or lighting.");
    } finally {
      setIsProcessingFile(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setIsCopied(true);
      toast({ title: "Copied!", description: "Content copied to clipboard." });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!scanResult) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'QR CANVAS Scan Result',
          text: scanResult,
          url: isUrl(scanResult) ? scanResult : undefined,
        });
      } else {
        // Browser doesn't support navigator.share
        handleCopy();
        toast({ title: "Sharing unavailable", description: "Copied to clipboard instead." });
      }
    } catch (error) {
      // Permission denied or other error
      handleCopy();
      toast({ title: "Sharing unavailable", description: "Content copied to clipboard instead." });
    }
  };

  const handleOpenLink = () => {
    if (scanResult && isUrl(scanResult)) {
      window.open(scanResult.startsWith('http') ? scanResult : `https://${scanResult}`, '_blank');
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setError(null);
    setIsProcessingFile(false);
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
    handleReset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="glass-card max-w-md border-white/10 p-0 overflow-hidden outline-none text-white">
        <DialogHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
          <DialogTitle className="text-white font-headline flex items-center gap-3 text-lg">
            <Scan className="w-5 h-5 text-primary" />
            Studio Scanner Pro
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 p-6">
          {!scanResult ? (
            <div className="w-full space-y-6">
              <div className="flex items-center gap-3">
                {cameras.length > 1 && (
                  <div className="flex-1">
                    <Select value={selectedCameraId} onValueChange={setSelectedCameraId}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-[10px] uppercase font-black tracking-widest">
                        <Camera className="w-3.5 h-3.5 mr-2 text-primary" />
                        <SelectValue placeholder="Camera" />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-black border-white/10 text-white">
                        {cameras.map(cam => (
                          <SelectItem key={cam.id} value={cam.id} className="text-[10px] uppercase font-black">{cam.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isInitializing || isProcessingFile}
                  className="flex-1 h-12 border-white/10 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 gap-2"
                >
                  {isProcessingFile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5 text-primary" />}
                  Import Image
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="w-full relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-primary/20 bg-black/40 group shadow-2xl">
                <div id={scannerContainerId} className="w-full h-full"></div>
                
                {!isInitializing && !error && !isProcessingFile && (
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

                {(isInitializing || isProcessingFile) && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 z-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary text-center px-6">
                      {isProcessingFile ? "Analyzing QR Matrix..." : "Syncing Hardware..."}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-6 p-10 text-center z-30">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <p className="text-sm font-bold text-white leading-relaxed">{error}</p>
                    <div className="flex flex-col gap-3 w-full">
                      <Button variant="outline" onClick={handleReset} className="h-10 border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
                        <RefreshCcw className="w-3.5 h-3.5 mr-2" /> Restart
                      </Button>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="h-10 bg-primary/20 border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl">
                        <ImageIcon className="w-3.5 h-3.5 mr-2" /> New Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                 <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                 <p className="text-[9px] text-white/40 leading-relaxed font-medium">
                   PRO TIP: Artistic QR codes with custom logos or backgrounds require high resolution. Ensure the QR pattern occupies at least 60% of the image frame for successful analysis.
                 </p>
              </div>

              <Button 
                onClick={handleClose} 
                className="w-full h-14 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Studio
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Decoded Message</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 bg-black/40 rounded-2xl border border-white/5 max-h-[180px] overflow-auto custom-scrollbar relative z-10 shadow-inner">
                  <p className="text-base font-mono text-white break-all">{scanResult}</p>
                </div>

                <div className="flex flex-col gap-3 pt-2 relative z-10">
                  {isUrl(scanResult) && (
                    <Button 
                      onClick={handleOpenLink}
                      className="w-full h-16 bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.1em] rounded-2xl shadow-xl shadow-primary/30"
                    >
                      <ExternalLink className="w-5 h-5 mr-3" />
                      Open Link
                    </Button>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={handleShare}
                      className={cn(
                        "h-14 bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest",
                        !isUrl(scanResult) && "col-span-2 h-16 text-sm"
                      )}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button 
                      onClick={handleCopy}
                      className={cn(
                        "h-14 bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest",
                        !isUrl(scanResult) && "hidden"
                      )}
                    >
                      {isCopied ? <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> : <Copy className="w-4 h-4 mr-2" />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <Button variant="outline" onClick={handleReset} className="h-14 border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70">
                      <RefreshCcw className="w-4 h-4 mr-2 text-primary" />
                      Scan New
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
