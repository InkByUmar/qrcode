"use client"

import React, { useState, useEffect, useRef } from 'react';
import { QRState, QRHistoryItem } from '@/lib/qr-types';
import { QrFormSection } from './qr-form-section';
import { QrPreviewSection } from './qr-preview-section';
import { suggestQrContentType } from '@/ai/flows/qr-content-type-suggester-flow';

const STORAGE_KEY = 'qr_canvas_history';

export function QrGeneratorContainer() {
  const [state, setState] = useState<QRState>({
    data: 'https://example.com',
    logo: null,
    fgColor: '#26EA56',
    bgColor: '#0F1611',
    size: 400,
    errorLevel: 'H',
    type: 'URL',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    email: { address: '', subject: '', body: '' },
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

  // Load history from localStorage
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

  // Save history helper
  const addToHistory = (item: Omit<QRHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: QRHistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    const updatedHistory = [newItem, ...history.filter(h => h.data !== item.data)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  // Debounce preview updates
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
      
      // Construct data string based on type if sub-fields were updated
      if (newState.type === 'WiFi' && newState.wifi) {
        newState.data = `WIFI:T:${newState.wifi.encryption};S:${newState.wifi.ssid};P:${newState.wifi.password};;`;
      } else if (newState.type === 'Email' && newState.email) {
        newState.data = `mailto:${newState.email.address}?subject=${encodeURIComponent(newState.email.subject)}&body=${encodeURIComponent(newState.email.body)}`;
      } else if (newState.type === 'vCard' && newState.vCard) {
        newState.data = `BEGIN:VCARD\nVERSION:3.0\nN:${newState.vCard.lastName};${newState.vCard.firstName}\nFN:${newState.vCard.firstName} ${newState.vCard.lastName}\nORG:${newState.vCard.organization}\nTITLE:${newState.vCard.jobTitle}\nTEL;TYPE=CELL:${newState.vCard.mobile}\nEMAIL:${newState.vCard.email}\nURL:${newState.vCard.website}\nEND:VCARD`;
      } else if (newState.type === 'Phone') {
        if (!newState.data.startsWith('tel:')) newState.data = `tel:${newState.data}`;
      }

      if (updates.logo && newState.errorLevel !== 'H') {
        newState.errorLevel = 'H';
      }
      
      return newState;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 xl:col-span-8 space-y-8">
        <QrFormSection state={state} updateState={updateState} />
        
        {/* Sidebar Ad Placeholder for Desktop */}
        <div className="hidden xl:block w-full h-[250px] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group overflow-hidden">
          <span className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.5em]">Sidebar Ad (300x250)</span>
        </div>
      </div>
      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
        <QrPreviewSection state={debouncedState} history={history} onSave={() => addToHistory({ 
          data: state.data, 
          type: state.type,
          preview: '' // Preview handled by component if needed
        })} />
      </div>
    </div>
  );
}
