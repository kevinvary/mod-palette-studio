import { useState } from "react";
import {
  Settings,
  Smile,
  PenLine,
  ChevronDown,
  Minus,
  Plus,
  Heart,
  RectangleHorizontal,
  ImageIcon,
  Shuffle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockImages = [
  { id: 1, aspect: "portrait" },
  { id: 2, aspect: "portrait" },
  { id: 3, aspect: "portrait" },
  { id: 4, aspect: "portrait" },
  { id: 5, aspect: "portrait" },
  { id: 6, aspect: "portrait" },
  { id: 7, aspect: "portrait" },
  { id: 8, aspect: "portrait" },
  { id: 9, aspect: "portrait" },
  { id: 10, aspect: "portrait" },
  { id: 11, aspect: "portrait" },
  { id: 12, aspect: "portrait" },
  { id: 13, aspect: "portrait" },
  { id: 14, aspect: "portrait" },
];

const ImageGeneratorView = () => {
  const [prompt, setPrompt] = useState("");
  const [imageCount, setImageCount] = useState(4);
  const maxCount = 4;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
          {mockImages.map((img) => (
            <div
              key={img.id}
              className="aspect-[3/4] bg-secondary rounded-lg overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-accent/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Prompt Bar */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Reference Images */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary border-2 border-card overflow-hidden flex items-center justify-center"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-muted-foreground/40" />
                </div>
              ))}
            </div>
            <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Prompt Input */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the scene you imagine"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Model Selector */}
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary text-xs font-medium text-foreground hover:bg-surface-hover transition-colors">
              <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[9px] font-bold text-accent-foreground">
                G
              </span>
              <span className="hidden sm:inline">Nano Banana Pro</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {/* Aspect Ratio */}
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-secondary text-xs font-medium text-foreground hover:bg-surface-hover transition-colors">
              <RectangleHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              <span>9:16</span>
            </button>

            {/* Quality */}
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-secondary text-xs font-medium text-foreground hover:bg-surface-hover transition-colors">
              <Heart className="w-3.5 h-3.5 text-destructive" />
              <span>4K</span>
            </button>

            {/* Count Selector */}
            <div className="flex items-center gap-0.5 bg-secondary rounded-lg px-1 py-0.5">
              <button
                onClick={() => setImageCount(Math.max(1, imageCount - 1))}
                className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-medium text-foreground min-w-[28px] text-center">
                {imageCount}/{maxCount}
              </span>
              <button
                onClick={() => setImageCount(Math.min(maxCount, imageCount + 1))}
                className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Face / Emoji */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Smile className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
            </button>

            {/* Draw Toggle */}
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <PenLine className="w-3.5 h-3.5" />
              <span>Draw</span>
            </button>

            {/* Generate Button */}
            <button className="px-5 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-bold hover:bg-accent/90 transition-colors">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratorView;
