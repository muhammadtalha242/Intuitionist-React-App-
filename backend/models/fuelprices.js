/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fuelprices', {
    fuelPriceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fuel_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'fuel',
        key: 'fuel_code'
      }
    },
    price_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'fuelprices'
  });
};
