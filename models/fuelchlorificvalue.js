/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fuelchlorificvalue', {
    fuel_chalorific_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    power_plant_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fuel_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    chalorific_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    price_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'fuelchlorificvalue'
  });
};
