import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../../tour_viewer_backend/TourViewer/wwwroot',
        emptyOutDir: true
    },
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()]
        }
    }
});
