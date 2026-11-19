import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/main.js', ['main.js', 'text/javascript; charset=utf-8']],
  ['/distort.js', ['distort.js', 'text/javascript; charset=utf-8']],
  ['/colors.js', ['colors.js', 'text/javascript; charset=utf-8']],
  ['/assets/style.css', ['assets/style.css', 'text/css; charset=utf-8']],
  ['/assets/fonts/Retro-Gaming.ttf', ['assets/fonts/Retro-Gaming.ttf', 'font/ttf']],
  ['/assets/fonts/Retro-Gaming-Plus.ttf', ['assets/fonts/Retro-Gaming-Plus.ttf', 'font/ttf']],
  ['/assets/fonts/NeoDunggeunmoPro-Regular.woff2', ['assets/fonts/NeoDunggeunmoPro-Regular.woff2', 'font/woff2']],
  ['/assets/fonts/unifont-17.0.04.woff2', ['assets/fonts/unifont-17.0.04.woff2', 'font/woff2']],
  ['/assets/fonts/licenses/Retro-Gaming-Plus.txt', ['assets/fonts/licenses/Retro-Gaming-Plus.txt', 'text/plain; charset=utf-8']],
  ['/assets/fonts/licenses/NeoDunggeunmoPro.txt', ['assets/fonts/licenses/NeoDunggeunmoPro.txt', 'text/plain; charset=utf-8']],
  ['/assets/fonts/licenses/unifont.txt', ['assets/fonts/licenses/unifont.txt', 'text/plain; charset=utf-8']],
]);

const port = Number(process.argv[2] ?? 8080);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Port must be an integer between 1 and 65535.');
  process.exit(1);
}

const server = createServer(async (request, response) => {
  let path;

  try {
    path = new URL(request.url ?? '/', 'http://localhost').pathname;
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  const file = files.get(path);

  if (!file) {
    response.writeHead(404).end('Not found');
    return;
  }

  try {
    const body = await readFile(new URL(`../dist/${file[0]}`, import.meta.url));
    response.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store' });
    response.end(body);
  } catch (error) {
    if (error.code === 'ENOENT') {
      response.writeHead(404).end('Run npm run build first.');
    } else {
      console.error(error);
      response.writeHead(500).end('Unable to read file.');
    }
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} is already in use. Try: npm run preview -- ${port < 65535 ? port + 1 : 8080}`
    );
  } else {
    console.error(error.message);
  }

  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}`);
});
