import { Router} from "express";
import {Users} from "../Models/Users.js";

const router = Router();

router.get("/users", async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

router.POST("/users", async (req, res) => {
    try {
        const users = await Users.create({userName, role, password});
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({error: "Error al crear el usuario"});
    }
}
);