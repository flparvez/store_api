import "dotenv/config";
import Fastify from 'fastify';
import {connectDB} from './config/connect.js';
import cors from "@fastify/cors";
import todosRoutes from "./routes/todo.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productsRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

const port = process.env.PORT || 4000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = Fastify({ logger: true });
// start my server

fastify.register(todosRoutes,{prefix:"/api"});
fastify.register(categoryRoutes,{prefix:"/api"});
fastify.register(productsRoutes,{prefix:"/api"});
fastify.register(orderRoutes,{prefix:"/api"});
// List of allowed origins
const allowedOrigins = ['http://localhost:3000' , 'https://uniquestorebd.vercel.app/'];

fastify.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Request from allowed origin will pass
      cb(null, true);
    } else {
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
  credentials: true, // Allow cookies to be sent
});
const start  = async () => {
    
    await connectDB(process.env.MONGO_URI);
 
    fastify.get('/', function (request, reply) {
        reply.type('text/html').send(html)
      })
      
    await fastify.listen({
        port: port || 4000, host: host
        
    },(err,addr)=>{
        if (err) {
            console.log(err)
        }
    });
    fastify.log.info(`server listening on ${fastify.server.address()}`);
}    
start();



const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
      section a {
        text-decoration:none;
        color: #1C151A;
      }
      section a:hover {
        text-decoration:none;
        color: #605A5C;
      }
    </style>
  </head>
  <body>
    <section>
      <a href="/">Hello from Render using Fastify!</a>
    </section>
  </body>
</html>
`