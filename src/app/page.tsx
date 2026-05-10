import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { Toaster } from '@/components/ui/toaster';
import { QrCode, Shield, Zap, Palette, Layers, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1611] text-foreground">
      {/* Top Ad Banner */}
      <div className="w-full bg-[#1B2B1F]/30 py-4 border-b border-white/5 flex justify-center overflow-hidden">
        <div className="w-[728px] h-[90px] bg-white/5 rounded border border-dashed border-white/10 flex items-center justify-center relative group">
           <span className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.4em]">Advertisement (728x90)</span>
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Nav/Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F1611]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <QrCode className="text-primary-foreground w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              QR Canvas
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#templates" className="text-sm text-muted-foreground hover:text-primary transition-colors">Templates</a>
            <a href="#api" className="text-sm text-muted-foreground hover:text-primary transition-colors">API</a>
          </nav>
          <div className="flex items-center gap-4">
             <button className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">Log In</button>
             <button className="text-sm font-bold px-4 py-2 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero / Generator Area */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
            <Zap className="w-3 h-3" />
            <span>POWERED BY AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Create Modern <br />
            <span className="text-primary italic">Custom QR Codes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Design professional, high-resolution QR codes for free. Supports WiFi, vCards, Emails, and more with instant real-time previews.
          </p>
        </div>

        <QrGeneratorContainer />
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Instant Previews"
            description="Changes update in real-time. No more waiting to see your final design."
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-primary" />}
            title="Premium Styling"
            description="Adjust dots, corners, and colors to match your brand identity exactly."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Private & Secure"
            description="We generate codes locally. Your sensitive data never leaves your browser."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-primary" />}
            title="Custom Branding"
            description="Upload logos and icons. We automatically adjust error correction for scans."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-primary" />}
            title="High Reliability"
            description="Built on industry standards ensuring 100% scan success on iOS and Android."
          />
          <FeatureCard 
            icon={<QrCode className="w-6 h-6 text-primary" />}
            title="Vector Output"
            description="Download in SVG for infinite scalability, or PNG for web use."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0A100B] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <QrCode className="text-primary w-6 h-6" />
              <span className="font-bold text-xl tracking-tighter">QR Canvas</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
              <a href="#" className="hover:text-primary transition-colors">Open Source</a>
            </div>

            <p className="text-sm text-muted-foreground/60">
              &copy; {new Date().getFullYear()} QR Canvas.
            </p>
          </div>
          
          <div className="w-full h-px bg-white/5 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-white/90">Resources</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">QR Code Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Brand Assets</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="w-full h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group overflow-hidden relative">
                <span className="text-[10px] text-muted-foreground/20 uppercase tracking-[0.5em] font-medium">Advertisement Space</span>
                <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group space-y-4 p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5 shadow-xl hover:shadow-primary/5">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
