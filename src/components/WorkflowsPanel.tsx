import { useState } from "react";
import {
  Film, Image, Wand2, Lock, Paintbrush, Box, Mic, Volume2,
  LayoutGrid, BarChart3, Users, PenTool, Info, X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  badge?: string;
  badgeColor?: string;
  category?: string;
}

const workflows: WorkflowCard[] = [
  {
    id: "motion-transfer",
    name: "Motion Transfer",
    description: "Transfiere el movimiento de un vídeo a cualquier imagen estática",
    icon: <Film className="w-6 h-6 text-primary" />,
    category: "video",
  },
  {
    id: "motion-transfer-lora",
    name: "Motion Transfer 2.1",
    description: "Motion Transfer con LoRA — Plug & Play, solo pega el link del vídeo a replicar",
    icon: <Film className="w-6 h-6 text-primary" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "video",
  },
  {
    id: "ltx-i2v",
    name: "Image to Video",
    description: "Genera vídeos cinematográficos a partir de una imagen con prompts",
    icon: <Image className="w-6 h-6 text-primary" />,
    category: "video",
  },
  {
    id: "create-image",
    name: "Crea tu Imagen",
    description: "Genera imágenes únicas con IA a partir de prompts personalizados",
    icon: <Paintbrush className="w-6 h-6 text-primary" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "modelo",
  },
  {
    id: "train-lora",
    name: "Crea tu LoRA 1:1",
    description: "Entrena un modelo personalizado con tus propias imágenes para resultados únicos",
    icon: <Box className="w-6 h-6 text-primary" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "modelo",
  },
  {
    id: "lip-sync",
    name: "Sincronizador de Labios",
    description: "Sincroniza labios de cualquier vídeo con un audio o voz generada",
    icon: <Mic className="w-6 h-6 text-primary" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "video",
  },
  {
    id: "i2v-elevenlabs",
    name: "Image to Video + ElevenLabs",
    description: "Genera vídeo a partir de imagen y añade voz con ElevenLabs automáticamente",
    icon: <Volume2 className="w-6 h-6 text-primary" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "video",
  },
  {
    id: "carousel-post",
    name: "Carrousel de Post",
    description: "Crea un carrousel completo para redes sociales a partir de una sola foto",
    icon: <LayoutGrid className="w-6 h-6 text-accent" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "modelo",
  },
  {
    id: "reel-tracker",
    name: "Reel Tracker",
    description: "Trackea el rendimiento de todos tus reels desde la misma plataforma",
    icon: <BarChart3 className="w-6 h-6 text-accent" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "gestión",
  },
  {
    id: "va-management",
    name: "Gestión de VA",
    description: "Trackea trabajadores y programa contenido — conectado con Telegram",
    icon: <Users className="w-6 h-6 text-accent" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "gestión",
  },
  {
    id: "grok-integration",
    name: "Integración con Grok",
    description: "Genera guiones automáticos a partir de tu LLM con integración directa",
    icon: <PenTool className="w-6 h-6 text-accent" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
    category: "gestión",
  },
];

const categories: { key: string; label: string }[] = [
  { key: "video", label: "VIDEO" },
  { key: "modelo", label: "MODELO" },
  { key: "gestión", label: "GESTIÓN" },
];

const WorkflowsPanel = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedWf = workflows.find((wf) => wf.id === selectedId);

  const grouped = categories
    .map((cat) => ({
      ...cat,
      items: workflows.filter((wf) => wf.category === cat.key),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="flex-1 p-6 animate-fade-in overflow-y-auto relative">
      {grouped.map((group) => (
        <div key={group.key} className="mb-8">
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl">
            {group.items.map((wf) => (
              <div
                key={wf.id}
                className={cn(
                  "group rounded-xl overflow-hidden border border-border bg-card transition-all duration-200",
                  wf.comingSoon
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                )}
                onClick={() => !wf.comingSoon && setSelectedId(wf.id)}
              >
                <div className="relative aspect-[16/10] bg-secondary/50 flex items-center justify-center overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center">
                    {wf.icon}
                  </div>
                  {wf.badge && (
                    <span
                      className={cn(
                        "absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                        wf.badgeColor || "bg-primary text-primary-foreground"
                      )}
                    >
                      {wf.badge}
                    </span>
                  )}
                  {wf.comingSoon && (
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-xs font-semibold text-foreground mb-1 group-hover:text-primary transition-colors truncate">
                    {wf.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {wf.description}
                  </p>
                  <button
                    className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(wf.id);
                    }}
                  >
                    <Info className="w-3 h-3" />
                    Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Info overlay */}
      {selectedWf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  {selectedWf.icon}
                </div>
                <h2 className="text-base font-semibold text-foreground">{selectedWf.name}</h2>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedWf.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary text-primary-foreground uppercase">
                  {selectedWf.category}
                </span>
                {selectedWf.comingSoon && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowsPanel;
