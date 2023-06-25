const express = require("express");
const cors = require("cors");
const libraryRouter = require("./routers/library.routers");
const errorHandling = require("./error/errorHandling");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(libraryRouter);
app.use((request, response, next)=>{
    response.status(404).json({error: true, codigo: 404, mensaje: "Endpoint no encontrado"});
});
app.use(errorHandling);

module.exports = app;