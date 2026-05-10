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
  Clock, 
  Download, 
  Shield, 
  Wifi, 
  Contact, 
  Link2 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QrPreviewSectionProps {
  state: QRState;
  history: QRHistoryItem[];
  onSave: () => void;
}

declare global {
  interface Window {
    QRCodeStyling: any;
  }
}

export function QrPreviewSection({ state, history, onSave }: QrPreviewSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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
        dotsOptions: { color: state.fgColor, type: 'rounded' },
        backgroundOptions: { color: state.bgColor },
        imageOptions: { crossOrigin: 'anonymous', margin: 8, imageSize: 0.4 },
        qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: state.errorLevel }
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

  const handleDownload = async (ext: 'png' | 'svg' | 'jpeg') => {
    if (qrCodeInstance.current) {
      setIsGenerating(true);
      try {
        await qrCodeInstance.current.download({ 
          name: `qr-canvas-${Date.now()}`, 
          extension: ext,
          width: state.size,
          height: state.size
        });
        onSave(); // Save to history on download success
        toast({ title: "Success!", description: "QR code downloaded successfully." });
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this QR code I generated: ${state.data}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/[0.03] backdrop-blur-2xl border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.3em]">Live Canvas Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative group p-6 bg-white/[0.03] rounded-[2.5rem] border border-white/10 qr-preview-container transition-all hover:border-primary/40 min-h-[368px] flex items-center justify-center shadow-2xl">
            {isGenerating && (
              <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[4px] rounded-[2.5rem] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
            <div ref={qrRef} className="w-[320px] h-[320px] shadow-2xl rounded-xl overflow-hidden" />
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => handleDownload('png')} 
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-14 rounded-2xl flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Download className="w-6 h-6" />
                Export PNG ({state.size}px)
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  disabled={isGenerating}
                  onClick={() => handleDownload('svg')} 
                  className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white h-12 rounded-xl transition-all"
                >
                  <FileCode className="w-4 h-4 mr-2 text-primary" />
                  Vector SVG
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleWhatsAppShare}
                  className="bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400 h-12 rounded-xl"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Post-Download Ad Space */}
            <div className="w-full h-20 bg-white/5 rounded-xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden relative group">
               <span className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.4em] font-medium">Sponsor Ad (Download)</span>
               <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center justify-center gap-8 pt-4 border-t border-white/5">
              <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-help">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-help">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Fast Render</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-help">
                <Download className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Free</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* History Card */}
      {history.length > 0 && (
        <Card className="bg-white/[0.02] border-white/10 overflow-hidden">
          <CardHeader className="py-3 px-4 bg-white/5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <History className="w-4 h-4 text-primary" /> Recent History
            </CardTitle>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">LATEST 5</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {history.map((item) => (
                <div key={item.id} className="p-4 hover:bg-white/5 transition-colors group cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                       {item.type === 'WiFi' ? <Wifi className="w-4 h-4" /> : item.type === 'vCard' ? <Contact className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/90 truncate max-w-[140px]">{item.data}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(item.timestamp).toLocaleTimeString()}</p>
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

      {/* Dynamic Sidebar Ad */}
      <div className="w-full h-64 bg-[#1B2B1F]/30 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3 group overflow-hidden relative">
        <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest font-black">Advertisement</span>
        <div className="w-full h-px bg-white/10" />
        <p className="text-xs text-muted-foreground/50 leading-relaxed max-w-[180px]">Your brand could be here. Targeted reach for tech-savvy creators.</p>
        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
