import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block">
            <h1 className="text-7xl md:text-9xl font-black mb-2 tracking-tighter">
              Berkelana<span className="text-primary">.</span>
            </h1>
            <div className="h-1 bg-gradient-primary"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
            Kompetisi Terbesar Tahun Ini
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto">
            Bergabunglah dengan ratusan peserta dari seluruh Indonesia dalam kompetisi yang menguji 
            kemampuan, kreativitas, dan daya saing Anda. Saatnya tunjukkan potensi terbaik Anda!
          </p>
          
          <Button 
            variant="hero" 
            size="lg"
            className="px-12 py-6 text-xl h-auto"
          >
            Attend Event
          </Button>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
              <Calendar className="w-8 h-8 text-primary mb-3 mx-auto" />
              <p className="text-sm text-muted-foreground">Tanggal</p>
              <p className="font-semibold">Segera Diumumkan</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
              <Users className="w-8 h-8 text-primary mb-3 mx-auto" />
              <p className="text-sm text-muted-foreground">Peserta</p>
              <p className="font-semibold">Terbatas</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
              <MapPin className="w-8 h-8 text-primary mb-3 mx-auto" />
              <p className="text-sm text-muted-foreground">Lokasi</p>
              <p className="font-semibold">Jakarta Selatan</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Venue <span className="text-primary">Lokasi</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Temukan kami di lokasi strategis Jakarta Selatan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="p-8 bg-card border-border/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Detail Lokasi
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Alamat</p>
                  <p className="text-lg">Jakarta Selatan, Indonesia</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Koordinat</p>
                  <p className="text-sm font-mono">-6.234348, 106.757195</p>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Akses Transportasi</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>MRT/LRT terdekat</li>
                    <li>Akses jalan raya utama</li>
                    <li>Area parkir tersedia</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="h-[400px] rounded-lg overflow-hidden border border-border/50 shadow-glow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7876!2d106.7571959!3d-6.2343489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMDMuNyJTIDEwNsKwNDUnMjUuOSJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-2">
            Berkelana<span className="text-primary">.</span>
          </h3>
          <p className="text-muted-foreground">
            © 2025 Berkelana. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
