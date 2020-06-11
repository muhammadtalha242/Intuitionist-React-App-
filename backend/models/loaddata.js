/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loaddata', {
    load_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bus_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    time_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'systemtime',
        key: 'time_id'
      }
    },
    load_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'loaddata'
  });
};
