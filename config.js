const PAGE_URL = process.env.NODE_ENV === 'production' // Determina la URL de la página según el entorno
    ? 'https://proyecto-todoapp.onrender.com' // URL de producción
    : 'http://localhost:3000'; // URL de desarrollo local

// MONGO_URI es la URI de conexión a la base de datos MongoDB
// Se utiliza una variable de entorno para definir la URI según el entorno de ejecución (producción o prueba)

const MONGO_URI = process.env.NODE_ENV === 'production' // Determina la URI de conexión a MongoDB según el entorno
    ? process.env.MONGO_URI_PROD // URI de producción
    : process.env.MONGO_URI_TEST // URI de prueba

module.exports = { PAGE_URL, MONGO_URI };