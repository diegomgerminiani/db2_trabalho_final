/**
 * @file  Controlador de todas as funções relacionadas à entidade "clients"
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

const status = require("http-status");
const service = require('../services/Service');

/**
 * Busca por Pilotos de acordo com os parametros passados
 * @access ADMIN
 * @return Se encontrado, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.findPiloto = async (request, response, next) => {
	try {
		const data = await service.findPiloto(request.body);
		return ( data && data.count > 0 && data.rows ? 
			response.status(status.OK).send(data.rows) : 
			response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por Pilotos de acordo com os parametros passados
 * @access ADMIN
 * @return Se encontrado, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.findCircuito = async (request, response, next) => {
	try {
		const data = await service.findCircuito(request.body);
		return ( data && data.count > 0 && data.rows ? 
			response.status(status.OK).send(data.rows) : 
			response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por Pilotos de acordo com os parametros passados
 * @access ADMIN
 * @return Se encontrado, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.findEquipe = async (request, response, next) => {
	try {
		const data = await service.findEquipe(request.body);
		return ( data && data.count > 0 && data.rows ? 
			response.status(status.OK).send(data.rows) : 
			response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por Pilotos e suas Equipes de acordo com os parametros passados
 * @access ADMIN
 * @return Se encontrado, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.findPilotoEquipe = async (request, response, next) => {
	try {
		const data = await service.findPilotoEquipe(request.body);
		return ( data && data.count > 0 && data.rows ? 
			response.status(status.OK).send(data.rows) : 
			response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por Grids e suas Corridas de acordo com os parametros passados
 * @access ADMIN
 * @return Se encontrado, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.findGridCorrida = async (request, response, next) => {
	try {
		const data = await service.findGridCorrida(request.body);
		return ( data && data.count > 0 && data.rows ? 
			response.status(status.OK).send(data.rows) : 
			response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por Temporadas e suas Equipes participantes de acordo com os parametros passados
 * @access ADMIN
 * @return Se encontrado, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.findTemporadaEquipe = async (request, response, next) => {
	try {
		const data = await service.findTemporadaEquipe(request.body);
		return ( data && data.count > 0 && data.rows ? 
			response.status(status.OK).send(data.rows) : 
			response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

