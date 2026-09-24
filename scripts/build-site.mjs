import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, sep } from "node:path";
import { build } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
if (!output.startsWith(root + sep))
  throw new Error("Build output must remain inside the project");

await rm(output, { recursive: true, force: true });
await build({ configFile: join(root, "vite.config.ts") });

const files = [
  "index.html",
  "privacidad.html",
  "robots.txt",
  "sitemap.xml",
  "_redirects",
];
const directories = ["css", "js", "img", "fonts", "en"];
await mkdir(output, { recursive: true });
for (const file of files) await cp(join(root, file), join(output, file));
for (const directory of directories)
  await cp(join(root, directory), join(output, directory), { recursive: true });
console.log("Corporate pages and /experiencias assembled in dist/");
