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
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QrPreviewSectionProps {
  state: QRState;
  history: QRHistoryItem[];
  onDownload: () => void;
}

declare global {
  interface Window {
    QRCodeStyling: any;
  }
}

export function QrPreviewSection({ state, history, onDownload }: QrPreviewSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [processedBg, setProcessedBg] = useState<string | null>(null);
  const { toast } = useToast();

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

  const getQrConfig = (size: number = 400) => ({
    width: size,
    height: size,
    type: 'canvas' as const,
    data: state.data || ' ',
    image: state.logo || '',
    dotsOptions: { 
      color: state.fgColor, 
      type: state.dotStyle 
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
      errorCorrectionLevel: (state.logo || state.backgroundImage) ? 'H' : state.errorLevel 
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.QRCodeStyling && qrRef.current) {
      setIsGenerating(true);
      const config = getQrConfig(400);

      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new window.QRCodeStyling(config);
        qrCodeInstance.current.append(qrRef.current);
      } else {
        qrCodeInstance.current.update(config);
      }
      
      const timer = setTimeout(() => setIsGenerating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [state, processedBg]);

  const handleDownload = async (ext: 'png' | 'svg', resolution: number) => {
    if (!qrCodeInstance.current) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      await qrCodeInstance.current.download({ 
        name: `qr-canvas-premium-${state.type.toLowerCase()}-${Date.now()}`, 
        extension: ext,
        width: resolution,
        height: resolution
      });
      onDownload();
      toast({ title: "Export Succeeded", description: "High-resolution brand asset ready." });
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
      <Card className="glass-card relative overflow-hidden group shadow-[0_40px_100px_-12px_rgba(0,0,0,0.9)] transition-all duration-700 hover:shadow-primary/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        <CardHeader className="text-center pb-6 pt-10">
          <CardTitle className="text-[10px] font-black text-primary uppercase tracking-[0.6em]">Professional Real-Time Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-10 px-10 pb-12">
          <div className="relative p-10 bg-white rounded-[3.5rem] shadow-inner ring-1 ring-white/20 group-hover:scale-[1.03] transition-transform duration-1000 ease-out qr-canvas-shadow">
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[6px] rounded-[3.5rem] flex items-center justify-center">
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
              Get 1024px PNG
            </Button>
            
            <div className="grid grid-cols-2 gap-5">
              <Button 
                variant="outline" 
                disabled={isGenerating}
                onClick={() => handleDownload('svg', 1024)} 
                className="bg-white/[0.02] border-white/10 hover:bg-white/[0.08] hover:text-white h-16 rounded-[1.5rem] text-xs font-black tracking-widest uppercase transition-all"
              >
                <FileCode className="w-4 h-4 mr-3 text-primary" />
                Vector SVG
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="bg-white/[0.02] border-white/10 hover:bg-white/[0.08] h-16 rounded-[1.5rem] text-xs font-black tracking-widest uppercase transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-3 text-primary" /> : <Copy className="w-4 h-4 mr-3" />}
                {copied ? 'Copied' : 'Copy Payload'}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out my custom QR from QR Canvas: ${state.data}`)}`, '_blank')}
              className="w-full bg-green-500/5 border-green-500/10 hover:bg-green-500/10 text-green-400 h-16 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Share via WhatsApp
            </Button>
          </div>
        </CardContent>
        <div className="bg-white/[0.01] border-t border-white/[0.05] p-8 text-center">
           <div className="flex items-center justify-center gap-3 text-muted-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
             <MonitorSmartphone className="w-4 h-4" />
             Verified Scannable: iOS 16+ & Android 13+
           </div>
        </div>
      </Card>
      
      {/* HISTORY ENGINE */}
      {history.length > 0 && (
        <Card className="glass-card animate-in slide-in-from-right-10 duration-1000 shadow-2xl">
          <CardHeader className="py-6 px-8 border-b border-white/[0.05] flex flex-row items-center justify-between bg-white/[0.01]">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-white/80">
              <History className="w-5 h-5 text-primary" /> Recent Brand Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/[0.05]">
              {history.map((item) => (
                <div key={item.id} className="px-8 py-5 hover:bg-white/[0.04] transition-all group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-5 overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary ring-1 ring-white/5 group-hover:ring-primary/40 transition-all duration-500">
                       {item.type === 'WiFi' ? <Wifi className="w-6 h-6" /> : item.type === 'vCard' ? <Contact className="w-6 h-6" /> : item.type === 'Phone' ? <Phone className="w-6 h-6" /> : <Link2 className="w-6 h-6" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate max-w-[200px]">{item.data}</p>
                      <p className="text-[9px] text-muted-foreground/40 uppercase font-black tracking-tighter mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ADSENSE PLACEHOLDER: PREMIUM SIDEBAR */}
      <div className="w-full h-56 glass-card rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-5 group relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="w-16 h-1.5 bg-primary/10 rounded-full mb-2 group-hover:w-24 transition-all duration-700" />
        <span className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.8em] font-black">Monetization Display</span>
        <p className="text-[11px] text-muted-foreground/40 leading-relaxed italic max-w-[240px] font-medium uppercase tracking-tight">Optimized for high-yield programmatic ad networks.</p>
        <ArrowUpRight className="w-4 h-4 text-primary/20 group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
}
