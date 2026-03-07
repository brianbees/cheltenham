import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve }      from 'path'

/**
 * saveResultsPlugin
 * Dev-only Vite middleware. Listens for POST /api/save-results and writes
 * the JSON body to results/latest-run.json in the project root.
 * This lets Copilot read the file and inspect optimiser output.
 */
function saveResultsPlugin() {
  return {
    name: 'save-results',
    configureServer(server) {
      server.middlewares.use('/api/save-results', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data    = JSON.parse(body);
            const outPath = resolve(__dirname, 'results', 'latest-run.json');
            // Ensure results/ folder exists
            const { mkdirSync } = require('fs');
            mkdirSync(resolve(__dirname, 'results'), { recursive: true });
            writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, path: 'results/latest-run.json' }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: err.message }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), saveResultsPlugin()],
})
