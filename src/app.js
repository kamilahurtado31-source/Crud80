
const express = require('express');
require("dotenv").config();

const enrutador = require("./routes");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use("/api", enrutador);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Endpoint raiz de nuestra API Rest 3407180");
});

module.exports = app;
