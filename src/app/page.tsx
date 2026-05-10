import { QrGeneratorContainer } from '@/components/qr-canvas/qr-generator-container';
import { Toaster } from '@/components/ui/toaster';
import { QrCode, Shield, Zap, Palette, Layers, Smartphone, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { CopyrightYear } from '@/components/qr-canvas/copyright-year';

export default function Home() {
  return (
    <main className="min-h-screen premium-gradient">
      {/* GLOBAL AD BANNER */}
      <div className="w-full bg-black/40 backdrop-blur-md py-4 border-b border-white/[0.05] flex justify-center">
        <div className="w-full max-w-[728px] h-[90px] bg-white/[0.02] rounded-2xl border border-dashed border-white/[0.1] flex flex-col items-center justify-center group cursor-help overflow-hidden relative mx-4">
           <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.8em] font-black">Global Advertising Header</span>
           <p className="text-[10px] text-muted-foreground/20 mt-2">728 x 90 Optimized Space</p>
           <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform duration-500">
              <QrCode className="text-primary-foreground w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-headline font-bold tracking-tight text-white leading-none">
                QR <span className="text-primary">Canvas</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.3em] text-muted-foreground/60 uppercase mt-1">Enterprise Pro</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">Features</a>
            <a href="#templates" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">Templates</a>
            <a href="#api" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">Developer API</a>
          </nav>

          <div className="flex items-center gap-5">
             <button className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-white/[0.05] transition-all text-muted-foreground">Sign In</button>
             <button className="text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Go Pro
             </button>
          </div>
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <section className="container mx-auto px-6 py-20 md:py-28 relative">
        {/* Abstract shapes */}
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card text-[10px] font-black tracking-[0.2em] text-primary mb-8 animate-in fade-in zoom-in duration-1000">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-POWERED DESIGN ENGINE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black mb-8 leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Professional Branding <br />
            <span className="text-primary italic">Inside Every Pixel</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Elevate your physical and digital touchpoints with the world's most beautiful QR code generator. Seamlessly integrate logos, custom backgrounds, and high-performance styles.
          </p>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-white/[0.05] flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i+100}/40/40`} alt="user" className="w-full h-full object-cover opacity-80" />
                </div>
              ))}
            </div>
            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Trusted by 10k+ Digital Agencies</p>
          </div>
        </div>

        <div className="relative z-10">
          <QrGeneratorContainer />
        </div>
      </section>

      {/* FEATURES SHOWCASE */}
      <section id="features" className="container mx-auto px-6 py-32 border-t border-white/[0.05] relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Instant Preview"
            description="Our live rendering engine updates every pixel as you type. No lag, no waiting, just pure design speed."
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-primary" />}
            title="SaaS Customization"
            description="Deep control over dot styles, eye shapes, and color gradients to match your brand's unique design system."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Enterprise Security"
            description="Client-side generation means your sensitive WiFi and vCard data never touches our cloud servers."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-primary" />}
            title="Vector Fidelity"
            description="Download in high-resolution PNG or pixel-perfect SVG for billboard printing and high-end digital use."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-primary" />}
            title="Dual-Layer Branding"
            description="Upload both a central brand icon and a full-scale background image for maximum visual impact."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-primary" />}
            title="Scanner Optimized"
            description="Built on industry-leading scannability standards, ensuring 100% success on modern smartphone cameras."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/40 py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tighter text-white">QR Canvas</span>
              </div>
              <p className="text-sm text-muted-foreground/60 leading-relaxed font-light">
                Setting the standard for professional QR creation. Built for creators, agencies, and enterprise brands worldwide.
              </p>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
               <FooterCol title="Product" links={['Generator', 'Templates', 'API Access', 'Enterprise']} />
               <FooterCol title="Resources" links={['Guidebook', 'Brand Assets', 'Changelog', 'Tutorials']} />
               <FooterCol title="Legal" links={['Privacy Policy', 'Terms of Use', 'Security', 'Cookies']} />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
              &copy; <CopyrightYear /> QR Canvas Pro Suite. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-muted-foreground/40 text-[10px] font-black uppercase tracking-widest">
              <span>Made with ❤️ for Creators</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <span>Version 4.2.0</span>
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
    <div className="group glass-card p-10 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 border-white/[0.05] hover:border-primary/20 relative">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-8 shadow-xl shadow-black/20">
        {icon}
      </div>
      <h3 className="text-2xl font-headline font-bold mb-4 text-white group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground/70 leading-relaxed font-light text-sm">{description}</p>
      <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
        LEARN MORE <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">{title}</h4>
      <ul className="space-y-4">
        {links.map(l => (
          <li key={l}><a href="#" className="text-sm text-muted-foreground/60 hover:text-primary transition-colors font-light">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
