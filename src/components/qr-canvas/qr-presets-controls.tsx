"use client"

import React from 'react';
import { QRState } from '@/lib/qr-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  RotateCcw, 
  ImageIcon, 
  MessageSquare, 
  Youtube, 
  Search 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TEMPLATES = [
  { id: 'image-qr', label: 'Artistic Brand', type: 'URL', data: 'https://brand.studio', color: '#26EA56', dotStyle: 'rounded' },
  { id: 'whatsapp', label: 'WhatsApp Connect', type: 'WhatsApp', whatsapp: { phone: '+1234567890', message: 'Hi! Let\'s connect.' }, color: '#25D366' },
  { id: 'youtube', label: 'YouTube Channel', type: 'URL', data: 'https://youtube.com/@brand', color: '#FF0000' },
  { id: 'google-review', label: 'Google Review', type: 'URL', data: 'https://g.page/review/brand', color: '#4285F4' },
];

interface QrPresetsControlsProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

export function QrPresetsControls({ state, updateState }: QrPresetsControlsProps) {
  const { toast } = useToast();

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
      backgroundOpacity: 0.25,
      backgroundMode: 'auto',
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
  );
}