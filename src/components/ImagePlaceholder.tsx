
import { twMerge } from "tailwind-merge";
import { Music, Image as ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
    className?: string;
    text?: string;
    type?: "image" | "video";
}

export function ImagePlaceholder({ className, text, type = "image" }: ImagePlaceholderProps) {
    return (
        <div className={twMerge("bg-white/5 border border-white/10 flex flex-col items-center justify-center p-4 text-center rounded-lg animate-pulse", className)}>
            {type === "image" ? <ImageIcon className="w-12 h-12 text-zinc-500 mb-2" /> : <Music className="w-12 h-12 text-zinc-500 mb-2" />}
            <span className="text-sm font-medium text-zinc-400 block group-hover:text-white transition-colors">
                {text || `Placeholder ${type}`}
            </span>
            <p className="text-xs text-zinc-600 mt-1 uppercase tracking-wider">
                {type === 'video' ? 'Video Comp' : 'Image Asset'}
            </p>
        </div>
    );
}
