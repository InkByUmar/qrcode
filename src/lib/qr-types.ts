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
  logoSize: number;
  backgroundImage: string | null;
  backgroundOpacity: number;
  fgColor: string;
  bgColor: string;
  size: number;
  errorLevel: QRErrorCorrectionLevel;
  type: 'URL' | 'Text' | 'Phone' | 'Email' | 'WiFi' | 'vCard' | 'WhatsApp';
  dotStyle: 'rounded' | 'dots' | 'classy' | 'square' | 'extra-rounded';
  cornerStyle: 'square' | 'dot' | 'rounded';
  // Complex type fields
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
  };
  email: {
    address: string;
    subject: string;
    body: string;
  };
  whatsapp: {
    phone: string;
    message: string;
  };
  vCard: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    organization: string;
    jobTitle: string;
    website: string;
  };
}