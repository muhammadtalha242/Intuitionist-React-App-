const routes = require('./routeConfig');
const drivedRoutes = require('./drivedRoutesConfig');
const BaseController = require('../controllers/BaseController');
const DrivedController = require('../controllers/DrivedController');
const PowerPlantController = require('../controllers/PowerPlantController');

const logger = require('../util/logger');

let configureApi = function (app) {
  let baseController = new BaseController();
  routes.map(route => {
    app.use(`/${route.key}`, baseController.getRoutes());
    logger.info("configuredRoute", `/${route.key}`);
  })

  configureCustomRoutes(app);
  // drivedRoutes.map(dRoute => {
  //   app.use(`/${dRoute.key}`, DrivedController);
  //   logger.info("configuredRoute", `/${dRoute.key}`);
  // })
};

let configureCustomRoutes = function (app) {
  let pp = new PowerPlantController();

  app.use('/powerplants', pp.getRoutes())
}

module.exports = {
  configureApi: configureApi,
};
