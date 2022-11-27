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
	where = where.concat(await ajustarFiltros(piloto.where, "piloto"))
	where = where.concat(await ajustarFiltros(equipe.where, "equipe"))
	console.log(where);

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

async function ajustarFiltros(filtros, table){
	filtros = filtros.map(filtro => {
		for( let old_key in filtro){ 
			const new_key = `$${table}.${old_key}$`
			if (old_key !== new_key) {
				Object.defineProperty(filtro, new_key, Object.getOwnPropertyDescriptor(filtro, old_key));
				delete filtro[old_key];
			}
		}
		return filtro
	})
	return filtros
}

