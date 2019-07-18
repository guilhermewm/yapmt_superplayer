var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Preencher o BD com amostras, se for necess�rio
config.seedDB = false;

// Configura��o do servidor
config.server = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000
};

// MongoDB configura��es
if(process.env.NODE_ENV == "production"){
    config.mongodb = {
        dbURI: "mongodb://mongo:27017/project"
    };
}else{
    config.mongodb = {
        dbURI: "mongodb://localhost:27017/project"
    };
}
// Exportar configura��es
module.exports = config;