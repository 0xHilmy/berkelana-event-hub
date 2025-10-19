import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

interface ParticipantInfo {
  name: string;
  seat: string;
  status: string;
  hasAttended: boolean;
  attendanceTime: string | null;
}

const Index = () => {
  const [userId, setUserId] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      setUserId(id);
      checkAttendanceStatus(id);
    }
  }, []);

  // Polling untuk cek status saat QR ditampilkan
  useEffect(() => {
    if (!showQR || !userId) return;

    // Cek status setiap 3 detik saat QR ditampilkan (silent mode)
    const intervalId = setInterval(() => {
      checkAttendanceStatus(userId, true);
    }, 3000);

    // Cleanup interval saat component unmount atau QR disembunyikan
    return () => clearInterval(intervalId);
  }, [showQR, userId, participantInfo]);

  const checkAttendanceStatus = async (id: string, silent = false) => {
    if (!silent) {
      setIsLoading(true);
    }
    setError(null);

    try {
      // GANTI URL INI DENGAN GOOGLE APPS SCRIPT URL ANDA
      const response = await fetch(`https://script.google.com/macros/s/AKfycbwXzCk8rnaRzHWSmmE1bQpEuHwZpDcz2gYIQgTPnOmdqQ12QLlJRL0Ayf7PuNcW81VC/exec?id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.result === 'success') {
        const newInfo = {
          name: data.name,
          seat: data.seat || '-',
          status: data.status,
          hasAttended: data.hasAttended,
          attendanceTime: data.attendanceTime
        };

        // Jika status berubah dari belum presensi ke sudah presensi
        if (!participantInfo?.hasAttended && newInfo.hasAttended && showQR) {
          // Tutup QR dan tampilkan notifikasi
          setShowQR(false);
          ;
        }

        setParticipantInfo(newInfo);
      } else {
        if (!silent) {
          setError(data.message || 'ID tidak ditemukan');
        }
      }
    } catch (err) {
      console.error('Error checking status:', err);
      // Jika gagal cek status, tetap izinkan user untuk generate QR
      // Tapi tampilkan warning (hanya saat first load)
      if (!silent) {
        setError('Tidak dapat memuat info peserta. Anda masih bisa generate QR code.');
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  const handleAttendEvent = () => {
    if (!userId) {
      alert('ID pengguna tidak ditemukan di URL');
      return;
    }
    if (participantInfo?.hasAttended) {
      alert('Anda sudah melakukan presensi!');
      return;
    }
    setShowQR(true);
  };

  return (
    <div className="min-h-screen bg-background">
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

          <div className="flex flex-col items-center">
            {isLoading && (
              <div className="mb-6">
                <p className="text-muted-foreground">Memuat data...</p>
              </div>
            )}

            {error && (
              <div className="mb-6">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {participantInfo && !isLoading && (
              <Card className="w-full max-w-md p-6 mb-8 bg-card/90 backdrop-blur-sm">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Hello, <span className="text-primary">{participantInfo.name}</span>!
                  </h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Your seat: <span className="font-semibold text-foreground">{participantInfo.seat}</span></p>
                    <p>Status: <span className="font-semibold text-foreground">{participantInfo.status}</span></p>
                    {participantInfo.hasAttended && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-semibold">✓ Anda sudah melakukan presensi</p>
                        {participantInfo.attendanceTime && (
                          <p className="text-sm text-green-700 mt-1">
                            Waktu: {new Date(participantInfo.attendanceTime).toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {!showQR ? (
              <>
                <Button
                  variant="hero"
                  size="lg"
                  className="px-12 py-6 text-xl h-auto"
                  onClick={handleAttendEvent}
                  disabled={!userId || isLoading || participantInfo?.hasAttended}
                >
                  {participantInfo?.hasAttended ? 'Sudah Presensi' : 'Attend Event'}
                </Button>

                {!userId && !isLoading && (
                  <p className="text-sm text-red-500 mt-4">
                    ID tidak ditemukan. Pastikan URL mengandung parameter ?id=
                  </p>
                )}
              </>
            ) : (
              <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm">
                {participantInfo && (
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      {participantInfo.name}
                    </h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Seat: <span className="font-semibold text-foreground">{participantInfo.seat}</span></p>
                      <p>Status: <span className="font-semibold text-foreground">{participantInfo.status}</span></p>
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold mb-4 text-center">
                  QR Code Presensi Anda
                </h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Tunjukkan QR code ini ke admin untuk dicatat kehadirannya
                </p>

                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 text-center">
                    <span className="inline-block animate-pulse mr-2">●</span>
                    Menunggu scan dari admin...
                  </p>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-6 rounded-lg">
                    <QRCode
                      value={userId}
                      size={256}
                      level="H"
                    />
                  </div>
                </div>
                <p className="text-lg font-semibold mb-4 text-center">
                  ID: <span className="text-primary">{userId}</span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowQR(false)}
                  className="mt-2 w-full"
                >
                  Kembali
                </Button>
              </Card>
            )}
          </div>

          <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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