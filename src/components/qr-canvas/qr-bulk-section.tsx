
"use client"

import React, { useState } from 'react';
import { QRState } from '@/lib/qr-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Layers, 
  Download, 
  Loader2, 
  CheckCircle2, 
  FileJson,
  AlertCircle,
  Settings2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JSZip from 'jszip';

interface QrBulkSectionProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

export function QrBulkSection({ state, updateState }: QrBulkSectionProps) {
  const { toast } = useToast();
  const [bulkData, setBulkData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBulkGenerate = async () => {
    const lines = bulkData.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) {
      toast({ variant: "destructive", title: "Empty Input", description: "Please enter at least one URL or text line." });
      return;
    }

    if (lines.length > 100) {
      toast({ variant: "destructive", title: "Batch Too Large", description: "Bulk processing is currently limited to 100 items for performance." });
      return;
    }

    if (typeof window === 'undefined' || !window.QRCodeStyling) {
      toast({ variant: "destructive", title: "Engine Error", description: "QR generation library not loaded." });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    const zip = new JSZip();

    try {
      for (let i = 0; i < lines.length; i++) {
        const data = lines[i];
        const config = {
          width: 1024,
          height: 1024,
          data: data,
          image: state.logo || '',
          dotsOptions: { color: state.fgColor, type: state.dotStyle },
          cornersSquareOptions: { type: state.cornerStyle, color: state.fgColor },
          backgroundOptions: { 
            color: state.backgroundImage ? 'transparent' : state.bgColor,
            image: state.backgroundImage || '' 
          },
          imageOptions: { margin: 12, imageSize: state.logoSize, hideBackgroundDots: true },
          qrOptions: { errorCorrectionLevel: 'H' }
        };

        const qrCode = new window.QRCodeStyling(config);
        const blob = await qrCode.getRawData('png');
        
        // Sanitize filename
        const filename = `${data.substring(0, 30).replace(/[^a-z0-9]/gi, '_') || 'qr'}_${i + 1}.png`;
        zip.file(filename, blob);
        
        setProgress(Math.round(((i + 1) / lines.length) * 100));
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `qr-bulk-export-${Date.now()}.zip`;
      link.click();

      toast({ title: "Bulk Export Ready", description: `Successfully bundled ${lines.length} high-res assets.` });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Export Failed", description: "An error occurred during batch generation." });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Card className="glass-card border-white/10 overflow-hidden">
        <CardHeader className="py-8 border-b border-white/[0.05] bg-white/[0.01]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/30 shadow-inner">
                <Layers className="w-6 h-6" />
              </div>
              Bulk QR Production
            </CardTitle>
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Multi-Core Engine</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-10 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Batch Data (One per line)</Label>
              <span className="text-[10px] font-mono text-muted-foreground/40">{bulkData.split('\n').filter(l => l.trim()).length} Items detected</span>
            </div>
            <Textarea 
              placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              className="min-h-[300px] bg-white/[0.02] border-white/10 text-lg rounded-3xl focus:ring-primary/40 p-8 leading-relaxed resize-none shadow-inner font-mono"
            />
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <div className="flex items-center gap-4 text-white/60">
              <Settings2 className="w-5 h-5 text-primary" />
              <p className="text-xs font-medium">Batch items will inherit all visual styles (Colors, Dots, Logo) from your active design.</p>
            </div>
            
            {isProcessing && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                  <span>Rendering Batch...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/5" />
              </div>
            )}

            <Button 
              onClick={handleBulkGenerate}
              disabled={isProcessing || !bulkData.trim()}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-4 text-lg shadow-xl shadow-primary/10 transition-all active:scale-95"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing {progress}%
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Generate & Download ZIP
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05]">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">High Res Output</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">All generated QR codes are 1024x1024px PNGs with full branding applied.</p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05]">
                <FileJson className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">Auto-Naming</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Files are automatically sanitized and named based on their source data.</p>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-500/80 font-medium">
          Note: Background images and logos significantly increase processing time. For batches over 50 items, please allow up to 30 seconds for the ZIP to prepare.
        </p>
      </div>
    </div>
  );
}
