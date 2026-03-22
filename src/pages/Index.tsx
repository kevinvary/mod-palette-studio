import { useState } from "react";
import NavRail from "@/components/NavRail";
import AssetsPanel from "@/components/AssetsPanel";
import LorasPanel from "@/components/LorasPanel";
import FeaturesPanel from "@/components/FeaturesPanel";
import SettingsPanel from "@/components/SettingsPanel";
import ConfigPanel from "@/components/ConfigPanel";
import PodsPanel from "@/components/PodsPanel";

const PlaceholderPanel = ({ title }: { title: string }) => (
  <div className="flex-1 p-6 animate-fade-in">
    <h1 className="text-xl font-semibold text-foreground">{title}</h1>
    <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
  </div>
);

const WorkflowsPlaceholder = () => <PlaceholderPanel title="Workflows" />;
const EntrenarPlaceholder = () => <PlaceholderPanel title="Entrenar" />;
const DatasetPlaceholder = () => <PlaceholderPanel title="Dataset" />;

const panels: Record<string, React.FC> = {
  workflows: WorkflowsPlaceholder,
  features: FeaturesPanel,
  assets: AssetsPanel,
  loras: LorasPanel,
  entrenar: EntrenarPlaceholder,
  dataset: DatasetPlaceholder,
  pods: PodsPanel,
  settings: SettingsPanel,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("features");
  const ActivePanel = panels[activeSection] || WorkflowsPlaceholder;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <NavRail activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <ActivePanel />
        </div>
        {activeSection !== "settings" && activeSection !== "features" && <ConfigPanel />}
      </div>
    </div>
  );
};

export default Index;
