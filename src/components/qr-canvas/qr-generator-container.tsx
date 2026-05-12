"use client"

import React, { useState, useEffect, useRef } from 'react';
import { QRState, QRHistoryItem } from '@/lib/qr-types';
import { QrFormSection } from './qr-form-section';
import { QrPreviewSection } from './qr-preview-section';
import { QrBulkSection } from './qr-bulk-section';
import { QrCode, Layers } from 'lucide-react';

const HISTORY_KEY = 'qr_canvas_history_v5';
const STATE_KEY = 'qr_canvas_current_state_v5';

const DEFAULT_STATE: QRState = {
  data: 'https://google.com',
  logo: null,
  logoSize: 0.3,
  backgroundImage: null,
  backgroundOpacity: 0.25,
  backgroundMode: 'auto',
  fgColor: '#26EA56',
  bgColor: '#ffffff',
  size: 1024,
  errorLevel: 'Q',
  type: 'URL',
  dotStyle: 'extra-rounded',
  cornerStyle: 'rounded',
  scannabilityScore: 100,
  wifi: { ssid: '', password: '', encryption: 'WPA' },
  email: { address: '', subject: '', body: '' },
  whatsapp: { phone: '', message: '' },
  vCard: { firstName: '', lastName: '', mobile: '', email: '', organization: '', jobTitle: '', website: '' }
};

export function QrGeneratorContainer({ 
  activeMode: controlledMode, 
  onModeChange 
}: QrGeneratorContainerProps) {
  const [uncontrolledMode, setUncontrolledMode] = useState<'single' | 'bulk'>('single');
  const [state, setState] = useState<QRState>(DEFAULT_STATE);
  const [debouncedState, setDebouncedState] = useState<QRState>(state);
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const activeMode = controlledMode ?? uncontrolledMode;
  const setActiveMode = onModeChange ?? setUncontrolledMode;

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    const savedState = localStorage.getItem(STATE_KEY);
    if (savedHistory) try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    if (savedState) {
      try { 
        const parsed = JSON.parse(savedState);
        setState({ ...DEFAULT_STATE, ...parsed }); 
        setDebouncedState({ ...DEFAULT_STATE, ...parsed });
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STATE_KEY, JSON.stringify(state));

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedState(state);
    }, 400);

    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [state, isLoaded]);

  const updateState = (updates: Partial<QRState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      
      // Sync derived data based on type
      if (newState.type === 'WiFi') {
        newState.data = `WIFI:T:${newState.wifi.encryption};S:${newState.wifi.ssid};P:${newState.wifi.password};;`;
      } else if (newState.type === 'WhatsApp') {
        const cleanPhone = newState.whatsapp.phone.replace(/[^0-9]/g, '');
        newState.data = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(newState.whatsapp.message)}`;
      } else if (newState.type === 'Email') {
        newState.data = `mailto:${newState.email.address}?subject=${encodeURIComponent(newState.email.subject)}&body=${encodeURIComponent(newState.email.body)}`;
      }

      // SCANNABILITY CALCULATOR
      let score = 100;
      const dataLen = newState.data?.length || 0;
      if (dataLen > 200) score -= 15;
      if (newState.logo) score -= 10;
      if (newState.backgroundImage) score -= 15;
      if (newState.backgroundOpacity > 0.3) score -= 20;
      if (newState.dotStyle !== 'square') score -= 5;
      if (newState.cornerStyle !== 'square') score -= 5;
      newState.scannabilityScore = Math.max(40, score);

      // Error Level Guard
      if (newState.scannabilityScore < 85 || newState.logo || newState.backgroundImage) {
        newState.errorLevel = 'H';
      } else {
        newState.errorLevel = 'Q';
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
    const updatedHistory = [newItem, ...history.filter(h => h.data !== data)].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md bg-white/5 border border-white/10 p-1.5 h-16 rounded-3xl flex">
          <button 
            onClick={() => setActiveMode('single')}
            className={`flex-1 rounded-2xl flex items-center justify-center gap-3 transition-all font-black uppercase tracking-[0.2em] text-[10px] ${activeMode === 'single' ? 'bg-primary text-primary-foreground shadow-xl' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <QrCode className="w-4 h-4" /> Single QR
          </button>
          <button 
            onClick={() => setActiveMode('bulk')}
            className={`flex-1 rounded-2xl flex items-center justify-center gap-3 transition-all font-black uppercase tracking-[0.2em] text-[10px] ${activeMode === 'bulk' ? 'bg-primary text-primary-foreground shadow-xl' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Layers className="w-4 h-4" /> Bulk Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          {activeMode === 'single' ? (
            <QrFormSection state={state} updateState={updateState} />
          ) : (
            <QrBulkSection state={state} updateState={updateState} />
          )}
        </div>

        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
          <QrPreviewSection 
            state={debouncedState} 
            history={history} 
            onDownload={() => addToHistory(state.data, state.type)} 
            onClearHistory={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}

interface QrGeneratorContainerProps {
  activeMode?: 'single' | 'bulk';
  onModeChange?: (mode: 'single' | 'bulk') => void;
}
