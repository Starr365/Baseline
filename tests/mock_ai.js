const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/analyze') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        final_score: 85.5,
        breakdown: { voice: 90, motor: 80, cognitive: 85, facial: 88 },
        risk_level: "Optimal"
      }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8000, () => {
  console.log('🚀 Mock AI Service running on port 8000');
});
