import { useState } from "react";
import NavRail from "@/components/NavRail";
import AssetsPanel from "@/components/AssetsPanel";
import LorasPanel from "@/components/LorasPanel";
import FeaturesPanel from "@/components/FeaturesPanel";
import SettingsPanel from "@/components/SettingsPanel";
import ConfigPanel from "@/components/ConfigPanel";

const panels: Record<string, React.FC> = {
  features: FeaturesPanel,
  assets: AssetsPanel,
  loras: LorasPanel,
  settings: SettingsPanel,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("features");
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
