import { Download, Trash2, Eye, Film, Image, FileText, Music, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: number;
  name: string;
  type: "video" | "image" | "audio" | "document";
  size: string;
  date: string;
  source: string;
  status: "completed" | "processing" | "failed";
}

const contentItems: ContentItem[] = [
  { id: 1, name: "motion_transfer_01.mp4", type: "video", size: "24.5 MB", date: "2h ago", source: "Motion Transfer", status: "completed" },
  { id: 2, name: "i2v_sunset_scene.mp4", type: "video", size: "18.2 MB", date: "5h ago", source: "Image to Video", status: "completed" },
  { id: 3, name: "portrait_gen_03.png", type: "image", size: "4.1 MB", date: "1d ago", source: "Crea tu Imagen", status: "completed" },
  { id: 4, name: "lipsync_promo.mp4", type: "video", size: "32.0 MB", date: "1d ago", source: "Sincronizador de Labios", status: "processing" },
  { id: 5, name: "carousel_post_01.zip", type: "document", size: "8.7 MB", date: "2d ago", source: "Carrousel de Post", status: "completed" },
  { id: 6, name: "voiceover_intro.mp3", type: "audio", size: "1.2 MB", date: "3d ago", source: "ElevenLabs", status: "completed" },
];

const typeIcons: Record<string, React.ReactNode> = {
  video: <Film className="w-5 h-5 text-primary" />,
  image: <Image className="w-5 h-5 text-accent" />,
  audio: <Music className="w-5 h-5 text-primary" />,
  document: <FileText className="w-5 h-5 text-muted-foreground" />,
};

const statusStyles: Record<string, string> = {
  completed: "bg-primary/15 text-primary",
  processing: "bg-accent/15 text-accent",
  failed: "bg-destructive/15 text-destructive",
};

const statusLabels: Record<string, string> = {
  completed: "Completado",
  processing: "Procesando",
  failed: "Error",
};

const AssetsPanel = () => {
  const totalSize = "88.7 MB";

  return (
    <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Banco de Contenido</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Todo el contenido generado en tus funciones · {contentItems.length} archivos · {totalSize}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6 max-w-2xl">
        {[
          { label: "Vídeos", count: contentItems.filter((c) => c.type === "video").length },
          { label: "Imágenes", count: contentItems.filter((c) => c.type === "image").length },
          { label: "Audio", count: contentItems.filter((c) => c.type === "audio").length },
          { label: "Otros", count: contentItems.filter((c) => c.type === "document").length },
        ].map((stat) => (
          <div key={stat.label} className="surface-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{stat.count}</p>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {contentItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <FolderOpen className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <p className="text-sm text-muted-foreground">Aún no hay contenido generado</p>
          <p className="text-xs text-muted-foreground/60 mt-1">El contenido aparecerá aquí cuando completes trabajos en Funciones</p>
        </div>
      ) : (
        <div className="space-y-2 max-w-4xl">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="surface-card p-4 flex items-center gap-4 group hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                {typeIcons[item.type]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.source} · {item.size}
                </p>
              </div>

              <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", statusStyles[item.status])}>
                {statusLabels[item.status]}
              </span>

              <span className="text-[11px] text-muted-foreground shrink-0">{item.date}</span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsPanel;
