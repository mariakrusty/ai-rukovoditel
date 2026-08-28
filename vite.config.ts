import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base — имя репозитория на GitHub Pages
export default defineConfig({ plugins: [react()], base: '/ai-rukovoditel/' })
