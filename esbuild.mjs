import { build } from "esbuild";
import { rmSync } from "fs";
import { loadEnv } from 'vite';
// Remove the previous build directory
rmSync("dist", { recursive: true, force: true });
const env = loadEnv(process.cwd(), '')
process.env = { ...process.env, ...env }

// Run esbuild with the specified options
build({
  entryPoints: ["server/app.js"],
  bundle: true,
  sourcemap: true,
  format: "cjs",
  platform: "node",
  target: "node20",
  external: [],
  outfile: "dist/app.js",
  tsconfig: "./tsconfig.json",
  define: {
    'process.env.VITE_MONGODB_URI': JSON.stringify(process.env.VITE_MONGODB_URI),
    'process.env.VITE_MONGODB_USERNAME': JSON.stringify(process.env.VITE_MONGODB_USERNAME),
    'process.env.VITE_MONGODB_PASSWORD': JSON.stringify(process.env.VITE_MONGODB_PASSWORD),
    'process.env.VITE_JWT_SECRET': JSON.stringify(process.env.VITE_JWT_SECRET)
  }
}).catch(() => process.exit(1));