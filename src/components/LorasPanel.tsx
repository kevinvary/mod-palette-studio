import { Sparkles, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LoRA {
  id: string;
  name: string;
  weight: number;
  active: boolean;
  triggerWord: string;
  size: string;
}

const initialLoras: LoRA[] = [
  { id: "lora-1", name: "Realistic Portraits v2.1", weight: 0.75, active: true, triggerWord: "rlstc_portrait", size: "184 MB" },
  { id: "lora-2", name: "Anime Style XL", weight: 0.6, active: true, triggerWord: "anmxl", size: "142 MB" },
  { id: "lora-3", name: "Cinematic Lighting", weight: 0.85, active: false, triggerWord: "cnmtc_light", size: "96 MB" },
  { id: "lora-4", name: "Watercolor Effect", weight: 0.5, active: false, triggerWord: "wtrclr", size: "128 MB" },
  { id: "lora-5", name: "Pixel Art Pro", weight: 0.9, active: true, triggerWord: "pxlart", size: "67 MB" },
];

const LorasPanel = () => {
  const [loras, setLoras] = useState(initialLoras);

  const toggleActive = (id: string) => {
    setLoras(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const updateWeight = (id: string, weight: number) => {
    setLoras(prev => prev.map(l => l.id === id ? { ...l, weight } : l));
  };

  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">LoRA Models</h1>
          <p className="text-sm text-muted-foreground mt-1">{loras.filter(l => l.active).length} active · {loras.length} total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
          <Plus className="w-4 h-4" />
          Add LoRA
        </button>
      </div>

      <div className="space-y-3">
        {loras.map((lora) => (
          <div key={lora.id} className={cn(
            "surface-card p-4 transition-all duration-150",
            lora.active ? "border-primary/20" : "opacity-60"
          )}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  lora.active ? "bg-primary/15" : "bg-muted"
                )}>
                  <Sparkles className={cn("w-4 h-4", lora.active ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{lora.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[11px] text-muted-foreground">{lora.triggerWord}</span>
                    <span className="text-border">•</span>
                    <span className="text-[11px] text-muted-foreground">{lora.size}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => toggleActive(lora.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                {lora.active ? <ToggleRight className="w-6 h-6 text-primary" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-label w-16">Weight</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lora.weight}
                onChange={(e) => updateWeight(lora.id, parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              />
              <span className="font-mono text-sm text-foreground w-10 text-right">{lora.weight.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LorasPanel;
