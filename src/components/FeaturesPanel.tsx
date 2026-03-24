import { useState } from "react";
import { Video, ArrowLeft, ChevronRight, Wand2, Film, Sparkles } from "lucide-react";
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
  tags: string[];
  icon: React.ReactNode;
  podLabel: string;
  podDescription: string;
  comingSoon?: boolean;
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
    tags: [],
    icon: <Film className="w-5 h-5 text-amber-400" />,
    podLabel: "Iniciar estudio Motion Transfer",
    podDescription: "Se creará una instancia GPU en RunPod con el pipeline de Motion Transfer.",
  },
  {
    id: "ltx-i2v",
    name: "Image to Video",
    title: "Motion Transfer",
    subtitle: "Movimiento de un vídeo + una imagen",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Combina el movimiento de un vídeo de referencia con una imagen estática — ideal para crear contenido dinámico.",
    tags: [],
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
    tags: [],
    icon: <Wand2 className="w-5 h-5 text-accent" />,
    podLabel: "Iniciar Iceklub",
    podDescription: "Se creará una instancia GPU en RunPod.",
    comingSoon: true,
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

    if (viewState.step === "schedule") {
      return (
        <ContentScheduler
          featureId={feature.id}
          featureTitle={feature.title}
          featureSubtitle={feature.subtitle}
          onBack={() => setViewState(null)}
          onContinue={() => setViewState({ featureId: feature.id, step: "howItWorks" })}
          showPrompts={feature.id === "ltx-i2v"}
          showVideo={feature.id === "motion-transfer"}
        />
      );
    }

    if (viewState.step === "howItWorks") {
      return (
        <HowItWorksView
          featureId={feature.id}
          featureTitle={feature.title}
          onBack={() => setViewState({ featureId: feature.id, step: "schedule" })}
          onContinue={() => setViewState({ featureId: feature.id, step: "deploy" })}
        />
      );
    }

    if (viewState.step === "deploy") {
      return (
        <StartPodView
          feature={feature}
          onBack={() => setViewState({ featureId: feature.id, step: "howItWorks" })}
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
            onClick={() => !feature.comingSoon && setViewState({ featureId: feature.id, step: "schedule" })}
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
                  {feature.comingSoon && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground">
                      Coming soon
                    </span>
                  )}
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
