import cluster from 'cluster';
import os from 'os';
import express from 'express';
import { createServer } from 'http';
import { renderToString } from 'react-dom/server';
import App from '../components/App';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  const server = createServer(app);

  app.use(express.static('build/client'));

  app.get('*', (req, res) => {
    const appString = renderToString(<App />);
    const html = `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          SSR-GW APP Gateway
        </title>
        <!-- Enlace al archivo CSS principal -->
        <link href="/main.css" rel="stylesheet" />
      </head>
      <body>
        <!-- Contenedor principal donde se renderizará la aplicación -->
        <div id="root">${appString}</div>
        <!-- Script para cargar el bundle del cliente -->
      </body>
    </html>
    `;
    res.send(html);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
