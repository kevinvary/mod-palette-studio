import { User, Key, Bell, Monitor, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const settingsSections = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "api", icon: Key, label: "API Keys" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "appearance", icon: Monitor, label: "Appearance" },
  { id: "security", icon: Shield, label: "Security" },
  { id: "integrations", icon: Globe, label: "Integrations" },
];

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
                  <label className="text-label mb-1.5 block">Default Model</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:border-primary focus:outline-none transition-colors">
                    <option>SDXL 1.0</option>
                    <option>SD 1.5</option>
                    <option>SD 3.0</option>
                  </select>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-foreground">API Keys</h2>
              <div className="space-y-3">
                {[
                  { name: "Production Key", key: "sk-prod-••••••••4f2a", created: "Jan 12, 2026" },
                  { name: "Development Key", key: "sk-dev-••••••••8b1c", created: "Mar 01, 2026" },
                ].map((apiKey) => (
                  <div key={apiKey.name} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{apiKey.name}</p>
                      <p className="font-mono text-xs text-muted-foreground mt-0.5">{apiKey.key}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{apiKey.created}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
