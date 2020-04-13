/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disco', {
    disco_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    disco_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'disco'
  });
};
