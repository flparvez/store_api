import {Category} from '../models/category.models.js';

async function getAllCategories(request, reply) {
  try {
    const categories = await Category.find();
    reply.send(categories);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function getCategoryById(request, reply) {
  try {
    const category = await Category.findById(request.params.id);
    if (!category) {
      reply.status(404).send({ message: 'Category not found' });
    } else {
      reply.send(category);
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function createCategory(request, reply) {
  try {
    const category = new Category(request.body);
    const result = await category.save();
    reply.status(201).send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateCategory(request, reply) {
  try {
    const category = await Category.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!category) {
      reply.status(404).send({ message: 'Category not found' });
    } else {
      reply.status(200).send(category);
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function deleteCategory(request, reply) {
  try {
    const category = await Category.findByIdAndDelete(request.params.id);
    if (!category) {
      reply.status(404).send({ message: 'Category not found' });
    } else {
      reply.status(200).send({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
