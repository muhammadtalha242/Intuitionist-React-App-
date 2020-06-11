/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('economicparameters', {
    economic_parameters_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dollar_parity: {
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
    cod: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    term: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    end_year: {
      type: DataTypes.INTEGER(11),
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
    sinsoure_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    rmb_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false, tableName: 'economicparameters',

  });
};
