/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('generation', {
    generation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    units_delivered: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    time_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'systemtime',
        key: 'time_id'
      }
    },
    power_plant_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'generation'
  });
};
