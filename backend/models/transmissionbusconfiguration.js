/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transmissionbusconfiguration', {
    transmission_bus_configuration_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    psse_code: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sddp_code: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    voltage_level: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    bus_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    disco_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'disco',
        key: 'disco_id'
      }
    },
    bus_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'bus',
        key: 'bus_name'
      }
    },
    generator_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    generator_code: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'transmissionbusconfiguration'
  });
};
