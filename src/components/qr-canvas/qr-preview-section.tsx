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
  ChevronRight
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
      margin: 10, 
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
      
      const timer = setTimeout(() => setIsGenerating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [state, processedBg]);

  const handleDownload = async (ext: 'png' | 'svg', resolution: number) => {
    if (!qrCodeInstance.current) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      await qrCodeInstance.current.download({ 
        name: `qr-pro-${state.type.toLowerCase()}-${Date.now()}`, 
        extension: ext,
        width: resolution,
        height: resolution
      });
      onDownload();
      toast({ title: "Export Complete", description: "Your high-resolution asset is ready." });
    } catch (err) {
      toast({ variant: "destructive", title: "Export Error", description: "Failed to build high-res file." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (!state.data) return;
    navigator.clipboard.writeText(state.data);
    setCopied(true);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* PREMIUM PREVIEW CARD */}
      <Card className="glass-card relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-[11px] font-headline font-bold text-primary uppercase tracking-[0.5em]">Global Professional Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8 px-8">
          <div className="relative p-8 bg-white rounded-[3rem] shadow-2xl ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-500 qr-canvas-shadow">
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[4px] rounded-[3rem] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            )}
            <div ref={qrRef} className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center overflow-hidden rounded-xl" />
          </div>

          <div className="w-full space-y-4">
            <Button 
              onClick={() => handleDownload('png', 1024)} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-16 rounded-2xl flex items-center justify-center gap-4 text-xl shadow-lg transition-all hover:scale-[1.02] neon-glow active:scale-95"
            >
              <Download className="w-6 h-6" />
              Download 1024px PNG
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                disabled={isGenerating}
                onClick={() => handleDownload('svg', 1024)} 
                className="bg-white/[0.03] border-white/[0.1] hover:bg-white/[0.08] hover:text-white h-14 rounded-2xl text-sm font-bold tracking-wide transition-all"
              >
                <FileCode className="w-4 h-4 mr-2 text-primary" />
                Vector SVG
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="bg-white/[0.03] border-white/[0.1] hover:bg-white/[0.08] h-14 rounded-2xl text-sm font-bold tracking-wide transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy Data'}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this QR: ${state.data}`)}`, '_blank')}
              className="w-full bg-green-500/5 border-green-500/20 hover:bg-green-500/10 text-green-400 h-14 rounded-2xl font-bold transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Share via WhatsApp
            </Button>
          </div>
        </CardContent>
        <div className="bg-white/[0.02] border-t border-white/[0.05] p-6 text-center">
           <div className="flex items-center justify-center gap-3 text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest">
             <MonitorSmartphone className="w-3.5 h-3.5" />
             Scannable on iOS 15+ & Android 12+
           </div>
        </div>
      </Card>
      
      {/* HISTORY ENGINE */}
      {history.length > 0 && (
        <Card className="glass-card animate-in slide-in-from-right-8 duration-700">
          <CardHeader className="py-4 px-6 border-b border-white/[0.05] flex flex-row items-center justify-between bg-white/[0.02]">
            <CardTitle className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <History className="w-4 h-4 text-primary" /> Export History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/[0.05]">
              {history.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-white/[0.03] transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary ring-1 ring-white/5 group-hover:ring-primary/20 transition-all">
                       {item.type === 'WiFi' ? <Wifi className="w-5 h-5" /> : item.type === 'vCard' ? <Contact className="w-5 h-5" /> : item.type === 'Phone' ? <Phone className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-black text-white truncate max-w-[180px]">{item.data}</p>
                      <p className="text-[9px] text-muted-foreground/50 uppercase tracking-tighter mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ADSENSE PLACEHOLDER: SIDEBAR */}
      <div className="w-full h-48 glass-card rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 group">
        <div className="w-12 h-1 bg-primary/10 rounded-full mb-2 group-hover:w-20 transition-all" />
        <span className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.6em] font-black">Monetization Unit</span>
        <p className="text-[11px] text-muted-foreground/40 leading-relaxed italic max-w-[200px]">Strategic placement for revenue generation via top-tier ad networks.</p>
      </div>
    </div>
  );
}
