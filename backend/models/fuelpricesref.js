/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fuelpricesref', {
    fuel_price_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    price_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fuel_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'fuelcalorificvalue',
        key: 'fuel_code'
      }
    }
  }, {
    tableName: 'fuelpricesref'
  });
};
