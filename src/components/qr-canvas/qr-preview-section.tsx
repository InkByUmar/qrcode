"use client"

import React, { useEffect, useRef } from 'react';
import { QRState } from '@/lib/qr-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Printer, ImageIcon, FileCode, FileImage } from 'lucide-react';

interface QrPreviewSectionProps {
  state: QRState;
}

declare global {
  interface Window {
    QRCodeStyling: any;
  }
}

export function QrPreviewSection({ state }: QrPreviewSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.QRCodeStyling) {
      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new window.QRCodeStyling({
          width: 300,
          height: 300,
          type: 'svg',
          data: state.data,
          image: state.logo || '',
          dotsOptions: {
            color: state.fgColor,
            type: 'rounded'
          },
          backgroundOptions: {
            color: state.bgColor,
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 5
          },
          qrOptions: {
            errorCorrectionLevel: state.errorLevel
          }
        });
        qrCodeInstance.current.append(qrRef.current);
      } else {
        qrCodeInstance.current.update({
          data: state.data,
          image: state.logo || '',
          width: 300,
          height: 300,
          dotsOptions: {
            color: state.fgColor,
            type: 'rounded'
          },
          backgroundOptions: {
            color: state.bgColor,
          },
          qrOptions: {
            errorCorrectionLevel: state.errorLevel
          }
        });
      }
    }
  }, [state]);

  const handleDownload = (ext: 'png' | 'svg' | 'jpeg') => {
    if (qrCodeInstance.current) {
      // Temporarily scale up for high quality download
      qrCodeInstance.current.update({ width: state.size, height: state.size });
      qrCodeInstance.current.download({ name: 'qr-canvas', extension: ext });
      // Reset back to preview size
      qrCodeInstance.current.update({ width: 300, height: 300 });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-xl border-primary/20 shadow-2xl shadow-primary/5">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative group p-4 bg-white/5 rounded-2xl border border-white/10 qr-preview-container transition-all hover:border-primary/30">
            <div ref={qrRef} className="w-[300px] h-[300px] flex items-center justify-center" />
            
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
          </div>

          <div className="w-full space-y-3">
            <p className="text-center text-xs text-muted-foreground mb-4 font-mono">
              Ready to download: {state.size}x{state.size}px
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              <Button 
                onClick={() => handleDownload('png')} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 flex items-center justify-center gap-2"
              >
                <FileImage className="w-5 h-5" />
                Download PNG
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleDownload('svg')} 
                  className="border-white/10 hover:bg-white/5 hover:text-white"
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  SVG
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDownload('jpeg')} 
                  className="border-white/10 hover:bg-white/5 hover:text-white"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  JPG
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Ad Space Placeholder */}
      <div className="w-full h-32 bg-background/30 border border-dashed border-white/5 rounded-xl flex items-center justify-center">
        <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest">Sponsored Content</span>
      </div>
    </div>
  );
}
