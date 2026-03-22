import { useState } from "react";
import { Play, Upload, Sparkles, Clock, RotateCcw, Copy, Trash2, Monitor, MessageSquare, Zap, AlertTriangle, Timer, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface GeneratedItem {
  id: string;
  model: string;
  resolution: string;
  duration: string;
  thumbnails: string[];
  status: "completed" | "processing" | "failed";
}

const durations = ["5s", "10s", "15s"];
const aspects = ["1:1", "9:16", "16:9", "4:3", "3:4"];

const mockHistory: GeneratedItem[] = [
  { id: "gen-001", model: "ZBase ZIT v1", resolution: "1080p", duration: "29.0s", thumbnails: [], status: "completed" },
  { id: "gen-002", model: "ZBase ZIT v1", resolution: "1080p", duration: "29.0s", thumbnails: [], status: "completed" },
  { id: "gen-003", model: "Kling 2.6", resolution: "720p", duration: "15.0s", thumbnails: [], status: "processing" },
  { id: "gen-004", model: "ZBase ZIT v1", resolution: "1080p", duration: "10.0s", thumbnails: [], status: "completed" },
];

const LtxGeneratorView = () => {
  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("5s");
  const [selectedAspect, setSelectedAspect] = useState("9:16");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"history" | "howItWorks">("history");
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
              <p className="text-[10px] text-muted-foreground">LTX 2.3</p>
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
              LTX 2.3
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

      {/* Right - History/Results */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
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

        {/* Results Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "history" ? (
            viewMode === "grid" ? (
              /* Grid View */
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
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">{item.resolution}</span>
                        <span className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">{item.duration}</span>
                      </div>
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
              /* List View */
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
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1">{item.model}</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">♡ {item.resolution}</span>
                          <span className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">⏱ {item.duration}</span>
                        </div>
                      </div>
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
              <h2 className="text-lg font-semibold text-foreground">¿Cómo funciona LTX 2.3?</h2>

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
                  <span className="text-primary text-sm">💬</span>
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
