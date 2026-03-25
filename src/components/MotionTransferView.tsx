import { useState } from "react";
import { Clock, Video, ImageIcon, AlertTriangle, Scissors, Star, MessageSquare, Camera, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import exampleCleanPhoto from "@/assets/example-clean-photo.jpg";
import exampleResultPhoto from "@/assets/example-result-photo.jpg";
import exampleFinalResult from "@/assets/example-final-result.jpg";
import QueuePipelineCards, { type QueueItem } from "@/components/QueuePipelineCards";

const mockQueue: QueueItem[] = [
  { id: "mt-001", index: 1, inputImage: null, inputVideo: null, positivePrompt: "foto 1, posando como foto 2, copiando la misma ropa y background que la foto 2", negativePrompt: "", outputVideo: null, status: "completed", generationTime: "14m 32s" },
  { id: "mt-002", index: 2, inputImage: null, inputVideo: null, positivePrompt: "foto 1, posando como foto 2, misma ropa y escenario", negativePrompt: "blurry, distorted", outputVideo: null, status: "completed", generationTime: "18m 07s" },
  { id: "mt-003", index: 3, inputImage: null, inputVideo: null, positivePrompt: "foto 1, replicando movimiento de foto 2, mismo outfit", negativePrompt: "", outputVideo: null, status: "processing", progress: 38 },
];

const MotionTransferView = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "howItWorks">("queue");
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
            <QueuePipelineCards items={mockQueue} viewMode={viewMode} pipelineType="motion" />
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
                <div className="grid grid-cols-3 gap-3 mt-2">
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
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img src={exampleFinalResult} alt="Resultado final" className="w-full object-contain" />
                    <div className="px-2 py-1.5 bg-secondary">
                      <p className="text-[10px] text-muted-foreground text-center">Resultado final</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <video src="/videos/example-reference.mp4" className="w-full object-contain" controls muted loop />
                    <div className="px-2 py-1.5 bg-secondary">
                      <p className="text-[10px] text-muted-foreground text-center">Video de referencia</p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <video src="/videos/example-result.mp4" className="w-full object-contain" controls muted loop />
                    <div className="px-2 py-1.5 bg-secondary">
                      <p className="text-[10px] text-muted-foreground text-center">Resultado final</p>
                    </div>
                  </div>
                </div>
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

              <div className="surface-card p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <Timer className="w-4 h-4" /> Tiempo de procesamiento
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Este es el <span className="text-foreground font-medium">proceso más pesado</span> de todos, por lo cual requiere tiempo por video. Aproximadamente <span className="text-foreground font-medium">10-20 minutos por cada 10 segundos de video</span>.
                </p>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotionTransferView;
