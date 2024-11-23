import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductBySlug } from '../controller/product.js';

async function productRoutes(fastify, options) {
  fastify.get('/products', getAllProducts);
  fastify.get('/products/:id', getProductById);
  fastify.get('/products/slug/:slug', getProductBySlug); 
  fastify.post('/products', createProduct);
  fastify.put('/products/:id', updateProduct);
  fastify.delete('/products/:id', deleteProduct);

}

export default productRoutes;
