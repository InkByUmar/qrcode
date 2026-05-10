"use client"

import React from 'react';
import { QRState, QRErrorCorrectionLevel } from '@/lib/qr-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Smartphone, 
  Shield,
  LayoutGrid
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ variant: "destructive", title: "File too large", description: "Logo must be under 2MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => updateState({ logo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleAIRefine = async () => {
    if (!state.data) return;
    setIsRefining(true);
    try {
      const refined = await qrContentRefiner(state.data);
      updateState({ data: refined });
      toast({ title: "Optimized!", description: "Content has been refined by AI." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "AI Optimization failed." });
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/[0.02] backdrop-blur-md border-white/10 shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <span className="p-2.5 bg-primary/15 rounded-xl text-primary ring-1 ring-primary/20">
              <LayoutGrid className="w-5 h-5" />
            </span>
            Step 1: Select Type & Enter Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={state.type} onValueChange={(val) => updateState({ type: val as any, data: '' })} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
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
                  className="flex-1 min-w-[80px] py-2.5 bg-white/5 border border-white/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-xl"
                >
                  <tab.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="space-y-6 min-h-[200px]">
              {state.type === 'WiFi' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-2">
                    <Label>Network SSID</Label>
                    <Input placeholder="Home Wi-Fi" value={state.wifi.ssid} onChange={e => updateState({ wifi: { ...state.wifi, ssid: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="••••••••" value={state.wifi.password} onChange={e => updateState({ wifi: { ...state.wifi, password: e.target.value } })} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Encryption Type</Label>
                    <Select value={state.wifi.encryption} onValueChange={val => updateState({ wifi: { ...state.wifi, encryption: val as any } })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2 (Recommended)</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">None (Open)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : state.type === 'vCard' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" value={state.vCard.firstName} onChange={e => updateState({ vCard: { ...state.vCard, firstName: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" value={state.vCard.lastName} onChange={e => updateState({ vCard: { ...state.vCard, lastName: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    <Input placeholder="+92 300 1234567" value={state.vCard.mobile} onChange={e => updateState({ vCard: { ...state.vCard, mobile: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" value={state.vCard.email} onChange={e => updateState({ vCard: { ...state.vCard, email: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input placeholder="Tech Corp" value={state.vCard.organization} onChange={e => updateState({ vCard: { ...state.vCard, organization: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input placeholder="Developer" value={state.vCard.jobTitle} onChange={e => updateState({ vCard: { ...state.vCard, jobTitle: e.target.value } })} />
                  </div>
                </div>
              ) : state.type === 'Email' ? (
                 <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-2">
                      <Label>Recipient Email</Label>
                      <Input placeholder="support@domain.com" value={state.email.address} onChange={e => updateState({ email: { ...state.email, address: e.target.value } })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input placeholder="Hello" value={state.email.subject} onChange={e => updateState({ email: { ...state.email, subject: e.target.value } })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Message Body</Label>
                        <Input placeholder="Optional message..." value={state.email.body} onChange={e => updateState({ email: { ...state.email, body: e.target.value } })} />
                      </div>
                    </div>
                 </div>
              ) : (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Label>{state.type === 'URL' ? 'Website URL' : state.type === 'Phone' ? 'Phone Number' : 'Content'}</Label>
                  <Textarea 
                    placeholder={state.type === 'URL' ? 'https://example.com' : state.type === 'Phone' ? '+92 300 1234567' : 'Enter your text...'}
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className="min-h-[120px] bg-white/5 border-white/10 text-lg rounded-xl focus:ring-primary/50"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-primary border-primary/20 hover:bg-primary/10 hover:text-primary transition-all group"
                  onClick={handleAIRefine}
                  disabled={isRefining || !state.data || ['WiFi', 'vCard', 'Email'].includes(state.type)}
                >
                  <Sparkles className={`w-4 h-4 mr-2 ${isRefining ? 'animate-spin' : 'group-hover:rotate-12'}`} />
                  {isRefining ? 'AI Optimizing...' : 'Optimize Content with AI'}
                </Button>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Auto-Saving...</p>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/[0.02] border-white/10 shadow-xl">
          <CardHeader className="py-4 border-b border-white/5">
            <CardTitle className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" /> Matrix Styling
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">Dot Style</Label>
                 <Select value={state.dotStyle} onValueChange={val => updateState({ dotStyle: val as any })}>
                    <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                      <SelectItem value="rounded">Soft Rounded</SelectItem>
                      <SelectItem value="classy">Classy Dots</SelectItem>
                      <SelectItem value="square">Modern Square</SelectItem>
                      <SelectItem value="dots">Pixel Dots</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">Corners</Label>
                 <Select value={state.cornerStyle} onValueChange={val => updateState({ cornerStyle: val as any })}>
                    <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rounded">Circular</SelectItem>
                      <SelectItem value="dot">Soft Corner</SelectItem>
                      <SelectItem value="square">Standard</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold">Dots Color</Label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={state.fgColor} 
                    onChange={(e) => updateState({ fgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer rounded-lg overflow-hidden"
                  />
                  <Input value={state.fgColor} onChange={(e) => updateState({ fgColor: e.target.value })} className="flex-1 font-mono text-xs h-9 uppercase" />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold">Bg Color</Label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={state.bgColor} 
                    onChange={(e) => updateState({ bgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer rounded-lg overflow-hidden"
                  />
                  <Input value={state.bgColor} onChange={(e) => updateState({ bgColor: e.target.value })} className="flex-1 font-mono text-xs h-9 uppercase" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/10 shadow-xl">
          <CardHeader className="py-4 border-b border-white/5">
             <CardTitle className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" /> Logo & Reliability
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-dashed border-white/10 group hover:border-primary/30 transition-colors">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden bg-black/40 ring-1 ring-white/10">
                    {state.logo ? (
                      <img src={state.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                    ) : (
                      <Upload className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  {state.logo && (
                    <button 
                      onClick={() => updateState({ logo: null })}
                      className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-xl hover:scale-110 transition-transform"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="logo-upload" className="cursor-pointer block text-xs font-bold text-white/90 hover:text-primary transition-colors">
                    {state.logo ? 'Change Brand Logo' : 'Upload Center Logo'}
                  </Label>
                  <p className="text-[9px] text-muted-foreground mt-1 uppercase">PNG/JPG under 2MB</p>
                  <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </div>
              </div>

              {state.logo && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] uppercase font-bold">Logo Scale</Label>
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

            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <Shield className="w-4 h-4 text-primary" />
                <div>
                   <p className="text-[10px] text-primary font-black uppercase tracking-tighter">Enterprise Scannability</p>
                   <p className="text-[9px] text-primary/70">Level {state.errorLevel} Error Correction Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
