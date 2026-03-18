import { Download, Trash2, Eye, Upload } from "lucide-react";

const assets = [
  { id: 1, name: "portrait_001.png", type: "image", size: "4.2 MB", resolution: "1024×1024", date: "2h ago" },
  { id: 2, name: "landscape_ref.jpg", type: "image", size: "2.8 MB", resolution: "1920×1080", date: "5h ago" },
  { id: 3, name: "character_v3.png", type: "image", size: "5.1 MB", resolution: "2048×2048", date: "1d ago" },
  { id: 4, name: "texture_wood.png", type: "image", size: "1.4 MB", resolution: "512×512", date: "1d ago" },
  { id: 5, name: "concept_art_02.png", type: "image", size: "3.7 MB", resolution: "1536×1024", date: "2d ago" },
  { id: 6, name: "logo_draft.png", type: "image", size: "0.8 MB", resolution: "512×512", date: "3d ago" },
];

const colors = [
  "from-primary/20 to-primary/5",
  "from-accent/20 to-accent/5",
  "from-destructive/20 to-destructive/5",
  "from-primary/30 to-accent/10",
  "from-accent/30 to-primary/10",
  "from-muted-foreground/20 to-muted/10",
];

const AssetsPanel = () => {
  return (
    <div className="flex-1 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Assets</h1>
          <p className="text-sm text-muted-foreground mt-1">{assets.length} files · 18.0 MB total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset, i) => (
          <div key={asset.id} className="surface-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors duration-150">
            <div className={`aspect-square bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center relative`}>
              <span className="font-mono text-xs text-muted-foreground">{asset.resolution}</span>
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-2">
                <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"><Eye className="w-4 h-4 text-foreground" /></button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"><Download className="w-4 h-4 text-foreground" /></button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-destructive/20 transition-colors"><Trash2 className="w-4 h-4 text-foreground" /></button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground truncate">{asset.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-muted-foreground">{asset.size}</span>
                <span className="text-[11px] text-muted-foreground">{asset.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsPanel;
