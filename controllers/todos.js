const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todo');

todosRouter.get('/', async (request, response) => {
    const user = request.user;
    const todos = await Todo.find({ user: user.id });
    return response.status(200).json(todos);
});

todosRouter.post('/', async (request, response) => {
    const user = request.user;
    const { texto } = request.body;
    const newTodo = new Todo({
        texto,
        checked: false,
        user: user._id
    });
    const savedTodo = await newTodo.save();
    user.todos = user.todos.concat(savedTodo._id);
    await user.save();
    
    return response.status(201).json(savedTodo);
});


todosRouter.delete('/:id', async (request, response) => {
    const user = request.user;
    const todoIdDeleted = request.params.id;

await Todo.findByIdAndDelete(todoIdDeleted);

user.todos = user.todos.filter(todoId => todoId.toString() !== todoIdDeleted);

await user.save();
return response.sendStatus(204);

});

todosRouter.patch('/:id', async (request, response) => {
  const user = request.user;

const { checked } = request.body;

await Todo.findByIdAndUpdate(request.params.id, { checked });

return response.sendStatus(200);

});

module.exports = todosRouter;