const routes = require('./routeConfig');
const drivedRoutes = require('./drivedRoutesConfig');
const BaseController = require('../controllers/BaseController');
const DrivedController = require('../controllers/DrivedController');
const PowerPlantController = require('../controllers/PowerPlantController');
const CommercialParameterController = require('../controllers/CommercialParameterController');

// EDIT
const FccComputationModules = require('../../routes/FCC/FccComputationModules');
const ComputationModules = require('../../routes/CPP&EPP/ComputationModules');
const SddpService= require("../../routes/SDDP/getResults")
// EDIT

const logger = require('../util/logger');

let configureApi = function (app) {
  let baseController = new BaseController();
  routes.map(route => {
    app.use(`/${route.key}`, baseController.getRoutes());
    // logger.info("configuredRoute", `/${route.key}`);
  })

  configureCustomRoutes(app);
  // drivedRoutes.map(dRoute => {
  //   app.use(`/${dRoute.key}`, DrivedController);
  //   logger.info("configuredRoute", `/${dRoute.key}`);
  // })
};

let configureCustomRoutes = function (app) {
  let powerplant = new PowerPlantController();
  let commercialParameter = new CommercialParameterController()
  let Sddp = new SddpService()
  app.use('/computation',commercialParameter.getRoutes())
  app.use('/powerplants', powerplant.getRoutes())
  app.use('/submitFCC', FccComputationModules)
  app.use('/submit', ComputationModules)
  app.use('/sheetsData', Sddp.getRoutes())


}

module.exports = {
  configureApi: configureApi,
};
