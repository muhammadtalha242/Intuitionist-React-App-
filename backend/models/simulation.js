/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('simulation', {
      simulation_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW ,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      results: {
        type: DataTypes.JSON,
        allowNull: true
      },
    }, {
      tableName: 'simulation',
      timestamps: false,
      freezeTableName: true
    });
  };
  