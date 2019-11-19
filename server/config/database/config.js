const serverConfig = require('../serverConfig').default;

export default {
    [serverConfig.NODE_ENV]: {
        "username": serverConfig.MYSQL.USER,
        "password": serverConfig.MYSQL.PASSWORD,
        "database": serverConfig.MYSQL.DB,
        "host": serverConfig.MYSQL.URL,
        "dialect": serverConfig.MYSQL.DIALECT,
    },
};
