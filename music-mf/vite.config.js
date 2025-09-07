import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

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
      dev: true,
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 5174, 
  },
});
