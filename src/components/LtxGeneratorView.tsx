import { useState } from "react";
import { Play, Upload, Sparkles, Clock, RotateCcw, Copy, Trash2, Monitor } from "lucide-react";
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

        {/* Duration & Aspect */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="flex bg-secondary rounded-lg overflow-hidden">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={cn(
                      "px-3 py-1.5 text-[11px] font-medium transition-colors",
                      d === selectedDuration ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="flex bg-secondary rounded-lg overflow-hidden">
                {aspects.slice(0, 2).map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAspect(a)}
                    className={cn(
                      "px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                      a === selectedAspect ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
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

          <div className="ml-auto flex items-center gap-2">
            <button className="px-3 py-1.5 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">☰ List</button>
            <button className="px-3 py-1.5 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">⊞ Grid</button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "history" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {mockHistory.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-72 h-48 bg-secondary rounded-xl overflow-hidden relative shrink-0 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    {item.status === "processing" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-background/80 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-foreground ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Card */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-muted-foreground">⚡</span>
                        <span className="text-xs font-semibold text-foreground">{item.model}</span>
                      </div>

                      {/* Thumbnails row */}
                      <div className="flex items-center gap-1.5 mb-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="w-9 h-9 rounded-lg bg-secondary border border-border overflow-hidden">
                            <div className="w-full h-full bg-muted" />
                          </div>
                        ))}
                      </div>

                      {/* Meta badges */}
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-[10px] text-muted-foreground">
                          ♡ {item.resolution}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-[10px] text-muted-foreground">
                          ⏱ {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                        <RotateCcw className="w-3 h-3" />
                        Rerun
                      </button>
                      <div className="ml-auto flex items-center gap-1">
                        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
              <p>Learn how to use workflows and generate content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LtxGeneratorView;
