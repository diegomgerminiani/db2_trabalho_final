const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('corrida', {
    id_ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'temporada',
        key: 'id_ano'
      }
    },
    rodada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_circuito: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'circuito',
        key: 'id_circuito'
      }
    },
    datacorrida: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'corrida',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "corrida_pkey",
        unique: true,
        fields: [
          { name: "id_ano" },
          { name: "rodada" },
        ]
      },
    ]
  });
};
