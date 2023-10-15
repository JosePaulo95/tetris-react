import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  base: `${process.env.VITE_PUBLIC_PATH}/`,
  plugins: [tsconfigPaths(), react()],
  server: {
    open: true,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./vitest.setup.ts'],
  },
}));
