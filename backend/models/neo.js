/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('neo', {
    neo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    neo_value: {
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
    tableName: 'neo'
  });
};
