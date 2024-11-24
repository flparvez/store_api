import {Category} from '../models/category.models.js';

export async function getAllCategories(request, reply) {
  try {
    const categories = await Category.find();
    reply.send(categories);
  } catch (error) {
    reply.status(500).send(error);
  }
}
// Get category by slug
export async function getCategoryBySlug(request, reply) {
  try {
    const category = await Category.findOne({ slug: request.params.slug });
    if (!category) {
      reply.status(404).send({ message: 'Category not found' });
    } else {
      reply.send(category);
    }
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
}
export async function createCategory(request, reply) {
  try {
    const category = new Category(request.body);
    const result = await category.save();
    reply.status(201).send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}

export async function updateCategory(request, reply) {
  try {
    const { slug } = request.params;
    const updateData = request.body;

    const category = await Category.findOneAndUpdate({ slug }, updateData, { new: true });

    if (!category) {
      reply.code(404).send({ message: 'Category not found' });
    } else {
      reply.code(200).send(category);
    }
  } catch (error) {
    console.error('Error updating category:', error);
    reply.code(500).send({ error: 'Failed to update category', details: error.message });
  }
}
export async function deleteCategory(request, reply) {
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


