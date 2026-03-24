import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Solo UI — sin lógica real
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo inmersivo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradiente radial central */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, hsl(var(--primary) / 0.15), transparent 70%)`
        }} />
        {/* Gradiente inferior accent */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 50% at 70% 110%, hsl(var(--accent) / 0.08), transparent 60%)`
        }} />
        {/* Orbe flotante izquierdo */}
        <div className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full animate-pulse" style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)`,
          animationDuration: '6s',
        }} />
        {/* Orbe flotante derecho */}
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full animate-pulse" style={{
          background: `radial-gradient(circle, hsl(var(--accent) / 0.07), transparent 70%)`,
          animationDuration: '8s',
          animationDelay: '2s',
        }} />
        {/* Líneas de flujo curvadas via SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 Q400,100 800,300 T1600,200" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
          <path d="M0,400 Q300,250 700,450 T1400,350" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8"/>
          <path d="M0,600 Q500,500 900,650 T1800,550" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.6"/>
          <path d="M200,0 Q350,300 200,600 T400,900" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
          <path d="M1200,0 Q1050,400 1200,700 T1000,1000" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.7"/>
        </svg>
        {/* Puntos de luz dispersos */}
        <div className="absolute top-[30%] left-[20%] w-1 h-1 rounded-full bg-primary/30 shadow-[0_0_8px_4px_hsl(var(--primary)/0.15)]" />
        <div className="absolute top-[18%] right-[25%] w-1.5 h-1.5 rounded-full bg-accent/25 shadow-[0_0_10px_5px_hsl(var(--accent)/0.1)]" />
        <div className="absolute bottom-[35%] left-[35%] w-1 h-1 rounded-full bg-primary/20 shadow-[0_0_6px_3px_hsl(var(--primary)/0.1)]" />
        <div className="absolute bottom-[25%] right-[18%] w-1 h-1 rounded-full bg-accent/20 shadow-[0_0_8px_4px_hsl(var(--accent)/0.08)]" />
        <div className="absolute top-[55%] left-[65%] w-0.5 h-0.5 rounded-full bg-primary/25 shadow-[0_0_6px_3px_hsl(var(--primary)/0.12)]" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 ring-2 ring-primary/20">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Pomodoro Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Inicia sesión en tu cuenta" : "Crea tu cuenta"}
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            {/* Tabs */}
            <div className="flex rounded-lg bg-secondary/60 p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isLogin
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  !isLogin
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Registro
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre (solo registro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Nombre
                  </label>
                  <div className="relative">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="bg-secondary/40 border-border/50 pl-3 h-11"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
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

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-secondary/40 border-border/50 pl-10 pr-10 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full h-11 mt-2 gap-2">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Separador */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">o continúa con</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11 bg-secondary/30 border-border/50 hover:bg-secondary/60">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 bg-secondary/30 border-border/50 hover:bg-secondary/60">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </Button>
            </div>
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
