/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('powerplant', {
    plant_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    power_plant_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fca_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sddp_code: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_nature: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    policy_reference: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    agreement_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contract_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    units: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    technical_parameter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'technicalparameters',
        key: 'technical_parameter_id'
      }
    },
    disco_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'disco',
        key: 'disco_id'
      }
    },
    economic_parameters_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'economicparameters',
        key: 'economic_parameters_id'
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'powerplant',
    underscored: true

  });
};
