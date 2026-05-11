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
  Settings2,
  ArrowRight,
  ClipboardType,
  Palette,
  Archive
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
      {/* QUICK STEP GUIDE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border-white/10 space-y-3 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary border border-white/20">
            <ClipboardType className="w-5 h-5" />
          </div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-white">1. Input Data</h4>
          <p className="text-[11px] text-white/70 leading-relaxed font-medium">Paste your URLs or text strings, one per line, in the field below.</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border-white/10 space-y-3 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary border border-white/20">
            <Palette className="w-5 h-5" />
          </div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-white">2. Inherit Design</h4>
          <p className="text-[11px] text-white/70 leading-relaxed font-medium">The engine uses your current Logo and Colors from the Single QR tab.</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border-white/10 space-y-3 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary border border-white/20">
            <Archive className="w-5 h-5" />
          </div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-white">3. Export ZIP</h4>
          <p className="text-[11px] text-white/70 leading-relaxed font-medium">Download all generated high-res codes in a single organized bundle.</p>
        </div>
      </div>

      <Card className="glass-card border-white/20 shadow-2xl overflow-hidden">
        <CardHeader className="py-8 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/40 shadow-inner">
                <Layers className="w-6 h-6" />
              </div>
              Batch Production Engine
            </CardTitle>
            <div className="flex items-center gap-3">
               <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-glow" />
                  <span className="text-[9px] font-black tracking-widest text-primary uppercase">Active Preset Attached</span>
               </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-10 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Batch Payload</Label>
                <p className="text-[10px] text-white/40 font-bold uppercase">One link or text string per line</p>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/10 border border-white/20">
                <span className="text-[10px] font-mono text-primary font-black">{bulkData.split('\n').filter(l => l.trim()).length} Items</span>
              </div>
            </div>
            <Textarea 
              placeholder="https://google.com&#10;https://facebook.com&#10;https://instagram.com"
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              className="min-h-[250px] bg-white/[0.03] border-white/10 text-lg rounded-3xl focus:ring-primary/40 p-8 text-white leading-relaxed resize-none shadow-inner font-mono"
            />
          </div>

          <div className="p-8 rounded-[2rem] bg-white/10 border border-white/20 space-y-8 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 ring-1 ring-primary/40">
                <Settings2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">Dynamic Style Injection</h4>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  Every code in this batch will inherit your <span className="text-primary font-black">active design settings</span>: 
                  Colors ({state.fgColor}), Dot Style ({state.dotStyle}), and Brand Logo ({state.logo ? 'Active' : 'None'}).
                </p>
              </div>
            </div>
            
            {isProcessing && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                  <span className="flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Rendering Batch...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/10" />
              </div>
            )}

            <Button 
              onClick={handleBulkGenerate}
              disabled={isProcessing || !bulkData.trim()}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-4 text-lg shadow-xl shadow-primary/30 transition-all active:scale-95"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating {progress}%
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  Process & Export Bundle
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.1] hover:bg-white/[0.05] transition-colors group">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">Master Quality (1024px)</p>
                  <p className="text-[11px] text-white/60 leading-relaxed font-medium">Full high-resolution PNG assets suitable for print and billboard use.</p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.1] hover:bg-white/[0.05] transition-colors group">
                <FileJson className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">SEO-Friendly Naming</p>
                  <p className="text-[11px] text-white/60 leading-relaxed font-medium">Automatic file sanitization based on input content for better asset management.</p>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <p className="text-[11px] text-amber-500 font-black uppercase tracking-widest">Performance Warning</p>
          <p className="text-[11px] text-amber-500/80 font-bold leading-relaxed">
            Large batches with backgrounds or logos require significant CPU power. Do not close the browser while processing.
          </p>
        </div>
      </div>
    </div>
  );
}