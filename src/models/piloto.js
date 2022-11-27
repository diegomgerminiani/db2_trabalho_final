const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('piloto', {
    id_piloto: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    datanascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nacionalidade: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'piloto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "piloto_pkey",
        unique: true,
        fields: [
          { name: "id_piloto" },
        ]
      },
    ]
  });
};
