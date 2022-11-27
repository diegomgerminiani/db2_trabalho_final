var DataTypes = require("sequelize").DataTypes;
var _circuito = require("./circuito");
var _construtores = require("./construtores");
var _corrida = require("./corrida");
var _piloto = require("./piloto");
var _pilotocorrida = require("./pilotocorrida");
var _pilotoequipe = require("./pilotoequipe");
var _temporada = require("./temporada");
var _temporadaconstrutores = require("./temporadaconstrutores");

function initModels(sequelize) {
  var circuito = _circuito(sequelize, DataTypes);
  var construtores = _construtores(sequelize, DataTypes);
  var corrida = _corrida(sequelize, DataTypes);
  var piloto = _piloto(sequelize, DataTypes);
  var pilotocorrida = _pilotocorrida(sequelize, DataTypes);
  var pilotoequipe = _pilotoequipe(sequelize, DataTypes);
  var temporada = _temporada(sequelize, DataTypes);
  var temporadaconstrutores = _temporadaconstrutores(sequelize, DataTypes);

  circuito.belongsToMany(temporada, { as: 'id_ano_temporadas', through: pilotocorrida, foreignKey: "id_circuito", otherKey: "id_ano" });
  temporada.belongsToMany(circuito, { as: 'id_circuito_circuitos', through: pilotocorrida, foreignKey: "id_ano", otherKey: "id_circuito" });
  corrida.belongsTo(circuito, { as: "id_circuito_circuito", foreignKey: "id_circuito" });
  circuito.hasMany(corrida, { as: "corridas", foreignKey: "id_circuito" });
  pilotocorrida.belongsTo(circuito, { as: "circuito", foreignKey: "id_circuito" });
  circuito.hasMany(pilotocorrida, { as: "pilotocorridas", foreignKey: "id_circuito" });
  pilotocorrida.belongsTo(piloto, { as: "piloto", foreignKey: "id_piloto" });
  piloto.hasMany(pilotocorrida, { as: "pilotocorridas", foreignKey: "id_piloto" });
  pilotoequipe.belongsTo(construtores, { as: "equipe", foreignKey: "contructorid" });
  construtores.hasMany(pilotoequipe, { as: "pilotoequipes", foreignKey: "contructorid" });
  temporadaconstrutores.belongsTo(construtores, { as: "contructor", foreignKey: "contructorid" });
  construtores.hasMany(temporadaconstrutores, { as: "temporadaconstrutores", foreignKey: "contructorid" });
  pilotoequipe.belongsTo(piloto, { as: "piloto", foreignKey: "id_piloto" });
  piloto.hasMany(pilotoequipe, { as: "pilotoequipes", foreignKey: "id_piloto" });
  corrida.belongsTo(temporada, { as: "id_ano_temporada", foreignKey: "id_ano" });
  temporada.hasMany(corrida, { as: "corridas", foreignKey: "id_ano" });
  pilotocorrida.belongsTo(temporada, { as: "id_ano_temporada", foreignKey: "id_ano" });
  temporada.hasMany(pilotocorrida, { as: "pilotocorridas", foreignKey: "id_ano" });
  pilotoequipe.belongsTo(temporada, { as: "id_ano_temporada", foreignKey: "id_ano" });
  temporada.hasMany(pilotoequipe, { as: "pilotoequipes", foreignKey: "id_ano" });
  temporadaconstrutores.belongsTo(temporada, { as: "temporada", foreignKey: "id_ano" });
  temporada.hasMany(temporadaconstrutores, { as: "temporadaconstrutores", foreignKey: "id_ano" });

  return {
    circuito,
    construtores,
    corrida,
    piloto,
    pilotocorrida,
    pilotoequipe,
    temporada,
    temporadaconstrutores,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
