import { useState } from "react";
import { Play, Upload, Sparkles, Clock, RotateCcw, Copy, Trash2, MessageSquare, AlertTriangle, Timer, Headphones, ArrowRight, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface QueueItem {
  id: string;
  index: number;
  inputImage: string | null;
  positivePrompt: string;
  negativePrompt: string;
  outputVideo: string | null;
  status: "queued" | "processing" | "completed" | "failed";
  progress?: number;
}

const mockQueue: QueueItem[] = [
  { id: "q-001", index: 1, inputImage: null, positivePrompt: "A cinematic sunset over the ocean, golden light reflecting on waves", negativePrompt: "blurry, low quality", outputVideo: null, status: "completed" },
  { id: "q-002", index: 2, inputImage: null, positivePrompt: "Urban street scene at night with neon lights", negativePrompt: "distorted, artifacts", outputVideo: null, status: "processing", progress: 64 },
  { id: "q-003", index: 3, inputImage: null, positivePrompt: "Portrait of a woman in a garden with soft bokeh", negativePrompt: "ugly, deformed", outputVideo: null, status: "queued" },
  { id: "q-004", index: 4, inputImage: null, positivePrompt: "Aerial view of mountains covered in snow", negativePrompt: "blurry", outputVideo: null, status: "queued" },
];

const LtxGeneratorView = () => {
  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "howItWorks">("queue");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar - Creation Panel */}
      <div className="w-64 border-r border-border bg-sidebar flex flex-col overflow-y-auto shrink-0">
        {/* Model Label */}
        <div className="p-4">
          <div className="relative rounded-xl overflow-hidden h-28 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 mb-1">
            <div className="absolute bottom-3 left-3">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">VIDEO</p>
              <p className="text-[10px] text-muted-foreground">Image to Video</p>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="px-4 pb-4">
          <div className="surface-card p-4 flex flex-col items-center justify-center gap-2 min-h-[100px] relative">
            <span className="absolute top-2 right-2 text-[9px] text-muted-foreground italic">Optional</span>
            {uploadedImage ? (
              <div className="relative w-full">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-20 object-cover rounded-md" />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer w-full text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-foreground">Upload image or <span className="text-accent font-semibold">generate it</span></p>
                <p className="text-[10px] text-muted-foreground">PNG, JPG or Paste from clipboard</p>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Positive Prompt */}
        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-xs font-semibold text-accent mb-1">Positive Prompt</p>
            <textarea
              value={positivePrompt}
              onChange={(e) => setPositivePrompt(e.target.value)}
              placeholder="Describe the scene you imagine, with details."
              rows={3}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Negative Prompt */}
        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-xs font-semibold text-destructive mb-1">Negative Prompt</p>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="What to avoid: blurry, low quality, distorted..."
              rows={2}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Mejorar Prompt toggle */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-foreground">Mejorar Prompt</span>
            </div>
            <Switch checked={enhancePrompt} onCheckedChange={setEnhancePrompt} />
          </div>
        </div>

        {/* Model (static) */}
        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-[10px] text-muted-foreground mb-1">Model</p>
            <div className="flex items-center gap-2 text-sm text-foreground font-medium">
              Image to Video
              <span className="text-accent text-[10px]">✦</span>
            </div>
          </div>
        </div>


        {/* Generate button */}
        <div className="px-4 pb-4 mt-auto">
          <button className="w-full py-3 bg-accent text-accent-foreground rounded-xl text-sm font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Generate
            <span className="text-[11px] opacity-80">⚡ 5</span>
          </button>
        </div>
      </div>

      {/* Right - Queue/Results */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-4 px-6 pt-5 pb-3 border-b border-border">
          <button
            onClick={() => setActiveTab("queue")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === "queue" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Clock className="w-4 h-4" />
            Cola de espera
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

          {activeTab === "queue" && (
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
          )}
        </div>

        {/* Queue Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "queue" ? (
            <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
              {mockQueue.map((item) => {
                const statusConfig = {
                  completed: { label: "Completado", color: "text-green-400", bg: "bg-green-500/15", icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> },
                  processing: { label: `Procesando${item.progress ? ` ${item.progress}%` : ""}`, color: "text-accent", bg: "bg-accent/15", icon: <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" /> },
                  queued: { label: "En cola", color: "text-muted-foreground", bg: "bg-secondary", icon: <Clock className="w-3.5 h-3.5 text-muted-foreground" /> },
                  failed: { label: "Error", color: "text-destructive", bg: "bg-destructive/15", icon: <AlertTriangle className="w-3.5 h-3.5 text-destructive" /> },
                }[item.status];

                if (viewMode === "grid") {
                  return (
                    <div key={item.id} className="surface-card rounded-xl overflow-hidden group">
                      {/* Pipeline: Image → Video */}
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-muted-foreground">#{item.index}</span>
                          <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium", statusConfig.bg, statusConfig.color)}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Input Image */}
                          <div className="flex-1 aspect-square bg-secondary rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                            </div>
                            <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-muted-foreground bg-background/70 px-1 rounded">IMG</span>
                          </div>

                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />

                          {/* Output Video */}
                          <div className="flex-1 aspect-square bg-secondary rounded-lg overflow-hidden relative">
                            {item.status === "completed" ? (
                              <div className="absolute inset-0 flex items-center justify-center bg-green-500/5">
                                <div className="w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play className="w-3.5 h-3.5 text-foreground ml-0.5" />
                                </div>
                              </div>
                            ) : item.status === "processing" ? (
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
                        </div>

                        {/* Prompt preview */}
                        <p className="text-[10px] text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">{item.positivePrompt}</p>
                      </div>

                      {/* Actions */}
                      <div className="px-3 pb-3 flex items-center gap-1">
                        <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                          <RotateCcw className="w-3 h-3" /> Rerun
                        </button>
                        <div className="ml-auto flex gap-1">
                          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // List view
                return (
                  <div key={item.id} className="flex gap-4 surface-card p-3 rounded-xl group">
                    {/* Pipeline thumbnails */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Input Image */}
                      <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                        </div>
                        <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-muted-foreground bg-background/70 px-1 rounded">IMG</span>
                      </div>

                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />

                      {/* Output Video */}
                      <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden relative">
                        {item.status === "completed" ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-green-500/5">
                            <div className="w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-3.5 h-3.5 text-foreground ml-0.5" />
                            </div>
                          </div>
                        ) : item.status === "processing" ? (
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
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-muted-foreground">#{item.index}</span>
                          <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium", statusConfig.bg, statusConfig.color)}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{item.positivePrompt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === "processing" && item.progress && (
                          <div className="flex-1 max-w-[120px] h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${item.progress}%` }} />
                          </div>
                        )}
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
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona Image to Video?</h2>

              <div className="surface-card p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Prompts: Positive y Negative</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  El modelo trabaja con dos tipos de prompts. El <span className="text-foreground font-medium">Positive Prompt</span> describe lo que quieres ver en el vídeo: escena, personajes, estilo, iluminación, etc. El <span className="text-foreground font-medium">Negative Prompt</span> indica lo que quieres evitar: baja calidad, deformaciones, artefactos, etc. Ambos trabajan juntos para refinar el resultado final.
                </p>
              </div>

              <div className="surface-card p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><Sparkles className="w-4 h-4" /> Mejorar Prompt — Mantener SIEMPRE activado</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  La opción <span className="text-foreground font-medium">"Mejorar Prompt"</span> debe estar encendida en todo momento. Esta función optimiza automáticamente tu prompt para obtener los mejores resultados posibles del modelo. Solo desactívala si sabes al 100% lo que estás haciendo y tienes experiencia avanzada con prompt engineering.
                </p>
                <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg border border-accent/20">
                  <AlertTriangle className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="text-[11px] text-accent font-medium">Recomendación: No desactivar "Mejorar Prompt" a menos que seas un usuario avanzado.</span>
                </div>
              </div>

              <div className="surface-card p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><Timer className="w-4 h-4" /> Duración del vídeo — 5 segundos por defecto</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Por defecto, el modelo genera vídeos de <span className="text-foreground font-medium">5 segundos</span>. Esta es la duración donde se obtiene la <span className="text-foreground font-medium">mejor calidad</span> y se evitan deformidades en el resultado.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Si necesitas vídeos más largos, la recomendación es <span className="text-foreground font-medium">fraccionar por partes</span>: genera clips de 5 segundos y únelos en posproducción. Esto mantiene la calidad en cada segmento.
                </p>
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <Headphones className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-[11px] text-primary font-medium">¿Necesitas más segundos? Contacta con soporte para habilitar la opción de duración extendida.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LtxGeneratorView;
