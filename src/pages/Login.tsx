import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowRight, Send } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Fondo — gradiente mesh premium */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div
          className="absolute bottom-[-30%] left-[-15%] w-[60vw] h-[60vw] rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: "hsl(160 60% 45%)" }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full opacity-[0.03] blur-[80px]"
          style={{ background: "hsl(280 60% 50%)" }}
        />
      </div>

      {/* Layout split */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 px-16">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">Pomodoro</span>
          </div>
          <h2 className="text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Automatiza tu
            <br />
            <span className="text-primary">contenido.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            La plataforma que potencia tu flujo de trabajo creativo con IA. Genera, programa y publica — todo en un solo lugar.
          </p>
          <div className="flex items-center gap-6 mt-10">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background bg-muted"
                  style={{
                    background: `hsl(${220 + i * 30} 40% ${35 + i * 8}%)`,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">2,400+</span> creadores activos
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-6">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">Pomodoro</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
            {isLogin
              ? otpSent ? "Verifica tu identidad" : "Bienvenido de vuelta"
              : "Únete a Pomodoro"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isLogin
              ? otpSent ? "Ingresa el código de 6 dígitos" : "Ingresa tu email para continuar"
              : "Contacta con nosotros para empezar"}
          </p>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-lg bg-muted/50 border border-border/50 mb-8">
            <button
              onClick={() => { setIsLogin(true); setOtpSent(false); setOtp(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                isLogin
                  ? "bg-background text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => { setIsLogin(false); setOtpSent(false); setOtp(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                !isLogin
                  ? "bg-background text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Registro
            </button>
          </div>

          {/* LOGIN */}
          {isLogin && !otpSent && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="h-12 bg-muted/30 border-border/60 text-sm px-4 focus-visible:ring-primary/30"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-sm font-medium gap-2 mt-2">
                Continuar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          {isLogin && otpSent && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Enviado a <span className="text-foreground font-medium">{email}</span>
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button type="submit" className="w-full h-12 text-sm font-medium gap-2" disabled={otp.length < 6}>
                Verificar código
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(""); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Cambiar email
                </button>
                <button
                  type="button"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Reenviar código
                </button>
              </div>
            </form>
          )}

          {/* REGISTRO */}
          {!isLogin && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Registro por invitación</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Escríbenos por Telegram para obtener acceso a la plataforma
                  </p>
                </div>
                <Button
                  type="button"
                  className="w-full h-12 text-sm font-medium gap-2"
                  onClick={() => window.open("https://t.me/ofmkeviin", "_blank")}
                >
                  <Send className="w-4 h-4" />
                  Contactar @ofmkeviin
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground mt-8">
            Al continuar, aceptas nuestros{" "}
            <span className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors">Términos</span>
            {" "}y{" "}
            <span className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors">Privacidad</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
