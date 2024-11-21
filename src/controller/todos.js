import {Todo} from '../models/todo.models.js';

async function getAllTodos(request, reply) {
  try {
    const todos = await Todo.find().populate('category');
    reply.send(todos);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function getTodoById(request, reply) {
  try {
    const todo = await Todo.findById(request.params.id).populate('category');
    if (!todo) {
      reply.status(404).send({ message: 'Todo not found' });
    } else {
      reply.send(todo);
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function createTodo(request, reply) {
  try {
    const todo = new Todo(request.body);
    const result = await todo.save();
    reply.status(201).send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateTodo(request, reply) {
  try {
    const todo = await Todo.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!todo) {
      reply.status(404).send({ message: 'Todo not found' });
    } else {
      reply.status(200).send(todo);
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function deleteTodo(request, reply) {
  try {
    const todo = await Todo.findByIdAndDelete(request.params.id);
    if (!todo) {
      reply.status(404).send({ message: 'Todo not found' });
    } else {
      reply.status(200).send({ message: 'Todo deleted successfully' });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function getTodosByCategory(request, reply) {
  // endpoints: api/todos/category/673f16ba2cc9739cc4a031ec
  try {
    const todos = await Todo.find({ category: request.params.categoryId }).populate('category');
    if (!todos.length) {
      reply.status(404).send({ message: 'No todos found for this category' });
    } else {
      reply.send(todos);
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, getTodosByCategory };
