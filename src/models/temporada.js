const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temporada', {
    id_ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantidade_corridas: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'temporada',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "temporada_pkey",
        unique: true,
        fields: [
          { name: "id_ano" },
        ]
      },
    ]
  });
};
