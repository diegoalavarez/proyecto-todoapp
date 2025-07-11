const mongoose = require('mongoose'); // Importa mongoose para interactuar con MongoDB

// Define el esquema del modelo de usuario
const todoSchema = new mongoose.Schema({ 
    texto: String, // Almacena el texto del todo
    checked: Boolean, // Almacena el estado del todo (completado o no)
    user: {
        type: mongoose.Schema.Types.ObjectId, // Almacena el ID del usuario que creó el todo
        ref: 'User' // Referencia al modelo User
    }
});

// Configura cómo se transforman los documentos al convertirlos a JSON
todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(); // Convierte el campo _id a un string y lo renombra a id
        delete returnedObject._id; // Elimina el campo _id que es generado por MongoDB
        delete returnedObject.__v; // Elimina el campo __v que es usado por Mongoose para el control de versiones
    }
});

// Crea el modelo de usuario basado en el esquema definido
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;