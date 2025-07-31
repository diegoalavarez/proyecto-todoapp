const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Ruta para manejar el inicio de sesión de usuarios
// Se espera que el cuerpo de la solicitud contenga un email y una contraseña
// Si las credenciales son correctas, se genera un token de acceso y se establece una cookie con el token
loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
        return response.status(400).json({ error: 'Email o contraseña incorrectos' }); // Verifica si el usuario existe en la base de datos
    }

    if (!userExist.verified) {
        return response.status(400).json({ error: 'Email no verificado' }); // Verifica si el usuario ha verificado su email
    }

    const isCorrect = await bcrypt.compare(password, userExist.passwordHash); // Compara la contraseña proporcionada con la almacenada en la base de datos
    // bcrypt.compare devuelve true si las contraseñas coinciden, false en caso contrario

    if (!isCorrect) {
        return response.status(400).json({ error: 'Email o contraseña incorrectos' }); // Si las contraseñas no coinciden, se devuelve un error
    }

    // Si las credenciales son correctas, se genera un token de acceso
    // El token contiene el ID del usuario y se firma con una clave secreta
    // Se establece una cookie con el token que expira en 1 día
    const userForToken = { id: userExist.id };
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    response.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // La cookie expira en 1 día
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });

    return response.sendStatus(200);
});

module.exports = loginRouter; 