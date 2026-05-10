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
  Zap,
  MousePointer2
} from 'lucide-react';
import { qrContentRefiner } from '@/ai/flows/qr-content-refiner-flow';
import { useToast } from '@/hooks/use-toast';

interface QrFormSectionProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

export function QrFormSection({ state, updateState }: QrFormSectionProps) {
  const { toast } = useToast();
  const [isRefining, setIsRefining] = React.useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'backgroundImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast({ variant: "destructive", title: "File too large", description: "Image must be under 3MB for high-performance rendering." });
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
      const refined = await qrContentRefiner(state.data);
      updateState({ data: refined });
      toast({ title: "Content Optimized", description: "AI has polished your QR data for better impact." });
    } catch (err) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not optimize content at this time." });
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* STEP 1: CONTENT */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-6 border-b border-white/[0.05]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
                <LayoutGrid className="w-5 h-5" />
              </div>
              Select Content Type
            </CardTitle>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Real-time Engine</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Tabs value={state.type} onValueChange={(val) => updateState({ type: val as any })} className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-transparent p-0 mb-8 h-auto">
              {[
                { id: 'URL', icon: Link2, label: 'URL' },
                { id: 'Text', icon: Type, label: 'Text' },
                { id: 'Phone', icon: Phone, label: 'Phone' },
                { id: 'Email', icon: Mail, label: 'Email' },
                { id: 'WiFi', icon: Wifi, label: 'WiFi' },
                { id: 'vCard', icon: Contact, label: 'vCard' },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="flex flex-col gap-2 py-3 bg-white/[0.03] border border-white/[0.05] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-2xl hover:bg-white/[0.08]"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[200px]">
              {state.type === 'WiFi' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Network SSID</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="My Wi-Fi Network" value={state.wifi.ssid} onChange={e => updateState({ wifi: { ...state.wifi, ssid: e.target.value } })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</Label>
                    <Input className="h-12 bg-white/[0.03]" type="password" placeholder="••••••••" value={state.wifi.password} onChange={e => updateState({ wifi: { ...state.wifi, password: e.target.value } })} />
                  </div>
                  <div className="space-y-3 sm:col-span-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Encryption Method</Label>
                    <Select value={state.wifi.encryption} onValueChange={val => updateState({ wifi: { ...state.wifi, encryption: val as any } })}>
                      <SelectTrigger className="h-12 bg-white/[0.03]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2/WPA3 (Standard)</SelectItem>
                        <SelectItem value="WEP">WEP (Legacy)</SelectItem>
                        <SelectItem value="nopass">None (Open Network)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : state.type === 'vCard' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First Name</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="John" value={state.vCard.firstName} onChange={e => updateState({ vCard: { ...state.vCard, firstName: e.target.value } })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Name</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="Doe" value={state.vCard.lastName} onChange={e => updateState({ vCard: { ...state.vCard, lastName: e.target.value } })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mobile Number</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="+1 (555) 000-0000" value={state.vCard.mobile} onChange={e => updateState({ vCard: { ...state.vCard, mobile: e.target.value } })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Work Email</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="john.doe@company.com" value={state.vCard.email} onChange={e => updateState({ vCard: { ...state.vCard, email: e.target.value } })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Company</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="Tech Global" value={state.vCard.organization} onChange={e => updateState({ vCard: { ...state.vCard, organization: e.target.value } })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Position</Label>
                    <Input className="h-12 bg-white/[0.03]" placeholder="Creative Director" value={state.vCard.jobTitle} onChange={e => updateState({ vCard: { ...state.vCard, jobTitle: e.target.value } })} />
                  </div>
                </div>
              ) : state.type === 'Email' ? (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recipient Address</Label>
                      <Input className="h-12 bg-white/[0.03]" placeholder="support@brand.com" value={state.email.address} onChange={e => updateState({ email: { ...state.email, address: e.target.value } })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject Line</Label>
                        <Input className="h-12 bg-white/[0.03]" placeholder="Inquiry" value={state.email.subject} onChange={e => updateState({ email: { ...state.email, subject: e.target.value } })} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Default Message</Label>
                        <Input className="h-12 bg-white/[0.03]" placeholder="Hi team..." value={state.email.body} onChange={e => updateState({ email: { ...state.email, body: e.target.value } })} />
                      </div>
                    </div>
                 </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {state.type === 'URL' ? 'Website URL' : state.type === 'Phone' ? 'Phone Number' : 'Raw Content'}
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-[10px] uppercase font-bold tracking-widest text-primary hover:bg-primary/10"
                      onClick={handleAIRefine}
                      disabled={isRefining || !state.data || ['WiFi', 'vCard', 'Email'].includes(state.type)}
                    >
                      <Zap className={`w-3 h-3 mr-1.5 ${isRefining ? 'animate-spin' : ''}`} />
                      {isRefining ? 'Processing...' : 'AI Refine'}
                    </Button>
                  </div>
                  <Textarea 
                    placeholder={state.type === 'URL' ? 'https://yourwebsite.com' : state.type === 'Phone' ? '+1 234 567 8900' : 'Type or paste content...'}
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className="min-h-[140px] bg-white/[0.03] border-white/[0.1] text-lg rounded-2xl focus:ring-primary/30 p-5 leading-relaxed"
                  />
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* STEP 2: STYLING & BRANDING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DESIGN MATRIX */}
        <Card className="glass-card">
          <CardHeader className="border-b border-white/[0.05]">
            <CardTitle className="text-sm font-headline uppercase tracking-[0.2em] flex items-center gap-3">
              <Palette className="w-4 h-4 text-primary" /> Matrix Styling
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Dot Engine</Label>
                 <Select value={state.dotStyle} onValueChange={val => updateState({ dotStyle: val as any })}>
                    <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.05]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                      <SelectItem value="rounded">Soft Flow</SelectItem>
                      <SelectItem value="classy">Classy Dots</SelectItem>
                      <SelectItem value="square">Modern Block</SelectItem>
                      <SelectItem value="dots">Pixel Perfect</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div className="space-y-3">
                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Eye Style</Label>
                 <Select value={state.cornerStyle} onValueChange={val => updateState({ cornerStyle: val as any })}>
                    <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.05]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rounded">Circular Eye</SelectItem>
                      <SelectItem value="dot">Soft Corner</SelectItem>
                      <SelectItem value="square">Sharp Edge</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Matrix Color</Label>
                  <span className="text-[10px] font-mono text-primary uppercase">{state.fgColor}</span>
                </div>
                <div className="flex items-center gap-4">
                   <div 
                     className="w-12 h-12 rounded-xl border border-white/[0.1] relative overflow-hidden group cursor-pointer"
                     style={{ backgroundColor: state.fgColor }}
                   >
                     <input 
                       type="color" 
                       value={state.fgColor} 
                       onChange={(e) => updateState({ fgColor: e.target.value })}
                       className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150"
                     />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                       <MousePointer2 className="w-3 h-3 text-white" />
                     </div>
                   </div>
                   <Input 
                     value={state.fgColor} 
                     onChange={(e) => updateState({ fgColor: e.target.value })} 
                     className="flex-1 font-mono text-xs h-11 bg-white/[0.03] border-white/[0.05]" 
                   />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-[10px] uppercase font-bold tracking-widest ${state.backgroundImage ? 'text-muted-foreground/30' : 'text-muted-foreground'}`}>Canvas Background</Label>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">{state.backgroundImage ? 'Image Priority' : state.bgColor}</span>
                </div>
                <div className="flex items-center gap-4">
                   <div 
                     className={`w-12 h-12 rounded-xl border border-white/[0.1] relative overflow-hidden group ${state.backgroundImage ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                     style={{ backgroundColor: state.bgColor }}
                   >
                     {!state.backgroundImage && (
                       <input 
                         type="color" 
                         value={state.bgColor} 
                         onChange={(e) => updateState({ bgColor: e.target.value })}
                         className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150"
                       />
                     )}
                   </div>
                   <Input 
                     value={state.bgColor} 
                     disabled={!!state.backgroundImage}
                     onChange={(e) => updateState({ bgColor: e.target.value })} 
                     className="flex-1 font-mono text-xs h-11 bg-white/[0.03] border-white/[0.05] disabled:opacity-20" 
                   />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BRANDING SUITE */}
        <Card className="glass-card">
          <CardHeader className="border-b border-white/[0.05]">
             <CardTitle className="text-sm font-headline uppercase tracking-[0.2em] flex items-center gap-3">
              <Shield className="w-4 h-4 text-primary" /> Visual Branding
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="space-y-6">
              {/* Logo Manager */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] group transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden bg-black/60 border border-white/10 group-hover:border-primary/40 transition-colors">
                      {state.logo ? (
                        <img src={state.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                      ) : (
                        <Upload className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    {state.logo && (
                      <button 
                        onClick={() => updateState({ logo: null })}
                        className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-all z-10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="logo-upload" className="cursor-pointer block text-xs font-bold text-white tracking-wide hover:text-primary transition-colors">
                      {state.logo ? 'Change Center Logo' : 'Upload Center Logo'}
                    </Label>
                    <p className="text-[9px] text-muted-foreground/60 mt-1 uppercase tracking-tighter">PNG / SVG • MAX 2MB</p>
                    <input id="logo-upload" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="hidden" />
                  </div>
                </div>
                {state.logo && (
                  <div className="mt-6 space-y-3 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Logo Size Scaling</Label>
                      <span className="text-[10px] font-mono text-primary">{(state.logoSize * 100).toFixed(0)}%</span>
                    </div>
                    <Slider 
                      value={[state.logoSize * 100]} 
                      min={15} max={45} step={1} 
                      onValueChange={(val) => updateState({ logoSize: val[0] / 100 })} 
                    />
                  </div>
                )}
              </div>

              {/* Background Manager */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] group transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden bg-black/60 border border-white/10 group-hover:border-primary/40 transition-colors">
                      {state.backgroundImage ? (
                        <img src={state.backgroundImage} alt="BG" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    {state.backgroundImage && (
                      <button 
                        onClick={() => updateState({ backgroundImage: null })}
                        className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-all z-10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="bg-upload" className="cursor-pointer block text-xs font-bold text-white tracking-wide hover:text-primary transition-colors">
                      {state.backgroundImage ? 'Change Background' : 'Upload Full Background'}
                    </Label>
                    <p className="text-[9px] text-muted-foreground/60 mt-1 uppercase tracking-tighter">HD Photos • 1:1 Recommended</p>
                    <input id="bg-upload" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'backgroundImage')} className="hidden" />
                  </div>
                </div>
                {state.backgroundImage && (
                  <div className="mt-6 space-y-3 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Background Density</Label>
                      <span className="text-[10px] font-mono text-primary">{(state.backgroundOpacity * 100).toFixed(0)}%</span>
                    </div>
                    <Slider 
                      value={[state.backgroundOpacity * 100]} 
                      min={30} max={100} step={1} 
                      onValueChange={(val) => updateState({ backgroundOpacity: val[0] / 100 })} 
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-1">
                 <p className="text-[11px] text-primary font-black uppercase tracking-wider">Enterprise Scannability</p>
                 <p className="text-[10px] text-primary/60 leading-relaxed">
                  {(state.logo || state.backgroundImage) 
                    ? 'Level H Error Correction is active to ensure the code scans perfectly despite visual branding.' 
                    : `Current Error Correction: Level ${state.errorLevel} (Standard Performance)`}
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
