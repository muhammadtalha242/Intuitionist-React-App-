const express = require('express');
import ComputationService from './ComputationService'
const commercialParametersFile = require("./CommercialParameters")

class CPPSerive extends ComputationService {

    constructor() {

        this.commercialParameters = await commercialParametersFile.getCommercialParameters()

    }
}


module.exports = CPPSerive;