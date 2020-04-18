const BaseRepository = require('./BaseRepository')
const db = require('../config/dbConfig');

module.exports = class PowerPlantRepository extends BaseRepository {
    constructor() {
        super('powerplants');
        this.db = db;
        this.powerplants = this.db.getModel("powerplants");
        this.techparams = this.db.getModel("techparams");
        this.ecoparams = this.db.getModel("economicparams");
        this.commercialParams = this.db.getModel("commercialparams")
        this.vomlocal = this.db.getModel("vomlocalValues")
        this.commercialParamsCombine = this.db.getModel("commercialparams_combine")
        this.configure();
        // this.configureForRefValue();
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

    async getRefValues() {
        var modelCollection = await this.commercialParamsCombine
            .findAll({ where: { commercial_parameter_name: ["water_charges", "wht", "insurance", "fom_local", "fom_foreign", "annual_security_cost", "ash_disposal_charges", "dsra_cost", "escalable_component", "fcc", "fixedcostonworkingcapital"], year: 1, power_plant_name: 'AES PAK GEN' } });

        return modelCollection;
        // let refRate=[]
        // var x = ["watercharges", "wht", "insurance", "fomlocal", "fomforeign", "annualsecuritycost", "ashdisposalcost", "dsracost", "escalablecomponent", "fcc", "fixedcostofworkingcapital"]
        // for (var i =0; i<x.length;i++){
        //     let commercialParameter = x[i];
        //     var rate_query = `SELECT * from ${commercialParameter} where year =1 and id in(SELECT ${commercialParameter + "_id"} from commercialparameters  where  power_plant_name ='AES PAK GEN');`
        //     var fcc_query = `SELECT rate from fcc where year =1 and id in(SELECT fcc_id from commercialparameters  where  power_plant_name ='AES PAK GEN');`

        //     refRate.push(await this.db.sequelize.query(rate_query, {  type: this.db.sequelize.QueryTypes.SELECT }))
        //     refRate.push(await this.db.sequelize.query(fcc_query, {  type: this.db.sequelize.QueryTypes.SELECT }))

        // }
        // return refRate
        
    }
}
// let ref_id = await this.commercialParams.findAll({attributes: ['VOM_Local_id'],where: {power_plant_name:"PORT_QASIM"}})
        // console.log("ref_id---------------------------------: ", ref_id[0].dataValues)
        // console.log("ref_id---------------------------------: ", Object.keys(ref_id[0]))
        // var modelCollection = await this.commercialParamsCombine
        //     .findAll({ where: { commercial_parameter_name: ["water_charges", "wht", "insurance", "fom_local", "fom_foreign", "annual_security_cost", "ash_disposal_charges", "dsra_cost", "escalable_component", "fcc", "fixedcostonworkingcapital"], year: 1, power_plant_name: 'AES PAK GEN' } });

        // return modelCollection;

// module.exports = {
//     get: BaseRepository.get,
//     getById: BaseRepository.getById,
//     add:BaseRepository.add,
//     update:BaseRepository.update,
//     remove:BaseRepository.remove
// }