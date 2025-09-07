import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        musicMf: 'https://music-mf.netlify.app/assets/remoteEntry.js', 
      },
       shared: ['react', 'react-dom', '@mui/material', '@mui/icons-material'],
    })
  ],
  build: {
    target: 'esnext',
  },
   server: {
    port: 5173,   
  },
  preview: {
    port: 5173,   
  }
})
