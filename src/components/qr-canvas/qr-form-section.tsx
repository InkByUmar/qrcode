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
import { Link2, Type, Phone, Mail, Wifi, Sparkles, Upload, X, Contact, Palette, Smartphone, Shield } from 'lucide-react';
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
      const reader = new FileReader();
      reader.onloadend = () => updateState({ logo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleRefine = async () => {
    if (!state.data) return;
    setIsRefining(true);
    try {
      const refined = await qrContentRefiner(state.data);
      updateState({ data: refined });
      toast({ title: "Refined!", description: "Content optimized for readability." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Refinement failed." });
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
              <Type className="w-5 h-5" />
            </span>
            Enter QR Information
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
                  className="flex-1 min-w-[80px] py-2.5 bg-white/5 border border-white/5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all rounded-xl"
                >
                  <tab.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="space-y-6">
              {state.type === 'WiFi' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Network SSID</Label>
                    <Input placeholder="Home Wi-Fi" value={state.wifi?.ssid} onChange={e => updateState({ wifi: { ...state.wifi!, ssid: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="••••••••" value={state.wifi?.password} onChange={e => updateState({ wifi: { ...state.wifi!, password: e.target.value } })} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Encryption</Label>
                    <Select value={state.wifi?.encryption} onValueChange={val => updateState({ wifi: { ...state.wifi!, encryption: val as any } })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : state.type === 'vCard' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" value={state.vCard?.firstName} onChange={e => updateState({ vCard: { ...state.vCard!, firstName: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" value={state.vCard?.lastName} onChange={e => updateState({ vCard: { ...state.vCard!, lastName: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile</Label>
                    <Input placeholder="+1 234 567 890" value={state.vCard?.mobile} onChange={e => updateState({ vCard: { ...state.vCard!, mobile: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" value={state.vCard?.email} onChange={e => updateState({ vCard: { ...state.vCard!, email: e.target.value } })} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Organization</Label>
                    <Input placeholder="Company Name" value={state.vCard?.organization} onChange={e => updateState({ vCard: { ...state.vCard!, organization: e.target.value } })} />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea 
                    placeholder={state.type === 'URL' ? 'https://example.com' : 'Enter text here...'}
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className="min-h-[140px] bg-white/5 border-white/10 text-lg rounded-xl focus:ring-primary/50"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:bg-primary/10 hover:text-primary-foreground group"
                  onClick={handleRefine}
                  disabled={isRefining || !state.data || state.type === 'WiFi' || state.type === 'vCard'}
                >
                  <Sparkles className={`w-4 h-4 mr-2 ${isRefining ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
                  {isRefining ? 'Optimizing...' : 'Optimize Content with AI'}
                </Button>
                <p className="text-[10px] text-muted-foreground italic">Auto-generates as you type</p>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/[0.02] border-white/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/5 py-3 border-b border-white/5">
            <CardTitle className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" /> Design
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-xs uppercase text-muted-foreground font-bold tracking-tighter">Dots Color</Label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input 
                      type="color" 
                      value={state.fgColor} 
                      onChange={(e) => updateState({ fgColor: e.target.value })}
                      className="w-12 h-12 p-0 border-0 bg-transparent cursor-pointer rounded-full overflow-hidden shadow-lg shadow-black/20"
                    />
                  </div>
                  <Input 
                    value={state.fgColor} 
                    onChange={(e) => updateState({ fgColor: e.target.value })}
                    className="flex-1 font-mono uppercase text-xs h-9 bg-white/5 border-white/5"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs uppercase text-muted-foreground font-bold tracking-tighter">Bg Color</Label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={state.bgColor} 
                    onChange={(e) => updateState({ bgColor: e.target.value })}
                    className="w-12 h-12 p-0 border-0 bg-transparent cursor-pointer rounded-full overflow-hidden shadow-lg shadow-black/20"
                  />
                  <Input 
                    value={state.bgColor} 
                    onChange={(e) => updateState({ bgColor: e.target.value })}
                    className="flex-1 font-mono uppercase text-xs h-9 bg-white/5 border-white/5"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-tighter">Center Branding</Label>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-dashed border-white/10 group hover:border-primary/30 transition-colors">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden bg-black/40 ring-1 ring-white/10">
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
                  <Label htmlFor="logo-upload" className="cursor-pointer block text-sm font-bold text-white/90 hover:text-primary transition-colors">
                    Upload Brand Logo
                  </Label>
                  <p className="text-[10px] text-muted-foreground mt-1">PNG/JPG up to 2MB. SVG recommended.</p>
                  <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/5 py-3 border-b border-white/5">
             <CardTitle className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" /> Advanced
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-tighter">Resolution</Label>
              <Select value={state.size.toString()} onValueChange={(val) => updateState({ size: parseInt(val) })}>
                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="400">Standard (400px)</SelectItem>
                  <SelectItem value="600">High Def (600px)</SelectItem>
                  <SelectItem value="1000">Ultra High (1000px)</SelectItem>
                  <SelectItem value="2000">Print Ready (2000px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold tracking-tighter">Scan Reliability</Label>
              <Select value={state.errorLevel} onValueChange={(val) => updateState({ errorLevel: val as QRErrorCorrectionLevel })}>
                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Basic (7%)</SelectItem>
                  <SelectItem value="M">Reliable (15%)</SelectItem>
                  <SelectItem value="Q">Secure (25%)</SelectItem>
                  <SelectItem value="H">Enterprise (30%)</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <Shield className="w-4 h-4 text-primary" />
                <p className="text-[10px] text-primary/80 font-medium">Auto-upgraded to highest for logo scans.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
