/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cpp', {
    cpp_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cpp_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reference_cost_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'referencecosts',
        key: 'reference_cost_id'
      }
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'cpp'
  });
};
