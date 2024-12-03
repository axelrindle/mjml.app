import { TanStackRouterVite as router } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        router({
            semicolons: false,
            quoteStyle: 'single',
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react': [
                        'react',
                        'react-dom',
                    ],
                    'fontawesome': [
                        '@fortawesome/fontawesome-svg-core',
                        '@fortawesome/free-brands-svg-icons',
                        '@fortawesome/free-solid-svg-icons',
                        '@fortawesome/react-fontawesome',
                    ],
                    'shadcn-ui': [
                        '@hookform/resolvers',
                        '@radix-ui/react-alert-dialog',
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-icons',
                        '@radix-ui/react-label',
                        '@radix-ui/react-menubar',
                        '@radix-ui/react-popover',
                        '@radix-ui/react-scroll-area',
                        '@radix-ui/react-select',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-toast',
                        '@radix-ui/react-tooltip',
                        '@tanstack/react-query',
                        '@tanstack/react-router',
                        'class-variance-authority',
                        'clsx',
                        'react-hook-form',
                        'tailwind-merge',
                        'tailwindcss-animate',
                    ],
                    mjml: [
                        'mjml-browser',
                    ],
                },
            },
        },
    },
})
