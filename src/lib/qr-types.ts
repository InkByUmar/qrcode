export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRState {
  data: string;
  logo: string | null;
  fgColor: string;
  bgColor: string;
  size: number;
  errorLevel: QRErrorCorrectionLevel;
  type: 'URL' | 'Text' | 'Phone' | 'Email' | 'WiFi';
}

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface EmailConfig {
  address: string;
  subject: string;
  body: string;
}
