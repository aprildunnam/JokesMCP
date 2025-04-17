import express, { Request, Response } from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

const server = new McpServer({
  name: 'jokesSSE',
  version: '1.0.0',
});

// Get Chuck Norris joke tool
server.tool('get-chuck-joke', {}, async () => {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  const data = await response.json();
  return {
    content: [
      {
        type: 'text',
        text: data.value,
      },
    ],
  };
});

// Get Chuck Norris joke categories tool
server.tool('get-chuck-categories', {}, async () => {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  const data = await response.json();
  return {
    content: [
      {
        type: 'text',
        text: data.join(', '),
      },
    ],
  };
});

// Get Dad joke tool
server.tool('get-dad-joke', {}, async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return {
    content: [
      {
        type: 'text',
        text: data.joke,
      },
    ],
  };
});

const app = express();

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports: { [sessionId: string]: SSEServerTransport } = {};

app.get('/sse', async (req: Request, res: Response) => {
  // Get the full URI from the request
  const protocol = req.protocol;
  const host = req.get('host');
  const fullUri = `${protocol}://${host}/mcpfy/v1/chucknorris`;

  const transport = new SSEServerTransport(fullUri, res);
  transports[transport.sessionId] = transport;
  res.on('close', () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post('/mcpfy/v1/chucknorris', async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});
app.get('/', (_req, res) => {
  res.send('Chuck Norris MCP is running!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
