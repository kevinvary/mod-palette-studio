import { useState } from "react";
import { ArrowLeft, Play, Wand2, Film, Sparkles, Image, Lock } from "lucide-react";
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
  badge?: string;
  badgeColor?: string;
}

const features: Feature[] = [
  {
    id: "motion-transfer",
    name: "Motion Transfer",
    title: "Motion Transfer",
    subtitle: "Movimiento de un vídeo + una imagen",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Transfiere el movimiento de un vídeo a cualquier imagen estática",
    icon: <Film className="w-6 h-6 text-primary" />,
    podLabel: "Iniciar estudio Motion Transfer",
    podDescription: "Se creará una instancia GPU en RunPod con el pipeline de Motion Transfer.",
  },
  {
    id: "ltx-i2v",
    name: "Image to Video",
    title: "Image to Video",
    subtitle: "Genera video cinematográfico a partir de una imagen",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera vídeos cinematográficos a partir de una imagen con prompts",
    icon: <Image className="w-6 h-6 text-primary" />,
    podLabel: "Iniciar estudio de video",
    podDescription: "Se creará una instancia GPU en RunPod.",
  },
  {
    id: "iceklub-workflows",
    name: "Kevin Workflows",
    title: "Iceklub Workflows",
    subtitle: "10 workflows de generación",
    category: "Multi",
    categoryColor: "bg-accent text-accent-foreground",
    description: "10 workflows — imágenes, vídeos y captions",
    icon: <Wand2 className="w-6 h-6 text-accent" />,
    podLabel: "Iniciar Iceklub",
    podDescription: "Se creará una instancia GPU en RunPod.",
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
  },
];

const sectionTitle = "GENERACIÓN DE VIDEO";
const sectionSubtitle = "Herramientas de generación de contenido con IA";

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
        Volver a Funciones
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

const FeatureCard = ({
  feature,
  onClick,
}: {
  feature: Feature;
  onClick: () => void;
}) => (
  <div
    className={cn(
      "group rounded-xl overflow-hidden border border-border bg-card transition-all duration-200",
      feature.comingSoon
        ? "opacity-60 cursor-not-allowed"
        : "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
    )}
    onClick={() => !feature.comingSoon && onClick()}
  >
    {/* Thumbnail area */}
    <div className="relative aspect-[16/10] bg-secondary/50 flex items-center justify-center overflow-hidden">
      <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center">
        {feature.icon}
      </div>
      {feature.badge && (
        <span className={cn(
          "absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
          feature.badgeColor || "bg-primary text-primary-foreground"
        )}>
          {feature.badge}
        </span>
      )}
      {feature.comingSoon && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>

    {/* Info */}
    <div className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {feature.name}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {feature.description}
      </p>

      {!feature.comingSoon && (
        <button className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          <Play className="w-3.5 h-3.5" />
          Iniciar
        </button>
      )}
    </div>
  </div>
);

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
              Volver a Funciones
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
    <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
          {sectionTitle}
        </h1>
        <p className="text-sm text-muted-foreground">{sectionSubtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onClick={() => setViewState({ featureId: feature.id, step: "schedule" })}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesPanel;
