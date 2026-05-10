import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Changing this to './' makes paths relative, which works 
  // perfectly with HashRouter on GitHub Pages.
  base: "./", 
  build: {
    // This ensures that every time you build, the old "messy" 
    // files are deleted first.
    emptyOutDir: true,
  },
});
