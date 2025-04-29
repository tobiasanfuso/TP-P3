import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: true });

sequelize.sync()
    .then(() => console.log("Tabla de usuarios creada correctamente"))
    .catch((error) => console.error("Error al crear la tabla de usuarios:", error));
