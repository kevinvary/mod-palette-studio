import { useState } from "react";
import { Clock, ImageIcon, Upload, Music, Check, Plus, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import QueuePipelineCards, { type QueueItem } from "@/components/QueuePipelineCards";

interface LipSyncItem {
  id: string;
  image: string | null;
  audio: string | null;
  visual: string;
  speech: string;
  sounds: string;
}

let nextId = 1;
const createItem = (): LipSyncItem => ({
  id: `ls-${nextId++}`,
  image: null,
  audio: null,
  visual: "",
  speech: "",
  sounds: "",
});

const mockQueue: QueueItem[] = [
  { id: "ls-q1", index: 1, inputImage: null, inputVideo: null, positivePrompt: "[VISUAL]: modelo en café, sonríe [SPEECH]: Hola, bienvenidos", negativePrompt: "", outputVideo: null, status: "completed", generationTime: "8m 12s" },
  { id: "ls-q2", index: 2, inputImage: null, inputVideo: null, positivePrompt: "[VISUAL]: modelo caminando [SPEECH]: Hoy les traigo algo nuevo", negativePrompt: "", outputVideo: null, status: "processing", progress: 62 },
];

const LipSyncStudioView = () => {
  const [items, setItems] = useState<LipSyncItem[]>([createItem()]);
  const [activeTab, setActiveTab] = useState<"queue" | "add">("add");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Global audio
  const [globalAudio, setGlobalAudio] = useState<string | null>(null);
  const [useGlobalAudio, setUseGlobalAudio] = useState(false);

  const addItem = () => setItems((prev) => [...prev, createItem()]);

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof LipSyncItem, value: string | null) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleFileUpload = (id: string, field: "image" | "audio", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateItem(id, field, URL.createObjectURL(file));
  };

  const handleGlobalAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setGlobalAudio(URL.createObjectURL(file));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar - Add content */}
      <div className="w-80 border-r border-border bg-sidebar flex flex-col overflow-y-auto shrink-0">
        {/* Header */}
        <div className="p-4">
          <div className="relative rounded-xl overflow-hidden h-20 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/10 mb-3">
            <div className="absolute bottom-3 left-3">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">LIPSYNC STUDIO</p>
              <p className="text-[10px] text-muted-foreground">Pod activo — añade contenido a la cola</p>
            </div>
          </div>
        </div>

        {/* Global audio card */}
        <div className="px-4 pb-3">
          <div className="surface-card p-3 rounded-xl border border-accent/20 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center">
                <Music className="w-3 h-3 text-accent" />
              </div>
              <p className="text-[10px] font-semibold text-foreground">Audio global</p>
            </div>

            {globalAudio ? (
              <div className="flex items-center gap-2">
                <audio src={globalAudio} controls className="h-7 flex-1" />
                <button
                  onClick={() => { setGlobalAudio(null); setUseGlobalAudio(false); }}
                  className="w-5 h-5 rounded-full bg-destructive/15 flex items-center justify-center text-destructive text-xs"
                >×</button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 cursor-pointer w-full h-14 rounded-lg border-2 border-dashed border-accent/30 hover:border-accent/50 transition-colors bg-accent/5">
                <Upload className="w-3.5 h-3.5 text-accent" />
                <p className="text-[10px] text-accent font-medium">Subir audio (MP3)</p>
                <input type="file" accept="audio/*" className="hidden" onChange={handleGlobalAudioUpload} />
              </label>
            )}

            {globalAudio && (
              <button
                onClick={() => setUseGlobalAudio(!useGlobalAudio)}
                className={cn(
                  "flex items-center gap-2 w-full px-2 py-2 rounded-lg transition-colors text-[10px] font-medium",
                  useGlobalAudio
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary border border-border"
                )}
              >
                <div className={cn(
                  "w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-colors",
                  useGlobalAudio ? "bg-accent border-accent" : "border-muted-foreground/40"
                )}>
                  {useGlobalAudio && <Check className="w-2.5 h-2.5 text-accent-foreground" />}
                </div>
                Usar en todas
              </button>
            )}
          </div>
        </div>

        {/* Content items */}
        <div className="px-4 pb-4 space-y-3 flex-1 overflow-y-auto">
          {items.map((item, index) => (
            <div key={item.id} className="surface-card p-3 rounded-xl border border-border/50 space-y-2 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-semibold text-muted-foreground">#{index + 1}</span>
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Image + Audio row */}
              <div className="grid grid-cols-2 gap-2">
                {/* Image */}
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground mb-1">Imagen</p>
                  {item.image ? (
                    <div className="relative rounded-lg overflow-hidden">
                      <img src={item.image} alt="" className="w-full h-20 object-cover rounded-lg" />
                      <button
                        onClick={() => updateItem(item.id, "image", null)}
                        className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                      >×</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-1 cursor-pointer w-full h-20 rounded-lg border-2 border-dashed border-border hover:border-accent/40 transition-colors bg-secondary/30">
                      <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-[9px] text-muted-foreground">Subir</p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(item.id, "image", e)} />
                    </label>
                  )}
                </div>

                {/* Audio */}
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground mb-1">
                    Audio {useGlobalAudio && <span className="text-accent">(global)</span>}
                  </p>
                  {useGlobalAudio && globalAudio ? (
                    <div className="flex flex-col items-center justify-center gap-1 w-full h-20 rounded-lg border border-accent/30 bg-accent/5">
                      <Music className="w-4 h-4 text-accent" />
                      <p className="text-[9px] text-accent font-medium">Global</p>
                    </div>
                  ) : item.audio ? (
                    <div className="relative rounded-lg border border-border bg-secondary/30 h-20 flex flex-col items-center justify-center gap-1 p-1.5">
                      <Music className="w-3.5 h-3.5 text-accent" />
                      <audio src={item.audio} controls className="w-full h-6" />
                      <button
                        onClick={() => updateItem(item.id, "audio", null)}
                        className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                      >×</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-1 cursor-pointer w-full h-20 rounded-lg border-2 border-dashed border-border hover:border-accent/40 transition-colors bg-secondary/30">
                      <Music className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-[9px] text-muted-foreground">MP3</p>
                      <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(item.id, "audio", e)} />
                    </label>
                  )}
                </div>
              </div>

              {/* Prompt sections */}
              <div className="bg-secondary/50 rounded-lg overflow-hidden">
                <div className="flex items-start">
                  <span className="text-[9px] font-bold text-primary px-2 py-1.5 shrink-0 select-none">[VISUAL]:</span>
                  <textarea
                    value={item.visual}
                    onChange={(e) => updateItem(item.id, "visual", e.target.value)}
                    placeholder="entorno y movimientos..."
                    rows={1}
                    className="flex-1 bg-transparent py-1.5 pr-2 text-[10px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono"
                  />
                </div>
                <div className="border-t border-border/50 flex items-start">
                  <span className="text-[9px] font-bold text-accent px-2 py-1.5 shrink-0 select-none">[SPEECH]:</span>
                  <textarea
                    value={item.speech}
                    onChange={(e) => updateItem(item.id, "speech", e.target.value)}
                    placeholder="guion / texto..."
                    rows={1}
                    className="flex-1 bg-transparent py-1.5 pr-2 text-[10px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono"
                  />
                </div>
                <div className="border-t border-border/50 flex items-start">
                  <span className="text-[9px] font-bold text-primary px-2 py-1.5 shrink-0 select-none">[SOUNDS]:</span>
                  <input
                    type="text"
                    value={item.sounds}
                    onChange={(e) => updateItem(item.id, "sounds", e.target.value)}
                    placeholder="sonido ambiente..."
                    className="flex-1 bg-transparent py-1.5 pr-2 text-[10px] text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add more */}
          <button
            onClick={addItem}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-border hover:border-accent/40 text-muted-foreground hover:text-accent flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">Añadir más contenido</span>
          </button>
        </div>

        {/* Add to queue button */}
        <div className="px-4 py-3 border-t border-border mt-auto">
          <button className="w-full py-3 bg-accent text-accent-foreground rounded-xl text-sm font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Añadir a la cola
          </button>
          <p className="text-[9px] text-muted-foreground text-center mt-1.5">
            {items.length} {items.length === 1 ? "contenido" : "contenidos"} listos
          </p>
        </div>
      </div>

      {/* Right - Queue */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
            onClick={() => setActiveTab("add")}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              activeTab === "add" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Plus className="w-4 h-4" />
            Añadir
          </button>
          {activeTab === "queue" && (
            <div className="ml-auto flex items-center gap-1 bg-secondary rounded-lg p-0.5">
              <button onClick={() => setViewMode("list")} className={cn("px-3 py-1.5 rounded-md text-xs transition-colors", viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>☰ List</button>
              <button onClick={() => setViewMode("grid")} className={cn("px-3 py-1.5 rounded-md text-xs transition-colors", viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>⊞ Grid</button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <QueuePipelineCards items={mockQueue} viewMode={viewMode} pipelineType="img2vid" />
        </div>
      </div>
    </div>
  );
};

export default LipSyncStudioView;
