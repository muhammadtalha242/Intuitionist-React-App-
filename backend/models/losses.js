/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('losses', {
    loss_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    loss_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    loss_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'losses'
  });
};
