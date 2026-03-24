import { ArrowLeft, ArrowRight, MessageSquare, Sparkles, AlertTriangle, Timer, Headphones, Camera, Scissors, Star } from "lucide-react";
import exampleCleanPhoto from "@/assets/example-clean-photo.jpg";
import exampleResultPhoto from "@/assets/example-result-photo.jpg";
import exampleFinalResult from "@/assets/example-final-result.jpg";

interface HowItWorksViewProps {
  featureId: string;
  featureTitle: string;
  onBack: () => void;
  onContinue: () => void;
}

const LtxHowItWorks = () => (
  <div className="max-w-2xl mx-auto space-y-6 py-4">
    <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona LTX 2.3?</h2>

    <div className="surface-card p-5 rounded-xl space-y-3">
      <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Prompts: Positive y Negative</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        El modelo trabaja con dos tipos de prompts. El <span className="text-foreground font-medium">Positive Prompt</span> describe lo que quieres ver en el vídeo: escena, personajes, estilo, iluminación, etc. El <span className="text-foreground font-medium">Negative Prompt</span> indica lo que quieres evitar: baja calidad, deformaciones, artefactos, etc.
      </p>
    </div>

    <div className="surface-card p-5 rounded-xl space-y-3">
      <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><Sparkles className="w-4 h-4" /> Mejorar Prompt — Mantener SIEMPRE activado</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        La opción <span className="text-foreground font-medium">"Mejorar Prompt"</span> debe estar encendida en todo momento. Solo desactívala si tienes experiencia avanzada con prompt engineering.
      </p>
      <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg border border-accent/20">
        <AlertTriangle className="w-3.5 h-3.5 text-accent shrink-0" />
        <span className="text-[11px] text-accent font-medium">Recomendación: No desactivar "Mejorar Prompt" a menos que seas un usuario avanzado.</span>
      </div>
    </div>

    <div className="surface-card p-5 rounded-xl space-y-3">
      <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><Timer className="w-4 h-4" /> Duración del vídeo — 5 segundos por defecto</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Por defecto genera vídeos de <span className="text-foreground font-medium">5 segundos</span>. Si necesitas más, <span className="text-foreground font-medium">fracciona por partes</span> y únelos en posproducción.
      </p>
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
        <Headphones className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-[11px] text-primary font-medium">¿Necesitas más segundos? Contacta con soporte para duración extendida.</span>
      </div>
    </div>
  </div>
);

const MotionTransferHowItWorks = () => (
  <div className="max-w-2xl mx-auto space-y-6 py-4">
    <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona Motion Transfer?</h2>

    <div className="surface-card p-5 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
        <Camera className="w-4 h-4" /> Paso 1 — Foto de la modelo limpia y nítida
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        La foto de nuestra modelo debe ser <span className="text-foreground font-medium">muy limpia y nítida</span>. Esto reduce significativamente el margen de error.
      </p>
      <div className="grid grid-cols-3 gap-3 mt-2">
        <div className="rounded-lg overflow-hidden border border-border">
          <img src={exampleCleanPhoto} alt="Nuestra modelo" className="w-full object-contain" />
          <div className="px-2 py-1.5 bg-secondary">
            <p className="text-[10px] text-muted-foreground text-center">Nuestra modelo</p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border border-border">
          <img src={exampleResultPhoto} alt="Primer frame" className="w-full object-contain" />
          <div className="px-2 py-1.5 bg-secondary">
            <p className="text-[10px] text-muted-foreground text-center">Primer frame del video</p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border border-border">
          <img src={exampleFinalResult} alt="Resultado final" className="w-full object-contain" />
          <div className="px-2 py-1.5 bg-secondary">
            <p className="text-[10px] text-muted-foreground text-center">Resultado final</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-lg overflow-hidden border border-border">
          <video src="/videos/example-reference.mp4" className="w-full object-contain" controls muted loop />
          <div className="px-2 py-1.5 bg-secondary">
            <p className="text-[10px] text-muted-foreground text-center">Video de referencia</p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border border-border">
          <video src="/videos/example-result.mp4" className="w-full object-contain" controls muted loop />
          <div className="px-2 py-1.5 bg-secondary">
            <p className="text-[10px] text-muted-foreground text-center">Resultado final</p>
          </div>
        </div>
      </div>
    </div>

    <div className="surface-card p-5 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-accent flex items-center gap-2">
        <MessageSquare className="w-4 h-4" /> Prompt de ejemplo
      </h3>
      <div className="bg-secondary rounded-lg p-3">
        <p className="text-xs text-foreground font-mono leading-relaxed italic">
          "foto 1, posando como foto 2, copiando la misma ropa y background que la foto 2"
        </p>
      </div>
    </div>

    <div className="surface-card p-5 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
        <Timer className="w-4 h-4" /> Tiempo de procesamiento
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Este es el <span className="text-foreground font-medium">proceso más pesado</span>. Aproximadamente <span className="text-foreground font-medium">10-20 minutos por cada 10 segundos de video</span>.
      </p>
    </div>

    <div className="surface-card p-5 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Errores notorios a evitar
      </h3>
      <ul className="text-xs text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
        <li>Videos donde la <span className="text-foreground font-medium">cara del sujeto está muy lejos</span>.</li>
        <li>Videos con <span className="text-foreground font-medium">fondos negros muy notorios</span>.</li>
      </ul>
    </div>

    <div className="surface-card p-5 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-accent flex items-center gap-2">
        <Scissors className="w-4 h-4" /> Duración del video
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Se recomienda <span className="text-foreground font-medium">no más de 10 segundos</span>. Si es más largo, <span className="text-foreground font-medium">fraccionarlo en partes</span>.
      </p>
    </div>
  </div>
);

const HowItWorksView = ({ featureId, featureTitle, onBack, onContinue }: HowItWorksViewProps) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 pt-5 pb-3 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {featureId === "ltx-i2v" && <LtxHowItWorks />}
        {featureId === "motion-transfer" && <MotionTransferHowItWorks />}
        {featureId !== "ltx-i2v" && featureId !== "motion-transfer" && (
          <div className="max-w-2xl mx-auto py-4">
            <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona {featureTitle}?</h2>
            <p className="text-sm text-muted-foreground mt-2">Información próximamente.</p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-border flex justify-end">
        <button
          onClick={onContinue}
          className="px-6 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
        >
          Continuar al deploy
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HowItWorksView;
