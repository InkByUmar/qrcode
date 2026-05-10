
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { QRState, QRHistoryItem } from '@/lib/qr-types';
import { QrFormSection } from './qr-form-section';
import { QrPreviewSection } from './qr-preview-section';

const STORAGE_KEY = 'qr_canvas_history_v3';

export function QrGeneratorContainer() {
  const [state, setState] = useState<QRState>({
    data: 'https://google.com',
    logo: null,
    logoSize: 0.3,
    backgroundImage: null,
    backgroundOpacity: 1.0,
    fgColor: '#26EA56',
    bgColor: '#ffffff',
    size: 1024,
    errorLevel: 'Q',
    type: 'URL',
    dotStyle: 'extra-rounded',
    cornerStyle: 'rounded',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    email: { address: '', subject: '', body: '' },
    whatsapp: { phone: '', message: '' },
    vCard: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      organization: '',
      jobTitle: '',
      website: ''
    }
  });

  const [debouncedState, setDebouncedState] = useState<QRState>(state);
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedState(state);
    }, 300);
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [state]);

  const updateState = (updates: Partial<QRState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      
      if (newState.type === 'WiFi') {
        newState.data = `WIFI:T:${newState.wifi.encryption};S:${newState.wifi.ssid};P:${newState.wifi.password};;`;
      } else if (newState.type === 'Email') {
        newState.data = `mailto:${newState.email.address}?subject=${encodeURIComponent(newState.email.subject)}&body=${encodeURIComponent(newState.email.body)}`;
      } else if (newState.type === 'WhatsApp') {
        const cleanPhone = newState.whatsapp.phone.replace(/[^0-9]/g, '');
        newState.data = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(newState.whatsapp.message)}`;
      } else if (newState.type === 'Phone') {
        newState.data = newState.data.startsWith('tel:') ? newState.data : `tel:${newState.data}`;
      } else if (newState.type === 'vCard') {
        newState.data = `BEGIN:VCARD\nVERSION:3.0\nN:${newState.vCard.lastName};${newState.vCard.firstName}\nFN:${newState.vCard.firstName} ${newState.vCard.lastName}\nORG:${newState.vCard.organization}\nTITLE:${newState.vCard.jobTitle}\nTEL;TYPE=CELL:${newState.vCard.mobile}\nEMAIL:${newState.vCard.email}\nURL:${newState.vCard.website}\nEND:VCARD`;
      }

      if ((newState.logo || newState.backgroundImage) && newState.errorLevel !== 'H') {
        newState.errorLevel = 'H';
      }
      
      return newState;
    });
  };

  const addToHistory = (data: string, type: string) => {
    const newItem: QRHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      data,
      type,
      timestamp: Date.now(),
      preview: '' 
    };
    const updatedHistory = [newItem, ...history.filter(h => h.data !== data)].slice(0, 6);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 xl:col-span-8 space-y-8">
        <QrFormSection state={state} updateState={updateState} />
        <div className="hidden xl:block w-full h-[150px] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group overflow-hidden">
          <span className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.5em]">Premium Advertisement Banner</span>
        </div>
      </div>
      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
        <QrPreviewSection 
          state={debouncedState} 
          history={history} 
          onDownload={() => addToHistory(state.data, state.type)} 
        />
      </div>
    </div>
  );
}
