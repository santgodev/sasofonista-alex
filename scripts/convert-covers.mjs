
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'public', 'Alec');
const destDir = path.join(process.cwd(), 'public', 'images', 'covers');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
    { src: 'portada_boda.HEIC', dest: 'boda.webp' },
    { src: 'portada_evento_coorporativo.HEIC', dest: 'corporativo.webp' },
    { src: 'portada_duo.HEIC', dest: 'duo.webp' },
    { src: 'portada_clases.HEIC', dest: 'cumple.webp' }, // Mapping classes to cumple/grados for now
    { src: 'IMG_1770.HEIC', dest: 'pedida.webp' }, // Wild guess
    // taking a few others just in case
    { src: 'clases_saxo.HEIC', dest: 'clases.webp' },
    { src: 'bodas.HEIC', dest: 'boda_alt.webp' },
];

async function convert() {
    console.log('Starting conversion...');

    for (const file of fs.readdirSync(sourceDir)) {
        // Log all files to verify names
        console.log('Found:', file);
    }

    for (const map of mappings) {
        const srcPath = path.join(sourceDir, map.src);
        const destPath = path.join(destDir, map.dest);

        if (fs.existsSync(srcPath)) {
            try {
                await sharp(srcPath)
                    .resize(800, 1000, { fit: 'cover' }) // Portrait aspect ratio standard
                    .webp({ quality: 80 })
                    .toFile(destPath);
                console.log(`Converted ${map.src} -> ${map.dest}`);
            } catch (err) {
                console.error(`Error converting ${map.src}:`, err.message);
            }
        } else {
            console.warn(`Source file not found: ${map.src}`);
        }
    }
}

convert();
