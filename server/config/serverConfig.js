const dotenv = require('dotenv');

dotenv.config({path: process.env.NODE_ENV === 'test' ? '.env.test' : null});

const serverConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    MYSQL: {
        URL: process.env.MYSQL_URL,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD,
        DB: process.env.MYSQL_DB,
        DIALECT: 'mysql',
    },
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    SOCKETIO: {},
    PROJECT_NAME: 'GSRRS'
};

module.exports = Object.freeze(serverConfig);
