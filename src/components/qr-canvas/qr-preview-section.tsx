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
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const dataLength = state.data?.length || 0;
  const isHighDensity = dataLength > 500;

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
    const errorCorrection = (state.logo || state.backgroundImage || isHighDensity) ? 'H' : state.errorLevel;
    const dotType = isHighDensity && (state.dotStyle === 'classy' || state.dotStyle === 'dots') 
      ? 'rounded' 
      : state.dotStyle;

    return {
      width: size,
      height: size,
      type: 'canvas' as const,
      data: state.data || ' ',
      image: state.logo || '',
      dotsOptions: { 
        color: state.fgColor, 
        type: dotType 
      },
      cornersSquareOptions: {
        type: state.cornerStyle,
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
        margin: 12, 
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
      const previewSize = isHighDensity ? 600 : 400;
      const config = getQrConfig(previewSize);

      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new window.QRCodeStyling(config);
        qrCodeInstance.current.append(qrRef.current);
      } else {
        qrCodeInstance.current.update(config);
      }
      
      const timer = setTimeout(() => setIsGenerating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [state, processedBg, isHighDensity]);

  const handleDownload = async (ext: 'png' | 'svg', resolution: number) => {
    if (!qrCodeInstance.current) return;
    setIsGenerating(true);
    try {
      const targetRes = isHighDensity ? Math.max(resolution, 1200) : resolution;
      
      await new Promise(resolve => setTimeout(resolve, 300));
      await qrCodeInstance.current.download({ 
        name: `qr-canvas-premium-${state.type.toLowerCase()}-${Date.now()}`, 
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
      <Card className="glass-card relative overflow-hidden group shadow-[0_40px_100px_-12px_rgba(0,0,0,0.95)] transition-all duration-700 hover:shadow-primary/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
        <CardHeader className="text-center pb-6 pt-10">
          <CardTitle className="text-[11px] font-black text-primary uppercase tracking-[0.6em]">Professional Real-Time Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-10 px-10 pb-12">
          <div className="relative p-10 bg-white rounded-[3.5rem] shadow-2xl ring-2 ring-white/30 group-hover:scale-[1.03] transition-transform duration-1000 ease-out qr-canvas-shadow">
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-white/50 backdrop-blur-[8px] rounded-[3.5rem] flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              </div>
            )}
            <div ref={qrRef} className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center overflow-hidden rounded-2xl" />
          </div>

          <div className="w-full space-y-5">
            <Button 
              onClick={() => handleDownload('png', 1024)} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-20 rounded-[2rem] flex items-center justify-center gap-5 text-2xl shadow-2xl transition-all hover:scale-[1.02] neon-glow active:scale-95 group"
            >
              <Download className="w-7 h-7 group-hover:translate-y-1 transition-transform" />
              Get {isHighDensity ? '1200px' : '1024px'} PNG
            </Button>
            
            <div className="grid grid-cols-2 gap-5">
              <Button 
                variant="outline" 
                disabled={isGenerating}
                onClick={() => handleDownload('svg', 1024)} 
                className="bg-white/[0.05] border-white/20 hover:bg-white/15 hover:text-white h-16 rounded-[1.5rem] text-xs font-black tracking-widest uppercase transition-all"
              >
                <FileCode className="w-4 h-4 mr-3 text-primary" />
                Vector SVG
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="bg-white/[0.05] border-white/20 hover:bg-white/15 h-16 rounded-[1.5rem] text-xs font-black tracking-widest uppercase transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-3 text-primary" /> : <Copy className="w-4 h-4 mr-3" />}
                {copied ? 'Copied' : 'Copy Payload'}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out my custom QR from QR Canvas: ${state.data}`)}`, '_blank')}
              className="w-full bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-400 h-16 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Share via WhatsApp
            </Button>
          </div>
        </CardContent>
        <div className="bg-white/[0.03] border-t border-white/[0.1] p-8 text-center">
           <div className="flex items-center justify-center gap-3 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
             <MonitorSmartphone className="w-4 h-4" />
             Verified Scannable: iOS 16+ & Android 13+
           </div>
        </div>
      </Card>
      
      {/* HISTORY ENGINE */}
      {history.length > 0 && (
        <Card className="glass-card animate-in slide-in-from-right-10 duration-1000 shadow-2xl border-white/10">
          <CardHeader className="py-6 px-8 border-b border-white/[0.05] flex flex-row items-center justify-between bg-white/[0.02]">
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-white">
              <History className="w-5 h-5 text-primary" /> Recent Brand Assets
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearHistory}
              className="h-8 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-destructive hover:bg-destructive/10 transition-all border border-white/10 rounded-xl group"
            >
              <Trash2 className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/[0.1]">
              {history.map((item) => (
                <div key={item.id} className="px-8 py-5 hover:bg-white/[0.06] transition-all group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-5 overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-white/10 group-hover:ring-primary/60 transition-all duration-500 shadow-lg">
                       {item.type === 'WiFi' ? <Wifi className="w-6 h-6" /> : item.type === 'vCard' ? <Contact className="w-6 h-6" /> : item.type === 'Phone' ? <Phone className="w-6 h-6" /> : <Link2 className="w-6 h-6" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate max-w-[200px]">{item.data}</p>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-tighter mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ADSENSE PLACEHOLDER: PREMIUM SIDEBAR */}
      <div className="w-full h-56 glass-card rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-5 group relative overflow-hidden border-white/10">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="w-16 h-1.5 bg-primary/20 rounded-full mb-2 group-hover:w-24 transition-all duration-700" />
        <span className="text-[11px] text-white/40 uppercase tracking-[0.8em] font-black">Monetization Display</span>
        <p className="text-[11px] text-white/50 leading-relaxed italic max-w-[240px] font-bold uppercase tracking-tight">Optimized for high-yield programmatic ad networks.</p>
      </div>
    </div>
  );
}
