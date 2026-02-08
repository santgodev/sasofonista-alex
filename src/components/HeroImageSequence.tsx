"use client";

import { useEffect, useRef, useState } from "react";

export function HeroImageSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const frameCount = 191; // 0 to 191
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const requestRef = useRef<number | null>(null);
    const frameIndexRef = useRef(0);
    const lastFrameTimeRef = useRef(0);
    const fps = 24;
    const interval = 1000 / fps;

    useEffect(() => {
        let loadedCount = 0;
        // Optimization: Reduce frame count by skipping frames (load every 3rd frame)
        // Original: 191 frames (~10MB) -> New: ~64 frames (~3.3MB)
        const SKIP_FACTOR = 3;
        const totalFramesToLoad = Math.floor(frameCount / SKIP_FACTOR) + 1;
        const images: HTMLImageElement[] = [];

        const preloadImages = async () => {
            const BATCH_SIZE = 5;
            const indices = [];
            for (let i = 0; i <= frameCount; i += SKIP_FACTOR) {
                indices.push(i);
            }

            for (let i = 0; i < indices.length; i += BATCH_SIZE) {
                const batch = indices.slice(i, i + BATCH_SIZE);
                await Promise.all(batch.map(index => {
                    return new Promise<void>((resolve) => {
                        const img = new Image();
                        const frameNumber = index.toString().padStart(3, "0");
                        img.src = `/hero/frame_${frameNumber}.jpg`;
                        img.onload = () => {
                            imagesRef.current[index] = img;
                            loadedCount++;
                            const currentProgress = Math.round((loadedCount / totalFramesToLoad) * 100);
                            setProgress(currentProgress);
                            resolve();
                        };
                    });
                }));

                if (loadedCount === totalFramesToLoad) {
                    setIsLoading(false);
                    startAnimation();
                }
                // Small gap to prevent thread locking
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        };

        const startAnimation = () => {
            if (!canvasRef.current) return;
            drawFrame(0);
            requestRef.current = requestAnimationFrame(animate);
        };

        const animate = (timestamp: number) => {
            if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
            const elapsed = timestamp - lastFrameTimeRef.current;

            // Original: 24fps. Since we have 1/3 frames, we can play at 8fps to match duration,
            // or 12fps for a slightly speedier cinematic look. Let's stick to 12fps for smoothness.
            const playbackFps = 12;
            const playbackInterval = 1000 / playbackFps;

            if (elapsed > playbackInterval) {
                // Find next available frame
                let nextIdx = (frameIndexRef.current + SKIP_FACTOR);
                if (nextIdx > frameCount) nextIdx = 0;

                frameIndexRef.current = nextIdx;
                drawFrame(frameIndexRef.current);
                lastFrameTimeRef.current = timestamp - (elapsed % playbackInterval);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        const drawFrame = (index: number) => {
            const canvas = canvasRef.current;
            const img = imagesRef.current[index];
            if (!canvas || !img) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Simulate object-fit: cover, object-position: center top
            const w = canvas.width;
            const h = canvas.height;
            const imgW = img.width;
            const imgH = img.height;

            const scale = Math.max(w / imgW, h / imgH);

            // X: Shifted strongly to 0.2 (Left-weighted) to pull left-side subject to center
            const x = (w - imgW * scale) * 0.2;

            // Y: Top (0.0) -> heavily weighted to top to avoid cutting heads
            // But if we have black bars (unlikely with cover), we center.
            // With 'cover', one dimension matches, the other overflows (is negative offset).
            // If Y overflows (image taller than screen), we want 0 (top). 
            // If matching (image width fits, height exact), it's 0.
            // If scale based on width, imgH*scale > h. y should be 0 (top) to show head.
            let y = (h - imgH * scale) / 2;
            if (imgH * scale > h) {
                y = 0;
            }

            ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
        };

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame immediately after resize to avoid blank flash
                if (imagesRef.current.length > 0) {
                    drawFrame(frameIndexRef.current);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size
        preloadImages();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="absolute inset-0 bg-black">
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full block transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"
                    }`}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-20">
                    <div className="text-center">
                        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-zinc-300 text-sm font-serif">Cargando experiencia...</p>
                    </div>
                </div>
            )}
            <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
    );
}
