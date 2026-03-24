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
      {/* Fondo — gradiente mesh premium con animación */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.07] blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div
          className="absolute bottom-[-30%] left-[-15%] w-[60vw] h-[60vw] rounded-full opacity-[0.05] blur-[100px] animate-[pulse_12s_ease-in-out_infinite_2s]"
          style={{ background: "hsl(160 60% 45%)" }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full opacity-[0.03] blur-[80px] animate-[pulse_10s_ease-in-out_infinite_4s]"
          style={{ background: "hsl(280 60% 50%)" }}
        />
      </div>

      {/* Layout split — Hero izquierda */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 px-16">
        <div className="max-w-lg">
          <div
            className="flex items-center gap-3 mb-8 animate-fade-in"
            style={{ animationDuration: "0.6s", animationFillMode: "both" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center hover-scale">
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">Pomodoro</span>
          </div>
          <h2
            className="text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 animate-fade-in"
            style={{ animationDuration: "0.7s", animationDelay: "0.15s", animationFillMode: "both" }}
          >
            Automatiza tu
            <br />
            <span className="text-primary">contenido.</span>
          </h2>
          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-md animate-fade-in"
            style={{ animationDuration: "0.7s", animationDelay: "0.3s", animationFillMode: "both" }}
          >
            La plataforma que potencia tu flujo de trabajo creativo con IA. Genera, programa y publica — además de análisis de reels y gestión de trabajadores — todo en un solo lugar.
          </p>
          <div
            className="flex items-center gap-4 mt-10 animate-fade-in"
            style={{ animationDuration: "0.7s", animationDelay: "0.45s", animationFillMode: "both" }}
          >
            <div className="flex items-center gap-2">
              {[
                <svg key="ig" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
                <svg key="tt" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
                <svg key="yt" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center hover-scale"
                >
                  {icon}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">+120M</span> views por mes
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-6">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div
            className="flex items-center gap-3 mb-10 lg:hidden animate-fade-in"
            style={{ animationDuration: "0.5s", animationFillMode: "both" }}
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">Pomodoro</span>
          </div>

          <h1
            className="text-2xl font-bold text-foreground tracking-tight mb-1 animate-fade-in"
            style={{ animationDuration: "0.6s", animationDelay: "0.1s", animationFillMode: "both" }}
          >
            {isLogin
              ? otpSent ? "Verifica tu identidad" : "Bienvenido de vuelta"
              : "Únete a Pomodoro"}
          </h1>
          <p
            className="text-sm text-muted-foreground mb-8 animate-fade-in"
            style={{ animationDuration: "0.6s", animationDelay: "0.2s", animationFillMode: "both" }}
          >
            {isLogin
              ? otpSent ? "Ingresa el código de 6 dígitos" : "Ingresa tu email para continuar"
              : "Contacta con nosotros para empezar"}
          </p>

          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-lg bg-muted/50 border border-border/50 mb-8 animate-fade-in"
            style={{ animationDuration: "0.6s", animationDelay: "0.3s", animationFillMode: "both" }}
          >
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
            <form
              onSubmit={handleSendCode}
              className="space-y-4 animate-fade-in"
              style={{ animationDuration: "0.4s", animationFillMode: "both" }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="h-12 bg-muted/30 border-border/60 text-sm px-4 focus-visible:ring-primary/30 transition-all duration-200"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-sm font-medium gap-2 mt-2 hover-scale">
                Continuar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          {isLogin && otpSent && (
            <form
              onSubmit={handleVerifyCode}
              className="space-y-6 animate-fade-in"
              style={{ animationDuration: "0.4s", animationFillMode: "both" }}
            >
              <p className="text-sm text-muted-foreground">
                Enviado a <span className="text-foreground font-medium">{email}</span>
              </p>
              <div className="flex justify-center animate-scale-in" style={{ animationDuration: "0.3s", animationDelay: "0.15s", animationFillMode: "both" }}>
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
              <Button type="submit" className="w-full h-12 text-sm font-medium gap-2 hover-scale" disabled={otp.length < 6}>
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
            <div
              className="space-y-6 animate-fade-in"
              style={{ animationDuration: "0.4s", animationFillMode: "both" }}
            >
              <div className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto animate-[pulse_3s_ease-in-out_infinite]">
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
                  className="w-full h-12 text-sm font-medium gap-2 hover-scale"
                  onClick={() => window.open("https://t.me/ofmkeviin", "_blank")}
                >
                  <Send className="w-4 h-4" />
                  Contactar @ofmkeviin
                </Button>
              </div>
            </div>
          )}

          {/* Advice ComfyUI */}
          <div
            className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center space-y-1 animate-fade-in"
            style={{ animationDuration: "0.7s", animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <p className="text-sm font-medium text-foreground">¿Eres programador de ComfyUI?</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Contáctame y usa esta plataforma para vender tus workflows.
              <br />
              <span className="text-primary font-semibold">0% de comisión</span> · <span className="text-foreground font-medium">100% de seguridad</span> · <span className="text-foreground font-medium">Plug & Play</span>
            </p>
          </div>

          <p
            className="text-center text-xs text-muted-foreground mt-4 animate-fade-in"
            style={{ animationDuration: "0.6s", animationDelay: "0.6s", animationFillMode: "both" }}
          >
            Al continuar, aceptas nuestros{" "}
            <span className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors" onClick={() => alert("puto el que lee esto!")}>Términos</span>
            {" "}y{" "}
            <span className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors" onClick={() => alert("puto el que lee esto!")}>Privacidad</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
