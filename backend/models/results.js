/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('results', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      simulation_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      parameter_name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      parameter_value: {
        type: DataTypes.STRING(255),
        allowNull: true
      }

    }, {
      tableName: 'results'
    });
  };
  