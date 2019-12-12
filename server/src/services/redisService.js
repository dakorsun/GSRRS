import redis from 'redis';
import {promisifyAll} from 'bluebird';

promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

const serverConfig = require('../../config/serverConfig');

const client = redis.createClient();

export function startUserRun(id) {

}

export function userRunTick(id) {

}

export function getUserResult(id) {

}

