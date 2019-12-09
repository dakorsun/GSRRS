export function generateRunResultInMs(maxResult,minResult) {
    return Math.floor(Math.random() * (maxResult-minResult) + minResult);
}