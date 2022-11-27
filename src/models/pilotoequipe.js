const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pilotoequipe', {
    id_ano: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'temporada',
        key: 'id_ano'
      }
    },
    contructorid: {
      type: DataTypes.STRING(20),
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'construtores',
        key: 'contructorid'
      }
    },
    id_piloto: {
      type: DataTypes.STRING(20),
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'piloto',
        key: 'id_piloto'
      }
    }
  }, {
    sequelize,
    tableName: 'pilotoequipe',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pilotoequipe_pkey",
        fields: [
          { name: "id_ano" },
          { name: "contructorid" },
          { name: "id_piloto" },
        ]
      },
    ]
  });
};
