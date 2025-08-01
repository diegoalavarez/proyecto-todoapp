const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para manejar tokens JWT
const User = require('../models/user'); // Importa el modelo de usuario


// Middleware para extraer el usuario del token JWT
const userExtractor = async (request, response, next) => { // Verifica si el token está presente en las cookies
    try {
        const token = request.cookies?.accessToken; // Accede al token desde las cookies de la solicitud
        if (!token) {
            return response.sendStatus(401).json({ error: 'Token faltante' }); // Si no hay token, devuelve un error 401 (No autorizado)
    }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verifica el token usando la clave secreta
        const user = await User.findById(decoded.id); // Busca el usuario en la base de datos usando el ID del token
        request.user = user;
        
        if (!user) {
            return response.sendStatus(401).json({ error: 'Usuario no encontrado' }); // Si no se encuentra el usuario, devuelve un error 401 (No autorizado)
        }

        next();
     
    } catch (error) { // Si hay un error al verificar el token, devuelve un error 403 (Prohibido)
        return response.sendStatus(403).json({ error: 'Token inválido' });
    }
    


};


module.exports = { userExtractor };