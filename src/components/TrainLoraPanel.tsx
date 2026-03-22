import { useState } from "react";
import { Upload, ImageIcon, FileArchive, Check, ArrowRight, ArrowLeft, X, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelOption {
  id: string;
  name: string;
  description: string;
  params: string;
  selected: boolean;
}

const initialModels: ModelOption[] = [
  { id: "flux-klein", name: "FLUX Klein", description: "Modelo ligero y rápido para entrenamientos ágiles", params: "", selected: true },
  { id: "wan", name: "Wan", description: "Especializado en video y animación de alta calidad", params: "", selected: false },
  { id: "zt-turbo", name: "ZT Turbo", description: "Máxima velocidad de inferencia con calidad competitiva", params: "", selected: false },
];

const TrainLoraPanel = () => {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState("flux-klein");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loraName, setLoraName] = useState("");
  const [triggerWord, setTriggerWord] = useState("");
  const [steps, setSteps] = useState(2000);

  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const stepLabels = [
    { num: 1, label: "Fotos" },
    { num: 2, label: "Configurar" },
    { num: 3, label: "Listo" },
  ];

  return (
    <div className="flex-1 p-6 animate-fade-in max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Entrenar LoRA</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sube fotos y entrena un modelo personalizado
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-10">
        {stepLabels.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  step >= s.num
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  step >= s.num ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={cn(
                  "w-16 h-px mx-3",
                  step > s.num ? "bg-primary" : "bg-border border-dashed border-t"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Fotos */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          {/* Model Selection */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Modelo a entrenar</p>
            <div className="grid grid-cols-3 gap-3">
              {initialModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={cn(
                    "surface-card p-4 text-left transition-all duration-150 relative",
                    selectedModel === model.id
                      ? "border-primary ring-1 ring-primary/30"
                      : "hover:border-primary/20"
                  )}
                >
                  {selectedModel === model.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{model.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{model.description}</p>
                  {model.params && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-secondary rounded text-[10px] font-mono text-muted-foreground">
                      {model.params}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Upload cards */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Subir imágenes de entrenamiento</p>
            <div className="grid grid-cols-2 gap-4">
              {/* ZIP upload */}
              <label className="surface-card flex flex-col items-center justify-center gap-3 cursor-pointer py-12 px-6 text-center hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <FileArchive className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Subir ZIP</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Archivo .zip con imágenes — Máx. 100MB</p>
                </div>
                <input type="file" accept=".zip" className="hidden" onChange={handleFilesUpload} />
              </label>

              {/* Photos upload */}
              <label className="surface-card flex flex-col items-center justify-center gap-3 cursor-pointer py-12 px-6 text-center hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Subir fotos</p>
                  <p className="text-[11px] text-muted-foreground mt-1">JPEG, PNG, WebP — Máx. 10MB c/u</p>
                </div>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFilesUpload} />
              </label>
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Mínimo 5 fotos, máximo 30 — También puedes arrastrar un ZIP aquí
            </p>
          </div>

          {/* Uploaded files preview */}
          {uploadedFiles.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Archivos subidos ({uploadedFiles.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5 text-xs text-foreground"
                  >
                    <ImageIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="max-w-[120px] truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Configurar */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="surface-card p-5 rounded-xl space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Nombre del LoRA</label>
              <input
                type="text"
                value={loraName}
                onChange={(e) => setLoraName(e.target.value)}
                placeholder="Ej: Mi modelo personalizado"
                className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Trigger word</label>
              <input
                type="text"
                value={triggerWord}
                onChange={(e) => setTriggerWord(e.target.value)}
                placeholder="Ej: mi_modelo"
                className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-[10px] text-muted-foreground mt-1.5">Palabra clave que activará tu modelo en los prompts</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Steps de entrenamiento</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                />
                <span className="font-mono text-sm text-foreground w-14 text-right">{steps}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">Recomendado: 1500-2500 steps para mejores resultados</p>
            </div>

            <div className="surface-card p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  {initialModels.find(m => m.id === selectedModel)?.name}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {uploadedFiles.length} archivos · {steps} steps · ~{Math.round(steps * 0.02)} min estimado
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 bg-secondary text-foreground rounded-xl text-sm font-bold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Iniciar entrenamiento
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Listo */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="surface-card p-8 rounded-xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Entrenamiento iniciado</h2>
            <p className="text-sm text-muted-foreground max-w-sm mb-1">
              Tu modelo <span className="text-foreground font-medium">{loraName || "LoRA"}</span> se está entrenando con{" "}
              <span className="text-foreground font-medium">{initialModels.find(m => m.id === selectedModel)?.name}</span>.
            </p>
            <p className="text-xs text-muted-foreground">
              Recibirás una notificación cuando esté listo. Tiempo estimado: ~{Math.round(steps * 0.02)} min.
            </p>

            <div className="w-full mt-6 surface-card p-4 rounded-lg bg-secondary/50">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progreso</span>
                <span className="text-foreground font-mono">0 / {steps} steps</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[2%] animate-pulse" />
              </div>
            </div>
          </div>

          <button
            onClick={() => { setStep(1); setUploadedFiles([]); setLoraName(""); setTriggerWord(""); setSteps(2000); }}
            className="w-full py-3 bg-secondary text-foreground rounded-xl text-sm font-bold hover:bg-secondary/80 transition-colors"
          >
            Entrenar otro modelo
          </button>
        </div>
      )}
    </div>
  );
};

export default TrainLoraPanel;
