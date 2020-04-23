const BaseRepository = require('./BaseRepository')
const db = require('../config/dbConfig');

module.exports = class PowerPlantRepository extends BaseRepository {
    constructor() {
        super();
        super.maxItems = 1;
        this.db = db;
        this.powerplants = this.db.getModel("powerplants");
        this.techparams = this.db.getModel("techparams");
        this.ecoparams = this.db.getModel("economicparams");
        this.commercialparams = this.db.getModel("commercialparams_combine");

        this.configure();

    }
    configure() {
        this.powerplants.belongsTo(this.ecoparams, { foreignKey: 'economic_parameters_id' })
        this.ecoparams.hasOne(this.powerplants, { foreignKey: 'economic_parameters_id' })

        this.powerplants.belongsTo(this.techparams, { foreignKey: 'technical_parameter_id' })
        this.techparams.hasOne(this.powerplants, { foreignKey: 'technical_parameter_id' })

        this.powerplants.hasMany(this.commercialparams, { foreignKey: 'power_plant_name' })
        this.commercialparams.belongsTo(this.powerplants, { foreignKey: 'power_plant_name' })


    }
    async getAllData(assumptionDates, plantNames) {
        let assumptionDateArray = assumptionDates.map(date => {

            return `TIMESTAMPDIFF(YEAR,economicparameters.cod,"${date}")`
        })

        let rawQuery = `SELECT
        powerplant.plant_name,
        economicparameters.cod,

        commercialparameters_combine.commercial_parameter_name,
        commercialparameters_combine.year AS years,
        commercialparameters_combine.rate
        FROM
            powerplant
        INNER JOIN economicparameters
            ON
                powerplant.economic_parameters_id = economicparameters.economic_parameters_id
            AND
            powerplant. economic_parameters_id = economicparameters.economic_parameters_id
        INNER JOIN commercialparameters_combine
            ON
                commercialparameters_combine.power_plant_name = powerplant.plant_name
        WHERE
            powerplant.plant_name in ("ALMOIZ","Alliance")
            
        AND
            commercialparameters_combine.year
            IN
                (${assumptionDateArray})`

        rawQuery = rawQuery.replace(/'/, "");
        let modelCollection = await this.db.sequelize.query(rawQuery, { type: this.db.sequelize.QueryTypes.SELECT })
        return modelCollection;

    }

    async getWithIncludes(page) {
        console.log("PPRepo.Get");
        var limit = this.maxItems;
        var offset = (page - 1) * this.maxItems;
        var modelCollection = await this.powerplants
            .findAll({
                include: [{
                    model: this.ecoparams
                },
                {
                    model: this.techparams,
                }, {
                    model: this.commercialparams
                }
                ],
                limit: limit,
                offset: offset
            });
        return modelCollection;
    }
    async getPlantByName(powerPlantName) {
        var modelCollection = await this.powerplants
            .findAll({
                include: [{
                    model: this.ecoparams
                },
                {
                    model: this.techparams,
                }, {
                    model: this.commercialparams
                }
                ],
                where: { plant_name: powerPlantName }
            });
        return modelCollection;
    }
    async getPlantById(id) {
        var modelCollection = await this.powerplants
            .findAll({
                include: [{
                    model: this.ecoparams
                },
                {
                    model: this.techparams,
                }, {
                    model: this.commercialparams
                }
                ],
                where: { technical_parameter_id: id }
            });
        return modelCollection;
    }



}