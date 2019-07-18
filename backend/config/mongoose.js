const logger   = require('mm-node-logger')(module);
const mongoose = require('mongoose');
const config   = require('./config');

function createMongooseConnection(cb) {
    // Cria a conex�o do BD
    mongoose.Promise = global.Promise;

    // Faz a conex�o com o mongo de acordo com a config
    mongoose.connect(config.mongodb.dbURI);

    // Quando conseguir se connectar
    mongoose.connection.on('connected', function () {
        logger.info('Mongoose connected to ' + config.mongodb.dbURI);
    });

    // Se a conex�o der um erro
    mongoose.connection.on('error', function (err) {
        logger.error('Mongoose connection error: ' + err);
    });

    // Quando n�o h� conex�o
    mongoose.connection.on('disconnected', function () {
        logger.info('Mongoose disconnected');
    });

    // Quando a conex�o est� aberta
    mongoose.connection.once('open', function () {
        if(cb && typeof(cb) === 'function') {cb();}
    });

    // Se o Node encerrar, encerrar a conex�o Mongoose
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            logger.info('Mongoose disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports = createMongooseConnection;