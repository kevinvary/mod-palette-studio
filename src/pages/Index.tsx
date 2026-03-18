import { useState } from "react";
import NavRail from "@/components/NavRail";
import WorkflowsPanel from "@/components/WorkflowsPanel";
import AssetsPanel from "@/components/AssetsPanel";
import LorasPanel from "@/components/LorasPanel";

import SettingsPanel from "@/components/SettingsPanel";
import ConfigPanel from "@/components/ConfigPanel";

const panels: Record<string, React.FC> = {
  workflows: WorkflowsPanel,
  assets: AssetsPanel,
  loras: LorasPanel,
  settings: SettingsPanel,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("workflows");
  const ActivePanel = panels[activeSection];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <NavRail activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <ActivePanel />
        </div>
        {activeSection !== "settings" && <ConfigPanel />}
      </div>
    </div>
  );
};

export default Index;
