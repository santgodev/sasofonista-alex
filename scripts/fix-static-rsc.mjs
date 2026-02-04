import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../out');

// Routes that have subdirectories in out/
const routes = ['clases', 'eventos', 'contacto', 'about'];

console.log('Fixing RSC static files...');

// Handle root (special case)
// Browser asks for /__next.__PAGE__.txt
// File is at out/__next/__PAGE__.txt
const rootSrc = path.join(outDir, '__next', '__PAGE__.txt');
const rootDest = path.join(outDir, '__next.__PAGE__.txt');

if (fs.existsSync(rootSrc)) {
    fs.copyFileSync(rootSrc, rootDest);
    console.log(`Copied root RSC file`);
}

// Handle sub-routes
for (const route of routes) {
    // Expected structure: out/route/__next.route/__PAGE__.txt
    // Target: out/route/__next.route.__PAGE__.txt

    // Note: The directory name inside might replace slashes or just be the leaf.
    // Let's verify standard nextjs output. Usually it matches the route segment.

    const srcDir = path.join(outDir, route, `__next.${route}`);
    const srcFile = path.join(srcDir, '__PAGE__.txt');
    const destFile = path.join(outDir, route, `__next.${route}.__PAGE__.txt`);

    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied RSC for ${route}`);
    } else {
        console.log(`Skipping ${route}, source not found at ${srcFile}`);
    }
}

console.log('Fix complete.');
