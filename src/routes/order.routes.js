import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controller/order.js';

async function orderRoutes(fastify, options) {
  fastify.get('/orders', getAllOrders);
  fastify.get('/orders/:id', getOrderById);
  fastify.post('/orders', createOrder);
  fastify.put('/orders/:id', updateOrder);
  fastify.delete('/orders/:id', deleteOrder);
}

export default orderRoutes;
