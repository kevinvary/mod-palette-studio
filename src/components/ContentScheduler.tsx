import { useState, useCallback } from "react";
import { Plus, Upload, Trash2, ArrowLeft, ArrowRight, Film, GripVertical, Music, Check } from "lucide-react";

interface ContentItem {
  id: string;
  image: string | null;
  video: string | null;
  audio: string | null;
  positivePrompt: string;
  negativePrompt: string;
}

interface ContentSchedulerProps {
  featureId: string;
  featureTitle: string;
  featureSubtitle: string;
  onBack: () => void;
  onContinue: (items: ContentItem[]) => void;
  showPrompts?: boolean;
  showVideo?: boolean;
  showAudio?: boolean;
}

let nextId = 1;
const createItem = (): ContentItem => ({
  id: `item-${nextId++}`,
  image: null,
  video: null,
  audio: null,
  positivePrompt: "",
  negativePrompt: "",
});

const ContentScheduler = ({
  featureId,
  featureTitle,
  featureSubtitle,
  onBack,
  onContinue,
  showPrompts = false,
  showVideo = false,
  showAudio = false,
}: ContentSchedulerProps) => {
  const [items, setItems] = useState<ContentItem[]>([createItem()]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Global audio state for lip-sync
  const [globalAudio, setGlobalAudio] = useState<string | null>(null);
  const [useGlobalAudio, setUseGlobalAudio] = useState(false);

  const addItem = () => setItems((prev) => [...prev, createItem()]);

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof ContentItem, value: string | null) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleFileUpload = (id: string, field: "image" | "video" | "audio", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateItem(id, field, url);
    }
  };

  const handleGlobalAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGlobalAudio(URL.createObjectURL(file));
    }
  };

  const handleDrop = useCallback((targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    setItems((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(dragIdx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
    setDragIdx(null);
    setDragOverIdx(null);
  }, [dragIdx]);

  const filledItems = items.filter((i) => i.image);
  const hasDoubleUpload = showVideo;
  const hasPrompts = showPrompts;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 pt-5 pb-3 border-b border-border flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-semibold text-foreground">{featureTitle}</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-2">{featureSubtitle}</p>

          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1.5 rounded-lg bg-accent/15 border border-accent/20">
              <span className="text-xs font-semibold text-accent">
                Programar contenido
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {filledItems.length} {filledItems.length === 1 ? "item" : "items"} listos
            </span>
          </div>

          {/* Global audio card for lip-sync */}
          {showAudio && (
            <div className="surface-card p-4 rounded-xl border border-accent/30 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Music className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Audio global</p>
                    <p className="text-[10px] text-muted-foreground">Sube un audio para usarlo en todas las cards</p>
                  </div>
                </div>
              </div>

              {globalAudio ? (
                <div className="flex items-center gap-3">
                  <audio src={globalAudio} controls className="h-8 flex-1" style={{ maxHeight: "32px" }} />
                  <button
                    onClick={() => { setGlobalAudio(null); setUseGlobalAudio(false); }}
                    className="w-6 h-6 rounded-full bg-destructive/15 flex items-center justify-center text-destructive hover:bg-destructive/25 transition-colors text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-20 rounded-lg border-2 border-dashed border-accent/30 hover:border-accent/50 transition-colors bg-accent/5">
                  <Upload className="w-4 h-4 text-accent" />
                  <p className="text-[10px] text-accent font-medium">Subir audio (MP3)</p>
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleGlobalAudioUpload}
                  />
                </label>
              )}

              {globalAudio && (
                <button
                  onClick={() => setUseGlobalAudio(!useGlobalAudio)}
                  className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg transition-colors text-xs font-medium ${
                    useGlobalAudio
                      ? "bg-accent/15 text-accent border border-accent/30"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary border border-border"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    useGlobalAudio ? "bg-accent border-accent" : "border-muted-foreground/40"
                  }`}>
                    {useGlobalAudio && <Check className="w-3 h-3 text-accent-foreground" />}
                  </div>
                  Usar este mismo audio en todas
                </button>
              )}
            </div>
          )}

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDragIdx(index)}
                onDragOver={(e) => { e.preventDefault(); setDragOverIdx(index); }}
                onDragLeave={() => setDragOverIdx(null)}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                className={`surface-card p-4 rounded-xl border relative group transition-all ${
                  dragOverIdx === index ? "border-accent/50 bg-accent/5" : "border-border/50"
                } ${dragIdx === index ? "opacity-50" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      #{index + 1}
                    </span>
                  </div>
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Lip-sync layout: image + audio + prompt */}
                {showAudio ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Image */}
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Imagen del personaje</p>
                        {item.image ? (
                          <div className="relative rounded-lg overflow-hidden">
                            <img src={item.image} alt={`Content ${index + 1}`} className="w-full h-28 object-cover rounded-lg" />
                            <button
                              onClick={() => updateItem(item.id, "image", null)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-28 rounded-lg border-2 border-dashed border-border hover:border-accent/40 transition-colors bg-secondary/30">
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                              <Upload className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-[10px] text-muted-foreground">Subir imagen</p>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(item.id, "image", e)} />
                          </label>
                        )}
                      </div>

                      {/* Audio (per-item, disabled if global) */}
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">
                          Audio {useGlobalAudio && <span className="text-accent">(global)</span>}
                        </p>
                        {useGlobalAudio && globalAudio ? (
                          <div className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border border-accent/30 bg-accent/5">
                            <Music className="w-5 h-5 text-accent" />
                            <p className="text-[10px] text-accent font-medium">Audio global aplicado</p>
                          </div>
                        ) : item.audio ? (
                          <div className="relative rounded-lg overflow-hidden border border-border bg-secondary/30 h-28 flex flex-col items-center justify-center gap-2 p-2">
                            <Music className="w-4 h-4 text-accent" />
                            <audio src={item.audio} controls className="w-full h-7" />
                            <button
                              onClick={() => updateItem(item.id, "audio", null)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-28 rounded-lg border-2 border-dashed border-border hover:border-accent/40 transition-colors bg-secondary/30">
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                              <Music className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-[10px] text-muted-foreground">Subir audio (MP3)</p>
                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(item.id, "audio", e)} />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Prompt sections */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold text-accent mb-1">Prompt <span className="text-destructive">(Obligatorio)</span></p>
                      <div className="bg-secondary/50 rounded-lg overflow-hidden">
                        <div className="flex items-start gap-0">
                          <span className="text-[10px] font-bold text-primary px-3 py-2 shrink-0 select-none">[VISUAL]:</span>
                          <textarea
                            value={item.positivePrompt}
                            onChange={(e) => updateItem(item.id, "positivePrompt", e.target.value)}
                            placeholder="entorno y movimientos..."
                            rows={1}
                            className="flex-1 bg-transparent py-2 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono"
                          />
                        </div>
                        <div className="border-t border-border/50 flex items-start gap-0">
                          <span className="text-[10px] font-bold text-accent px-3 py-2 shrink-0 select-none">[SPEECH]:</span>
                          <textarea
                            value={item.negativePrompt}
                            onChange={(e) => updateItem(item.id, "negativePrompt", e.target.value)}
                            placeholder="guion / texto que dirá..."
                            rows={1}
                            className="flex-1 bg-transparent py-2 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono"
                          />
                        </div>
                        <div className="border-t border-border/50 flex items-start gap-0">
                          <span className="text-[10px] font-bold text-primary px-3 py-2 shrink-0 select-none">[SOUNDS]:</span>
                          <input
                            type="text"
                            value={(item as any).sounds || ""}
                            onChange={(e) => updateItem(item.id, "sounds" as any, e.target.value)}
                            placeholder="sonido ambiente..."
                            className="flex-1 bg-transparent py-2 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Default layouts */
                  <div className={hasPrompts ? "grid grid-cols-[160px_1fr] gap-4" : hasDoubleUpload ? "grid grid-cols-2 gap-4" : ""}>
                    {/* Image upload */}
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">
                        {hasDoubleUpload ? "Imagen del personaje" : "Imagen"}
                      </p>
                      {item.image ? (
                        <div className="relative rounded-lg overflow-hidden">
                          <img src={item.image} alt={`Content ${index + 1}`} className="w-full h-28 object-cover rounded-lg" />
                          <button
                            onClick={() => updateItem(item.id, "image", null)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-28 rounded-lg border-2 border-dashed border-border hover:border-accent/40 transition-colors bg-secondary/30">
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-[10px] text-muted-foreground">Subir imagen</p>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(item.id, "image", e)} />
                        </label>
                      )}
                    </div>

                    {/* Video upload (for Motion Transfer) */}
                    {hasDoubleUpload && (
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Video / GIF de movimiento</p>
                        {item.video ? (
                          <div className="relative rounded-lg overflow-hidden">
                            <video src={item.video} className="w-full h-28 object-cover rounded-lg" muted loop autoPlay playsInline />
                            <button
                              onClick={() => updateItem(item.id, "video", null)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-28 rounded-lg border-2 border-dashed border-border hover:border-accent/40 transition-colors bg-secondary/30">
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                              <Film className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-[10px] text-muted-foreground">Subir video/GIF</p>
                            <input type="file" accept="video/*,.gif" className="hidden" onChange={(e) => handleFileUpload(item.id, "video", e)} />
                          </label>
                        )}
                      </div>
                    )}

                    {/* Prompts (only for LTX) */}
                    {hasPrompts && (
                      <div className="space-y-2">
                        <div>
                          <p className="text-[10px] font-semibold text-accent mb-1">Positive Prompt</p>
                          <textarea
                            value={item.positivePrompt}
                            onChange={(e) => updateItem(item.id, "positivePrompt", e.target.value)}
                            placeholder="Describe the scene you imagine..."
                            rows={2}
                            className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 resize-none font-mono"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-destructive mb-1">Negative Prompt</p>
                          <textarea
                            value={item.negativePrompt}
                            onChange={(e) => updateItem(item.id, "negativePrompt", e.target.value)}
                            placeholder="What to avoid: blurry, low quality..."
                            rows={2}
                            className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-destructive/20 resize-none font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-accent/40 text-muted-foreground hover:text-accent flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-medium">Añadir más contenido</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? "contenido" : "contenidos"} programados
        </span>
        <button
          onClick={() => onContinue(items)}
          className="px-6 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ContentScheduler;
