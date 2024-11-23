import {getAllCategories,  createCategory, updateCategory, deleteCategory, getCategoryBySlug} from '../controller/category.js';


async function routes(fastify, options) {
    fastify.get('/categories', getAllCategories);
    fastify.get('/categories/:slug', getCategoryBySlug);
    fastify.post('/categories', createCategory);
    fastify.put('/categories/:id', updateCategory);
    fastify.delete('/categories/:id', deleteCategory);
    
}

export default routes;