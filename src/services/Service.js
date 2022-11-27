/**
 * @file  Camada de persistencia da entidade "clients"
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

const { sequelize } = require('../config/sql_connection')
const initModels = require("../models/init-models"); 
const piloto = require("../models/piloto"); 
const equipe = require("../models/construtores"); 
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

/**
 * Busca por todas as instancias da entidade 
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
exports.findPilotoEquipe = async (params) => {
	const { piloto, equipe } = params;
	const { 
		piloto: Piloto, 
		construtores: Construtores, 
		pilotoequipe: PilotoEquipe } = models;

	let where = []
	where = where.concat(piloto.where.map(where => {
		for( let old_key in where){ 
			const new_key = `$piloto.${old_key}$`
			if (old_key !== new_key) {
				Object.defineProperty(where, new_key, Object.getOwnPropertyDescriptor(where, old_key));
				delete where[old_key];
			}
		}
		return where
	}))
	where = where.concat(equipe.where.map(where => {
		for( let old_key in where){ 
			const new_key = `$equipe.${old_key}$`
			if (old_key !== new_key) {
				Object.defineProperty(where, new_key, Object.getOwnPropertyDescriptor(where, old_key));
				delete where[old_key];
			}
		}
		return where
	}))
	try {

		const data = await PilotoEquipe.findAndCountAll({
			attributes: ["id_ano"],
			where,
			include: [
				{
					model: Piloto,
					as: 'piloto',
					attributes: piloto.attributes
				},{
					model: Construtores,
					as: 'equipe',
					attributes: equipe.attributes
				}
			]
		});
		return data;
		
	} catch (error) {
		console.log(error);
		throw error;
	}
};

