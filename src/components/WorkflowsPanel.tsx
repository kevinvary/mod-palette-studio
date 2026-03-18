import { useState } from "react";
import { Play, Pause, Clock, CheckCircle2, AlertCircle, ArrowLeft, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowParam {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "toggle";
  value: string | number | boolean;
  options?: string[];
}

interface Workflow {
  id: string;
  name: string;
  status: string;
  steps: number;
  completed: number;
  description: string;
  params: WorkflowParam[];
}

const workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Data Ingestion Pipeline",
    status: "running",
    steps: 12,
    completed: 8,
    description: "Automated data collection and normalization pipeline",
    params: [
      { key: "batch_size", label: "Batch Size", type: "number", value: 256 },
      { key: "source", label: "Data Source", type: "select", value: "API", options: ["API", "CSV", "Database", "Stream"] },
      { key: "retry_count", label: "Retry Count", type: "number", value: 3 },
      { key: "auto_validate", label: "Auto Validate", type: "toggle", value: true },
      { key: "output_format", label: "Output Format", type: "select", value: "JSON", options: ["JSON", "Parquet", "CSV"] },
    ],
  },
  {
    id: "wf-002",
    name: "ETL Processing Job",
    status: "completed",
    steps: 6,
    completed: 6,
    description: "Extract, transform and load pipeline for analytics",
    params: [
      { key: "chunk_size", label: "Chunk Size", type: "number", value: 1000 },
      { key: "compression", label: "Compression", type: "select", value: "gzip", options: ["none", "gzip", "snappy", "lz4"] },
      { key: "dedup", label: "Deduplication", type: "toggle", value: true },
    ],
  },
  {
    id: "wf-003",
    name: "Batch Export 4x",
    status: "queued",
    steps: 4,
    completed: 0,
    description: "Scheduled batch export to external storage",
    params: [
      { key: "destination", label: "Destination", type: "select", value: "S3", options: ["S3", "GCS", "Azure Blob", "Local"] },
      { key: "parallel_workers", label: "Parallel Workers", type: "number", value: 4 },
      { key: "encrypt", label: "Encrypt Output", type: "toggle", value: false },
    ],
  },
  {
    id: "wf-004",
    name: "Report Generation Pipeline",
    status: "failed",
    steps: 8,
    completed: 3,
    description: "Automated report generation and distribution",
    params: [
      { key: "template", label: "Template", type: "select", value: "Monthly", options: ["Daily", "Weekly", "Monthly", "Custom"] },
      { key: "recipients", label: "Recipients Email", type: "text", value: "team@company.com" },
      { key: "include_charts", label: "Include Charts", type: "toggle", value: true },
    ],
  },
  {
    id: "wf-005",
    name: "Data Sync Workflow",
    status: "running",
    steps: 10,
    completed: 6,
    description: "Bidirectional data synchronization between systems",
    params: [
      { key: "sync_interval", label: "Sync Interval (min)", type: "number", value: 15 },
      { key: "conflict_resolution", label: "Conflict Resolution", type: "select", value: "Latest wins", options: ["Latest wins", "Source wins", "Manual"] },
      { key: "dry_run", label: "Dry Run", type: "toggle", value: false },
    ],
  },
];

const statusConfig = {
  running: { icon: Play, color: "text-accent", bg: "bg-accent/10", label: "Running" },
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Completed" },
  queued: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: "Queued" },
  failed: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
};

const WorkflowsPanel = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [editParams, setEditParams] = useState<WorkflowParam[]>([]);

  const openWorkflow = (wf: Workflow) => {
    setSelectedWorkflow(wf);
    setEditParams(wf.params.map(p => ({ ...p })));
  };

  const updateParam = (key: string, value: string | number | boolean) => {
    setEditParams(prev => prev.map(p => p.key === key ? { ...p, value } : p));
  };

  if (selectedWorkflow) {
    const status = statusConfig[selectedWorkflow.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    return (
      <div className="flex-1 p-6 animate-fade-in">
        <button
          onClick={() => setSelectedWorkflow(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workflows
        </button>

        <div className="flex items-center gap-3 mb-2">
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

        <p className="text-sm text-muted-foreground mb-6">{selectedWorkflow.description}</p>

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

        <div className="surface-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Workflow Parameters</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors duration-150">
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>

          <div className="space-y-4">
            {editParams.map((param) => (
              <div key={param.key} className="flex items-center gap-4">
                <label className="text-label w-40 shrink-0">{param.label}</label>

                {param.type === "text" && (
                  <input
                    type="text"
                    value={param.value as string}
                    onChange={(e) => updateParam(param.key, e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                  />
                )}

                {param.type === "number" && (
                  <input
                    type="number"
                    value={param.value as number}
                    onChange={(e) => updateParam(param.key, parseFloat(e.target.value) || 0)}
                    className="w-32 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                  />
                )}

                {param.type === "select" && (
                  <select
                    value={param.value as string}
                    onChange={(e) => updateParam(param.key, e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    {param.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {param.type === "toggle" && (
                  <button
                    onClick={() => updateParam(param.key, !(param.value as boolean))}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors duration-200 relative",
                      param.value ? "bg-primary" : "bg-secondary"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full bg-foreground absolute top-0.5 transition-transform duration-200",
                        param.value ? "translate-x-5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
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

          return (
            <div
              key={wf.id}
              onClick={() => openWorkflow(wf)}
              className="surface-card p-4 hover:border-primary/30 transition-colors duration-150 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", status.bg)}>
                    <StatusIcon className={cn("w-4 h-4", status.color)} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">{wf.name}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground">{wf.id}</span>
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
