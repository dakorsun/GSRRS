import dotenv from 'dotenv';

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
    PROJECT_NAME: 'GSRRS',
    DEFAULT_BIKE: process.env.DEFAULT_BIKE,
    BIKE_ONE: {
        HALL_PIN: process.env.BIKE_ONE_HALL_PIN,
        LED_PIN: process.env.BIKE_ONE_LED_PIN,
        GEAR_DEVELOPMENT: process.env.BIKE_ONE_GEAR_DEVELOPMENT
    },
    BIKE_TWO: {
        HALL_PIN: process.env.BIKE_TWO_HALL_PIN,
        LED_PIN: process.env.BIKE_TWO_LED_PIN,
        GEAR_DEVELOPMENT: process.env.BIKE_TWO_GEAR_DEVELOPMENT
    }
};

export default Object.freeze(serverConfig);
