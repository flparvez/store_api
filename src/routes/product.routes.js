import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, getProductBySlug } from '../controller/product.js';

async function productRoutes(fastify, options) {
  fastify.get('/products', getAllProducts);
  fastify.get('/products/:id', getProductById);
  fastify.get('/products/slug/:slug', getProductBySlug); 
  fastify.post('/products', createProduct);
  fastify.put('/products/:id', updateProduct);
  fastify.delete('/products/:id', deleteProduct);
  fastify.get('/products/category/:categoryId', getProductsByCategory);
}

export default productRoutes;
