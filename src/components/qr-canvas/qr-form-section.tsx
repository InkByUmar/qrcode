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
import { Link2, Type, Phone, Mail, Wifi, Sparkles, Upload, X } from 'lucide-react';
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
      reader.onloadend = () => {
        updateState({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRefine = async () => {
    if (!state.data) return;
    setIsRefining(true);
    try {
      const refined = await qrContentRefiner(state.data);
      updateState({ data: refined });
      toast({ title: "Refined!", description: "AI has updated your content for better clarity." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not refine content." });
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-primary/10 rounded-lg text-primary">
              <Type className="w-5 h-5" />
            </span>
            Content Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={state.type} onValueChange={(val) => updateState({ type: val as any })} className="w-full">
            <TabsList className="grid grid-cols-5 w-full bg-background/50 mb-6 h-auto p-1">
              <TabsTrigger value="URL" className="py-3 flex flex-col gap-1 sm:flex-row sm:gap-2">
                <Link2 className="w-4 h-4" /> <span className="hidden sm:inline">URL</span>
              </TabsTrigger>
              <TabsTrigger value="Text" className="py-3 flex flex-col gap-1 sm:flex-row sm:gap-2">
                <Type className="w-4 h-4" /> <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="Phone" className="py-3 flex flex-col gap-1 sm:flex-row sm:gap-2">
                <Phone className="w-4 h-4" /> <span className="hidden sm:inline">Phone</span>
              </TabsTrigger>
              <TabsTrigger value="Email" className="py-3 flex flex-col gap-1 sm:flex-row sm:gap-2">
                <Mail className="w-4 h-4" /> <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="WiFi" className="py-3 flex flex-col gap-1 sm:flex-row sm:gap-2">
                <Wifi className="w-4 h-4" /> <span className="hidden sm:inline">WiFi</span>
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div className="flex justify-between items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label>QR Code Content</Label>
                  <Textarea 
                    placeholder={state.type === 'URL' ? 'https://...' : 'Enter your content here...'}
                    value={state.data}
                    onChange={(e) => updateState({ data: e.target.value })}
                    className="min-h-[120px] bg-background/50 text-lg"
                  />
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all"
                onClick={handleRefine}
                disabled={isRefining || !state.data}
              >
                <Sparkles className={`w-4 h-4 ${isRefining ? 'animate-spin' : ''}`} />
                {isRefining ? 'Refining...' : 'Refine with AI'}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground</Label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={state.fgColor} 
                    onChange={(e) => updateState({ fgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer rounded-md overflow-hidden"
                  />
                  <Input 
                    value={state.fgColor} 
                    onChange={(e) => updateState({ fgColor: e.target.value })}
                    className="flex-1 font-mono uppercase text-xs h-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={state.bgColor} 
                    onChange={(e) => updateState({ bgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer rounded-md overflow-hidden"
                  />
                  <Input 
                    value={state.bgColor} 
                    onChange={(e) => updateState({ bgColor: e.target.value })}
                    className="flex-1 font-mono uppercase text-xs h-8"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label>Logo Image</Label>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-background/50 group-hover:border-primary/50 transition-colors">
                    {state.logo ? (
                      <img src={state.logo} alt="Logo preview" className="w-full h-full object-contain p-1" />
                    ) : (
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  {state.logo && (
                    <button 
                      onClick={() => updateState({ logo: null })}
                      className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-md text-sm font-medium hover:bg-primary/20 transition-all text-center">
                      Choose Logo
                    </div>
                  </Label>
                  <input 
                    id="logo-upload"
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Recommended: Square PNG with transparency</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Resolution (px)</Label>
              <Select 
                value={state.size.toString()} 
                onValueChange={(val) => updateState({ size: parseInt(val) })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200">200 x 200</SelectItem>
                  <SelectItem value="300">300 x 300</SelectItem>
                  <SelectItem value="400">400 x 400</SelectItem>
                  <SelectItem value="500">500 x 500</SelectItem>
                  <SelectItem value="1000">1000 x 1000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Error Correction Level</Label>
              <Select 
                value={state.errorLevel} 
                onValueChange={(val) => updateState({ errorLevel: val as QRErrorCorrectionLevel })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">High (25%)</SelectItem>
                  <SelectItem value="H">Highest (30%)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">Highest is recommended when using a logo.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
