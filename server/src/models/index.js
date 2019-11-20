import {sequelize, Sequelize} from './../setup/sequelize';

const modules = [
    import('./User'),
    import('./Race'),
    import('./UserRace'),
    import('./Cup'),
    import('./CupRace'),
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

export default models;

