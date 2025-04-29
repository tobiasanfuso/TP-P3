import express from 'express';
import { PORT } from './config.js';
// import maqroutes from "../routes/Maq.routes.js"


const app = express();

app.listen(PORT);
// app.use(maqroutes);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

console.log (`prueba server listening on port ${PORT}`)
