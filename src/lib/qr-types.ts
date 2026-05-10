export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRHistoryItem {
  id: string;
  data: string;
  type: string;
  timestamp: number;
  preview: string;
}

export interface QRState {
  data: string;
  logo: string | null;
  fgColor: string;
  bgColor: string;
  size: number;
  errorLevel: QRErrorCorrectionLevel;
  type: 'URL' | 'Text' | 'Phone' | 'Email' | 'WiFi' | 'vCard';
  // Complex type fields
  wifi?: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
  };
  email?: {
    address: string;
    subject: string;
    body: string;
  };
  vCard?: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    organization: string;
    jobTitle: string;
    website: string;
  };
}
