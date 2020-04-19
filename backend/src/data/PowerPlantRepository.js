const BaseRepository = require('./BaseRepository')
const db = require('../config/dbConfig');

module.exports = class PowerPlantRepository extends BaseRepository {
    constructor() {
        super();
        this.db = db;
        this.powerplants = this.db.getModel("powerplants");
        this.techparams = this.db.getModel("techparams");
        this.ecoparams = this.db.getModel("economicparams");
        this.configure();

    }
    configure() {
        this.powerplants.belongsTo(this.ecoparams, { foreignKey: 'economic_parameters_id' })
        this.ecoparams.hasOne(this.powerplants, { foreignKey: 'economic_parameters_id' })
        this.powerplants.belongsTo(this.techparams, { foreignKey: 'technical_parameter_id' })
        this.techparams.hasOne(this.powerplants, { foreignKey: 'technical_parameter_id' })
    }

    async getWithIncludes(modelName, page) {
        console.log("PPRepo.Get");
        var limit = this.maxItems;
        var offset = (page - 1) * this.maxItems;
        var modelCollection = await this.powerplants
            .findAll({
                include: [
                    {
                        model: this.ecoparams
                    },
                    {
                        model: this.techparams,
                    }
                ],
                limit: limit, offset: offset
            });
        return modelCollection;
    }


}