import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

function generateVersion() {
  return {
    name: 'generate-version',
    buildStart() {
      const version = new Date().getTime().toString();
      const versionData = JSON.stringify({ version });
      fs.writeFileSync('./public/version.json', versionData);
    }
}

function setupGithubPages() {
  return {
    name: 'setup-github-pages',
    closeBundle() {
      if (fs.existsSync('./dist/index.html')) {
        fs.copyFileSync('./dist/index.html', './dist/404.html');
      }
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), generateVersion(), setupGithubPages()],
    base: '/IsItUp/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
