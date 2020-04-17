const routes = require('./routeConfig');
const drivedRoutes = require('./drivedRoutesConfig');
const BaseController = require('../controllers/BaseController');
const DrivedController = require('../controllers/DrivedController');

const logger = require('../util/logger');

let configureApi = function (app) {
  routes.map(route=>{
    app.use(`/${route.key}`,BaseController);
    logger.info("configuredRoute", `/${route.key}`);
  })
  drivedRoutes.map(dRoute=>{
    app.use(`/${dRoute.key}`,DrivedController);
    logger.info("configuredRoute", `/${dRoute.key}`);
  })
};

module.exports = {
  configureApi: configureApi,
};
