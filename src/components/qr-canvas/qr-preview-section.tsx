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
  Phone
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
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.QRCodeStyling && qrRef.current) {
      setIsGenerating(true);
      
      const config = {
        width: 320,
        height: 320,
        type: 'svg' as const,
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
          image: state.backgroundImage || '',
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 0,
            imageSize: 1,
            opacity: state.backgroundOpacity
          }
        },
        imageOptions: { 
          crossOrigin: 'anonymous', 
          margin: 8, 
          imageSize: state.logoSize 
        },
        qrOptions: { 
          typeNumber: 0, 
          mode: 'Byte', 
          errorCorrectionLevel: state.errorLevel 
        }
      };

      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new window.QRCodeStyling(config);
        qrCodeInstance.current.append(qrRef.current);
      } else {
        qrCodeInstance.current.update(config);
      }
      
      const timer = setTimeout(() => setIsGenerating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleDownload = async (ext: 'png' | 'svg', resolution: number) => {
    if (qrCodeInstance.current) {
      setIsGenerating(true);
      try {
        await qrCodeInstance.current.download({ 
          name: `qr-canvas-${state.type.toLowerCase()}-${Date.now()}`, 
          extension: ext,
          width: resolution,
          height: resolution
        });
        onDownload();
        toast({ title: "Successfully Exported!", description: "High resolution QR code ready." });
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleCopyLink = () => {
    if (!state.data) return;
    navigator.clipboard.writeText(state.data);
    setCopied(true);
    toast({ title: "Copied!", description: "QR data copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this QR code I generated for ${state.type}: ${state.data}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/[0.03] backdrop-blur-2xl border-primary/20 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Professional Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative group p-6 bg-white rounded-[2.5rem] shadow-2xl ring-1 ring-white/10 transition-all hover:scale-[1.01] min-h-[368px] flex items-center justify-center overflow-hidden">
            {isGenerating && (
              <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] rounded-[2.5rem] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
            <div ref={qrRef} className="w-[320px] h-[320px] overflow-hidden" />
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => handleDownload('png', 1024)} 
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-14 rounded-2xl flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Download className="w-6 h-6" />
                Export 1024px PNG
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  disabled={isGenerating}
                  onClick={() => handleDownload('svg', 1024)} 
                  className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white h-12 rounded-xl transition-all"
                >
                  <FileCode className="w-4 h-4 mr-2 text-primary" />
                  Vector SVG
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  className="bg-white/5 border-white/10 hover:bg-white/10 h-12 rounded-xl transition-all"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied' : 'Copy Data'}
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleWhatsAppShare}
                className="w-full bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400 h-12 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Share to WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {history.length > 0 && (
        <Card className="bg-white/[0.02] border-white/10 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
          <CardHeader className="py-3 px-4 bg-white/5 flex flex-row items-center justify-between">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <History className="w-4 h-4 text-primary" /> Recent Exports
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {history.map((item) => (
                <div key={item.id} className="p-4 hover:bg-white/5 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                       {item.type === 'WiFi' ? <Wifi className="w-4 h-4" /> : item.type === 'vCard' ? <Contact className="w-4 h-4" /> : item.type === 'Phone' ? <Phone className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-white/90 truncate">{item.data}</p>
                      <p className="text-[9px] text-muted-foreground uppercase">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="w-full h-40 bg-[#1B2B1F]/30 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3 group overflow-hidden relative">
        <span className="text-[9px] text-muted-foreground/30 uppercase tracking-widest font-black">Advertisement Space</span>
        <div className="w-full h-px bg-white/10" />
        <p className="text-[10px] text-muted-foreground/40 leading-relaxed italic">Monetize your tool with high-quality targeted ads.</p>
        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
