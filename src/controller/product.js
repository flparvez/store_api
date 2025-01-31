import {Product} from '../models/product.models.js';

import slugify from 'slugify';
// Get all products
export const getAllProducts = async (request, reply) => {
  try {
    // Fetch products sorted by `lastUpdatedIndex` (descending order)
    const latestProducts = await Product.find()
      .populate('category') // Populate the 'category' field
      .populate('images')   // Populate the 'images' field
      .sort({ lastUpdatedIndex: -1 }) // Sort by the manually updated field
  

    reply.send(latestProducts); // Send the sorted products as the response
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch latest products' });
  }
};

// // Get a single product by IDz
export const getProductById = async (request, reply) => {
  try {
    const product = await Product.findById(request.params.id).populate('category');
    if (!product) {
      return reply.status(404).send({ error: 'Product not found' });
    }
    reply.send(product);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch product' });
  }
};
// Get a single product by slug
export const getProductBySlug = async (request, reply) => {
  try {
    const product = await Product.findOne({ slug: request.params.slug }).populate('category');
    if (!product) {
      return reply.status(404).send({ error: 'Product not found' });
    }
    reply.send(product);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch product' });
  }
};

// Create a new product
// Create a new product with duplicate check
export const createProduct = async (request, reply) => {
  try {
    const { name } = request.body;
    const slug = slugify(name, { lower: true, strict: true });

    // Check for duplicate product name or slug
    const existingProduct = await Product.findOne({ $or: [{ name }, { slug }] });
    if (existingProduct) {
      return reply.status(400).send({ error: 'Product with the same name or slug already exists' });
    }

    const product = new Product(request.body);
    product.slug = slug; // Ensure the slug is set correctly

    const savedProduct = await product.save();
    reply.status(201).send(savedProduct);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to create product' });
  }
};

// Update an existing product
export const updateProduct = async (request, reply) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!updatedProduct) {
      return reply.status(404).send({ error: 'Product not found' });
    }
    reply.send(updatedProduct);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to update product' });
  }
};

// Delete a product
export const deleteProduct = async (request, reply) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(request.params.id);
    if (!deletedProduct) {
      return reply.status(404).send({ error: 'Product not found' });
    }
    reply.send({ message: 'Product deleted successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to delete product' });
  }
};

// Search products
export const searchProducts = async (request, reply) => {
  try {
    const { query } = request.query;

    // Perform a search using a case-insensitive regex
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).populate('category user');

    reply.send(products);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to search products' });
  }
};

