/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transmissionline', {
    line_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    transmission_line_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bus_to: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bus_from: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    resistance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reactance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    line_limits: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    psse_code: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sddp_code: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'transmissionline'
  });
};
