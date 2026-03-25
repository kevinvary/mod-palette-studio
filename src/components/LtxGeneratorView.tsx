import { useState } from "react";
import { Upload, Sparkles, Clock, MessageSquare, AlertTriangle, Timer, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import QueuePipelineCards, { type QueueItem } from "@/components/QueuePipelineCards";

const mockQueue: QueueItem[] = [
  { id: "q-001", index: 1, inputImage: null, inputVideo: null, positivePrompt: "A cinematic sunset over the ocean, golden light reflecting on waves", negativePrompt: "blurry, low quality", outputVideo: null, status: "completed", generationTime: "1m 42s" },
  { id: "q-002", index: 2, inputImage: null, inputVideo: null, positivePrompt: "Urban street scene at night with neon lights", negativePrompt: "distorted, artifacts", outputVideo: null, status: "processing", progress: 64 },
  { id: "q-003", index: 3, inputImage: null, inputVideo: null, positivePrompt: "Portrait of a woman in a garden with soft bokeh", negativePrompt: "ugly, deformed", outputVideo: null, status: "queued" },
  { id: "q-004", index: 4, inputImage: null, inputVideo: null, positivePrompt: "Aerial view of mountains covered in snow", negativePrompt: "blurry", outputVideo: null, status: "completed", generationTime: "2m 05s" },
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
        <div className="p-4">
          <div className="relative rounded-xl overflow-hidden h-28 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 mb-1">
            <div className="absolute bottom-3 left-3">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">VIDEO</p>
              <p className="text-[10px] text-muted-foreground">Image to Video</p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="surface-card p-4 flex flex-col items-center justify-center gap-2 min-h-[100px] relative">
            <span className="absolute top-2 right-2 text-[9px] text-muted-foreground italic">Optional</span>
            {uploadedImage ? (
              <div className="relative w-full">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-20 object-cover rounded-md" />
                <button onClick={() => setUploadedImage(null)} className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground">×</button>
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

        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-xs font-semibold text-accent mb-1">Positive Prompt</p>
            <textarea value={positivePrompt} onChange={(e) => setPositivePrompt(e.target.value)} placeholder="Describe the scene you imagine, with details." rows={3} className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono text-[11px]" />
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-xs font-semibold text-destructive mb-1">Negative Prompt</p>
            <textarea value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} placeholder="What to avoid: blurry, low quality, distorted..." rows={2} className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono text-[11px]" />
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-foreground">Mejorar Prompt</span>
            </div>
            <Switch checked={enhancePrompt} onCheckedChange={setEnhancePrompt} />
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="surface-card p-3">
            <p className="text-[10px] text-muted-foreground mb-1">Model</p>
            <div className="flex items-center gap-2 text-sm text-foreground font-medium">
              Image to Video
              <span className="text-accent text-[10px]">✦</span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 mt-auto">
          <button className="w-full py-3 bg-accent text-accent-foreground rounded-xl text-sm font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Añadir a la cola
          </button>
        </div>
      </div>

      {/* Right - Queue */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 px-6 pt-5 pb-3 border-b border-border">
          <button
            onClick={() => setActiveTab("queue")}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === "queue" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <Clock className="w-4 h-4" />
            Cola de espera
          </button>
          <button
            onClick={() => setActiveTab("howItWorks")}
            className={cn("flex items-center gap-2 text-sm font-medium transition-colors", activeTab === "howItWorks" ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            ⓘ How it works
          </button>
          {activeTab === "queue" && (
            <div className="ml-auto flex items-center gap-1 bg-secondary rounded-lg p-0.5">
              <button onClick={() => setViewMode("list")} className={cn("px-3 py-1.5 rounded-md text-xs transition-colors", viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>☰ List</button>
              <button onClick={() => setViewMode("grid")} className={cn("px-3 py-1.5 rounded-md text-xs transition-colors", viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>⊞ Grid</button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "queue" ? (
            <QueuePipelineCards items={mockQueue} viewMode={viewMode} pipelineType="img2vid" />
          ) : (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona Image to Video?</h2>
              <div className="surface-card p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Prompts: Positive y Negative</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">El modelo trabaja con dos tipos de prompts. El <span className="text-foreground font-medium">Positive Prompt</span> describe lo que quieres ver en el vídeo. El <span className="text-foreground font-medium">Negative Prompt</span> indica lo que quieres evitar.</p>
              </div>
              <div className="surface-card p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><Sparkles className="w-4 h-4" /> Mejorar Prompt — Mantener SIEMPRE activado</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">La opción <span className="text-foreground font-medium">"Mejorar Prompt"</span> debe estar encendida en todo momento.</p>
                <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg border border-accent/20">
                  <AlertTriangle className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="text-[11px] text-accent font-medium">Recomendación: No desactivar "Mejorar Prompt" a menos que seas un usuario avanzado.</span>
                </div>
              </div>
              <div className="surface-card p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-accent flex items-center gap-2"><Timer className="w-4 h-4" /> Duración del vídeo — 5 segundos por defecto</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Por defecto, el modelo genera vídeos de <span className="text-foreground font-medium">5 segundos</span>. Esta es la duración donde se obtiene la <span className="text-foreground font-medium">mejor calidad</span>.</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Si necesitas vídeos más largos, la recomendación es <span className="text-foreground font-medium">fraccionar por partes</span>.</p>
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
