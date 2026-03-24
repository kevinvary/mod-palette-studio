import { User, Key, Bell, Eye, EyeOff, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const settingsSections = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "api", icon: Key, label: "API Keys" },
  { id: "notifications", icon: Bell, label: "Notifications" },
];

interface ApiKeySlot {
  id: string;
  name: string;
  description: string;
  value: string;
}

const defaultApiKeys: ApiKeySlot[] = [
  { id: "vastai", name: "Vast.ai", description: "GPU cloud para entrenamiento e inferencia", value: "" },
  { id: "runpod", name: "RunPod", description: "GPU cloud para pods y serverless", value: "" },
  { id: "elevenlabs", name: "ElevenLabs", description: "Generación de voz y audio con IA", value: "" },
];

const ApiKeysSection = () => {
  const [keys, setKeys] = useState<ApiKeySlot[]>(defaultApiKeys);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const toggleVisibility = (id: string) =>
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateKey = (id: string, value: string) =>
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, value } : k)));

  const copyKey = (value: string) => {
    if (value) navigator.clipboard.writeText(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">API Keys</h2>
        <p className="text-xs text-muted-foreground mt-1">Configura las claves de acceso para los servicios externos</p>
      </div>
      <div className="space-y-4">
        {keys.map((apiKey) => (
          <div key={apiKey.id} className="p-4 bg-background border border-border rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{apiKey.name}</p>
                <p className="text-[11px] text-muted-foreground">{apiKey.description}</p>
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded text-[10px] font-semibold",
                apiKey.value ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
              )}>
                {apiKey.value ? "Configurada" : "No configurada"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type={visibleKeys[apiKey.id] ? "text" : "password"}
                value={apiKey.value}
                onChange={(e) => updateKey(apiKey.id, e.target.value)}
                placeholder={`Introduce tu API key de ${apiKey.name}...`}
                className="flex-1 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-xs text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <button
                onClick={() => toggleVisibility(apiKey.id)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                {visibleKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => copyKey(apiKey.value)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        Guardar claves
      </button>
    </div>
  );
};

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        <div className="w-48 space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150",
                activeTab === section.id
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        <div className="flex-1 surface-card p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-foreground">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-label mb-1.5 block">Display Name</label>
                  <input type="text" defaultValue="CreativeStudio User" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-label mb-1.5 block">Email</label>
                  <input type="email" defaultValue="user@studio.ai" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-label mb-1.5 block">Timezone</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                  </select>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "api" && <ApiKeysSection />}

          {activeTab !== "profile" && activeTab !== "api" && (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              {settingsSections.find(s => s.id === activeTab)?.label} settings coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
