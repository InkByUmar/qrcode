"use client"

import React from 'react';
import { QRState } from '@/lib/qr-types';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Upload, 
  Trash2, 
  ImageIcon, 
  Info, 
  Shapes, 
  Box, 
  Shield, 
  Cpu, 
  MousePointer2, 
  CheckCircle2 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QrBrandingControlsProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

export function QrBrandingControls({ state, updateState }: QrBrandingControlsProps) {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'backgroundImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ variant: "destructive", title: "File Too Large", description: "Standard limit is 5MB." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateState({ [field]: reader.result as string });
        toast({ title: "Asset Uploaded", description: `Brand ${field === 'logo' ? 'icon' : 'imagery'} integrated.` });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="glass-card shadow-2xl border-white/10 relative overflow-hidden">
      <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
         <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
           <Shield className="w-5 h-5 text-primary" /> Brand Identity Studio
         </CardTitle>
      </CardHeader>
      <CardContent className="pt-10 space-y-8">
          {/* Studio Guidance Hub */}
          <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-6">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                 <Info className="w-4 h-4" />
               </div>
               <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Studio Guidance Hub</h4>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                   <p className="text-[10px] font-black uppercase text-primary tracking-wider">Brand Icon</p>
                   <p className="text-[9px] text-white/40 leading-relaxed">Integrated at the center of the pattern. Hidden bits are compensated for via Level H error correction.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                   <p className="text-[10px] font-black uppercase text-primary tracking-wider">Background</p>
                   <p className="text-[9px] text-white/40 leading-relaxed">Artistic visuals integrated beneath the pattern. Density control ensures peak reliability.</p>
                </div>
             </div>

             <div className="flex gap-2 h-10">
                <div className={cn("flex-1 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter transition-all", state.backgroundImage ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-white/20")}>
                  <ImageIcon className="w-3 h-3" /> Background
                </div>
                <div className="flex-1 rounded-xl bg-primary/10 text-primary border border-primary/30 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter">
                  <Shapes className="w-3 h-3" /> Matrix
                </div>
                <div className={cn("flex-1 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter transition-all", state.logo ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-white/20")}>
                  <Box className="w-3 h-3" /> Logo
                </div>
             </div>
          </div>

          {/* Logo Manager */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center gap-6 group transition-all hover:bg-white/[0.05]">
            <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner shrink-0">
              {state.logo ? (
                <img src={state.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <Upload className="w-6 h-6 text-white/10 group-hover:text-primary transition-colors" />
              )}
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] font-black text-white uppercase tracking-wider">Brand Icon (Logo)</Label>
                {state.logo && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white/40 hover:text-destructive hover:bg-destructive/10 rounded-full"
                    onClick={() => updateState({ logo: null })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {state.logo && (
                <div className="space-y-3">
                  <Slider value={[state.logoSize * 100]} min={15} max={45} step={1} onValueChange={(val) => updateState({ logoSize: val[0] / 100 })} />
                  <div className="flex justify-between text-[9px] font-black text-primary uppercase">
                    <span>Icon Scale</span>
                    <span>{(state.logoSize * 100).toFixed(0)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Background Layer Intelligence */}
          <div className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/10 space-y-8 group transition-all hover:bg-white/[0.05]">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner shrink-0">
                {state.backgroundImage ? (
                  <img src={state.backgroundImage} alt="BG" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-white/10 group-hover:text-primary transition-colors" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'backgroundImage')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] font-black text-white uppercase tracking-wider">Background Layer</Label>
                  {state.backgroundImage && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/40 hover:text-destructive hover:bg-destructive/10 rounded-full"
                      onClick={() => updateState({ backgroundImage: null })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => updateState({ backgroundMode: 'auto' })}
                    className={cn("flex-1 h-10 rounded-xl border flex items-center justify-center gap-1.5 text-[8px] font-black uppercase tracking-wider transition-all px-2", state.backgroundMode === 'auto' ? "bg-primary text-primary-foreground border-primary" : "bg-white/5 border-white/10 text-white/40 hover:text-white")}
                   >
                     <Cpu className="w-3.5 h-3.5" /> Auto
                   </button>
                   <button 
                    onClick={() => updateState({ backgroundMode: 'manual' })}
                    className={cn("flex-1 h-10 rounded-xl border flex items-center justify-center gap-1.5 text-[8px] font-black uppercase tracking-wider transition-all px-2", state.backgroundMode === 'manual' ? "bg-primary text-primary-foreground border-primary" : "bg-white/5 border-white/10 text-white/40 hover:text-white")}
                   >
                     <MousePointer2 className="w-3.5 h-3.5" /> Manual
                   </button>
                </div>
              </div>
            </div>

            {state.backgroundImage && (
              <div className="space-y-6 pt-2">
                {state.backgroundMode === 'auto' ? (
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-4 animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-primary uppercase tracking-wider">Scannability Optimized</p>
                      <p className="text-[9px] text-white/40 font-medium">System has set density to 25% for peak reliability across all scanners.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center justify-between mb-2">
                       <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Intensity Control</Label>
                    </div>
                    <Slider 
                      value={[state.backgroundOpacity * 100]} 
                      min={1} 
                      max={50} 
                      step={1} 
                      onValueChange={(val) => updateState({ backgroundOpacity: val[0] / 100 })} 
                    />
                    <p className="text-[9px] text-white/30 font-medium italic text-center">
                      Manual limit: 50% to maintain enterprise scannability standards.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
      </CardContent>
    </Card>
  );
}
