import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    base: `${process.env.VITE_PUBLIC_PATH}/`,
    build: {
      sourcemap: mode === 'development',
    },
    plugins: [tsconfigPaths(), react()],
    server: {
      open: true,
      port: Number(process.env.VITE_PORT),
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      passWithNoTests: true,
      setupFiles: ['./vitest.setup.ts'],
    },
  };
});
