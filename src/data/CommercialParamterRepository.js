const BaseRepository = require('./BaseRepository')
const db = require('../config/dbConfig');

module.exports = class CommercialParamterRepository extends BaseRepository {

    constructor() {
        super()
        this.commercialParams = this.db.getModel("commercialparams")
        this.vomlocal = this.db.getModel("vomlocalValues")
        this.commercialParamsCombine = this.db.getModel("commercialparams_combine")
        
    }
    async getAllCommercialParameters(){
        var result = await this.commercialParamsCombine
            .findAll({ attributes: [[this.db.sequelize.fn('distinct', this.db.sequelize.col('commercial_parameter_name')), 'commercial_parameter_name']]  });
        
        return result;
    }
    async getRefValues(commercialParamsArray , year,power_plant_name) {

        var modelCollection = await this.commercialParamsCombine
            .findAll({ where: { commercial_parameter_name: commercialParamsArray, year: year, power_plant_name: power_plant_name } });

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