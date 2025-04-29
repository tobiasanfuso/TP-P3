import { Router} from "express";

const router = Router();

router.get("/Maq", (req, res) => {
    const { id } = req.params;
    res.send("OBTENER MAQUINAS con id; ${id}");
});

router.post("/Maq", (req, res) => {
    res.send("CREAR MAQUINA");
});

router.put("/Maq", (req, res) => {
    const { id } = req.params;
    res.send("ACTUALIZAR MAQUINAS con id; ${id}");
});

router.delete("/Maq", (req, res) => {
    const { id } = req.params;
    res.send("BORRAR MAQUINA con id; ${id}");
});

export default router;