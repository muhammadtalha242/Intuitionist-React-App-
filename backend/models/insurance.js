/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('insurance', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'insurance'
  });
};
