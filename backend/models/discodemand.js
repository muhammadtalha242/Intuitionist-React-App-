/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discodemand', {
    disco_demand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    disco_name: {
      type: DataTypes.STRING(255),
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
    demand_served: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    computed_demand: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'discodemand'
  });
};
