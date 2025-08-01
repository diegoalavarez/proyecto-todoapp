const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todo');

// Ruta para obtener todas las tareas del usuario autenticado
// Esta ruta devuelve todas las tareas asociadas al usuario que ha iniciado sesión
// Se utiliza el middleware userExtractor para asegurarse de que el usuario esté autenticado
// Se espera que el usuario esté disponible en request.user después de aplicar el middleware
todosRouter.get('/', async (request, response) => {
    const user = request.user; // El usuario autenticado se extrae del request por el middleware userExtractor
    const todos = await Todo.find({ user: user.id }); // Busca todas las tareas asociadas al usuario en la base de datos
    return response.status(200).json(todos);
});

// Ruta para crear una nueva tarea
// Esta ruta permite a los usuarios crear una nueva tarea
// La tarea se guarda en la base de datos y se asocia con el usuario autenticado
// Se espera que el cuerpo de la solicitud contenga el texto de la tarea
todosRouter.post('/', async (request, response) => {
    const user = request.user;
    const { texto } = request.body; // Extrae el texto de la tarea del cuerpo de la solicitud
    const newTodo = new Todo({ 
        texto,
        checked: false,
        user: user._id
    });
    const savedTodo = await newTodo.save(); // Guarda la nueva tarea en la base de datos
    // Agrega la tarea guardada a la lista de tareas del usuario
    // Esto asegura que la tarea esté asociada al usuario en la base de datos
    user.todos = user.todos.concat(savedTodo._id); // Agrega el ID de la tarea guardada a la lista de tareas del usuario
    // Guarda el usuario actualizado en la base de datos
    await user.save();
    
    return response.status(201).json(savedTodo);
});

// Ruta para eliminar una tarea
// Esta ruta permite a los usuarios eliminar una tarea específica
// Se espera que el ID de la tarea a eliminar se pase como parámetro en la URL
// La tarea se elimina de la base de datos y también se elimina de la lista de tareas del usuario
todosRouter.delete('/:id', async (request, response) => {
    const user = request.user; 
    const todoIdDeleted = request.params.id;

await Todo.findByIdAndDelete(todoIdDeleted);

user.todos = user.todos.filter(todoId => todoId.toString() !== todoIdDeleted);

await user.save();
return response.sendStatus(204);

});

// Ruta para actualizar el estado de una tarea
// Esta ruta permite a los usuarios marcar una tarea como completada o no completada
// Se espera que el ID de la tarea a actualizar se pase como parámetro en la URL
// El cuerpo de la solicitud debe contener el nuevo estado de la tarea (checked)
todosRouter.patch('/:id', async (request, response) => {
  const user = request.user;

const { checked } = request.body;

await Todo.findByIdAndUpdate(request.params.id, { checked });

return response.sendStatus(200);

});

module.exports = todosRouter;