"use client"

import React, { useEffect, useRef, useState } from 'react';
import { QRState, QRHistoryItem } from '@/lib/qr-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileCode, 
  Loader2, 
  History, 
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
  MessageSquare,
  Zap,
  ShieldCheck
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
  const isHighDensity = dataLength > 300 || state.backgroundImage || state.logo;

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Background Processor
  useEffect(() => {
    if (!state.backgroundImage) {
      setProcessedBg(null);
      return;
    }

    const process = async () => {
      try {
        const img = await loadImage(state.backgroundImage!);
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          ctx.globalAlpha = state.backgroundOpacity;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          setProcessedBg(canvas.toDataURL('image/png'));
        }
      } catch (e) {
        console.error("Background processing failed", e);
      }
    };
    process();
  }, [state.backgroundImage, state.backgroundOpacity]);

  const getQrConfig = (size: number = 400) => {
    const errorCorrection = isHighDensity ? 'H' : state.errorLevel;
    
    return {
      width: size,
      height: size,
      type: 'canvas' as const,
      data: state.data || ' ',
      image: state.logo || '',
      margin: 20,
      dotsOptions: { color: state.fgColor, type: state.dotStyle },
      cornersSquareOptions: { type: state.cornerStyle, color: state.fgColor },
      cornersDotOptions: { type: state.cornerStyle === 'rounded' ? 'dot' : state.cornerStyle, color: state.fgColor },
      backgroundOptions: { color: 'transparent' },
      imageOptions: { 
        crossOrigin: 'anonymous', 
        margin: 15,
        imageSize: state.logoSize,
        hideBackgroundDots: true 
      },
      qrOptions: { errorCorrectionLevel: errorCorrection }
    };
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.QRCodeStyling && qrRef.current) {
      setIsGenerating(true);
      const config = getQrConfig(800);

      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new window.QRCodeStyling(config);
        qrCodeInstance.current.append(qrRef.current);
      } else {
        qrCodeInstance.current.update(config);
      }
      
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
      }
      
      const timer = setTimeout(() => setIsGenerating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [state, processedBg]);

  const handleDownload = async (ext: 'png' | 'svg', resolution: number) => {
    if (!qrCodeInstance.current) return;
    setIsGenerating(true);
    
    try {
      if (ext === 'svg') {
        // Native library download for pure SVG
        await qrCodeInstance.current.download({ name: 'qrcanvas', extension: 'svg' });
      } else {
        // High-res manual composite for PNG (handles background correctly)
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = resolution;
        finalCanvas.height = resolution;
        const ctx = finalCanvas.getContext('2d');
        
        if (!ctx) throw new Error("Canvas context failed");

        // 1. Draw Background
        if (processedBg) {
          const bgImg = await loadImage(processedBg);
          ctx.drawImage(bgImg, 0, 0, resolution, resolution);
        } else {
          ctx.fillStyle = state.bgColor;
          ctx.fillRect(0, 0, resolution, resolution);
        }

        // 2. Draw Pattern
        const qrBlob = await qrCodeInstance.current.getRawData('png');
        const qrImg = await loadImage(URL.createObjectURL(qrBlob));
        ctx.drawImage(qrImg, 0, 0, resolution, resolution);

        // 3. Export
        const link = document.createElement('a');
        link.download = `qrcanvas-${Date.now()}.png`;
        link.href = finalCanvas.toDataURL('image/png', 1.0);
        link.click();
      }
      
      onDownload();
      toast({ title: "Export Ready", description: "Your branded asset has been saved." });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Export Failed", description: "An error occurred during rendering." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyData = () => {
    if (!state.data) return;
    navigator.clipboard.writeText(state.data);
    setCopied(true);
    toast({ title: "Copied", description: "Content ready for clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="glass-card relative overflow-hidden group shadow-2xl transition-all border-white/10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className="text-[10px] font-black text-primary uppercase tracking-[0.5em] flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 fill-primary/20" />
            Studio Rendering
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8 px-8 pb-10">
          <div className="relative p-5 bg-white rounded-[2.5rem] shadow-2xl ring-4 ring-white/10 group-hover:scale-[1.01] transition-transform duration-700 ease-out qr-canvas-shadow overflow-hidden">
            {processedBg ? (
              <div 
                className="absolute inset-5 z-0 rounded-xl bg-cover bg-center overflow-hidden transition-all duration-500"
                style={{ backgroundImage: `url(${processedBg})` }}
              />
            ) : (
              <div 
                className="absolute inset-5 z-0 rounded-xl transition-all duration-500"
                style={{ backgroundColor: state.bgColor }}
              />
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-black/10 backdrop-blur-[1px] rounded-[2.5rem] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
            
            <div ref={qrRef} className="relative z-10 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] flex items-center justify-center overflow-hidden rounded-xl" />
          </div>

          <div className="w-full space-y-4">
            {isHighDensity && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-[10px] text-primary font-black uppercase tracking-wider">Reliability Active</p>
                  <p className="text-[9px] text-white/50 font-bold uppercase">Level H Optimized</p>
                </div>
              </div>
            )}

            <Button 
              onClick={() => handleDownload('png', 1024)} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-16 rounded-2xl flex items-center justify-center gap-4 text-xl shadow-xl transition-all"
            >
              <Download className="w-6 h-6" />
              Download PNG
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                disabled={isGenerating}
                onClick={() => handleDownload('svg', 1024)} 
                className="bg-white/5 border-white/10 hover:bg-white/15 h-14 rounded-xl text-[10px] font-black tracking-widest uppercase"
              >
                <FileCode className="w-4 h-4 mr-2 text-primary" />
                SVG Vector
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCopyData}
                className="bg-white/5 border-white/10 hover:bg-white/15 h-14 rounded-xl text-[10px] font-black tracking-widest uppercase"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Data
              </Button>
            </div>
          </div>
        </CardContent>
        <div className="bg-white/[0.03] border-t border-white/[0.1] p-5">
           <div className="flex items-center justify-center gap-3 text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
             <MonitorSmartphone className="w-4 h-4" />
             Verified Scannable
           </div>
        </div>
      </Card>
      
      {history.length > 0 && (
        <Card className="glass-card shadow-2xl border-white/10 overflow-hidden">
          <CardHeader className="py-4 px-6 border-b border-white/[0.05] flex flex-row items-center justify-between bg-white/[0.02]">
            <CardTitle className="text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white">
              <History className="w-4 h-4 text-primary" /> Studio History
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearHistory}
              className="h-7 text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-destructive transition-all border border-white/10 rounded-lg"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/[0.05]">
              {history.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-white/[0.05] transition-all group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/40 transition-all">
                       {item.type === 'WiFi' ? <Wifi className="w-4 h-4" /> : item.type === 'vCard' ? <Contact className="w-4 h-4" /> : item.type === 'WhatsApp' ? <MessageSquare className="w-4 h-4" /> : item.type === 'Phone' ? <Phone className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-white truncate max-w-[140px]">{item.data}</p>
                      <p className="text-[8px] text-white/30 uppercase font-black tracking-widest mt-0.5">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
