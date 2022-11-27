/**
 * @file  Camada de persistencia da entidade "clients"
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

const { sequelize } = require('../config/sql_connection')
const initModels = require("../models/init-models"); 
const models = initModels(sequelize)


/**
 * Busca por todas as instancias da entidade 
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
exports.findPiloto = async (params) => {
	try {

		const data = await models.piloto.findAndCountAll(params);
		console.log(data);
		return data

	} catch (error) {
		throw error;
	}
};

/**
 * Busca por todas as instancias da entidade 
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
exports.findCircuito = async (params) => {
	try {

		const data = await models.circuito.findAndCountAll(params);
		console.log(data);
		return data

	} catch (error) {
		throw error;
	}
};

/**
 * Busca por todas as instancias da entidade 
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
exports.findEquipe = async (params) => {
	try {

		const data = await models.construtores.findAndCountAll(params);
		console.log(data);
		return data

	} catch (error) {
		throw error;
	}
};

