/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemdemand', {
    system_demand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    computed_demand: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    demand_served: {
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
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'systemdemand'
  });
};
