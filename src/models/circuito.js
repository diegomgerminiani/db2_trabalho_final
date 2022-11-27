const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('circuito', {
    id_circuito: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      unique: "circuito_id_circuito_key"
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    localidade: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: false,
      primaryKey: true
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'circuito',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "circuito_id_circuito_key",
        unique: true,
        fields: [
          { name: "id_circuito" },
        ]
      },
      {
        name: "circuito_pkey",
        unique: true,
        fields: [
          { name: "id_circuito" },
          { name: "latitude" },
          { name: "longitude" },
        ]
      },
    ]
  });
};
