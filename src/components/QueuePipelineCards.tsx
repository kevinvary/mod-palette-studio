import { Play, Clock, RotateCcw, Copy, Trash2, ArrowRight, CheckCircle2, Loader2, AlertTriangle, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QueueItem {
  id: string;
  index: number;
  inputImage: string | null;
  inputVideo: string | null;
  outputVideo: string | null;
  positivePrompt: string;
  negativePrompt: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress?: number;
  generationTime?: string; // e.g. "2m 34s", "14m 12s"
}

interface QueuePipelineCardsProps {
  items: QueueItem[];
  viewMode: "list" | "grid";
  /** "img2vid" shows IMG → VID, "motion" shows IMG + VID → VID */
  pipelineType: "img2vid" | "motion";
}

const StatusBadge = ({ item }: { item: QueueItem }) => {
  const config = {
    completed: { label: "Completado", color: "text-green-400", bg: "bg-green-500/15", icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> },
    processing: { label: `Procesando${item.progress ? ` ${item.progress}%` : ""}`, color: "text-accent", bg: "bg-accent/15", icon: <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" /> },
    queued: { label: "En cola", color: "text-muted-foreground", bg: "bg-secondary", icon: <Clock className="w-3.5 h-3.5 text-muted-foreground" /> },
    failed: { label: "Error", color: "text-destructive", bg: "bg-destructive/15", icon: <AlertTriangle className="w-3.5 h-3.5 text-destructive" /> },
  }[item.status];

  return (
    <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium", config.bg, config.color)}>
      {config.icon}
      {config.label}
    </div>
  );
};

const TimeBadge = ({ time }: { time: string }) => (
  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
    <Clock className="w-3 h-3" />
    {time}
  </div>
);

const InputThumbnail = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
  <div className="flex-1 aspect-square bg-secondary rounded-lg overflow-hidden relative">
    <div className="absolute inset-0 flex items-center justify-center">
      {icon}
    </div>
    <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-muted-foreground bg-background/70 px-1 rounded">{label}</span>
  </div>
);

const OutputThumbnail = ({ status }: { status: QueueItem["status"] }) => (
  <div className="flex-1 aspect-square bg-secondary rounded-lg overflow-hidden relative">
    {status === "completed" ? (
      <div className="absolute inset-0 flex items-center justify-center bg-green-500/5">
        <div className="w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-3.5 h-3.5 text-foreground ml-0.5" />
        </div>
      </div>
    ) : status === "processing" ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <Play className="w-4 h-4 text-muted-foreground/30" />
      </div>
    )}
    <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-muted-foreground bg-background/70 px-1 rounded">VID</span>
  </div>
);

const InputThumbnailLarge = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
  <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden relative">
    <div className="absolute inset-0 flex items-center justify-center">
      {icon}
    </div>
    <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-muted-foreground bg-background/70 px-1 rounded">{label}</span>
  </div>
);

const OutputThumbnailLarge = ({ status }: { status: QueueItem["status"] }) => (
  <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden relative">
    {status === "completed" ? (
      <div className="absolute inset-0 flex items-center justify-center bg-green-500/5">
        <div className="w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-3.5 h-3.5 text-foreground ml-0.5" />
        </div>
      </div>
    ) : status === "processing" ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <Play className="w-4 h-4 text-muted-foreground/30" />
      </div>
    )}
    <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-muted-foreground bg-background/70 px-1 rounded">VID</span>
  </div>
);

const CardActions = ({ size = "sm" }: { size?: "sm" | "md" }) => {
  const btnSize = size === "sm" ? "w-6 h-6" : "w-7 h-7";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-1">
      <button className={`flex items-center gap-1 text-[${size === "sm" ? "10" : "11"}px] text-muted-foreground hover:text-foreground transition-colors`}>
        <RotateCcw className={iconSize} /> Rerun
      </button>
      <div className="ml-auto flex gap-1">
        <button className={`${btnSize} flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground`}><Copy className={iconSize} /></button>
        <button className={`${btnSize} flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-destructive`}><Trash2 className={iconSize} /></button>
      </div>
    </div>
  );
};

const QueuePipelineCards = ({ items, viewMode, pipelineType }: QueuePipelineCardsProps) => {
  const isMotion = pipelineType === "motion";

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="surface-card rounded-xl overflow-hidden group">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-muted-foreground">#{item.index}</span>
                <StatusBadge item={item} />
                {item.status === "completed" && item.generationTime && (
                  <TimeBadge time={item.generationTime} />
                )}
              </div>

              <div className="flex items-center gap-2">
                <InputThumbnail label="IMG" icon={<ImageIcon className="w-5 h-5 text-muted-foreground/40" />} />
                {isMotion && (
                  <>
                    <span className="text-[10px] text-muted-foreground font-bold">+</span>
                    <InputThumbnail label="VID" icon={<Video className="w-5 h-5 text-muted-foreground/40" />} />
                  </>
                )}
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <OutputThumbnail status={item.status} />
              </div>

              <p className="text-[10px] text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">{item.positivePrompt}</p>

              {item.status === "processing" && item.progress && (
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${item.progress}%` }} />
                </div>
              )}
            </div>
            <div className="px-3 pb-3">
              <CardActions size="sm" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 surface-card p-3 rounded-xl group">
          <div className="flex items-center gap-2 shrink-0">
            <InputThumbnailLarge label="IMG" icon={<ImageIcon className="w-5 h-5 text-muted-foreground/40" />} />
            {isMotion && (
              <>
                <span className="text-[10px] text-muted-foreground font-bold">+</span>
                <InputThumbnailLarge label="VID" icon={<Video className="w-5 h-5 text-muted-foreground/40" />} />
              </>
            )}
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            <OutputThumbnailLarge status={item.status} />
          </div>

          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-muted-foreground">#{item.index}</span>
                <StatusBadge item={item} />
                {item.status === "completed" && item.generationTime && (
                  <TimeBadge time={item.generationTime} />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{item.positivePrompt}</p>
            </div>
            <div className="flex items-center gap-2">
              {item.status === "processing" && item.progress && (
                <div className="flex-1 max-w-[120px] h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${item.progress}%` }} />
                </div>
              )}
              <CardActions size="md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueuePipelineCards;
