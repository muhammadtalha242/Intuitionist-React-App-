/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commercialparameters_combine', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    commercial_parameter_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    power_plant_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'commercialparameters_combine'
  });
};
