import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { Toaster } from '@/components/ui/toaster';
import { QrCode, Shield, Zap, Palette, Layers, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1B2B1F] text-foreground">
      {/* Nav/Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#1B2B1F]/80 backdrop-blur-md">
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
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Free QR Code Generator <br />
            <span className="text-primary italic">with Your Logo</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional, scan-friendly, and beautiful QR codes for URLs, WiFi, business cards, and more. 100% free and private.
          </p>
        </div>

        <QrGeneratorContainer />
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Real-time Preview"
            description="See changes instantly as you adjust colors, logos, and data types."
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-primary" />}
            title="Full Customization"
            description="Control foreground and background colors to match your brand identity perfectly."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Privacy First"
            description="Your data is processed locally. We don't store your input or generated QR codes."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-primary" />}
            title="Logo Support"
            description="Upload your company logo or custom icons to make your QR code stand out."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-primary" />}
            title="Scan Tested"
            description="Built-in error correction ensures your QR codes scan reliably on all devices."
          />
          <FeatureCard 
            icon={<QrCode className="w-6 h-6 text-primary" />}
            title="High Resolution"
            description="Download in SVG, PNG, or JPG formats at any resolution up to 1000px."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#1B2B1F]/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <QrCode className="text-primary w-5 h-5" />
              <span className="font-bold text-lg">QR Canvas</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Contact</a>
              <a href="#" className="hover:text-primary">Github</a>
            </div>

            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} QR Canvas. All rights reserved.
            </p>
          </div>
          
          {/* Ad Placeholder */}
          <div className="mt-12 w-full h-24 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">
            <span className="text-[10px] text-muted-foreground/20 uppercase tracking-[0.3em]">Advertisement Space</span>
          </div>
        </div>
      </footer>
      <Toaster />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
