var routes = require("./routeConfig");
var logger = require("../util/logger");
function mapPath(key) {
  var route = routes.filter((x) => {
    return x.key == key;
  })[0];
  logger.info("mappedRoute",route.key);
  return route.value;
}

module.exports = {
    mapPath:mapPath
};