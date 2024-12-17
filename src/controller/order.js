import {Order} from '../models/order.models.js';

// Get all orders
export const getAllOrders = async (request, reply) => {
  try {
    const orders = await Order.find().populate('user products.product');
    reply.send(orders);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch orders' });
  }
};

// Get a single order by ID
export const getOrderById = async (request, reply) => {
  try {
    const order = await Order.findById(request.params.id).populate('user products.product');
    if (!order) {
      return reply.status(404).send({ error: 'Order not found' });
    }
    reply.send(order);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch order' });
  }
};



// Create a new order
export const createOrder = async (request, reply) => {
  try {
    const { name, email, phone, address, city, user, items, total, transaction,paymentType } = request.body;

    const order = new Order({
      name,
      email,
      phone,
      address,
      city,
      user,
      products: items,
      total,
      paymentType,
      transaction, // Add transaction if you need to save it
    });

    const savedOrder = await order.save();
    reply.code(201).send(savedOrder); // Fastify uses reply.code instead of reply.status
  } catch (error) {
    console.error('Error creating order:', error);
    reply.code(500).send({ error: 'Failed to create order', details: error.message });
  }
};


// Update an existing order
export const updateOrder = async (request, reply) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!updatedOrder) {
      return reply.status(404).send({ error: 'Order not found' });
    }
    reply.send(updatedOrder);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to update order' });
  }
};

// Delete an order
export const deleteOrder = async (request, reply) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(request.params.id);
    if (!deletedOrder) {
      return reply.status(404).send({ error: 'Order not found' });
    }
    reply.send({ message: 'Order deleted successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to delete order' });
  }
};
