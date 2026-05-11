"use client"

import React from 'react';
import { QRState } from '@/lib/qr-types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Link2, 
  Type, 
  Phone, 
  Mail, 
  Wifi, 
  Contact, 
  LayoutGrid,
  MessageSquare,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { QrStylingControls } from './qr-styling-controls';
import { QrBrandingControls } from './qr-branding-controls';
import { QrPresetsControls } from './qr-presets-controls';

interface QrFormSectionProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

export function QrFormSection({ state, updateState }: QrFormSectionProps) {
  const { toast } = useToast();
  const dataLength = state.data?.length || 0;

  return (
    <div className="space-y-10">
      {/* QUICK PRESETS */}
      <QrPresetsControls state={state} updateState={updateState} />

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

      {/* DESIGN & BRANDING MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QrStylingControls state={state} updateState={updateState} />
        <QrBrandingControls state={state} updateState={updateState} />
      </div>
    </div>
  );
}
