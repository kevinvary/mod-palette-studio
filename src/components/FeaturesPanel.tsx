import { useState } from "react";
import { Video, ArrowLeft, ChevronRight, Wand2, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import LtxGeneratorView from "@/components/LtxGeneratorView";

interface Feature {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: "ltx-i2v",
    name: "LTX 2.3 Image to Video",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Genera vídeos a partir de imágenes con LTX 2.3 — 22B parámetros, prompt enhancement con Gemma 12B, upscale 2x integrado.",
    tags: ["ltx-2.3-22b-dev", "gemma-3-12b", "spatial-upscaler-v2"],
    icon: <Video className="w-5 h-5 text-primary" />,
  },
  {
    id: "motion-transfer",
    name: "Motion Transfer",
    category: "Video",
    categoryColor: "bg-primary text-primary-foreground",
    description: "Transfiere movimiento de un vídeo de referencia a una imagen estática — ideal para crear contenido dinámico.",
    tags: ["motion-transfer"],
    icon: <Film className="w-5 h-5 text-amber-400" />,
  },
  {
    id: "iceklub-workflows",
    name: "Iceklub Workflows",
    category: "Multi",
    categoryColor: "bg-accent text-accent-foreground",
    description: "10 workflows de generación — imágenes, vídeos y captions. Click para editar parámetros y ejecutar.",
    tags: ["SDXL", "LTX", "Wan 2.1", "Florence-2"],
    icon: <Wand2 className="w-5 h-5 text-accent" />,
  },
];

const FeaturesPanel = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  if (activeFeature === "ltx-i2v") {
    return (
      <div className="flex flex-col h-full">
        <div className="px-6 pt-5 pb-3 border-b border-border">
          <button
            onClick={() => setActiveFeature(null)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Features
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <LtxGeneratorView />
        </div>
      </div>
    );
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
            onClick={() => setActiveFeature(feature.id)}
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
