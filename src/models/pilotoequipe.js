const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pilotoequipe', {
    id_ano: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'temporada',
        key: 'id_ano'
      }
    },
    contructorid: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'construtores',
        key: 'contructorid'
      }
    },
    id_piloto: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'piloto',
        key: 'id_piloto'
      }
    }
  }, {
    sequelize,
    tableName: 'pilotoequipe',
    schema: 'public',
    timestamps: false
  });
};
