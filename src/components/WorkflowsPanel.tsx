import { Film, Image, Wand2, Play, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  badge?: string;
  badgeColor?: string;
}

const workflows: WorkflowCard[] = [
  {
    id: "motion-transfer",
    name: "Motion Transfer",
    description: "Transfiere el movimiento de un vídeo a cualquier imagen estática",
    icon: <Film className="w-6 h-6 text-primary" />,
  },
  {
    id: "ltx-i2v",
    name: "Image to Video",
    description: "Genera vídeos cinematográficos a partir de una imagen con prompts",
    icon: <Image className="w-6 h-6 text-primary" />,
  },
  {
    id: "iceklub-workflows",
    name: "Kevin Workflows",
    description: "10 workflows — imágenes, vídeos y captions",
    icon: <Wand2 className="w-6 h-6 text-accent" />,
    comingSoon: true,
    badge: "COMING SOON",
    badgeColor: "bg-muted text-muted-foreground",
  },
];

const WorkflowsPanel = () => {
  return (
    <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
          GENERACIÓN DE VIDEO
        </h1>
        <p className="text-sm text-muted-foreground">Herramientas de generación de contenido con IA</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className={cn(
              "group rounded-xl overflow-hidden border border-border bg-card transition-all duration-200",
              wf.comingSoon
                ? "opacity-60 cursor-not-allowed"
                : "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
            )}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] bg-secondary/50 flex items-center justify-center overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center">
                {wf.icon}
              </div>
              {wf.badge && (
                <span className={cn(
                  "absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  wf.badgeColor || "bg-primary text-primary-foreground"
                )}>
                  {wf.badge}
                </span>
              )}
              {wf.comingSoon && (
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {wf.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {wf.description}
              </p>
              {!wf.comingSoon && (
                <button className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  <Play className="w-3.5 h-3.5" />
                  Iniciar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowsPanel;
