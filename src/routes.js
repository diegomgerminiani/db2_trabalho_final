/**
 * @file Endpoints da API
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */
const express = require("express");
const routes = express.Router();
const Controller = require("./controllers/Controller");

routes.get("/piloto", Controller.findPiloto);
routes.get("/circuito", Controller.findCircuito);
routes.get("/equipe", Controller.findEquipe);


module.exports = routes;
