import { useState } from "react";
import { Play, Upload, Clock, RotateCcw, Copy, Trash2, Video, ImageIcon, AlertTriangle, Scissors, Star, MessageSquare, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import exampleCleanPhoto from "@/assets/example-clean-photo.jpg";
import exampleResultPhoto from "@/assets/example-result-photo.jpg";

interface GeneratedItem {
  id: string;
  model: string;
  status: "completed" | "processing" | "failed";
}

const mockHistory: GeneratedItem[] = [
  { id: "mt-001", model: "Motion Transfer", status: "completed" },
  { id: "mt-002", model: "Motion Transfer", status: "completed" },
  { id: "mt-003", model: "Motion Transfer", status: "processing" },
];

const MotionTransferView = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"history" | "howItWorks">("history");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedVideo(URL.createObjectURL(file));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border bg-sidebar flex flex-col overflow-y-auto shrink-0">
        {/* Model Label */}
        <div className="p-4">
          <div className="relative rounded-xl overflow-hidden h-28 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/10 mb-1">
            <div className="absolute bottom-3 left-3">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">MOTION CONTROL</p>
              <p className="text-[10px] text-muted-foreground">Control motion with video references</p>
            </div>
          </div>
        </div>

        {/* Two upload cards: Image + Video */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Image upload */}
            <div className="surface-card rounded-xl overflow-hidden relative">
              {uploadedImage ? (
                <div className="relative aspect-[3/4]">
                  <img src={uploadedImage} alt="Character" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer aspect-[3/4] p-2 text-center hover:bg-secondary/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight">Character Image</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {/* Video upload */}
            <div className="surface-card rounded-xl overflow-hidden relative">
              {uploadedVideo ? (
                <div className="relative aspect-[3/4]">
                  <video src={uploadedVideo} className="w-full h-full object-cover" muted />
                  <button
                    onClick={() => setUploadedVideo(null)}
                    className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-1 left-1 bg-background/70 rounded px-1">
                    <span className="text-[8px] text-muted-foreground font-mono">GIF</span>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer aspect-[3/4] p-2 text-center hover:bg-secondary/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Video className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight">Motion Video</p>
                  <input type="file" accept="video/*,.gif" className="hidden" onChange={handleVideoUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Model (static) */}
        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-[10px] text-muted-foreground mb-1">Model</p>
            <div className="flex items-center gap-2 text-sm text-foreground font-medium">
              Motion Transfer
              <span className="text-accent text-[10px]">✦</span>
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="px-4 pb-4 mt-auto">
          <button className="w-full py-3 bg-accent text-accent-foreground rounded-xl text-sm font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Generate
            <span className="text-[11px] opacity-80">⚡ 22</span>
          </button>
        </div>
      </div>

      {/* Right - History */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 px-6 pt-5 pb-3 border-b border-border">
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === "history" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Clock className="w-4 h-4" />
            History
          </button>
          <button
            onClick={() => setActiveTab("howItWorks")}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              activeTab === "howItWorks" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            ⓘ How it works
          </button>
          <div className="ml-auto flex items-center gap-1 bg-secondary rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("list")}
              className={cn("px-3 py-1.5 rounded-md text-xs transition-colors", viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >☰ List</button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn("px-3 py-1.5 rounded-md text-xs transition-colors", viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >⊞ Grid</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "history" ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {mockHistory.map((item) => (
                  <div key={item.id} className="surface-card rounded-xl overflow-hidden group">
                    <div className="aspect-video bg-secondary relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      {item.status === "processing" ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-background/80 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-foreground ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-foreground mb-1">{item.model}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                          <RotateCcw className="w-3 h-3" /> Rerun
                        </button>
                        <div className="ml-auto flex gap-1">
                          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {mockHistory.map((item) => (
                  <div key={item.id} className="flex gap-4 surface-card p-3 rounded-xl group">
                    <div className="w-48 h-28 bg-secondary rounded-lg overflow-hidden relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      {item.status === "processing" ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-background/80 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-foreground ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{item.model}</p>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                          <RotateCcw className="w-3 h-3" /> Rerun
                        </button>
                        <div className="ml-auto flex items-center gap-1">
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"><Copy className="w-3.5 h-3.5" /></button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona Motion Transfer?</h2>

              <div className="surface-card p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Paso 1 — Foto de la modelo limpia y nítida
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  La foto de nuestra modelo debe ser <span className="text-foreground font-medium">muy limpia y nítida</span>. Esto reduce significativamente el margen de error en el resultado final.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img src={exampleCleanPhoto} alt="Nuestra modelo" className="w-full object-contain" />
                    <div className="px-2 py-1.5 bg-secondary">
                      <p className="text-[10px] text-muted-foreground text-center">Nuestra modelo</p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img src={exampleResultPhoto} alt="Primer frame del video" className="w-full object-contain" />
                    <div className="px-2 py-1.5 bg-secondary">
                      <p className="text-[10px] text-muted-foreground text-center">Primer frame del video</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="surface-card p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Errores notorios a evitar
                </h3>
                <ul className="text-xs text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                  <li>Videos donde la <span className="text-foreground font-medium">cara del sujeto está muy lejos</span> — ningún motor de imagen-video actual puede procesarlos bien.</li>
                  <li>Videos con <span className="text-foreground font-medium">fondos negros muy notorios</span> — generan artefactos y resultados pobres.</li>
                </ul>
              </div>

              <div className="surface-card p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2">
                  <Scissors className="w-4 h-4" /> Duración del video
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Se recomienda usar videos de <span className="text-foreground font-medium">no más de 10 segundos</span>. En caso de tener un video más largo, <span className="text-foreground font-medium">fraccionarlo en partes</span> para obtener mejores resultados. No hay un límite estricto de segundos, pero esta es la recomendación.
                </p>
              </div>

              <div className="surface-card p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Star className="w-4 h-4" /> Recomendación más importante
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sacar el <span className="text-foreground font-medium">primer frame del video de muestra</span> y poner a nuestra modelo en ese frame. Esto se puede hacer con cualquier motor de generación de imágenes (<span className="text-foreground font-medium">Nano Banana Pro</span>).
                </p>
              </div>

              <div className="surface-card p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Prompt de ejemplo
                </h3>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-foreground font-mono leading-relaxed italic">
                    "foto 1, posando como foto 2, copiando la misma ropa y background que la foto 2"
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Este prompt funciona en muchos casos. Si no da el resultado esperado, buscar variantes del mismo enfoque.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotionTransferView;
