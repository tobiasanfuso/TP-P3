import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Book = sequelize.define("maq", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
}, { timestamps: false });
