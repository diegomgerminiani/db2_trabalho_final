const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temporadaconstrutores', {
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
    }
  }, {
    sequelize,
    tableName: 'temporadaconstrutores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "temporadaconstrutores_pkey",
        fields: [
          { name: "id_ano" },
          { name: "contructorid" }
        ]
      },
    ]
  });
};
