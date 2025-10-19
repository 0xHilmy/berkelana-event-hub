import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Debug: Log untuk development (hapus di production)
    if (import.meta.env.DEV) {
      console.log('Environment check:', {
        hasUsername: !!adminUsername,
        hasPassword: !!adminPassword,
        inputUsername: username,
        envUsername: adminUsername
      });
    }

    // Check if environment variables are set
    if (!adminUsername || !adminPassword) {
      setError("Konfigurasi admin belum diatur. Hubungi administrator.");
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      // Set session
      sessionStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Admin <span className="text-primary">Login</span>
          </h1>
          <p className="text-muted-foreground">
            Masuk untuk mengakses dashboard admin
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-muted-foreground"
          >
            ← Kembali ke Beranda
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
