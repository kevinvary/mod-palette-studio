import { useState } from "react";
import NavRail from "@/components/NavRail";
import AssetsPanel from "@/components/AssetsPanel";
import FeaturesPanel from "@/components/FeaturesPanel";
import SettingsPanel from "@/components/SettingsPanel";

import PodsPanel from "@/components/PodsPanel";
import WorkflowsPanel from "@/components/WorkflowsPanel";

const panels: Record<string, React.FC> = {
  workflows: WorkflowsPanel,
  features: FeaturesPanel,
  assets: AssetsPanel,
  pods: PodsPanel,
  settings: SettingsPanel,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("features");
  const ActivePanel = panels[activeSection] || WorkflowsPanel;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <NavRail activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <ActivePanel />
        </div>
        
      </div>
    </div>
  );
};

export default Index;
