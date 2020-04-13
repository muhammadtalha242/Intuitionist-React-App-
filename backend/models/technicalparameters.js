/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('technicalparameters', {
    technical_parameter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    technology: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fuel_category: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fuel_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'fuel',
        key: 'fuel_code'
      }
    },
    installed_capacity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    derated_capacity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    msl: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    scheduled_outages: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    forced_outages: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    auxilary_consumption: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    rate_emission_CO2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    rate_emission_NOx: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    rate_emission_SOx: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reserve_primary: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reserve_secondary: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reserve_tertiary: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    min_time_up: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    min_time_down: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fuel_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    heat_reat_MSL: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    heat_rate_50: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    heat_rate_75: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    heat_rate_90: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    heat_rate_FL: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ramp_up_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ramp_down_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    repair_time_mean: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    repair_time_min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    repair_time_max: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ref_fuel_cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    startup_cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    availability_for_cp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fuel_calorific_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    synchronization_time: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    createdAt:false,
updatedAt:false,tableName: 'technicalparameters'
  });
};
