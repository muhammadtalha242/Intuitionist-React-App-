const BaseRepository = require('./BaseRepository')
const db = require('../config/dbConfig');

module.exports = class CommercialParamterRepository extends BaseRepository {

    constructor() {
        super()
        this.commercialParams = this.db.getModel("commercialparams")
        this.vomlocal = this.db.getModel("vomlocalValues")
        this.commercialParamsCombine = this.db.getModel("commercialparams_combine")
        this.commercialParamsArray=["annual_security_cost", "ash_disposal_charges", "dsra_cost", "escalable_component", "fixedcostonworkingcapital",  "insurance", "fom_local", "fom_foreign","fixed_cost_jetty","fixed_fcc","fixed_rate", "interest_charges_foreign","interest_charges_local","interest_foreign_annual","interest_local_annual","interest_rate_rmb", "irsa_charges", "limestone_charges","nonescalable_component_foreign", "nonescalable_component_local", "proceed_from_cres", "repayment_rmb","roe","roedc","sinosure","variable_cost_jetty","variable_rate","vom_foreign","vom_local","water_charges", "wht" ];
    }

    async getRefValues(year, powerplant) {
        var modelCollection = await this.commercialParamsCombine
            .findAll({ where: { commercial_parameter_name: this.commercialParamsArray, year: 1, power_plant_name: ['AES PAK GEN',"AES LALPIR","KOHINOOR","HABIBULLAH"] } });

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