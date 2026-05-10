"use client"

import React, { useState, useEffect, useRef } from 'react';
import { QRState } from '@/lib/qr-types';
import { QrFormSection } from './qr-form-section';
import { QrPreviewSection } from './qr-preview-section';
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

  const [debouncedState, setDebouncedState] = useState<QRState>(state);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce the state for preview rendering to avoid UI stutter
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedState(state);
    }, 200);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [state]);

  // AI Content Type Suggestion logic
  useEffect(() => {
    if (state.data.length > 5) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      
      typingTimerRef.current = setTimeout(async () => {
        try {
          const suggestion = await suggestQrContentType({ content: state.data });
          if (suggestion.type !== state.type) {
             // Optional: Suggest type switch to user
          }
        } catch (err) {
          console.error("AI suggestion error", err);
        }
      }, 1500);
    }
  }, [state.data, state.type]);

  const updateState = (updates: Partial<QRState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      
      // Auto-adjust error correction to 'H' (Highest) if a logo is added
      if (updates.logo && newState.errorLevel !== 'H') {
        newState.errorLevel = 'H';
      }
      
      return newState;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 xl:col-span-8">
        <QrFormSection state={state} updateState={updateState} />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
        <QrPreviewSection state={debouncedState} />
      </div>
    </div>
  );
}
