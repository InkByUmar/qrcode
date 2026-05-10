"use client"

import React, { useState, useEffect, useRef } from 'react';
import { QRState } from '@/lib/qr-types';
import { QrFormSection } from './qr-form-section';
import { QrPreviewSection } from './qr-preview-section';
import { Card } from '@/components/ui/card';
import { suggestQrContentType } from '@/ai/flows/qr-content-type-suggester-flow';

export function QrGeneratorContainer() {
  const [state, setState] = useState<QRState>({
    data: 'https://example.com',
    logo: null,
    fgColor: '#26EA56',
    bgColor: '#1B2B1F',
    size: 400,
    errorLevel: 'H',
    type: 'URL'
  });

  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // AI Content Type Suggestion logic
  useEffect(() => {
    if (state.data.length > 5 && isTyping) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      
      typingTimerRef.current = setTimeout(async () => {
        try {
          const suggestion = await suggestQrContentType({ content: state.data });
          if (suggestion.type !== state.type) {
             // We don't force switch but we could hint it. 
             // For now, let's just keep the user flow manual or handle it if empty.
          }
        } catch (err) {
          console.error("AI suggestion error", err);
        }
        setIsTyping(false);
      }, 1500);
    }
  }, [state.data, state.type, isTyping]);

  const updateState = (updates: Partial<QRState>) => {
    setState(prev => ({ ...prev, ...updates }));
    if (updates.data !== undefined) setIsTyping(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 xl:col-span-8">
        <QrFormSection state={state} updateState={updateState} />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
        <QrPreviewSection state={state} />
      </div>
    </div>
  );
}
