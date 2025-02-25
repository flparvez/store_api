import 'dotenv/config';
import Fastify from 'fastify';
import { connectDB } from './config/connect.js';
import cors from '@fastify/cors';

import categoryRoutes from './routes/category.routes.js';
import productsRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const port = process.env.PORT || 5000;
const host = ("VERCEL" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = Fastify({ logger: true });

// List of allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://uniquestorebd.vercel.app',
  'https://uniquestorebd.shop',
  'https://www.uniquestorebd.shop'
];

fastify.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true); // Allow request
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies and authentication headers
});

// Register routes
fastify.register(categoryRoutes, { prefix: '/api' });
fastify.register(productsRoutes, { prefix: '/api' });
fastify.register(orderRoutes, { prefix: '/api' });

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  fastify.get('/', (request, reply) => {
    reply.type('text/html').send(html);
  });

  try {
    await fastify.listen({ port, host });
    fastify.log.info(`Server listening on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
