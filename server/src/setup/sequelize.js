import Sequelize from 'sequelize';
import serverConfig from '../../config/serverConfig';

const sequelize = new Sequelize(serverConfig.MYSQL.DB, serverConfig.MYSQL.USER, serverConfig.MYSQL.PASSWORD, {
    host: serverConfig.MYSQL.URL,
    dialect: serverConfig.MYSQL.DIALECT,
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


export {
    Sequelize,
    sequelize,
    checkDBConnection,
};

