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
	const { attributes, where } = params;
	try {

		const data = await models.piloto.findAndCountAll({ 
			attributes: attributes && attributes.length ? attributes : undefined, 
			where 
		});
		//console.log(data);
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
	const { attributes, where } = params;
	try {

		const data = await models.circuito.findAndCountAll({ 
			attributes: attributes && attributes.length ? attributes : undefined, 
			where
		});
		//console.log(data);
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
	const { attributes, where } = params;
	try {

		const data = await models.construtores.findAndCountAll({ 
			attributes: attributes && attributes.length ? attributes : undefined, 
			where 
		});
		//console.log(data);
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

	try {

		const data = await PilotoEquipe.findAndCountAll({
			attributes: attributes && attributes.length ? attributes : undefined,
			where,
			include: [
				{
					model: Piloto,
					as: 'piloto',
					attributes: piloto.attributes && piloto.attributes.length ? piloto.attributes : undefined
				},{
					model: Construtores,
					as: 'equipe',
					attributes: equipe.attributes && equipe.attributes.length ? equipe.attributes : undefined
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

	try {

		const data = await PilotoCorrida.findAndCountAll({
			attributes: attributes && attributes.length ? attributes : undefined,
			where,
			include: [
				{
					model: Piloto,
					as: 'piloto',
					attributes: piloto.attributes && piloto.attributes.length ? piloto.attributes : undefined
				},{
					model: Circuito,
					as: 'circuito',
					attributes: circuito.attributes && circuito.attributes.length ? circuito.attributes : undefined
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
exports.findTemporadaEquipe = async (params) => {
	const { temporada, equipe, attributes, where: filtroBase } = params;
	const { 
		construtores: Contructor, 
		temporada: Temporada, 
		temporadaconstrutores: TemporadaConstrutores } = models;
	
	let where = []
	where = where.concat(await ajustarFiltros(filtroBase, "temporadaconstrutores"))
	where = where.concat(await ajustarFiltros(temporada.where, "temporada"))
	where = where.concat(await ajustarFiltros(equipe.where, "contructor"))

	try {

		const data = await TemporadaConstrutores.findAndCountAll({
			attributes: attributes && attributes.length ? attributes : undefined,
			where,
			include: [
				{
					model: Contructor,
					as: 'contructor',
					attributes: equipe.attributes && equipe.attributes.length ? equipe.attributes : undefined
				},{
					model: Temporada,
					as: 'temporada',
					attributes: temporada.attributes && temporada.attributes.length ? temporada.attributes : undefined
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
	if(filtros && filtros.length){
		filtros.forEach((filtro) => {
			if(!Object.keys(filtro).length){
				const index = filtros.indexOf(filtro)
				if(index > -1) filtros.splice(index, 1)
			}else{
				for( let old_key in filtro ){ 
					const new_key = `$${table}.${old_key}$`
					if (old_key !== new_key) {
						Object.defineProperty(filtro, new_key, Object.getOwnPropertyDescriptor(filtro, old_key));
						delete filtro[old_key];
					}					
				}
			}

		})
		return filtros
	}
	return []
}

