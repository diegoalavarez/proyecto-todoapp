const logoutRouter = require('express').Router();

logoutRouter.get('/', async (request, response) => {
    const cookies = request.cookies;
// verificar si el usuario esta autenticado
    if (!cookies?.accessToken) {
        return response.sendStatus(401).json({ error: 'No estás autenticado' });
    }

    // Clear the accessToken cookie
    response.clearCookie('accessToken', {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true // Prevents client-side JavaScript from accessing the cookie 
    });

    return response.sendStatus(204); // No Content
});

module.exports = logoutRouter;