const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Person', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isBetaMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'Person',
    timestamps: false,
  });
};
