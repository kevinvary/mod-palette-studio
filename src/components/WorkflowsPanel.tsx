import { Play, Pause, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const workflows = [
  { id: "wf-001", name: "Text to Image Pipeline", status: "running", steps: 12, completed: 8, model: "SDXL 1.0" },
  { id: "wf-002", name: "LoRA Training Job", status: "completed", steps: 6, completed: 6, model: "SD 1.5" },
  { id: "wf-003", name: "Batch Upscale 4x", status: "queued", steps: 4, completed: 0, model: "RealESRGAN" },
  { id: "wf-004", name: "Style Transfer Pipeline", status: "failed", steps: 8, completed: 3, model: "SDXL 1.0" },
  { id: "wf-005", name: "Inpainting Workflow", status: "running", steps: 10, completed: 6, model: "SD 1.5" },
];

const statusConfig = {
  running: { icon: Play, color: "text-accent", bg: "bg-accent/10", label: "Running" },
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Completed" },
  queued: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: "Queued" },
  failed: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
};

const WorkflowsPanel = () => {
  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Workflows</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor your AI pipelines</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      <div className="space-y-3">
        {workflows.map((wf) => {
          const status = statusConfig[wf.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          const progress = (wf.completed / wf.steps) * 100;

          return (
            <div key={wf.id} className="surface-card p-4 hover:border-primary/30 transition-colors duration-150 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", status.bg)}>
                    <StatusIcon className={cn("w-4 h-4", status.color)} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">{wf.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[11px] text-muted-foreground">{wf.id}</span>
                      <span className="text-border">•</span>
                      <span className="text-xs text-muted-foreground">{wf.model}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={cn("text-xs font-medium", status.color)}>{status.label}</span>
                    <p className="text-[11px] text-muted-foreground">{wf.completed}/{wf.steps} steps</p>
                  </div>
                  <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        wf.status === "failed" ? "bg-destructive" : "bg-primary"
                      )}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowsPanel;
