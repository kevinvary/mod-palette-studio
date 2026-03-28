import { useState } from "react";
import { 
  ArrowLeft, ChevronRight, Film, Image, Wand2, Sparkles, Lock,
  Paintbrush, Box, Mic, Volume2, LayoutGrid, BarChart3, Users, PenTool
} from "lucide-react";
import { cn } from "@/lib/utils";
import LtxGeneratorView from "@/components/LtxGeneratorView";
import MotionTransferView from "@/components/MotionTransferView";
import ContentScheduler from "@/components/ContentScheduler";
import HowItWorksView from "@/components/HowItWorksView";

interface Feature {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  description: string;
  icon: React.ReactNode;
  podLabel: string;
  podDescription: string;
  comingSoon?: boolean;
  progress?: number;
}

const features: Feature[] = [
  {
    id: "motion-transfer",
    name: "Motion Transfer",
    title: "Motion Transfer",
    subtitle: "Movimiento de un vídeo + una imagen",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Combina el movimiento de un vídeo de referencia con una imagen estática — ideal para crear contenido dinámico.",
    icon: <Film className="w-5 h-5 text-primary" />,
    podLabel: "Iniciar estudio Motion Transfer",
    podDescription: "Se creará una instancia GPU en RunPod con el pipeline de Motion Transfer.",
  },
  {
    id: "ltx-i2v",
    name: "Image to Video",
    title: "Image to Video",
    subtitle: "Genera video cinematográfico a partir de una imagen con prompts personalizados",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera vídeos a partir de imágenes con prompts personalizados, prompt enhancement y upscale 2x integrado.",
    icon: <Image className="w-5 h-5 text-primary" />,
    podLabel: "Iniciar estudio de video",
    podDescription: "Se creará una instancia GPU en RunPod.",
  },
  {
    id: "lip-sync",
    name: "Image to Video + Voice - LipSync",
    title: "Image to Video + Voice - LipSync",
    subtitle: "Genera vídeo a partir de una foto y añade voz sincronizada con labios",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera vídeo a partir de una imagen, añade voz con ElevenLabs y sincroniza los labios automáticamente.",
    icon: <Mic className="w-5 h-5 text-primary" />,
    podLabel: "Iniciar estudio I2V + Voice - LipSync",
    podDescription: "Se creará una instancia GPU con el pipeline de Image to Video + Voice + Lip Sync.",
  },
  {
    id: "i2v-elevenlabs",
    name: "Image to Video + ElevenLabs",
    title: "Image to Video + ElevenLabs",
    subtitle: "Genera vídeo a partir de imagen y añade voz con ElevenLabs",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera vídeo a partir de imagen y añade voz con ElevenLabs automáticamente.",
    icon: <Volume2 className="w-5 h-5 text-primary" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 79,
  },
  {
    id: "motion-transfer-lora",
    name: "Motion Transfer 2.1",
    title: "Motion Transfer 2.1",
    subtitle: "Motion Transfer con LoRA — Plug & Play",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Motion Transfer con LoRA — Plug & Play, solo pega el link del vídeo a replicar.",
    icon: <Film className="w-5 h-5 text-primary" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 65,
  },
  {
    id: "create-image",
    name: "Crea tu Imagen",
    title: "Crea tu Imagen",
    subtitle: "Genera imágenes únicas con IA a partir de prompts personalizados",
    category: "Modelo",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera imágenes únicas con IA a partir de prompts personalizados.",
    icon: <Paintbrush className="w-5 h-5 text-primary" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 52,
  },
  {
    id: "train-lora",
    name: "Crea tu LoRA 1:1",
    title: "Crea tu LoRA 1:1",
    subtitle: "Entrena un modelo personalizado con tus propias imágenes",
    category: "Modelo",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Entrena un modelo personalizado con tus propias imágenes para resultados únicos.",
    icon: <Box className="w-5 h-5 text-primary" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 40,
  },
  {
    id: "carousel-post",
    name: "Carrousel de Post",
    title: "Carrousel de Post",
    subtitle: "Crea un carrousel completo para redes sociales",
    category: "Modelo",
    categoryColor: "bg-accent text-accent-foreground",
    description: "Crea un carrousel completo para redes sociales a partir de una sola foto.",
    icon: <LayoutGrid className="w-5 h-5 text-accent" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 20,
  },
  {
    id: "reel-tracker",
    name: "Reel Tracker",
    title: "Reel Tracker",
    subtitle: "Trackea el rendimiento de todos tus reels",
    category: "Gestión",
    categoryColor: "bg-accent text-accent-foreground",
    description: "Trackea el rendimiento de todos tus reels desde la misma plataforma.",
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 12,
  },
  {
    id: "va-management",
    name: "Gestión de VA",
    title: "Gestión de VA",
    subtitle: "Trackea trabajadores y programa contenido",
    category: "Gestión",
    categoryColor: "bg-accent text-accent-foreground",
    description: "Trackea trabajadores y programa contenido — conectado con Telegram.",
    icon: <Users className="w-5 h-5 text-accent" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 5,
  },
  {
    id: "grok-integration",
    name: "Integración con Grok",
    title: "Integración con Grok",
    subtitle: "Genera guiones automáticos a partir de tu LLM",
    category: "Gestión",
    categoryColor: "bg-accent text-accent-foreground",
    description: "Genera guiones automáticos a partir de tu LLM con integración directa.",
    icon: <PenTool className="w-5 h-5 text-accent" />,
    podLabel: "",
    podDescription: "",
    comingSoon: true,
    progress: 2,
  },
];

