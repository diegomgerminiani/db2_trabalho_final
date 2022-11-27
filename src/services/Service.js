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
 * Busca por todas as instancias da entidade Piloto-Equipe
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
 exports.findPilotoEquipe = async (params) => {
	const { piloto, equipe, attributes, where: filtroBase } = params;
	const { 
		piloto: Piloto, 
		construtores: Construtores, 
		pilotoequipe: PilotoEquipe } = models;
	
	let where = []
	where = where.concat(await ajustarFiltros(filtroBase, "pilotoequipe"))
	where = where.concat(await ajustarFiltros(piloto.where, "piloto"))
	where = where.concat(await ajustarFiltros(equipe.where, "equipe"))

	console.log(where);

	try {

		const data = await PilotoEquipe.findAndCountAll({
			attributes,
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

/**
 * Busca por todas as instancias da entidade Piloto-Corrida
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
exports.findGridCorrida = async (params) => {
	const { piloto, circuito, attributes, where: filtroBase } = params;
	const { 
		circuito: Circuito, 
		piloto: Piloto, 
		pilotocorrida: PilotoCorrida } = models;
	
	let where = []
	where = where.concat(await ajustarFiltros(filtroBase, "pilotocorrida"))
	where = where.concat(await ajustarFiltros(piloto.where, "piloto"))
	where = where.concat(await ajustarFiltros(circuito.where, "circuito"))

	console.log(where);

	try {

		const data = await PilotoCorrida.findAndCountAll({
			attributes,
			where,
			include: [
				{
					model: Piloto,
					as: 'piloto',
					attributes: piloto.attributes
				},{
					model: Circuito,
					as: 'circuito',
					attributes: circuito.attributes
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
	if(!filtros || filtros === {})
		return {}
	
	filtros = filtros.map(filtro => {
		for( let old_key in filtro ){ 
				if(filtro[old_key] === undefined || filtro[old_key] === ""){
					delete filtro[old_key];
					return {}
				}else{
					const new_key = `$${table}.${old_key}$`
					if (old_key !== new_key) {
						Object.defineProperty(filtro, new_key, Object.getOwnPropertyDescriptor(filtro, old_key));
						delete filtro[old_key];
					}
					return filtro
				}
			}
		}
	)
	return filtros
}

