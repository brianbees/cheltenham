import { defineConfig }          from 'vite'
import react                     from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname }      from 'path'
import { fileURLToPath }         from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

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
            const resultsDir = resolve(__dirname, 'results');
            mkdirSync(resultsDir, { recursive: true });

            const json = JSON.stringify(data, null, 2);

            // Always overwrite the quick-read file
            writeFileSync(resolve(resultsDir, 'latest-run.json'), json, 'utf-8');

            // Also write a timestamped archive file
            // e.g. 2026-03-07_Triumph-Hurdle_115404.json
            const ts       = new Date(data.timestamp || Date.now());
            const dateStr  = ts.toISOString().slice(0, 10);                        // 2026-03-07
            const timeStr  = ts.toISOString().slice(11, 19).replace(/:/g, '');     // 115404
            const raceSafe = (data.race || 'unknown').replace(/\s+/g, '-');        // Triumph-Hurdle
            const archName = `${dateStr}_${raceSafe}_${timeStr}.json`;
            writeFileSync(resolve(resultsDir, archName), json, 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, latest: 'results/latest-run.json', archive: `results/${archName}` }));
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
