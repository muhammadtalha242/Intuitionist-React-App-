const routes = require('./routeConfig');
const BaseController = require('../controllers/BaseController');
const logger = require('../util/logger');

let configureApi = function (app) {
  routes.map(route=>{
    app.use(`/${route.key}`,BaseController);
    logger.info("configuredRoute", `/${route.key}`);
  })
};

module.exports = {
  configureApi: configureApi,
};
