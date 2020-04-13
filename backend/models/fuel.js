/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fuel', {
    fuel_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fuel_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fuel_units: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    calorific_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'fuel'
  });
};
