import { useState } from "react";
import { ArrowLeft, Users, Plus, Search, MoreVertical, Calendar, MessageCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface VA {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "offline";
  tasksCompleted: number;
  tasksPending: number;
  avatar: string;
  lastActive: string;
}

const mockVAs: VA[] = [
  { id: "1", name: "Carlos M.", role: "Editor de vídeo", status: "active", tasksCompleted: 24, tasksPending: 3, avatar: "CM", lastActive: "Ahora" },
  { id: "2", name: "Laura R.", role: "Diseñadora gráfica", status: "active", tasksCompleted: 18, tasksPending: 5, avatar: "LR", lastActive: "Hace 5 min" },
  { id: "3", name: "Miguel A.", role: "Content Manager", status: "idle", tasksCompleted: 31, tasksPending: 1, avatar: "MA", lastActive: "Hace 2h" },
  { id: "4", name: "Ana S.", role: "Motion Designer", status: "offline", tasksCompleted: 12, tasksPending: 0, avatar: "AS", lastActive: "Hace 1 día" },
];

const statusConfig = {
  active: { label: "Activo", color: "bg-accent", textColor: "text-accent" },
  idle: { label: "Inactivo", color: "bg-yellow-500", textColor: "text-yellow-500" },
  offline: { label: "Offline", color: "bg-muted-foreground", textColor: "text-muted-foreground" },
};

const GestionVA = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = mockVAs.filter((va) =>
    va.name.toLowerCase().includes(search.toLowerCase()) ||
    va.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Gestión de VA</h1>
              <p className="text-xs text-muted-foreground">Trackea trabajadores y programa contenido</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Añadir VA
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 grid grid-cols-4 gap-4 max-w-5xl">
        {[
          { label: "VAs Activos", value: mockVAs.filter(v => v.status === "active").length, icon: CheckCircle2, color: "text-accent" },
          { label: "Tareas Pendientes", value: mockVAs.reduce((a, v) => a + v.tasksPending, 0), icon: Clock, color: "text-yellow-500" },
          { label: "Completadas Hoy", value: 12, icon: CheckCircle2, color: "text-primary" },
          { label: "Alertas", value: 1, icon: AlertCircle, color: "text-destructive" },
        ].map((stat) => (
          <div key={stat.label} className="surface-card p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={cn("w-4 h-4", stat.color)} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="px-6 pb-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar VA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* VA List */}
      <div className="px-6 space-y-2 max-w-5xl pb-8">
        {filtered.map((va) => {
          const status = statusConfig[va.status];
          return (
            <div
              key={va.id}
              className="surface-card p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {va.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {va.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full", status.color)} />
                      <span className={cn("text-[10px] font-medium", status.textColor)}>{status.label}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{va.role}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-xs">
                  <div className="text-center">
                    <p className="font-bold text-foreground">{va.tasksCompleted}</p>
                    <p className="text-muted-foreground">completadas</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">{va.tasksPending}</p>
                    <p className="text-muted-foreground">pendientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">{va.lastActive}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GestionVA;
