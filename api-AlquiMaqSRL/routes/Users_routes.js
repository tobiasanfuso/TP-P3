import { Router } from "express";
import { Users } from "../Models/Users.js";
import { sequelize } from "../src/db.js";

const router = Router();

router.get("/users", async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

router.post("/users", async (req, res) => {
    try {
        const { userName, email, role, password } = req.body;
        const users = await Users.create({ userName, email, role, password });
        res.status(201).json({ success: true, message: "Usuario correctamente creado" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);  // Imprimir el error completo
        res.status(500).json({ error: "Error al crear el usuario", details: error.message });
    }
});


export default router;