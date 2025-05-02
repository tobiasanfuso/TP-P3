import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import { sequelize } from './db.js';
import router from '../routes/Users_routes.js';
import { Users } from '../Models/Users.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

sequelize.authenticate()
.then(() => {
    return sequelize.sync()})
    .then(() => {
        console.log("Base de datos conectada correctamente");
        app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))})
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    })



console.log (`prueba server listening on port ${PORT}`)
