import express from 'express';
import { PORT } from './config.js';
import { sequelize } from './db.js';
import router from '../routes/Users_routes.js';

const app = express();
app.use(express.json());

app.use(userRoutes);

sequelize.authenticate()
    .then(() => {
        console.log("Base de datos conectada correctamente");
        app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))})
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    })

app.listen(PORT);


console.log (`prueba server listening on port ${PORT}`)
