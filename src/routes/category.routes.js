import {getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} from '../controller/category.js';


async function routes(fastify, options) {
    fastify.get('/categories', getAllCategories);
    fastify.get('/categories/:id', getCategoryById);
    fastify.post('/categories', createCategory);
    fastify.put('/categories/:id', updateCategory);
    fastify.delete('/categories/:id', deleteCategory);
    
}

export default routes;