import redis from 'redis';
import {promisifyAll} from 'bluebird';

promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

const serverConfig = require('../../config/serverConfig');

const client = redis.createClient();
client.on('error', (err) => {
    console.error("Error " + err)
});
client.on('connect', () => {
    console.log('REDIS CONNECTED');
})

export async function initiateEvent(id, config) {
    const result = await client.hmsetAsync(id, config);
    const hash = await client.hgetallAsync(id);
    return hash
}


export function userRunTick(sensor) {

}