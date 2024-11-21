import {Product} from '../models/product.models.js';
import slugify from 'slugify';
// Get all products
export const getAllProducts = async (request, reply) => {
  try {
    const products = await Product.find().populate('category user');
    reply.send(products);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch products' });
  }
};

// // Get a single product by ID
export const getProductById = async (request, reply) => {
  try {
    const product = await Product.findById(request.params.id).populate('category user');
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
    const product = await Product.findOne({ slug: request.params.slug }).populate('category user');
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

export const getProductsByCategory=async(request, reply) => {
  // endpoints: api/products/category/673f16ba2cc9739cc4a031ec
  try {
    const products = await Product.find({ category: request.params.categoryId }).populate('category');
    if (!products.length) {
      reply.status(404).send({ message: 'No products found for this category' });
    } else {
      reply.send(products);
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}
