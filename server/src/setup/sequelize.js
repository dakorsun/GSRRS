const Sequelize = require('sequelize');
const appConfig = require('../../config/serverConfig');

const sequelize = new Sequelize(appConfig.MYSQL.DB, appConfig.MYSQL.USER, appConfig.MYSQL.PASSWORD, {
    host: appConfig.MYSQL.URL,
    dialect: appConfig.MYSQL.DIALECT,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
    // pool: {
    //     max: 10,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // },
});


/**
 * It will terminate the server if can't connect to database
 * @return {Promise<void>}
 */
async function checkDBConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}


module.exports =  {
    Sequelize,
    sequelize,
    checkDBConnection,
};


