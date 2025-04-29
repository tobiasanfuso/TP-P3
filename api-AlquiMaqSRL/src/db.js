import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Alquimaq","root",{
    dialect: 'mysql',
    host: "localhost",
    
})

sequelize.authenticate()
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });