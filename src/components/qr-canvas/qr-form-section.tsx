
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
  MousePointer2,
  RotateCcw,
  Zap,
  Eye,
  Paintbrush,
  Star,
  Youtube,
  Search
} from 'lucide-react';
import { qrContentRefiner } from '@/ai/flows/qr-content-refiner-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QrFormSectionProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

const TEMPLATES = [
  { id: 'image-qr', label: 'Visual Brand', type: 'URL', data: 'https://brand.visual', color: '#26EA56', dotStyle: 'rounded' },
  { id: 'whatsapp', label: 'WhatsApp Connect', type: 'WhatsApp', whatsapp: { phone: '+1234567890', message: 'Hi! Let\'s connect.' }, color: '#25D366' },
  { id: 'youtube', label: 'YouTube Channel', type: 'URL', data: 'https://youtube.com/@channel', color: '#FF0000' },
  { id: 'google-review', label: 'Google Review', type: 'URL', data: 'https://g.page/review/brand', color: '#4285F4' },
];

export function QrFormSection({ state, updateState }: QrFormSectionProps) {
  const { toast } = useToast();
  const [isRefining, setIsRefining] = React.useState(false);

  const dataLength = state.data?.length || 0;
  const isTooLong = dataLength > 800;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'backgroundImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ variant: "destructive", title: "File Too Large", description: "Image size limit is 5MB." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => updateState({ [field]: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleAIRefine = async () => {
    if (!state.data) return;
    setIsRefining(true);
    try {
      const refined = await qrContentRefiner({ text: state.data });
      updateState({ data: refined });
      toast({ title: "AI Optimization Complete", description: "Your payload is now more scannable." });
    } catch (err) {
      toast({ variant: "destructive", title: "AI Busy", description: "Could not refine content at this time." });
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
      backgroundOpacity: 1.0,
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
    toast({ title: "Studio Reset", description: "All parameters restored to default." });
  };

  return (
    <div className="space-y-10">
      {/* PREMIUM TEMPLATE SECTION */}
      <Card className="glass-card border-white/10 overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <CardHeader className="py-6 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                  Brand Studio Templates
                </CardTitle>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="h-8 text-[9px] uppercase font-black tracking-[0.2em] text-white/40 hover:text-white transition-all border border-white/10 rounded-lg px-4"
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
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden"
              >
                <div 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg border border-white/10"
                  style={{ color: t.color }}
                >
                   {t.id === 'image-qr' ? <ImageIcon className="w-5 h-5" /> : 
                   t.id === 'whatsapp' ? <MessageSquare className="w-5 h-5" /> : 
                   t.id === 'youtube' ? <Youtube className="w-5 h-5" /> :
                   <Search className="w-5 h-5" />}
                </div>
                <span className="text-[10px] font-bold text-center leading-tight text-white/50 group-hover:text-white transition-colors">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CORE DATA SECTION */}
      <Card className="glass-card border-white/10 shadow-2xl overflow-hidden">
        <CardHeader className="pb-8 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/40">
                <LayoutGrid className="w-6 h-6" />
              </div>
              Select Data Payload
            </CardTitle>
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Studio Active</span>
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
                  className="flex flex-col gap-2.5 py-4 bg-white/[0.02] border border-white/[0.1] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-500 rounded-2xl hover:bg-white/10 group"
                >
                  <tab.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[200px]">
              {state.type === 'WhatsApp' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3.5">
                      <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Phone Number</Label>
                      <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" placeholder="+1234567890" value={state.whatsapp.phone} onChange={e => updateState({ whatsapp: { ...state.whatsapp, phone: e.target.value } })} />
                    </div>
                    <div className="space-y-3.5">
                      <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Initial Message</Label>
                      <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" placeholder="Hi! I want to..." value={state.whatsapp.message} onChange={e => updateState({ whatsapp: { ...state.whatsapp, message: e.target.value } })} />
                    </div>
                  </div>
                </div>
              ) : state.type === 'WiFi' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3.5">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">SSID (Network Name)</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" placeholder="Home WiFi" value={state.wifi.ssid} onChange={e => updateState({ wifi: { ...state.wifi, ssid: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Password</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" type="password" placeholder="••••••••" value={state.wifi.password} onChange={e => updateState({ wifi: { ...state.wifi, password: e.target.value } })} />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
                      {state.type === 'URL' ? 'Destination URL' : 'Content Payload'}
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
                        AI Refine
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Enter URL or text content here..."
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className="min-h-[140px] bg-white/[0.03] border-white/10 text-lg rounded-3xl focus:ring-primary/40 p-6 text-white leading-relaxed resize-none"
                  />
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* VISUAL DESIGN MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="glass-card shadow-2xl border-white/10 relative overflow-hidden">
          <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
              <Palette className="w-5 h-5 text-primary" /> Chromatic Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-10">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-4">
                 <Label className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em]">Dot Geometry</Label>
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
                 <Label className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em]">Eye Style</Label>
                 <Select value={state.cornerStyle} onValueChange={val => updateState({ cornerStyle: val as any })}>
                    <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="rounded">Circular</SelectItem>
                      <SelectItem value="dot">Soft Corner</SelectItem>
                      <SelectItem value="square">Sharp</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                 <div className="w-14 h-14 rounded-xl border-2 border-white/10 relative overflow-hidden" style={{ backgroundColor: state.fgColor }}>
                   <input type="color" value={state.fgColor} onChange={(e) => updateState({ fgColor: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150" />
                 </div>
                 <div className="flex-1 space-y-1.5">
                   <Label className="text-[9px] uppercase font-black text-white/50 tracking-widest">Pattern Color</Label>
                   <Input value={state.fgColor} onChange={(e) => updateState({ fgColor: e.target.value })} className="font-mono h-10 bg-white/[0.03] border-white/10 rounded-lg text-white" />
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BRAND IDENTITY SUITE */}
        <Card className="glass-card shadow-2xl border-white/10 relative overflow-hidden">
          <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
             <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
               <Shield className="w-5 h-5 text-primary" /> Brand Identity Suite
             </CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-10">
            <div className="space-y-8">
              {/* Logo Manager */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center gap-6 group transition-all hover:bg-white/[0.05]">
                <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative">
                  {state.logo ? (
                    <img src={state.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <Upload className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1 space-y-3">
                  <Label className="text-sm font-bold text-white block">Embed Brand Icon</Label>
                  {state.logo && (
                    <div className="space-y-4">
                      <Slider value={[state.logoSize * 100]} min={15} max={45} step={1} onValueChange={(val) => updateState({ logoSize: val[0] / 100 })} />
                      <div className="flex justify-between text-[9px] font-black text-primary uppercase">
                        <span>Logo Scale</span>
                        <span>{(state.logoSize * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Background Manager - THE FIX */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center gap-6 group transition-all hover:bg-white/[0.05]">
                <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative">
                  {state.backgroundImage ? (
                    <img src={state.backgroundImage} alt="BG" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'backgroundImage')} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1 space-y-3">
                  <Label className="text-sm font-bold text-white block">Inject Background Image</Label>
                  {state.backgroundImage && (
                    <div className="space-y-4">
                      <Slider value={[state.backgroundOpacity * 100]} min={20} max={100} step={1} onValueChange={(val) => updateState({ backgroundOpacity: val[0] / 100 })} />
                      <div className="flex justify-between text-[9px] font-black text-primary uppercase">
                        <span>Image Density</span>
                        <span>{(state.backgroundOpacity * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
