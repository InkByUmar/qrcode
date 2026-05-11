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
  Info,
  AlertTriangle,
  Star,
  Youtube,
  CreditCard,
  RotateCcw
} from 'lucide-react';
import { qrContentRefiner } from '@/ai/flows/qr-content-refiner-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QrFormSectionProps {
  state: QRState;
  updateState: (updates: Partial<QRState>) => void;
}

const TEMPLATES = [
  { id: 'restaurant', label: 'Restaurant Menu', type: 'URL', data: 'https://menu.yourbrand.com', color: '#FF5733' },
  { id: 'wifi', label: 'Guest WiFi', type: 'WiFi', wifi: { ssid: 'Guest_WiFi', password: 'password123', encryption: 'WPA' }, color: '#33FF57' },
  { id: 'upi', label: 'UPI Payment', type: 'Text', data: 'upi://pay?pa=yourname@bank&pn=YourName&cu=INR', color: '#10B981' },
  { id: 'business', label: 'Business Card', type: 'vCard', vCard: { firstName: 'John', lastName: 'Doe', mobile: '+1 234 567 890', email: 'john@company.com', organization: 'Tech Inc', jobTitle: 'CEO', website: 'https://company.com' }, color: '#3357FF' },
  { id: 'instagram', label: 'Instagram Profile', type: 'URL', data: 'https://instagram.com/yourbrand', color: '#E1306C' },
  { id: 'youtube', label: 'YouTube Channel', type: 'URL', data: 'https://youtube.com/@channel', color: '#FF0000' },
  { id: 'whatsapp', label: 'WhatsApp Connect', type: 'WhatsApp', whatsapp: { phone: '+1234567890', message: 'Hi! Let\'s connect.' }, color: '#25D366' },
  { id: 'review', label: 'Google Review', type: 'URL', data: 'https://g.page/r/your-review-link', color: '#4285F4' },
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
        toast({ variant: "destructive", title: "File Too Large", description: "Premium rendering supports files up to 5MB." });
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
      toast({ title: "AI Polish Complete", description: "Your content has been refined for maximum impact." });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "AI Service Busy", description: "Try again in a moment." });
    } finally {
      setIsRefining(false);
    }
  };

  const applyTemplate = (template: any) => {
    updateState({
      type: template.type,
      data: template.data || '',
      fgColor: template.color || state.fgColor,
      ...(template.wifi && { wifi: template.wifi }),
      ...(template.vCard && { vCard: template.vCard }),
      ...(template.whatsapp && { whatsapp: template.whatsapp }),
    });
    toast({ title: "Template Applied", description: `Loading ${template.label} preset.` });
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
    toast({ title: "Generator Reset", description: "All settings restored to default." });
  };

  return (
    <div className="space-y-10">
      {/* PREMIUM TEMPLATE SECTION - REFINED FOR PRO LOOK */}
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
                  Premium Ready Templates
                </CardTitle>
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-0.5">Instant Brand Presets</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="h-8 text-[9px] uppercase font-black tracking-[0.2em] text-white/50 hover:text-white hover:bg-white/5 transition-all border border-white/10 rounded-lg px-4"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Reset All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-8 px-8 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t)}
                className="flex flex-col items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div 
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg border border-white/10 group-hover:border-primary/30"
                  style={{ color: t.color }}
                >
                  {t.id === 'youtube' ? <Youtube className="w-5 h-5" /> : 
                   t.id === 'upi' ? <CreditCard className="w-5 h-5" /> :
                   t.type === 'URL' ? <Link2 className="w-5 h-5" /> : 
                   t.type === 'WiFi' ? <Wifi className="w-5 h-5" /> : 
                   t.type === 'WhatsApp' ? <MessageSquare className="w-5 h-5" /> :
                   <Contact className="w-5 h-5" />}
                </div>
                <span className="text-[10px] font-bold text-center leading-tight text-white/60 group-hover:text-white transition-colors relative z-10">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SECTION 1: CORE DATA */}
      <Card className="glass-card border-white/10 shadow-2xl overflow-hidden">
        <CardHeader className="pb-8 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/40 shadow-inner">
                <LayoutGrid className="w-6 h-6" />
              </div>
              Select Data Type
            </CardTitle>
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
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
                  className="flex flex-col gap-2.5 py-5 bg-white/[0.03] border border-white/[0.1] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-500 rounded-[1.5rem] hover:bg-white/10 hover:border-primary/50 group"
                >
                  <tab.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[220px]">
              {state.type === 'WhatsApp' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3.5">
                      <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Phone Number</Label>
                      <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="+1234567890" value={state.whatsapp.phone} onChange={e => updateState({ whatsapp: { ...state.whatsapp, phone: e.target.value } })} />
                    </div>
                    <div className="space-y-3.5">
                      <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Default Message (Optional)</Label>
                      <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Hi! I'm interested in..." value={state.whatsapp.message} onChange={e => updateState({ whatsapp: { ...state.whatsapp, message: e.target.value } })} />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 shadow-inner">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Generated Link</p>
                    <p className="text-xs font-mono text-primary/80 truncate">https://wa.me/{state.whatsapp.phone.replace(/[^0-9]/g, '')}</p>
                  </div>
                </div>
              ) : state.type === 'WiFi' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Network SSID (Name)</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:ring-primary/40 focus:border-primary/40 text-lg text-white" placeholder="e.g. Guest WiFi" value={state.wifi.ssid} onChange={e => updateState({ wifi: { ...state.wifi, ssid: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Network Password</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:ring-primary/40 text-lg text-white" type="password" placeholder="••••••••" value={state.wifi.password} onChange={e => updateState({ wifi: { ...state.wifi, password: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5 sm:col-span-2">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Encryption Standard</Label>
                    <Select value={state.wifi.encryption} onValueChange={val => updateState({ wifi: { ...state.wifi, encryption: val as any } })}>
                      <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-base text-white"><SelectValue /></SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="WPA">WPA/WPA2/WPA3 (Enterprise Recommended)</SelectItem>
                        <SelectItem value="WEP">WEP (Legacy Hardware)</SelectItem>
                        <SelectItem value="nopass">Open Network (No Security)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : state.type === 'vCard' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">First Name</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Jane" value={state.vCard.firstName} onChange={e => updateState({ vCard: { ...state.vCard, firstName: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Last Name</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Smith" value={state.vCard.lastName} onChange={e => updateState({ vCard: { ...state.vCard, lastName: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Direct Mobile</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="+1 (555) 000-0000" value={state.vCard.mobile} onChange={e => updateState({ vCard: { ...state.vCard, mobile: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Corporate Email</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="j.smith@brand.com" value={state.vCard.email} onChange={e => updateState({ vCard: { ...state.vCard, email: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Organization</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Global Tech Corp" value={state.vCard.organization} onChange={e => updateState({ vCard: { ...state.vCard, organization: e.target.value } })} />
                  </div>
                  <div className="space-y-3.5">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Job Title</Label>
                    <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Managing Director" value={state.vCard.jobTitle} onChange={e => updateState({ vCard: { ...state.vCard, jobTitle: e.target.value } })} />
                  </div>
                </div>
              ) : state.type === 'Email' ? (
                 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="space-y-3.5">
                      <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Recipient Email Address</Label>
                      <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="contact@example.com" value={state.email.address} onChange={e => updateState({ email: { ...state.email, address: e.target.value } })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3.5">
                        <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Subject Line</Label>
                        <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Business Inquiry" value={state.email.subject} onChange={e => updateState({ email: { ...state.email, subject: e.target.value } })} />
                      </div>
                      <div className="space-y-3.5">
                        <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Message Body</Label>
                        <Input className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg text-white" placeholder="Hi team, I am interested in..." value={state.email.body} onChange={e => updateState({ email: { ...state.email, body: e.target.value } })} />
                      </div>
                    </div>
                 </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">
                      {state.type === 'URL' ? 'Destination Website' : state.type === 'Phone' ? 'Global Phone Number' : 'Custom Payload'}
                    </Label>
                    <div className="flex items-center gap-4">
                      <span className={cn("text-[10px] font-mono font-bold", dataLength > 500 ? "text-amber-500" : "text-white/40")}>
                        {dataLength} chars
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-[10px] uppercase font-black tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border border-primary/40 rounded-xl"
                        onClick={handleAIRefine}
                        disabled={isRefining || !state.data || ['WiFi', 'vCard', 'Email', 'WhatsApp'].includes(state.type)}
                      >
                        <Sparkles className={`w-3.5 h-3.5 mr-2 ${isRefining ? 'animate-spin' : ''}`} />
                        {isRefining ? 'Analyzing...' : 'Optimize Content'}
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    placeholder={state.type === 'URL' ? 'https://your-premium-brand.com' : state.type === 'Phone' ? '+1 000 000 0000' : 'Enter your professional content here...'}
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className={cn(
                      "min-h-[160px] bg-white/[0.03] border-white/10 text-xl rounded-3xl focus:ring-primary/40 p-6 text-white leading-relaxed transition-all resize-none shadow-inner",
                      isTooLong && "border-amber-500/60 focus:ring-amber-500/40"
                    )}
                  />
                  {isTooLong && (
                    <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl animate-in fade-in slide-in-from-top-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <p className="text-[11px] text-amber-500 font-bold uppercase tracking-tight">
                        Content exceeds 800 chars. Use a shortener for best scanning performance.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* SECTION 2: VISUAL CUSTOMIZATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* DESIGN MATRIX */}
        <Card className="glass-card shadow-2xl border-white/10">
          <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
              <Palette className="w-5 h-5 text-primary" /> Technical Styling
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-10">
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                 <Label className="text-[10px] uppercase font-black text-white/60 tracking-[0.2em]">Dot Engine</Label>
                 <Select value={state.dotStyle} onValueChange={val => updateState({ dotStyle: val as any })}>
                    <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="extra-rounded">Lux Rounded</SelectItem>
                      <SelectItem value="rounded">Soft Flow</SelectItem>
                      <SelectItem value="classy">Classy Dots</SelectItem>
                      <SelectItem value="square">Standard Block</SelectItem>
                      <SelectItem value="dots">Pixel Flow</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div className="space-y-4">
                 <Label className="text-[10px] uppercase font-black text-white/60 tracking-[0.2em]">Corner Geometry</Label>
                 <Select value={state.cornerStyle} onValueChange={val => updateState({ cornerStyle: val as any })}>
                    <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="rounded">Circular Eye</SelectItem>
                      <SelectItem value="dot">Soft Corner</SelectItem>
                      <SelectItem value="square">Sharp Matrix</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] uppercase font-black text-white/60 tracking-[0.2em]">Matrix Color</Label>
                  <span className="text-[10px] font-mono text-primary font-bold">{state.fgColor}</span>
                </div>
                <div className="flex items-center gap-5">
                   <div 
                     className="w-14 h-14 rounded-2xl border-2 border-white/20 relative overflow-hidden group cursor-pointer shadow-lg hover:border-primary transition-all"
                     style={{ backgroundColor: state.fgColor }}
                   >
                     <input 
                       type="color" 
                       value={state.fgColor} 
                       onChange={(e) => updateState({ fgColor: e.target.value })}
                       className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150"
                     />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                       <MousePointer2 className="w-4 h-4 text-white" />
                     </div>
                   </div>
                   <Input 
                     value={state.fgColor} 
                     onChange={(e) => updateState({ fgColor: e.target.value })} 
                     className="flex-1 font-mono text-sm h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white" 
                   />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Label className={`text-[10px] uppercase font-black tracking-[0.2em] ${state.backgroundImage ? 'text-white/30' : 'text-white/60'}`}>Canvas Background</Label>
                  <span className="text-[10px] font-mono text-white/40 font-bold">{state.backgroundImage ? 'DISABLED (IMAGE PRIORITY)' : state.bgColor}</span>
                </div>
                <div className="flex items-center gap-5">
                   <div 
                     className={`w-14 h-14 rounded-2xl border-2 border-white/20 relative overflow-hidden group ${state.backgroundImage ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer hover:border-primary shadow-lg'} transition-all`}
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
                     className="flex-1 font-mono text-sm h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white disabled:opacity-30 transition-opacity" 
                   />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BRANDING SUITE */}
        <Card className="glass-card shadow-2xl border-white/10">
          <CardHeader className="border-b border-white/[0.05] bg-white/[0.02] py-8">
             <CardTitle className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 text-white">
              <Shield className="w-5 h-5 text-primary" /> Brand Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-10">
            <div className="space-y-8">
              {/* Logo Manager */}
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 group transition-all duration-500 hover:border-primary/60 hover:bg-white/[0.06] shadow-inner">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden bg-black/70 border-2 border-white/20 group-hover:border-primary/80 transition-all shadow-2xl">
                      {state.logo ? (
                        <img src={state.logo} alt="Logo" className="w-full h-full object-contain p-3" />
                      ) : (
                        <Upload className="w-8 h-8 text-white/20 group-hover:text-primary transition-all duration-500" />
                      )}
                    </div>
                    {state.logo && (
                      <button 
                        onClick={() => updateState({ logo: null })}
                        className="absolute -top-3 -right-3 p-2 bg-destructive text-destructive-foreground rounded-full shadow-2xl hover:scale-125 active:scale-90 transition-all z-10 border-2 border-background"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="logo-upload" className="cursor-pointer block text-sm font-bold text-white tracking-wide hover:text-primary transition-all">
                      {state.logo ? 'Update Brand Icon' : 'Upload Brand Icon'}
                    </Label>
                    <p className="text-[10px] text-white/40 mt-1.5 uppercase font-black tracking-widest">High Res • PNG / SVG Preferred</p>
                    <input id="logo-upload" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="hidden" />
                  </div>
                </div>
                {state.logo && (
                  <div className="mt-10 space-y-5 animate-in fade-in duration-700">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] uppercase font-black text-white/60 tracking-widest">Icon Scaling</Label>
                      <span className="text-[10px] font-mono text-primary font-bold">{(state.logoSize * 100).toFixed(0)}%</span>
                    </div>
                    <Slider 
                      value={[state.logoSize * 100]} 
                      min={15} max={45} step={1} 
                      onValueChange={(val) => updateState({ logoSize: val[0] / 100 })} 
                      className="py-2"
                    />
                  </div>
                )}
              </div>

              {/* Background Manager */}
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 group transition-all duration-500 hover:border-primary/60 hover:bg-white/[0.06] shadow-inner">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden bg-black/70 border-2 border-white/20 group-hover:border-primary/80 transition-all shadow-2xl">
                      {state.backgroundImage ? (
                        <img src={state.backgroundImage} alt="BG" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-white/20 group-hover:text-primary transition-all duration-500" />
                      )}
                    </div>
                    {state.backgroundImage && (
                      <button 
                        onClick={() => updateState({ backgroundImage: null })}
                        className="absolute -top-3 -right-3 p-2 bg-destructive text-destructive-foreground rounded-full shadow-2xl hover:scale-125 active:scale-90 transition-all z-10 border-2 border-background"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="bg-upload" className="cursor-pointer block text-sm font-bold text-white tracking-wide hover:text-primary transition-all">
                      {state.backgroundImage ? 'Change Background' : 'Upload Background'}
                    </Label>
                    <p className="text-[10px] text-white/40 mt-1.5 uppercase font-black tracking-widest">4K Support • Professional Visuals</p>
                    <input id="bg-upload" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'backgroundImage')} className="hidden" />
                  </div>
                </div>
                {state.backgroundImage && (
                  <div className="mt-10 space-y-5 animate-in fade-in duration-700">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] uppercase font-black text-white/60 tracking-widest">Image Density (Alpha)</Label>
                      <span className="text-[10px] font-mono text-primary font-bold">{(state.backgroundOpacity * 100).toFixed(0)}%</span>
                    </div>
                    <Slider 
                      value={[state.backgroundOpacity * 100]} 
                      min={30} max={100} step={1} 
                      onValueChange={(val) => updateState({ backgroundOpacity: val[0] / 100 })} 
                      className="py-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-primary/10 border border-primary/40 flex items-start gap-5 shadow-2xl">
              <Info className="w-6 h-6 text-primary mt-0.5" />
              <div className="space-y-2">
                 <p className="text-[11px] text-primary font-black uppercase tracking-widest">Auto-Correction Standard</p>
                 <p className="text-[11px] text-primary/80 leading-relaxed font-bold">
                  {(state.logo || state.backgroundImage || dataLength > 500) 
                    ? 'High Density Engine Engaged: Level H (30%) Error Correction active for maximum scannability.' 
                    : `Current: Level ${state.errorLevel} (Standard Performance)`}
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

