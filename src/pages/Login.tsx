import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, ArrowRight, Send } from "lucide-react";
import logoPng from "@/assets/logo-pomodoro.png";
import loginBg from "@/assets/login-bg.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

  const handleBack = () => {
    setOtpSent(false);
    setOtp("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <img src={loginBg} alt="" className="fixed inset-0 w-full h-full object-cover" />
      <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4">
            <img src={logoPng} alt="Pomodoro" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Pomodoro</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin
              ? otpSent ? "Ingresa el código enviado" : "Inicia sesión con tu email"
              : "Crea tu cuenta"}
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            {/* Tabs */}
            <div className="flex rounded-lg bg-secondary/60 p-1 mb-6">
              <button
                onClick={() => { setIsLogin(true); setOtpSent(false); setOtp(""); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isLogin
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => { setIsLogin(false); setOtpSent(false); setOtp(""); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  !isLogin
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Registro
              </button>
            </div>

            {/* LOGIN - Flujo OTP */}
            {isLogin && !otpSent && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="bg-secondary/40 border-border/50 pl-10 h-11"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 mt-2 gap-2">
                  Enviar Código
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}

            {isLogin && otpSent && (
              <form onSubmit={handleVerifyCode} className="space-y-5">
                <p className="text-sm text-muted-foreground text-center">
                  Código enviado a <span className="text-foreground font-medium">{email}</span>
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
                <Button type="submit" className="w-full h-11 gap-2" disabled={otp.length < 6}>
                  Verificar
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
                >
                  Cambiar email
                </button>
              </form>
            )}

            {/* REGISTRO */}
            {!isLogin && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Para registrarte, contáctanos por Telegram
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 bg-[hsl(200_80%_50%/0.1)] border-[hsl(200_80%_50%/0.3)] hover:bg-[hsl(200_80%_50%/0.2)] text-foreground gap-2"
                  onClick={() => window.open("https://t.me/ofmkeviin", "_blank")}
                >
                  <Send className="w-4 h-4" />
                  Telegram — @ofmkeviin
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Al continuar, aceptas nuestros{" "}
          <span className="text-primary hover:underline cursor-pointer">Términos</span> y{" "}
          <span className="text-primary hover:underline cursor-pointer">Privacidad</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
