/**
 * @file Endpoints da API
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */
const express = require("express");
const routes = express.Router();
const Controller = require("./controllers/Controller");

routes.post("/piloto", Controller.findPiloto);
routes.post("/circuito", Controller.findCircuito);
routes.post("/equipe", Controller.findEquipe);

routes.post("/piloto-equipe", Controller.findPilotoEquipe);
routes.post("/grid-corrida", Controller.findGridCorrida);
routes.post("/temporada-equipe", Controller.findTemporadaEquipe);

module.exports = routes;
