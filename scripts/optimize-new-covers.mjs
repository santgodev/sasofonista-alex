
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'public', 'iloveimg-converted');
const destDir = path.join(process.cwd(), 'public', 'images', 'covers');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Map source filenames to destination basenames (without extension)
const imagesToProcess = [
    { src: 'portada_boda.jpg', dest: 'boda' },
    { src: 'portada_evento_coorporativo.jpg', dest: 'corporativo' },
    { src: 'portada_duo.jpg', dest: 'duo' },
    { src: 'portada_clases.jpg', dest: 'cumple' }, // Using 'clases' cover for Cumpleaños/Grados
    { src: 'IMG_1770.jpg', dest: 'pedida' }, // Guessing for Pedidas
];

async function optimize() {
    console.log(`Processing images from ${sourceDir}...`);

    for (const img of imagesToProcess) {
        const inputPath = path.join(sourceDir, img.src);
        const outputPath = path.join(destDir, `${img.dest}.webp`);

        if (fs.existsSync(inputPath)) {
            try {
                await sharp(inputPath)
                    .resize(800, 1000, {
                        fit: 'cover',
                        position: sharp.strategy.attention // Focus on faces/interesting areas
                    })
                    .webp({ quality: 80, effort: 6 })
                    .toFile(outputPath);

                console.log(`✅ Generated: ${img.dest}.webp`);
            } catch (error) {
                console.error(`❌ Error converting ${img.src}:`, error);
            }
        } else {
            console.warn(`⚠️ Source missing: ${img.src}`);
        }
    }
}

optimize();
