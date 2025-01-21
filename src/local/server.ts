import http from 'http';
import { CustomerHandler } from '../handlers/customer.handler';

const handler = new CustomerHandler();
const server = http.createServer(async (req, res) => {
  try {
    const chunks: Buffer[] = [];
    req.on('data', chunk => chunks.push(chunk));
    await new Promise(resolve => req.on('end', resolve));
    
    const body = Buffer.concat(chunks).toString();
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    const event = {
      httpMethod: req.method || 'GET',
      path: url.pathname,
      pathParameters: pathParts[1] ? { id: pathParts[1] } : null,
      body: body || null,
      headers: req.headers as { [key: string]: string },
      queryStringParameters: Object.fromEntries(url.searchParams)
    } as any;

    let result;
    
    switch(req.method) {
      case 'POST':
        if (pathParts[0] === 'customers' && !pathParts[1]) {
          result = await handler.create(event);
        }
        break;
      case 'GET':
        if (pathParts[0] === 'customers') {
          if (pathParts[1]) {
            result = await handler.get(event);
          } else {
            result = await handler.list();
          }
        }
        break;
      case 'PUT':
        if (pathParts[0] === 'customers' && pathParts[1]) {
          result = await handler.update(event);
        }
        break;
      case 'DELETE':
        if (pathParts[0] === 'customers' && pathParts[1]) {
          result = await handler.delete(event);
        }
        break;
      default:
        result = {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    if (!result) {
      result = {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not found' })
      };
    }

    res.writeHead(result.statusCode, {
      'Content-Type': 'application/json',
      ...result.headers
    });
    res.end(result.body);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
});

const PORT = process.env.PORT || 3000;
process.env.IS_OFFLINE = 'true';
process.env.AWS_REGION = "us-east-1";
process.env.AWS_ACCESS_KEY_ID ='AKIAI44QH8DHBEXAMPLE' ;
process.env.AWS_SECRET_ACCESS_KEY= 'je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY';


server.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});