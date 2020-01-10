import redis from 'redis';
import {promisifyAll} from 'bluebird';

promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

import '../models';
import {sequelize, Sequelize} from '../setup/sequelize';
import {getBattle} from "./raceService";

const {Battle} = sequelize.models;

import serverConfig from '../../config/serverConfig';
import moment from "moment-timezone";
import {RACE_BATTLE} from "../../util/constants/race";

const {BIKE_ONE, BIKE_TWO} = serverConfig;

const client = redis.createClient();
client.on('error', (err) => {
    console.error("Error " + err)
});
client.on('connect', () => {
    console.log('REDIS CONNECTED');
})

export async function initiateEvent(id, config) {
    const battle = await Battle.findByPk(id);
    await battle.update({isActual: true});

    const {
        TYPE,
        BIKE_ONE_CYCLES, BIKE_TWO_CYCLES,

    } = config;


    await client.setAsync(id, config);

    const hash = await client.hgetallAsync(id);
    return hash
}
//for dev testing only
export async function setHash(id, values){
    await client.hmsetAsync(id, values)
}

export async function processBattleResult(id) {
    const battle = await Battle.findByPk(id);
    const racers = await battle.getUsers();

    const hash = await client.hgetallAsync(id);
    const {START_TIMESTAMP} = hash;

    const result = await Promise.all(racers.map(racer => {
        const {FINISH_TIMESTAMP} = JSON.parse(hash[racer.get('id')]);
        const result = FINISH_TIMESTAMP - START_TIMESTAMP;
        return battle.setUser(racer, {through: {result}});
    }));

    const resultRacers = await battle.getUsers();
    console.log('resultRacers: ', resultRacers)
}

export async function userRunTick(HALL_PIN) {
    const battle = await getBattle();
    const id = battle.get('id');

    if (!await client.hexistsAsync(id, HALL_PIN)) {
        throw Error('Tick hall pin doesn\'t configured');
    }
    const hash = await client.hgetallAsync(id);
    await client.hincrbyAsync(id, HALL_PIN, -1);
    if(hash[HALL_PIN] <= 0){
        const FINISH_TIMESTAMP = moment().unix();
        c
    }
    console.log('hash: ', hash);

}