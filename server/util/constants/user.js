const USER_ROLES_ARR = [
    "ROLE_RACER",
    "ROLE_ADMIN"
];
const USER_ROLES = USER_ROLES_ARR.reduce((result, role) => {
    result.role = role;
    return result;
}, {});