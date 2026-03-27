import { useState } from "react";
import { ArrowLeft, Users, Plus, Search, MoreVertical, Calendar, MessageCircle, CheckCircle2, Clock, AlertCircle, Trash2, Edit, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VA {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "offline";
  tasksCompleted: number;
  tasksPending: number;
  avatar: string;
  lastActive: string;
  email: string;
}

interface Task {
  id: string;
  title: string;
  date: string;
  status: "pending" | "done";
}


const mockVAs: VA[] = [
  { id: "1", name: "Carlos M.", role: "Editor de vídeo", status: "active", tasksCompleted: 24, tasksPending: 3, avatar: "CM", lastActive: "Ahora", email: "carlos@studio.com" },
  { id: "2", name: "Laura R.", role: "Diseñadora gráfica", status: "active", tasksCompleted: 18, tasksPending: 5, avatar: "LR", lastActive: "Hace 5 min", email: "laura@studio.com" },
  { id: "3", name: "Miguel A.", role: "Content Manager", status: "idle", tasksCompleted: 31, tasksPending: 1, avatar: "MA", lastActive: "Hace 2h", email: "miguel@studio.com" },
  { id: "4", name: "Ana S.", role: "Motion Designer", status: "offline", tasksCompleted: 12, tasksPending: 0, avatar: "AS", lastActive: "Hace 1 día", email: "ana@studio.com" },
];

const mockTasks: Record<string, Task[]> = {
  "1": [
    { id: "t1", title: "Editar reel de producto", date: "Hoy", status: "pending" },
    { id: "t2", title: "Color grading campaña", date: "Mañana", status: "pending" },
    { id: "t3", title: "Exportar stories", date: "28 Mar", status: "pending" },
    { id: "t4", title: "Reel lanzamiento", date: "Ayer", status: "done" },
  ],
  "2": [
    { id: "t5", title: "Diseño banner web", date: "Hoy", status: "pending" },
    { id: "t6", title: "Mockup packaging", date: "Hoy", status: "pending" },
    { id: "t7", title: "Adaptación redes", date: "29 Mar", status: "pending" },
  ],
  "3": [
    { id: "t8", title: "Revisar calendario editorial", date: "Mañana", status: "pending" },
    { id: "t9", title: "Publicar post blog", date: "Ayer", status: "done" },
  ],
  "4": [],
};


const statusConfig = {
  active: { label: "Activo", color: "bg-accent", textColor: "text-accent" },
  idle: { label: "Inactivo", color: "bg-yellow-500", textColor: "text-yellow-500" },
  offline: { label: "Offline", color: "bg-muted-foreground", textColor: "text-muted-foreground" },
};

const GestionVA = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Dialog states
  const [addVAOpen, setAddVAOpen] = useState(false);
  const [calendarVA, setCalendarVA] = useState<VA | null>(null);
  
  const [detailVA, setDetailVA] = useState<VA | null>(null);
  const [editVA, setEditVA] = useState<VA | null>(null);
  const [deleteVA, setDeleteVA] = useState<VA | null>(null);

  // Form states
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filtered = mockVAs.filter((va) =>
    va.name.toLowerCase().includes(search.toLowerCase()) ||
    va.role.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (va: VA) => {
    setEditName(va.name);
    setEditRole(va.role);
    setEditVA(va);
  };

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
          <Button onClick={() => { setNewName(""); setNewRole(""); setNewEmail(""); setAddVAOpen(true); }}>
            <Plus className="w-4 h-4" />
            Añadir VA
          </Button>
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
              onClick={() => setDetailVA(va)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {va.avatar}
                </div>
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
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setCalendarVA(va)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => setDetailVA(va)}>
                        <Eye className="w-4 h-4 mr-2" /> Ver perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEdit(va)}>
                        <Edit className="w-4 h-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCalendarVA(va)}>
                        <Calendar className="w-4 h-4 mr-2" /> Ver tareas
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setDeleteVA(va)} className="text-destructive focus:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== DIALOG: Añadir VA ===== */}
      <Dialog open={addVAOpen} onOpenChange={setAddVAOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir nuevo VA</DialogTitle>
            <DialogDescription>Registra un nuevo asistente virtual en tu equipo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input placeholder="Nombre completo" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger><SelectValue placeholder="Seleccionar rol" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor de vídeo</SelectItem>
                  <SelectItem value="designer">Diseñador/a gráfico/a</SelectItem>
                  <SelectItem value="content">Content Manager</SelectItem>
                  <SelectItem value="motion">Motion Designer</SelectItem>
                  <SelectItem value="community">Community Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="email@ejemplo.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={() => setAddVAOpen(false)} disabled={!newName || !newRole}>
              <Plus className="w-4 h-4" /> Añadir VA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DIALOG: Tareas / Calendario ===== */}
      <Dialog open={!!calendarVA} onOpenChange={() => setCalendarVA(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Tareas — {calendarVA?.name}
            </DialogTitle>
            <DialogDescription>Tareas asignadas y progreso actual.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {calendarVA && (mockTasks[calendarVA.id] || []).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No hay tareas asignadas</p>
            )}
            {calendarVA && (mockTasks[calendarVA.id] || []).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <CheckCircle2 className={cn("w-4 h-4 shrink-0", task.status === "done" ? "text-accent" : "text-muted-foreground")} />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm", task.status === "done" && "line-through text-muted-foreground")}>{task.title}</p>
                  <p className="text-[10px] text-muted-foreground">{task.date}</p>
                </div>
                {task.status === "pending" && <Badge variant="secondary" className="text-[10px]">Pendiente</Badge>}
                {task.status === "done" && <Badge className="text-[10px] bg-accent/15 text-accent border-0">Hecho</Badge>}
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Input placeholder="Nueva tarea..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="flex-1" />
            <Button size="sm" disabled={!newTaskTitle} onClick={() => setNewTaskTitle("")}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      {/* ===== DIALOG: Ver Perfil ===== */}
      <Dialog open={!!detailVA} onOpenChange={() => setDetailVA(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Perfil del VA</DialogTitle>
          </DialogHeader>
          {detailVA && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-lg font-bold text-primary">
                  {detailVA.avatar}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{detailVA.name}</h3>
                  <p className="text-sm text-muted-foreground">{detailVA.role}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={cn("w-2 h-2 rounded-full", statusConfig[detailVA.status].color)} />
                    <span className={cn("text-xs", statusConfig[detailVA.status].textColor)}>
                      {statusConfig[detailVA.status].label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border text-center">
                  <p className="text-xl font-bold text-foreground">{detailVA.tasksCompleted}</p>
                  <p className="text-[10px] text-muted-foreground">Completadas</p>
                </div>
                <div className="p-3 rounded-lg border border-border text-center">
                  <p className="text-xl font-bold text-foreground">{detailVA.tasksPending}</p>
                  <p className="text-[10px] text-muted-foreground">Pendientes</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">{detailVA.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Última actividad</span>
                  <span className="text-foreground">{detailVA.lastActive}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDetailVA(null); if (detailVA) openEdit(detailVA); }}>
              <Edit className="w-4 h-4" /> Editar
            </Button>
            <Button onClick={() => { setDetailVA(null); if (detailVA) setCalendarVA(detailVA); }}>
              <Calendar className="w-4 h-4" /> Ver tareas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DIALOG: Editar VA ===== */}
      <Dialog open={!!editVA} onOpenChange={() => setEditVA(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar VA</DialogTitle>
            <DialogDescription>Modifica los datos de {editVA?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Input value={editRole} onChange={(e) => setEditRole(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={() => setEditVA(null)}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DIALOG: Eliminar VA ===== */}
      <Dialog open={!!deleteVA} onOpenChange={() => setDeleteVA(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar VA?</DialogTitle>
            <DialogDescription>
              Estás a punto de eliminar a <strong>{deleteVA?.name}</strong> del equipo. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => setDeleteVA(null)}>
              <Trash2 className="w-4 h-4" /> Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestionVA;
