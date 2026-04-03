import { useState } from "react";
import {
  Settings,
  Smile,
  PenLine,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  ImageIcon,
  Shuffle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockImages = Array.from({ length: 14 }, (_, i) => ({ id: i + 1 }));

const ImageGeneratorView = () => {
  const [prompt, setPrompt] = useState("");
  const [imageCount, setImageCount] = useState(4);
  const maxCount = 4;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background relative">
      {/* Gallery Grid - 2 rows, tightly packed */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-7 gap-1">
          {mockImages.map((img) => (
            <div
              key={img.id}
              className="aspect-[3/4] bg-secondary rounded-md overflow-hidden relative group cursor-pointer hover:brightness-110 transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/15" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Prompt Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl">
        <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-lg shadow-background/50">
          {/* Top row: avatars + prompt */}
          <div className="flex items-center gap-3 mb-2.5">
            {/* Reference image avatars */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-secondary border-2 border-card overflow-hidden flex items-center justify-center"
                  >
                    <ImageIcon className="w-3 h-3 text-muted-foreground/40" />
                  </div>
                ))}
              </div>
              <button className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ml-1">
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Prompt input */}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the scene you imagine"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
            />
          </div>

          {/* Bottom row: controls + generate */}
          <div className="flex items-center gap-1.5">
            {/* Model Selector */}
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-secondary text-[11px] font-medium text-foreground hover:bg-surface-hover transition-colors">
              <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[8px] font-bold text-accent-foreground">
                G
              </span>
              Nano Banana Pro
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
            </button>

            {/* Aspect Ratio */}
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-secondary text-[11px] font-medium text-foreground hover:bg-surface-hover transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground">
                <rect x="3.5" y="1" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              9:16
            </button>

            {/* Quality */}
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-secondary text-[11px] font-medium text-foreground hover:bg-surface-hover transition-colors">
              <Heart className="w-3 h-3 text-destructive fill-destructive" />
              4K
            </button>

            {/* Count Selector */}
            <div className="flex items-center gap-0 bg-secondary rounded-full px-1 py-0.5">
              <button
                onClick={() => setImageCount(Math.max(1, imageCount - 1))}
                className="w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-medium text-foreground min-w-[24px] text-center">
                {imageCount}/{maxCount}
              </span>
              <button
                onClick={() => setImageCount(Math.min(maxCount, imageCount + 1))}
                className="w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Face */}
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Smile className="w-3.5 h-3.5" />
            </button>

            {/* Settings */}
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-3.5 h-3.5" />
            </button>

            {/* Draw */}
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-secondary text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              <PenLine className="w-3 h-3" />
              Draw
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Generate Button - lime green like the reference */}
            <button className="px-6 py-2 bg-[hsl(75,80%,55%)] text-[hsl(75,80%,10%)] rounded-xl text-sm font-bold hover:bg-[hsl(75,80%,50%)] transition-colors">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratorView;
