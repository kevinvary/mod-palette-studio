import { Sparkles } from "lucide-react";

const ConfigPanel = () => {
  return (
    <div className="w-72 border-l border-border bg-sidebar p-4 space-y-6 overflow-y-auto">

      <div>
        <h3 className="text-label mb-3">Active LoRAs</h3>
        <div className="space-y-2">
          {[
            { name: "Realistic Portraits v2.1", weight: 0.75 },
            { name: "Anime Style XL", weight: 0.60 },
            { name: "Pixel Art Pro", weight: 0.90 },
          ].map((lora) => (
            <div key={lora.name} className="surface-card p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-foreground truncate">{lora.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${lora.weight * 100}%` }} />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{lora.weight.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-label mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Jobs Run", value: "1,247" },
            { label: "Storage", value: "18 GB" },
            { label: "This Month", value: "$42.80" },
            { label: "Avg Time", value: "12.4s" },
          ].map((stat) => (
            <div key={stat.label} className="surface-card p-3 text-center">
              <p className="text-sm font-semibold text-foreground font-mono">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
