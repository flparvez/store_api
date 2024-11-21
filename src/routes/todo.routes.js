import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, getTodosByCategory } from '../controller/todos.js';

async function routes(fastify, options) {
  fastify.get('/todos', getAllTodos);
  fastify.get('/todos/:id', getTodoById);
  fastify.get('/todos/category/:categoryId', getTodosByCategory);
  fastify.post('/todos', createTodo);
  fastify.put('/todos/:id', updateTodo);
  fastify.delete('/todos/:id', deleteTodo);
}

export default routes;
