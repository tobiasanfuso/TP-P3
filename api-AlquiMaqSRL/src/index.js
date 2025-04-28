import express from 'express';
import { PORT } from './config.js';
import maqroutes from "../routes/Maq.routes.js"


const app = express();

app.listen(PORT);
app.use(maqroutes);
console.log ('server listening on port ${PORT}')