const StartPodView = ({
  feature,
  onBack,
  onStart,
}: {
  feature: Feature;
  onBack: () => void;
  onStart: () => void;
}) => (
  <div className="flex flex-col h-full animate-fade-in">
    <div className="px-6 pt-5 pb-3 border-b border-border">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Features
      </button>
    </div>
    <div className="flex-1 p-6">
      <h1 className="text-lg font-semibold text-foreground">{feature.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{feature.subtitle}</p>

      <div className="mt-8 surface-card rounded-xl flex flex-col items-center justify-center py-16 px-8">
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-base font-semibold text-foreground mb-2">{feature.podLabel}</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">{feature.podDescription}</p>
        <button
          onClick={onStart}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Iniciar pod
        </button>
      </div>
    </div>
  </div>
);

type ViewState = null | { featureId: string; step: "schedule" | "howItWorks" | "deploy" | "studio" };

const FeaturesPanel = () => {
  const [viewState, setViewState] = useState<ViewState>(null);

  if (viewState) {
    const feature = features.find((f) => f.id === viewState.featureId)!;

    if (viewState.step === "howItWorks") {
      return (
        <HowItWorksView
          featureId={feature.id}
          featureTitle={feature.title}
          onBack={() => setViewState(null)}
          onContinue={() => setViewState({ featureId: feature.id, step: "schedule" })}
        />
      );
    }

    if (viewState.step === "schedule") {
      return (
        <ContentScheduler
          featureId={feature.id}
          featureTitle={feature.title}
          featureSubtitle={feature.subtitle}
          onBack={() => setViewState({ featureId: feature.id, step: "howItWorks" })}
          onContinue={() => setViewState({ featureId: feature.id, step: "deploy" })}
          showPrompts={feature.id === "ltx-i2v" || feature.id === "lip-sync"}
          showVideo={feature.id === "motion-transfer"}
          showAudio={feature.id === "lip-sync"}
        />
      );
    }

    if (viewState.step === "deploy") {
      return (
        <StartPodView
          feature={feature}
          onBack={() => setViewState({ featureId: feature.id, step: "schedule" })}
          onStart={() => setViewState({ featureId: feature.id, step: "studio" })}
        />
      );
    }

    if (viewState.step === "studio" && (feature.id === "ltx-i2v" || feature.id === "motion-transfer")) {
      return (
        <div className="flex flex-col h-full">
          <div className="px-6 pt-5 pb-3 border-b border-border">
            <button
              onClick={() => setViewState(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Features
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {feature.id === "ltx-i2v" ? <LtxGeneratorView /> : <MotionTransferView />}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Features</h1>
        <p className="text-sm text-muted-foreground mt-1">Herramientas de generación de contenido</p>
      </div>

      <div className="space-y-3 max-w-3xl">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => !feature.comingSoon && setViewState({ featureId: feature.id, step: "howItWorks" })}
            disabled={feature.comingSoon}
            className={cn(
              "w-full surface-card p-5 text-left transition-colors duration-150 group",
              feature.comingSoon ? "opacity-50 cursor-not-allowed" : "hover:border-primary/30"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.name}
                  </h3>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", feature.categoryColor)}>
                    {feature.category}
                  </span>
                  {feature.comingSoon && !feature.progress && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground">
                      Coming soon
                    </span>
                  )}
                  {feature.progress != null && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/15 text-primary">
                      {feature.progress}%
                    </span>
                  )}
                </div>
                {feature.progress != null && (
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${feature.progress}%` }}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{feature.description}</p>
              </div>
              {feature.comingSoon ? (
                <Lock className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-2 group-hover:text-foreground transition-colors" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPanel;
