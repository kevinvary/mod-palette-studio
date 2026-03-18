import { Workflow, Image, Settings, Layers, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavRailProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "workflows", icon: Workflow, label: "Workflows" },
  { id: "assets", icon: Image, label: "Assets" },
  { id: "loras", icon: Sparkles, label: "LoRAs" },
  { id: "pods", icon: Zap, label: "Pods" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const NavRail = ({ activeSection, onSectionChange }: NavRailProps) => {
  return (
    <div className="flex flex-col items-center w-16 bg-sidebar border-r border-border py-4 gap-1">
      <div className="mb-6 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
        <Layers className="w-5 h-5 text-primary" />
      </div>

      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={cn(
            "flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all duration-150 group",
            activeSection === item.id
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NavRail;
