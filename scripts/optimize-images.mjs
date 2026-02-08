import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');
const heroDir = path.join(__dirname, '../public/hero');
const convertedDir = path.join(__dirname, '../public/iloveimg-converted');

async function processDirectory(directory, quality = 80, width = 1200) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);

    console.log(`Processing ${directory}...`);

    for (const file of files) {
        if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
            const inputPath = path.join(directory, file);
            const filename = path.parse(file).name;
            const outputPath = path.join(directory, `${filename}.webp`);

            try {
                // console.log(`Optimizing ${file}...`);
                await sharp(inputPath)
                    .resize(width, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .webp({ quality: quality })
                    .toFile(outputPath);

                process.stdout.write('.');
            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error);
            }
        }
    }
    console.log(`\nDone with ${directory}`);
}

async function optimizeImages() {
    console.log('Starting image optimization...');
    await processDirectory(imagesDir, 80, 1200);
    await processDirectory(convertedDir, 75, 1000);
    // Hero frames: Skipped to maintain max quality (JPG)
    // await processDirectory(heroDir, 70, 800);
    console.log('Optimization complete!');
}

optimizeImages();
