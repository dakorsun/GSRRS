const redis = require('redis');
const {promisifyAll} = require('bluebird');
promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

const serverConfig = require('../../config/serverConfig');

const client = redis.createClient();

    

module.exports = {

};