const {sequelize, Sequelize} = require('./../setup/sequelize');

const modules = [
    require('./User'),
    require('./Race'),
    require('./UserRace'),
    require('./Cup'),
    require('./CupRace'),
];

const models = {};

// Initialize models
modules.forEach((module) => {
    const model = module.default(sequelize, Sequelize);
    models[model.name] = model;
});

// Add associations
Object.values(models)
    .forEach((model) => {
        if (model.associate) {
            model.associate(models);
        }
    });

module.exports = models;

