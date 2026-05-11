"use client"

import React from 'react';
import { QRState } from '@/lib/qr-types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Link2, 
  Type, 
  Phone, 
  Mail, 
  Wifi, 
  Sparkles, 
  Upload, 
  X, 
  Contact, 
  Palette, 
  Shield,
  LayoutGrid,
  Image as ImageIcon,
  MessageSquare,
  RotateCcw,
  Zap,
  Eye,
  Star,
  Youtube,
  Search,
  CheckCircle2,
  Trash2,
  Layers,
  Box,
  Shapes
} from 'lucide-react';
import { qrContentRefiner } from '@/ai/flows/qr-content-refiner-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QrFormSectionProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

const TEMPLATES = [
  { id: 'image-qr', label: 'Artistic Brand', type: 'URL', data: 'https://brand.studio', color: '#26EA56', dotStyle: 'rounded' },
  { id: 'whatsapp', label: 'WhatsApp Connect', type: 'WhatsApp', whatsapp: { phone: '+1234567890', message: 'Hi! Let\'s connect.' }, color: '#25D366' },
  { id: 'youtube', label: 'YouTube Channel', type: 'URL', data: 'https://youtube.com/@brand', color: '#FF0000' },
  { id: 'google-review', label: 'Google Review', type: 'URL', data: 'https://g.page/review/brand', color: '#4285F4' },
];

