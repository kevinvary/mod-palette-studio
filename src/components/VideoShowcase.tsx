import { useState, useEffect, useRef, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const examples = [
  { title: "Motion Transfer", desc: "Transfiere movimiento de un video a una imagen", tag: "IA Video", video: "/videos/example-result.mp4" },
  { title: "Image to Video", desc: "Convierte cualquier imagen en un video animado", tag: "Generación", video: "/videos/example-image-to-video.mp4" },
  { title: "Lip Sync", desc: "Sincroniza labios con cualquier audio", tag: "Audio IA" },
  { title: "LoRA Training", desc: "Entrena modelos personalizados con tus datos", tag: "Entrenamiento" },
  { title: "Reel Analytics", desc: "Analiza el rendimiento de tus reels automáticamente", tag: "Analytics" },
  { title: "+10 Herramientas", desc: "Automatiza todo tu flujo de trabajo con un solo click", tag: "All-in-One" },
];

const STATIC_SLIDE_DURATION = 3500;

const VideoShowcase = () => {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % examples.length);
  }, []);

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + examples.length) % examples.length);
  };

  // For slides without video, auto-advance after STATIC_SLIDE_DURATION
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const current = examples[active];
    if (!current.video) {
      timerRef.current = setTimeout(goNext, STATIC_SLIDE_DURATION);
    }
    // If it has video, onEnded will handle advancing

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, goNext]);

  return (
    <div
      className="mt-6 animate-fade-in"
      style={{ animationDuration: "0.7s", animationDelay: "0.55s", animationFillMode: "both" }}
    >
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
        Ejemplos generados con IA
      </p>

      {/* Main preview - larger aspect ratio */}
      <div className="relative rounded-xl border border-border/50 bg-muted/20 overflow-hidden group">
        <div className="aspect-[1/1] bg-gradient-to-br from-primary/10 via-muted/30 to-primary/5 flex items-center justify-center relative">
          {examples[active].video ? (
            <video
              ref={videoRef}
              key={active}
              src={examples[active].video}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={goNext}
            />
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }} />
              <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
                <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
              </div>
            </>
          )}

          {/* Tag */}
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-primary/20 text-primary px-2.5 py-1 rounded-md border border-primary/20">
            {examples[active].tag}
          </span>
        </div>

        {/* Info bar */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{examples[active].title}</p>
            <p className="text-xs text-muted-foreground">{examples[active].desc}</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => go(-1)}
              className="w-7 h-7 rounded-md bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-7 h-7 rounded-md bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {examples.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoShowcase;
