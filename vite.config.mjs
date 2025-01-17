import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
})
=======
  build: {
    rollupOptions: {
      external: ['axios'], // Add axios here
    },
  },
})

>>>>>>> 026f6a24fb5288054bc3d3fdf8d46e487398fcf1
