import _camelCase from 'lodash/camelCase';

export const BATTLE_STAGES_ARR = [
    "QUALIFICATION",
    "ONE_EIGHT_FINAL",
    "QUARTER_FINAL",
    "SEMI_FINAL",
    "FINAL",
];

export const BATTLE_STAGES = BATTLE_STAGES_ARR.reduce((result, stage, i) => {
    const camelCaseString = _camelCase(stage) + (i === 0 ? 'Run' : 'Battle');
    result[stage] = {
        sql: stage,
        camelCase: camelCaseString
    };
    return result;
}, {});

console.log(BATTLE_STAGES);