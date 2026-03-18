import { useState } from "react";
import { Play, Clock, CheckCircle2, AlertCircle, ArrowLeft, Save, MessageSquare, Maximize2, ImageIcon, ChevronRight, ChevronDown, Minus, Plus, Sparkles, Cpu, Server, HardDrive, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowParam {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "toggle" | "resolution";
  value: string | number | boolean;
  options?: string[];
  presets?: string[];
}

interface WorkflowSection {
  id: string;
  title: string;
  icon: "prompts" | "resolution" | "images" | "loras" | "gpus";
  nodes: WorkflowNode[];
}

interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  params: WorkflowParam[];
  collapsible?: boolean;
  itemCount?: number;
}

interface Workflow {
  id: string;
  name: string;
  status: string;
  steps: number;
  completed: number;
  description: string;
  sections: WorkflowSection[];
}

const sectionIcons = {
  prompts: MessageSquare,
  resolution: Maximize2,
  images: ImageIcon,
  loras: Sparkles,
  gpus: Cpu,
};

const workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Data Ingestion Pipeline",
    status: "running",
    steps: 12,
    completed: 8,
    description: "Automated data collection and normalization pipeline",
    sections: [
      {
        id: "sec-prompts",
        title: "Prompts",
        icon: "prompts",
        nodes: [
          { id: "n1", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 40, params: [] },
          { id: "n2", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 20, params: [] },
          { id: "n3", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 20, params: [] },
          { id: "n4", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 20, params: [] },
        ],
      },
      {
        id: "sec-resolution",
        title: "Resolution",
        icon: "resolution",
        nodes: [
          {
            id: "n5",
            name: "EmptyFlux2LatentImage",
            type: "EmptyFlux2LatentImage",
            params: [
              { key: "resolution", label: "Resolution", type: "resolution", value: "832x1216", presets: ["512x512", "768x768", "768x1024", "832x1216", "1024x1024", "1024x768", "1216x832", "1344x768", "768x1344"] },
              { key: "width", label: "Width", type: "number", value: 832 },
              { key: "height", label: "Height", type: "number", value: 1216 },
              { key: "batch_size", label: "Batch Size", type: "number", value: 1 },
            ],
          },
        ],
      },
      {
        id: "sec-loras",
        title: "LoRAs",
        icon: "loras",
        nodes: [
          {
            id: "n5b",
            name: "LoraLoader",
            type: "LoraLoader",
            params: [
              { key: "lora_name", label: "LoRA Model", type: "select", value: "flux_realism_v2.safetensors", options: ["flux_realism_v2.safetensors", "flux_anime_v1.safetensors", "flux_portrait_v3.safetensors", "detail_enhancer_v1.safetensors"] },
              { key: "strength_model", label: "Strength Model", type: "number", value: 1.0 },
              { key: "strength_clip", label: "Strength Clip", type: "number", value: 1.0 },
            ],
          },
          {
            id: "n5c",
            name: "LoraLoader",
            type: "LoraLoader",
            params: [
              { key: "lora_name", label: "LoRA Model", type: "select", value: "flux_anime_v1.safetensors", options: ["flux_realism_v2.safetensors", "flux_anime_v1.safetensors", "flux_portrait_v3.safetensors", "detail_enhancer_v1.safetensors"] },
              { key: "strength_model", label: "Strength Model", type: "number", value: 0.8 },
              { key: "strength_clip", label: "Strength Clip", type: "number", value: 0.8 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wf-002",
    name: "ETL Processing Job",
    status: "completed",
    steps: 6,
    completed: 6,
    description: "Extract, transform and load pipeline for analytics",
    sections: [
      {
        id: "sec-images",
        title: "Images",
        icon: "images",
        nodes: [
          {
            id: "n6",
            name: "SaveImage",
            type: "SaveImage",
            params: [
              { key: "filename_prefix", label: "Filename Prefix", type: "text", value: "ComfyUI" },
            ],
          },
          {
            id: "n7",
            name: "SaveImage",
            type: "SaveImage",
            params: [
              { key: "filename_prefix", label: "Filename Prefix", type: "text", value: "ComfyUI" },
            ],
          },
          {
            id: "n8",
            name: "LoadImage",
            type: "LoadImage",
            params: [
              { key: "image", label: "Image", type: "text", value: "AnimateDiff_00613.png" },
              { key: "upload", label: "Upload", type: "text", value: "image" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wf-003",
    name: "Batch Export 4x",
    status: "queued",
    steps: 4,
    completed: 0,
    description: "Scheduled batch export to external storage",
    sections: [
      {
        id: "sec-prompts-2",
        title: "Prompts",
        icon: "prompts",
        nodes: [
          { id: "n9", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 20, params: [] },
        ],
      },
      {
        id: "sec-resolution-2",
        title: "Resolution",
        icon: "resolution",
        nodes: [
          {
            id: "n10",
            name: "EmptyFlux2LatentImage",
            type: "EmptyFlux2LatentImage",
            params: [
              { key: "resolution", label: "Resolution", type: "resolution", value: "1024x1024", presets: ["512x512", "768x768", "1024x1024", "1216x832"] },
              { key: "width", label: "Width", type: "number", value: 1024 },
              { key: "height", label: "Height", type: "number", value: 1024 },
              { key: "batch_size", label: "Batch Size", type: "number", value: 1 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wf-004",
    name: "Report Generation Pipeline",
    status: "failed",
    steps: 8,
    completed: 3,
    description: "Automated report generation and distribution",
    sections: [
      {
        id: "sec-images-2",
        title: "Images",
        icon: "images",
        nodes: [
          {
            id: "n11",
            name: "SaveImage",
            type: "SaveImage",
            params: [
              { key: "filename_prefix", label: "Filename Prefix", type: "text", value: "Report_Output" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wf-005",
    name: "Data Sync Workflow",
    status: "running",
    steps: 10,
    completed: 6,
    description: "Bidirectional data synchronization between systems",
    sections: [
      {
        id: "sec-prompts-3",
        title: "Prompts",
        icon: "prompts",
        nodes: [
          { id: "n12", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 30, params: [] },
          { id: "n13", name: "CR Prompt List", type: "CR Prompt List", collapsible: true, itemCount: 15, params: [] },
        ],
      },
    ],
  },
];

const statusConfig = {
  running: { icon: Play, color: "text-accent", bg: "bg-accent/10", label: "Running" },
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Completed" },
  queued: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: "Queued" },
  failed: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
};

const gpuPods = [
  { id: "gpu-4090", name: "RTX 4090", gpu: "NVIDIA RTX 4090", vram: "24 GB", status: "active" as const, cost: "$0.74/hr", utilization: 62 },
  { id: "gpu-3090", name: "RTX 3090", gpu: "NVIDIA RTX 3090", vram: "24 GB", status: "active" as const, cost: "$0.44/hr", utilization: 45 },
  { id: "gpu-a100", name: "A100 80GB", gpu: "NVIDIA A100", vram: "80 GB", status: "idle" as const, cost: "$3.12/hr", utilization: 0 },
  { id: "gpu-h100", name: "H100 SXM", gpu: "NVIDIA H100", vram: "80 GB", status: "offline" as const, cost: "$4.89/hr", utilization: 0 },
];

const gpuStatusColors = {
  active: { dot: "bg-accent", text: "text-accent", label: "Active" },
  idle: { dot: "bg-muted-foreground", text: "text-muted-foreground", label: "Idle" },
  offline: { dot: "bg-destructive", text: "text-destructive", label: "Offline" },
};


const NumberStepper = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
  <div>
    <span className="text-xs text-muted-foreground mb-1.5 block">{label}</span>
    <div className="flex items-center">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-9 h-9 flex items-center justify-center bg-secondary rounded-l-lg border border-border hover:bg-secondary/80 transition-colors"
      >
        <Minus className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      <div className="flex-1 h-9 flex items-center justify-center bg-background border-y border-border font-mono text-sm text-foreground min-w-[80px]">
        {value}
      </div>
      <button
        onClick={() => onChange(value + 1)}
        className="w-9 h-9 flex items-center justify-center bg-secondary rounded-r-lg border border-border hover:bg-secondary/80 transition-colors"
      >
        <Plus className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  </div>
);

const NodeCard = ({ node, onParamChange }: { node: WorkflowNode; onParamChange: (nodeId: string, key: string, value: string | number | boolean) => void }) => {
  const [collapsed, setCollapsed] = useState(true);

  if (node.collapsible) {
    return (
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full surface-card p-3.5 flex items-center gap-3 hover:border-primary/30 transition-colors duration-150"
      >
        <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", !collapsed && "rotate-90")} />
        <span className="text-sm font-medium text-foreground">no_Name_Input</span>
        <span className="ml-auto text-xs text-muted-foreground">{node.itemCount} prompts</span>
      </button>
    );
  }

  return (
    <div className="surface-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">no_Name_Input</span>
        <span className="text-xs text-muted-foreground">{node.type}</span>
      </div>

      {node.params.map((param) => {
        if (param.type === "resolution" && param.presets) {
          return (
            <div key={param.key} className="flex flex-wrap gap-2">
              {param.presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    onParamChange(node.id, param.key, preset);
                    const [w, h] = preset.split("x").map(Number);
                    onParamChange(node.id, "width", w);
                    onParamChange(node.id, "height", h);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-mono transition-colors duration-150 border",
                    param.value === preset
                      ? "bg-accent/20 border-accent text-accent"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>
          );
        }

        if (param.type === "number") {
          return (
            <NumberStepper
              key={param.key}
              label={param.label}
              value={param.value as number}
              onChange={(v) => onParamChange(node.id, param.key, v)}
            />
          );
        }

        if (param.type === "text") {
          return (
            <div key={param.key}>
              <span className="text-xs text-muted-foreground mb-1.5 block">{param.label}</span>
              <input
                type="text"
                value={param.value as string}
                onChange={(e) => onParamChange(node.id, param.key, e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
              />
            </div>
          );
        }

        if (param.type === "select") {
          return (
            <div key={param.key}>
              <span className="text-xs text-muted-foreground mb-1.5 block">{param.label}</span>
              <select
                value={param.value as string}
                onChange={(e) => onParamChange(node.id, param.key, e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                {param.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

const WorkflowsPanel = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [editSections, setEditSections] = useState<WorkflowSection[]>([]);
  const [workflowPods, setWorkflowPods] = useState<Record<string, string>>({});
  const [deployingFor, setDeployingFor] = useState<string | null>(null);

  const openWorkflow = (wf: Workflow) => {
    setSelectedWorkflow(wf);
    setEditSections(JSON.parse(JSON.stringify(wf.sections)));
  };

  const handleParamChange = (nodeId: string, key: string, value: string | number | boolean) => {
    setEditSections(prev =>
      prev.map(section => ({
        ...section,
        nodes: section.nodes.map(node =>
          node.id === nodeId
            ? { ...node, params: node.params.map(p => p.key === key ? { ...p, value } : p) }
            : node
        ),
      }))
    );
  };

  if (selectedWorkflow) {
    const status = statusConfig[selectedWorkflow.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    return (
      <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
        <button
          onClick={() => setSelectedWorkflow(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workflows
        </button>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", status.bg)}>
              <StatusIcon className={cn("w-4 h-4", status.color)} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{selectedWorkflow.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-muted-foreground">{selectedWorkflow.id}</span>
                <span className="text-border">•</span>
                <span className={cn("text-xs font-medium", status.color)}>{status.label}</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors duration-150">
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{selectedWorkflow.description}</p>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">{selectedWorkflow.completed}/{selectedWorkflow.steps} steps</span>
          <div className="flex-1 max-w-xs h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                selectedWorkflow.status === "failed" ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${(selectedWorkflow.completed / selectedWorkflow.steps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {editSections.map((section) => {
            const SectionIcon = sectionIcons[section.icon];
            return (
              <div key={section.id}>
                <div className="flex items-center gap-2 mb-3">
                  <SectionIcon className="w-4 h-4 text-accent" />
                  <h2 className="text-sm font-semibold text-accent">{section.title}</h2>
                </div>
                <div className="space-y-3">
                  {section.nodes.map((node) => (
                    <NodeCard key={node.id} node={node} onParamChange={handleParamChange} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Workflows</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and monitor your pipelines</p>
      </div>

      <div className="space-y-3">
        {workflows.map((wf) => {
          const status = statusConfig[wf.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          const progress = (wf.completed / wf.steps) * 100;
          const assignedPod = workflowPods[wf.id];
          const assignedPodData = assignedPod ? gpuPods.find(p => p.id === assignedPod) : null;

          return (
            <div key={wf.id} className="space-y-2">
              <div
                onClick={() => openWorkflow(wf)}
                className="surface-card p-4 hover:border-primary/30 transition-colors duration-150 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", status.bg)}>
                      <StatusIcon className={cn("w-4 h-4", status.color)} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">no_Name_Input</h3>
                      <div className="flex items-center gap-1.5">
                        {assignedPodData ? (
                          <>
                            <Server className="w-3 h-3 text-accent" />
                            <span className="font-mono text-[11px] text-accent">{assignedPodData.name}</span>
                          </>
                        ) : (
                          <span className="font-mono text-[11px] text-muted-foreground">{wf.id.replace("wf-", "")}</span>
                        )}
                        <span className="text-border">•</span>
                        <span className={cn("text-[11px] font-medium", status.color)}>{status.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeployingFor(deployingFor === wf.id ? null : wf.id);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150",
                        assignedPodData
                          ? "bg-accent/10 text-accent hover:bg-accent/20"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {assignedPodData ? "Change Pod" : "Deploy Pod"}
                    </button>
                    <div className="text-right">
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

              {deployingFor === wf.id && (
                <div className="ml-11 space-y-2 animate-fade-in">
                  {gpuPods.map((pod) => {
                    const podStatus = gpuStatusColors[pod.status];
                    const isSelected = workflowPods[wf.id] === pod.id;

                    return (
                      <div
                        key={pod.id}
                        onClick={() => {
                          setWorkflowPods(prev => ({ ...prev, [wf.id]: pod.id }));
                          setDeployingFor(null);
                        }}
                        className={cn(
                          "surface-card p-3.5 cursor-pointer transition-all duration-150",
                          isSelected ? "border-primary/40 glow-primary" : "hover:border-primary/20",
                          pod.status === "offline" && "opacity-50"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", pod.status === "active" ? "bg-accent/10" : "bg-muted")}>
                              <Server className={cn("w-4 h-4", pod.status === "active" ? "text-accent" : "text-muted-foreground")} />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-foreground">{pod.name}</h3>
                              <span className="font-mono text-[11px] text-muted-foreground">{pod.id}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", podStatus.dot)} />
                            <span className={cn("text-xs font-medium", podStatus.text)}>{podStatus.label}</span>
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
                          <div className="mt-2.5 w-full h-1 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pod.utilization}%` }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowsPanel;