export function QrFormSection({ state, updateState }: QrFormSectionProps) {
  const { toast } = useToast();
  const [isRefining, setIsRefining] = React.useState(false);

  const dataLength = state.data?.length || 0;

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

  const handleAIRefine = async () => {
    if (!state.data) return;
    setIsRefining(true);
    try {
      const refined = await qrContentRefiner({ text: state.data });
      updateState({ data: refined });
      toast({ title: "AI Optimization Complete", description: "Content refined for maximum impact." });
    } catch (err) {
      toast({ variant: "destructive", title: "AI Busy", description: "Could not optimize at this time." });
    } finally {
      setIsRefining(false);
    }
  };

  const applyTemplate = (template: any) => {
    updateState({
      type: template.type,
      data: template.data || '',
      fgColor: template.color || state.fgColor,
      dotStyle: template.dotStyle || state.dotStyle,
      ...(template.whatsapp && { whatsapp: template.whatsapp }),
    });
    toast({ title: "Template Applied", description: `Loading ${template.label} studio preset.` });
  };

  const handleReset = () => {
    updateState({
      data: 'https://google.com',
      logo: null,
      logoSize: 0.3,
      backgroundImage: null,
      backgroundOpacity: 0.5,
      fgColor: '#26EA56',
      bgColor: '#ffffff',
      type: 'URL',
      dotStyle: 'extra-rounded',
      cornerStyle: 'rounded',
      wifi: { ssid: '', password: '', encryption: 'WPA' },
      email: { address: '', subject: '', body: '' },
      whatsapp: { phone: '', message: '' },
      vCard: { firstName: '', lastName: '', mobile: '', email: '', organization: '', jobTitle: '', website: '' }
    });
    toast({ title: "Studio Reset", description: "Parameters restored to default." });
  };

  return (
    <div className="space-y-10">
      {/* QUICK PRESETS */}
      <Card className="glass-card border-white/10 overflow-hidden shadow-2xl relative">
        <CardHeader className="py-6 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 text-primary" />
              <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                Studio Presets
              </CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="h-8 text-[9px] uppercase font-black tracking-[0.2em] text-white/40 hover:text-white transition-all border border-white/10 rounded-lg"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Reset Studio
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-8 px-8 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t)}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all group-hover:scale-110 border border-white/10"
                  style={{ color: t.color }}
                >
                   {t.id === 'image-qr' ? <ImageIcon className="w-5 h-5" /> : 
                   t.id === 'whatsapp' ? <MessageSquare className="w-5 h-5" /> : 
                   t.id === 'youtube' ? <Youtube className="w-5 h-5" /> :
                   <Search className="w-5 h-5" />}
                </div>
                <span className="text-[10px] font-bold text-center leading-tight text-white/50 group-hover:text-white">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PAYLOAD SECTION */}
      <Card className="glass-card border-white/10 shadow-2xl overflow-hidden">
        <CardHeader className="pb-8 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/40">
                <LayoutGrid className="w-6 h-6" />
              </div>
              Data Payload
            </CardTitle>
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Engine Active</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-10">
          <Tabs value={state.type} onValueChange={(val) => updateState({ type: val as any })} className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-7 gap-3 bg-transparent p-0 mb-10 h-auto">
              {[
                { id: 'URL', icon: Link2, label: 'URL' },
                { id: 'Text', icon: Type, label: 'Text' },
                { id: 'WhatsApp', icon: MessageSquare, label: 'WhatsApp' },
                { id: 'Phone', icon: Phone, label: 'Phone' },
                { id: 'Email', icon: Mail, label: 'Email' },
                { id: 'WiFi', icon: Wifi, label: 'WiFi' },
                { id: 'vCard', icon: Contact, label: 'vCard' },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="flex flex-col gap-2.5 py-4 bg-white/[0.02] border border-white/[0.1] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-2xl"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[160px]">
              {state.type === 'WhatsApp' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in">
                  <div className="space-y-3.5">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">WhatsApp Number</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" placeholder="+1234567890" value={state.whatsapp.phone} onChange={e => updateState({ whatsapp: { ...state.whatsapp, phone: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Initial Message</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" placeholder="Hi! I'm interested..." value={state.whatsapp.message} onChange={e => updateState({ whatsapp: { ...state.whatsapp, message: e.target.value } })} />
                  </div>
                </div>
              ) : state.type === 'WiFi' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in">
                  <div className="space-y-3.5">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Network SSID</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" placeholder="Home Network" value={state.wifi.ssid} onChange={e => updateState({ wifi: { ...state.wifi, ssid: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">WiFi Password</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" type="password" placeholder="••••••••" value={state.wifi.password} onChange={e => updateState({ wifi: { ...state.wifi, password: e.target.value } })} />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
                      {state.type === 'URL' ? 'Destination Website' : 'Content Payload'}
                    </Label>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-white/30">{dataLength} chars</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-[9px] uppercase font-black tracking-[0.2em] text-primary border border-primary/20 rounded-xl"
                        onClick={handleAIRefine}
                        disabled={isRefining || !state.data || ['WiFi', 'vCard', 'WhatsApp'].includes(state.type)}
                      >
                        <Sparkles className={cn("w-3.5 h-3.5 mr-2", isRefining && "animate-spin")} />
                        Optimize Content
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Enter URL or text content here..."
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className="min-h-[120px] bg-white/[0.03] border-white/10 text-lg rounded-3xl focus:ring-primary/40 p-6 text-white leading-relaxed resize-none"
                  />
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* DESIGN MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="glass-card shadow-2xl border-white/10 relative overflow-hidden">
          <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
              <Palette className="w-5 h-5 text-primary" /> Technical Styling
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-10">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-4">
                 <Label className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em]">Dot Engine</Label>
                 <Select value={state.dotStyle} onValueChange={val => updateState({ dotStyle: val as any })}>
                    <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="extra-rounded">Lux Rounded</SelectItem>
                      <SelectItem value="rounded">Soft Flow</SelectItem>
                      <SelectItem value="classy">Classy Dots</SelectItem>
                      <SelectItem value="square">Standard</SelectItem>
                      <SelectItem value="dots">Pixel Flow</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div className="space-y-4">
                 <Label className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em]">Corner Geometry</Label>
                 <Select value={state.cornerStyle} onValueChange={val => updateState({ cornerStyle: val as any })}>
                    <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="rounded">Circular Eye</SelectItem>
                      <SelectItem value="dot">Soft Corner</SelectItem>
                      <SelectItem value="square">Sharp</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-4">
                 <Label className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em]">Matrix Color</Label>
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-8 h-8 rounded-lg relative overflow-hidden ring-1 ring-white/10" style={{ backgroundColor: state.fgColor }}>
                      <input type="color" value={state.fgColor} onChange={(e) => updateState({ fgColor: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer scale-150" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50">{state.fgColor}</span>
                 </div>
               </div>
               <div className="space-y-4">
                 <Label className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em]">Canvas Background</Label>
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-8 h-8 rounded-lg relative overflow-hidden ring-1 ring-white/10" style={{ backgroundColor: state.bgColor }}>
                      <input type="color" value={state.bgColor} onChange={(e) => updateState({ bgColor: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer scale-150" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50">{state.bgColor}</span>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* BRANDING SUITE */}
        <Card className="glass-card shadow-2xl border-white/10 relative overflow-hidden">
          <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
             <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
               <Shield className="w-5 h-5 text-primary" /> Brand Identity
             </CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-8">
              {/* Feature Map / Layer Guide */}
              <div className="p-5 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                <div className="flex items-center gap-3">
                   <Layers className="w-4 h-4 text-primary" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Studio Layer Map</h4>
                </div>
                <div className="flex gap-2 h-10">
                  <div className={cn("flex-1 rounded-lg border border-white/10 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter transition-all", state.backgroundImage ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-white/20")}>
                    <ImageIcon className="w-3 h-3" /> Background
                  </div>
                  <div className="flex-1 rounded-lg bg-primary/10 text-primary border border-primary/30 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter">
                    <Shapes className="w-3 h-3" /> Matrix
                  </div>
                  <div className={cn("flex-1 rounded-lg border border-white/10 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter transition-all", state.logo ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-white/20")}>
                    <Box className="w-3 h-3" /> Logo
                  </div>
                </div>
                <p className="text-[9px] text-white/40 font-medium italic leading-relaxed">
                  Tip: Background Layer is optimized for up to 50% density to ensure peak scannability.
                </p>
              </div>

              {/* Logo Manager */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center gap-6 group transition-all hover:bg-white/[0.05]">
                <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
                  {state.logo ? (
                    <img src={state.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <Upload className="w-6 h-6 text-white/10 group-hover:text-primary transition-colors" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-black text-white uppercase tracking-wider">Brand Icon</Label>
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

              {/* Background Manager */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center gap-6 group transition-all hover:bg-white/[0.05]">
                <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
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
                  {state.backgroundImage && (
                    <div className="space-y-3">
                      <Slider value={[state.backgroundOpacity * 100]} min={1} max={50} step={1} onValueChange={(val) => updateState({ backgroundOpacity: val[0] / 100 })} />
                      <div className="flex justify-between text-[9px] font-black text-primary uppercase">
                        <span>Image Intensity</span>
                        <span>{(state.backgroundOpacity * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
