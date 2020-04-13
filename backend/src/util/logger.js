const chalk = require('chalk');
const log = console.log;

var logger = {};

logger.success = function(message,data){
    log(
      "=> " + chalk.green(`${message} `) +' => '+ chalk.yellow(JSON.stringify(data))
    );
}

logger.fail = function (message, data) {
    log("=> " + chalk.red(`${message} `) +' => '+ chalk.red(JSON.stringify(data)));
};

logger.info = function (message, data) {
    log("=> " + chalk.blue(`${message} `) +' => '+ chalk.blue(JSON.stringify(data)));
};

module.exports = logger;