import { useState } from "react";
import { Video, ArrowLeft, ChevronRight, Wand2, Film, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import LtxGeneratorView from "@/components/LtxGeneratorView";
import MotionTransferView from "@/components/MotionTransferView";
import ContentScheduler from "@/components/ContentScheduler";

interface Feature {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  podLabel: string;
  podDescription: string;
}

const features: Feature[] = [
  {
    id: "ltx-i2v",
    name: "LTX 2.3 Image to Video",
    title: "LTX 2.3 — Image to Video",
    subtitle: "Genera video cinematográfico a partir de una imagen con prompts personalizados",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera vídeos a partir de imágenes con LTX 2.3 — 22B parámetros, prompt enhancement con Gemma 12B, upscale 2x integrado.",
    tags: ["ltx-2.3-22b-dev", "gemma-3-12b", "spatial-upscaler-v2"],
    icon: <Video className="w-5 h-5 text-primary" />,
    podLabel: "Iniciar estudio LTX 2.3",
    podDescription: "Se creará una instancia GPU en RunPod con el modelo LTX 2.3 (22B).",
  },
  {
    id: "motion-transfer",
    name: "Motion Transfer",
    title: "Motion Transfer",
    subtitle: "Transfiere movimiento de un vídeo de referencia a una imagen estática",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Transfiere movimiento de un vídeo de referencia a una imagen estática — ideal para crear contenido dinámico.",
    tags: ["motion-transfer"],
    icon: <Film className="w-5 h-5 text-amber-400" />,
    podLabel: "Iniciar estudio Motion Transfer",
    podDescription: "Se creará una instancia GPU en RunPod con el pipeline de Motion Transfer.",
  },
  {
    id: "iceklub-workflows",
    name: "Kevin Workflows",
    title: "Iceklub Workflows",
    subtitle: "10 workflows de generación — imágenes, vídeos y captions",
    category: "Multi",
    categoryColor: "bg-accent text-accent-foreground",
    description: "10 workflows de generación — imágenes, vídeos y captions. Click para editar parámetros y ejecutar.",
    tags: ["SDXL", "LTX", "Wan 2.1", "Florence-2"],
    icon: <Wand2 className="w-5 h-5 text-accent" />,
    podLabel: "Iniciar Iceklub",
    podDescription: "Se creará una instancia GPU en RunPod.",
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

type ViewState = null | { featureId: string; podStarted: boolean };

const FeaturesPanel = () => {
  const [viewState, setViewState] = useState<ViewState>(null);

  if (viewState) {
    const feature = features.find((f) => f.id === viewState.featureId)!;

    if (!viewState.podStarted) {
      return (
        <StartPodView
          feature={feature}
          onBack={() => setViewState(null)}
          onStart={() => setViewState({ ...viewState, podStarted: true })}
        />
      );
    }

    if (feature.id === "ltx-i2v" || feature.id === "motion-transfer") {
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
            onClick={() => setViewState({ featureId: feature.id, podStarted: false })}
            className="w-full surface-card p-5 text-left hover:border-primary/30 transition-colors duration-150 group"
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
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-secondary rounded text-[10px] font-mono text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-2 group-hover:text-foreground transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPanel;
