import { Zap, Server, Cpu, HardDrive, Activity, AlertTriangle, Wallet } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Pod {
  id: string;
  name: string;
  gpu: string;
  vram: string;
  status: "active" | "idle" | "offline";
  cost: string;
  uptime: string;
  utilization: number;
}

const pods: Pod[] = [
  { id: "pod-a100", name: "A100 80GB", gpu: "NVIDIA A100", vram: "80 GB", status: "active", cost: "$3.12/hr", uptime: "4h 23m", utilization: 87 },
  { id: "pod-4090", name: "RTX 4090", gpu: "NVIDIA RTX 4090", vram: "24 GB", status: "active", cost: "$0.74/hr", uptime: "12h 05m", utilization: 62 },
  { id: "pod-3090", name: "RTX 3090", gpu: "NVIDIA RTX 3090", vram: "24 GB", status: "idle", cost: "$0.44/hr", uptime: "1d 8h", utilization: 0 },
  { id: "pod-h100", name: "H100 SXM", gpu: "NVIDIA H100", vram: "80 GB", status: "offline", cost: "$4.89/hr", uptime: "—", utilization: 0 },
];

const statusColors = {
  active: { dot: "bg-accent", text: "text-accent", label: "Active" },
  idle: { dot: "bg-muted-foreground", text: "text-muted-foreground", label: "Idle" },
  offline: { dot: "bg-destructive", text: "text-destructive", label: "Offline" },
};

const PodsPanel = () => {
  const [selectedPod, setSelectedPod] = useState("pod-a100");

  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">GPU Pods</h1>
          <p className="text-sm text-muted-foreground mt-1">{pods.filter(p => p.status === "active").length} active · {pods.length} total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
          <Zap className="w-4 h-4" />
          Deploy Pod
        </button>
      </div>

      <div className="space-y-3">
        {pods.map((pod) => {
          const status = statusColors[pod.status];
          const isSelected = selectedPod === pod.id;

          return (
            <div
              key={pod.id}
              onClick={() => setSelectedPod(pod.id)}
              className={cn(
                "surface-card p-4 cursor-pointer transition-all duration-150",
                isSelected ? "border-primary/40 glow-primary" : "hover:border-primary/20",
                pod.status === "offline" && "opacity-50"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    pod.status === "active" ? "bg-accent/10" : "bg-muted"
                  )}>
                    <Server className={cn("w-5 h-5", pod.status === "active" ? "text-accent" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{pod.name}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground">{pod.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", status.dot)} />
                  <span className={cn("text-xs font-medium", status.text)}>{status.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">GPU</p>
                    <p className="text-xs text-foreground font-medium">{pod.gpu.replace("NVIDIA ", "")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">VRAM</p>
                    <p className="text-xs text-foreground font-medium">{pod.vram}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Usage</p>
                    <p className="text-xs text-foreground font-medium">{pod.utilization}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cost</p>
                  <p className="text-xs text-foreground font-mono font-medium">{pod.cost}</p>
                </div>
              </div>

              {pod.status === "active" && (
                <div className="mt-3 w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pod.utilization}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodsPanel;
