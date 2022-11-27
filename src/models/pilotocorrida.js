const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pilotocorrida', {
    id_ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'temporada',
        key: 'id_ano'
      }
    },
    id_circuito: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'circuito',
        key: 'id_circuito'
      }
    },
    id_piloto: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'piloto',
        key: 'id_piloto'
      }
    },
    positionp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    q1: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    q2: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    q3: {
      type: DataTypes.CHAR(8),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pilotocorrida',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pilotocorrida_pkey",
        unique: true,
        fields: [
          { name: "id_ano" },
          { name: "id_circuito" },
          { name: "id_piloto" },
        ]
      },
    ]
  });
};
