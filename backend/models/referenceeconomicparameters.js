/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('referenceeconomicparameters', {
    reference_economic_parameters_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    us_exchange_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    us_cpi: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    local_cpi: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    kibor: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    libor: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    RMB_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    parameter_data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'referenceeconomicparameters'
  });
};
