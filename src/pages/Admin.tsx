import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QrCode, CheckCircle } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scannerRef.current.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  const onScanSuccess = (decodedText: string) => {
    setScannedData(decodedText);
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  const onScanError = (error: any) => {
    // Ignore scan errors (too noisy)
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleStartScan = () => {
    setScannedData(null);
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  const handleSubmitAttendance = async () => {
    if (!scannedData) return;

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('id', scannedData);
      formData.append('attendance', 'hadir');

      // GANTI URL INI DENGAN GOOGLE APPS SCRIPT URL ANDA
      const response = await fetch('https://script.google.com/macros/s/AKfycbwR7B7oumvegRHobNT28zV3d5QwLarfIwj_bNs96whdzKEd0uAwaG4a7W6WXvB83Bo/exec', {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      });

      const result = await response.json();

      if (result.result === 'duplicate') {
        setErrorMessage(`ID ${scannedData} sudah melakukan presensi sebelumnya!`);
        setTimeout(() => {
          setErrorMessage(null);
          setScannedData(null);
        }, 3000);
      } else if (result.result === 'success') {
        const name = result.name || scannedData;
        const seat = result.seat || '-';
        const status = result.status || '-';
        setSuccessMessage(`✓ Kehadiran berhasil dicatat!\nNama: ${name}\nSeat: ${seat}\nStatus: ${status}`);
        setScannedData(null);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
      } else if (result.result === 'error') {
        setErrorMessage(`Error: ${result.error || 'Terjadi kesalahan'}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Terjadi kesalahan saat mencatat kehadiran');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Scan QR code peserta untuk mencatat kehadiran
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Card className="mb-6 p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <div>
                {successMessage.split('\n').map((line, i) => (
                  <p key={i} className="font-semibold">{line}</p>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Card className="mb-6 p-4 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 text-red-800">
              <span className="text-xl">⚠️</span>
              <p className="font-semibold">{errorMessage}</p>
            </div>
          </Card>
        )}

        {/* QR Scanner Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-primary" />
              Scan QR Code Peserta
            </h2>

            {!isScanning && !scannedData && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-6">
                  Klik tombol di bawah untuk mulai scan QR code peserta
                </p>
                <Button onClick={handleStartScan} size="lg" className="w-full">
                  Mulai Scan QR Code
                </Button>
              </div>
            )}

            {isScanning && (
              <div>
                <div id="qr-reader" className="mb-4"></div>
                <Button onClick={handleStopScan} variant="outline" className="w-full">
                  Batal Scan
                </Button>
              </div>
            )}

            {scannedData && !isScanning && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">QR Code Terdeteksi:</p>
                  <p className="text-2xl font-bold text-primary">{scannedData}</p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleSubmitAttendance}
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Catat Kehadiran'}
                  </Button>
                  <Button
                    onClick={handleStartScan}
                    variant="outline"
                    className="w-full"
                  >
                    Scan Lagi
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Instructions */}
          <Card className="p-6 bg-secondary/30">
            <h3 className="text-xl font-bold mb-4">Cara Penggunaan</h3>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Peserta</strong> membuka link dengan ID mereka
                <br />
                <span className="text-sm">Contoh: localhost:8080/?id=vip001</span>
              </li>
              <li>
                <strong className="text-foreground">Peserta</strong> klik tombol "Attend Event"
                <br />
                <span className="text-sm">QR code unik mereka akan muncul</span>
              </li>
              <li>
                <strong className="text-foreground">Admin</strong> klik "Mulai Scan QR Code"
                <br />
                <span className="text-sm">Gunakan kamera untuk scan QR peserta</span>
              </li>
              <li>
                <strong className="text-foreground">Admin</strong> klik "Catat Kehadiran"
                <br />
                <span className="text-sm">Data otomatis tersimpan ke Google Sheets</span>
              </li>
            </ol>

            <div className="mt-6 p-4 bg-background rounded-lg border border-border">
              <p className="text-sm font-semibold mb-2">💡 Tips:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pastikan pencahayaan cukup saat scan</li>
                <li>• Posisikan QR code di tengah frame</li>
                <li>• Gunakan mobile phone untuk scan lebih mudah</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
