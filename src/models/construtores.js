const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('construtores', {
    contructorid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nacionalidade: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'construtores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "construtores_pkey",
        unique: true,
        fields: [
          { name: "contructorid" },
        ]
      },
    ]
  });
};
