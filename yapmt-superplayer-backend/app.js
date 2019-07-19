const logger  = require('mm-node-logger')(module);
const config  = require('./config/config');
const express = require('./config/express');
const mongodb = require('./config/mongoose');
const Timer = require("./project/timer");

mongodb(function startServer() {
    var app = express.init();
    app.listen(config.server.port, function () {
        logger.info('Servidor rodando...');
        Timer.releaseTimer();
    });
});
