/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('referencecosts', {
    reference_cost_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    power_plant_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reference_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fca_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'referencecosts'
  });
};
