require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todos');
const logoutRouter = require('./controllers/logout');
const { userExtractor } = require('./middleware/auth'); // Middleware para extraer el usuario autenticado
const { MONGO_URI } = require('./config'); // Importar la URI de conexión a MongoDB desde el archivo de configuración

(async() =>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conecto a Mongo DB');
    } catch (error) {
        console.log(error);
    }
})();

//Middlewares que se ejecutan antes de las rutas
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas Frontend
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
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', userExtractor, todosRouter);


module.exports = app;
