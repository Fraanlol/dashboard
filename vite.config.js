/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@layout': path.resolve(__dirname, 'src/layout'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@lib': path.resolve(__dirname, 'src/lib'),
        }
    },
    test: {
        environment: "jsdom",
        globals: true,
        include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
        setupFiles: ['./src/test/setup.ts'],
        typecheck: {
            tsconfig: './tsconfig.test.json'
        }
    },
});
