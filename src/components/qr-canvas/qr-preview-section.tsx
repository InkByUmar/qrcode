"use client"

import React, { useEffect, useRef, useState } from 'react';
import { QRState, QRHistoryItem } from '@/lib/qr-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileCode, 
  Loader2, 
  History, 
  MessageCircle, 
  Download, 
  Wifi, 
  Contact, 
  Link2,
  Copy,
  CheckCircle2,
  Phone,
  MonitorSmartphone,
  ChevronRight,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Script from 'next/script';

interface QrPreviewSectionProps {
  state: QRState;
  history: QRHistoryItem[];
  onDownload: () => void;
  onClearHistory: () => void;
}

declare global {
  interface Window {
    QRCodeStyling: any;
  }
}

export function QrPreviewSection({ state, history, onDownload, onClearHistory }: QrPreviewSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [processedBg, setProcessedBg] = useState<string | null>(null);
  const { toast } = useToast();

  // Lowered threshold to 300 for better reliability
  const dataLength = state.data?.length || 0;
  const isHighDensity = dataLength > 300;
  const isUltraHighDensity = dataLength > 600;

  // Optimized background pre-processor for opacity
  useEffect(() => {
    if (!state.backgroundImage) {
      setProcessedBg(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = state.backgroundOpacity;
        ctx.drawImage(img, 0, 0);
        setProcessedBg(canvas.toDataURL('image/png'));
      }
    };
    img.src = state.backgroundImage;
  }, [state.backgroundImage, state.backgroundOpacity]);

  const getQrConfig = (size: number = 400) => {
    // FORCE Level H if any brand asset or high density data is used
    const errorCorrection = (state.logo || state.backgroundImage || isHighDensity) ? 'H' : state.errorLevel;
    
    // Automatic fallback for complex dot styles on high density data to ensure scannability
    let dotType = state.dotStyle;
    if (isHighDensity && (state.dotStyle === 'classy' || state.dotStyle === 'dots')) {
      dotType = 'rounded';
    }
    if (isUltraHighDensity) {
      dotType = 'square'; // Maximum scannability for huge payloads
    }

    return {
      width: size,
      height: size,
      type: 'canvas' as const,
      data: state.data || ' ',
      image: state.logo || '',
      margin: 20, // Increased margin for scanner focus in preview
      dotsOptions: { 
        color: state.fgColor, 
        type: dotType 
      },
      cornersSquareOptions: {
        type: state.cornerStyle,
        color: state.fgColor
      },
      cornersDotOptions: {
        type: state.cornerStyle === 'rounded' ? 'dot' : state.cornerStyle,
        color: state.fgColor
      },
      backgroundOptions: { 
        color: state.backgroundImage ? 'transparent' : state.bgColor,
        image: processedBg || '',
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 0,
          imageSize: 1,
        }
      },
      imageOptions: { 
        crossOrigin: 'anonymous', 
        margin: 15, // Increased margin around logo
        imageSize: state.logoSize,
        hideBackgroundDots: true 
      },
      qrOptions: { 
        typeNumber: 0, 
        mode: 'Byte', 
        errorCorrectionLevel: errorCorrection 
      }
    };
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.QRCodeStyling && qrRef.current) {
      setIsGenerating(true);
      const previewSize = 800; // Higher internal resolution for sharp scaling
      const config = getQrConfig(previewSize);

      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new window.QRCodeStyling(config);
        qrCodeInstance.current.append(qrRef.current);
      } else {
        qrCodeInstance.current.update(config);
      }
      
      // Ensure canvas is responsive
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.maxWidth = '100%';
        canvas.style.display = 'block';
      }
      
      const timer = setTimeout(() => setIsGenerating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [state, processedBg, isHighDensity, isUltraHighDensity]);

  const handleDownload = async (ext: 'png' | 'svg', resolution: number) => {
    if (!qrCodeInstance.current) return;
    setIsGenerating(true);
    try {
      const targetRes = isHighDensity ? Math.max(resolution, 1200) : resolution;
      
      await new Promise(resolve => setTimeout(resolve, 300));
      await qrCodeInstance.current.download({ 
        name: `qrcanvas-${state.type.toLowerCase()}-${Date.now()}`, 
        extension: ext,
        width: targetRes,
        height: targetRes
      });
      onDownload();
      toast({ title: "Export Succeeded", description: `High-resolution brand asset ready. (${targetRes}px)` });
    } catch (err) {
      toast({ variant: "destructive", title: "Render Error", description: "Could not finalize high-res asset." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (!state.data) return;
    navigator.clipboard.writeText(state.data);
    setCopied(true);
    toast({ title: "Copied to Clipboard", description: "Payload ready for pasting." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* PREMIUM PREVIEW CARD */}
      <Card className="glass-card relative overflow-hidden group shadow-2xl transition-all duration-700 hover:shadow-primary/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
        <CardHeader className="text-center pb-6 pt-10">
          <CardTitle className="text-[11px] font-black text-primary uppercase tracking-[0.6em]">Live Scannability Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-10 px-10 pb-12">
          <div className="relative p-6 bg-white rounded-[2.5rem] shadow-2xl ring-4 ring-white/10 group-hover:scale-[1.02] transition-transform duration-700 ease-out qr-canvas-shadow overflow-hidden">
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[4px] rounded-[2.5rem] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            )}
            <div ref={qrRef} className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] flex items-center justify-center overflow-hidden rounded-xl bg-white" />
          </div>

          <div className="w-full space-y-4">
            {isHighDensity && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <p className="text-[10px] text-amber-500 font-bold uppercase leading-tight">
                  High density data detected. <span className="text-white">Reliability Engine</span> active (Level H).
                </p>
              </div>
            )}

            <Button 
              onClick={() => handleDownload('png', 1024)} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-16 rounded-2xl flex items-center justify-center gap-4 text-xl shadow-xl transition-all hover:translate-y-[-2px] active:translate-y-0 active:scale-95 group"
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              Download PNG
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                disabled={isGenerating}
                onClick={() => handleDownload('svg', 1024)} 
                className="bg-white/5 border-white/10 hover:bg-white/15 hover:text-white h-14 rounded-xl text-xs font-black tracking-widest uppercase"
              >
                <FileCode className="w-4 h-4 mr-2 text-primary" />
                Vector SVG
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="bg-white/5 border-white/10 hover:bg-white/15 h-14 rounded-xl text-xs font-black tracking-widest uppercase"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied' : 'Copy Data'}
              </Button>
            </div>
          </div>
        </CardContent>
        <div className="bg-white/[0.03] border-t border-white/[0.1] p-6 text-center">
           <div className="flex items-center justify-center gap-3 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
             <MonitorSmartphone className="w-4 h-4" />
             Scannable on all Modern Devices
           </div>
        </div>
      </Card>
      
      {/* HISTORY ENGINE */}
      {history.length > 0 && (
        <Card className="glass-card animate-in slide-in-from-right-10 duration-700 shadow-2xl border-white/10 overflow-hidden">
          <CardHeader className="py-5 px-6 border-b border-white/[0.05] flex flex-row items-center justify-between bg-white/[0.02]">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white">
              <History className="w-4 h-4 text-primary" /> Recent History
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearHistory}
              className="h-7 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-destructive hover:bg-destructive/10 transition-all border border-white/10 rounded-lg group"
            >
              <Trash2 className="w-3 h-3 mr-1.5" />
              Clear
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/[0.05]">
              {history.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-white/[0.05] transition-all group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/40 transition-all shadow-lg">
                       {item.type === 'WiFi' ? <Wifi className="w-5 h-5" /> : item.type === 'vCard' ? <Contact className="w-5 h-5" /> : item.type === 'Phone' ? <Phone className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate max-w-[150px]">{item.data}</p>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mt-0.5">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ADSTERRA NATIVE BANNER */}
      <div className="w-full glass-card rounded-[2.5rem] p-6 text-center border-white/10 overflow-hidden min-h-[200px] flex flex-col items-center justify-center relative">
        <div className="text-[9px] text-white/20 uppercase tracking-[0.3em] mb-4">Sponsored Suggestions</div>
        <div id="container-8a0d2340102217c81755459d2df8b6d0" className="w-full"></div>
        <Script 
          src="https://archaicmsflip.com/8a0d2340102217c81755459d2df8b6d0/invoke.js" 
          strategy="afterInteractive"
          async
          data-cfasync="false"
        />
      </div>
    </div>
  );
}
