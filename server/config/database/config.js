const appConfig = require('../serverConfig').default;

module.exports = {
    [appConfig.NODE_ENV]: {
        "username": appConfig.MYSQL.USER,
        "password": appConfig.MYSQL.PASSWORD,
        "database": appConfig.MYSQL.DB,
        "host": appConfig.MYSQL.URL,
        "dialect": appConfig.MYSQL.DIALECT,
    },
};
