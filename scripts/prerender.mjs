// Injects the server-rendered home page into dist/index.html so the content
// (experience, projects, certifications) is readable without JavaScript.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

// Use React's production server build (no dev-only warnings).
process.env.NODE_ENV ??= "production";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist/index.html");
const serverDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);
const template = await readFile(indexPath, "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`);

await writeFile(indexPath, template.replace(placeholder, `<div id="root">${render()}</div>`));
await rm(serverDir, { recursive: true, force: true });
console.log("prerender: wrote dist/index.html");
