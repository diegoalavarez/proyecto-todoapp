# TodoApp

Aplicación web para la gestión de tareas con registro, autenticación y verificación por correo electrónico.

## Tecnologías empleadas

- **Node.js** y **Express**: Backend y servidor web.
- **MongoDB** y **Mongoose**: Base de datos NoSQL y ORM.
- **JWT (jsonwebtoken)**: Autenticación y autorización.
- **bcrypt**: Hash de contraseñas.
- **nodemailer**: Envío de correos electrónicos.
- **TailwindCSS**: Estilos modernos y responsivos.
- **Axios**: Peticiones HTTP desde el frontend.

## Instalación y conexión

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/tuusuario/proyecto-todoapp.git
   cd proyecto-todoapp

## Instala las dependencias

- npm install

## Configura las variables de entorno Crea un archivo .env en la raíz con el siguiente contenido:

ACCESS_TOKEN_SECRET=tu_secreto_jwt
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_correo
MONGO_URI_PROD=tu_uri_mongodb
PAGE_URL=http://localhost:3000

## Conecta la base de datos Asegúrate de tener una instancia de MongoDB activa y que la URI en .env sea correcta.

## Compila los estilos de TailwindCSS

- npm run tailwind-build

## Ejecuta el servidor

**En modo desarrollo:**

- npm run dev

**En modo producción:**

- npm start

## Accede a la aplicación Abre http://localhost:3000 en tu navegador.

**Uso del programa**
- Registro: Ingresa nombre, email y contraseña. Recibirás un correo para verificar tu cuenta.
- Login: Accede con tu email y contraseña (solo si tu email está verificado).
- Gestión de tareas: Crea, marca como completadas y elimina tareas desde la interfaz.
- Logout: Cierra sesión para proteger tu cuenta.

Estructura del proyecto

controllers/
models/
views/
middleware/
config.js
index.js
app.js
.env
package.json
README.md


## Autor

Rafael y Diego

¡Disfruta usando TodoApp!

