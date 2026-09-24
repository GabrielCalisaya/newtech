import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4173);
const demoRoutes = new Set([
  "/experiencias",
  "/experiencias/ruleta",
  "/experiencias/trivia",
  "/experiencias/3d",
]);
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url || "/", "http://localhost").pathname,
    );
    let target = demoRoutes.has(pathname)
      ? "/experiencias/index.html"
      : pathname;
    if (target.endsWith("/")) target += "index.html";
    const file = resolve(root, "." + target);
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Invalid path");
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    const type = mime[extname(file)] || "application/octet-stream";
    const contentType = /^(text\/|application\/xml)/.test(type)
      ? `${type}; charset=utf-8`
      : type;
    response.writeHead(200, {
      "content-type": contentType,
      "content-length": info.size,
    });
    if (request.method === "HEAD") response.end();
    else response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("No encontrado");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Local preview: http://127.0.0.1:${port}/experiencias/`),
);
