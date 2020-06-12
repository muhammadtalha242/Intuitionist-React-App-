const db = require("../src/config/dbConfig");
const logger = require("../src/util/logger");

const powerplants = db.getModel("powerplants");
const techparams = db.getModel("techparams");
const ecoparams = db.getModel("economicparams");
powerplants.belongsTo(ecoparams, { foreignKey: 'economic_parameters_id' })
ecoparams.hasOne(powerplants, { foreignKey: 'economic_parameters_id' })
powerplants.belongsTo(techparams, { foreignKey: 'technical_parameter_id' })
techparams.hasOne(powerplants, { foreignKey: 'technical_parameter_id' })

module.exports.drivedMode = powerplants