require('dotenv').config(); // Importar las dependencias necesarias y los controladores
// Este archivo es el punto de entrada de la aplicación y configura las rutas, middlewares y la conexión a la base de datos
const express = require('express');
// Express es un framework para Node.js que facilita la creación de aplicaciones web y APIs
// dotenv se utiliza para cargar variables de entorno desde un archivo .env
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todos'); // Controlador para manejar las tareas
const logoutRouter = require('./controllers/logout'); // Controlador para manejar el cierre de sesión
const { userExtractor } = require('./middleware/auth'); // Middleware para extraer el usuario autenticado
const { MONGO_URI } = require('./config'); // Importar la URI de conexión a MongoDB desde el archivo de configuración

// Conexión a la base de datos MongoDB
// Esta función se ejecuta al iniciar la aplicación y establece la conexión con la base de datos MongoDB
// Si la conexión es exitosa, se muestra un mensaje en la consola; si falla, se captura el error y se muestra
(async() =>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conecto a Mongo DB');
    } catch (error) {
        console.log(error);
    }
})();

//Middlewares que se ejecutan antes de las rutas
// Estos middlewares se encargan de procesar las peticiones antes de que lleguen a las rutas definidas
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas Frontend
// Estas rutas sirven los archivos estáticos del frontend, como HTML, CSS, imágenes, etc.
// Se utilizan para servir las vistas y componentes de la aplicación
app.use(express.static(path.resolve('views')));
app.use('/js', express.static(path.resolve('views', 'js')));
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/todos', express.static(path.resolve('views', 'todos')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

//MORGAN
// Morgan es un middleware que permite registrar las peticiones HTTP en la consola
app.use(morgan('tiny'));

//Rutas Backend
// Estas rutas son las que se encargan de manejar las peticiones a la API
// y están protegidas por el middleware userExtractor para asegurar que el usuario esté autenticado
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', userExtractor, todosRouter);


module.exports = app;
