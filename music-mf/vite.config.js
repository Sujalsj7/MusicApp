import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { fileURLToPath } from "url";
import { dirname } from "path";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  
  plugins: [
    react(),

    federation({
      name: "musicMf",
      filename: "remoteEntry.js", 
      exposes: {
        "./MusicLibrary": "./src/MusicLibrary.jsx",
      },
      shared: ["react", "react-dom", "@mui/material", "@mui/icons-material"],
      
    }),
    
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 5174, 
  },
});
