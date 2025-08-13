require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/example', exampleRoutes);

//Ruta base
app.get('/', (req, res) => {
    res.send('Backend de movilidad sostenible UIO funcionando');
});

module.exports = app;