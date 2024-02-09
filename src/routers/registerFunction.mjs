//import {dbInsertValues, dbSelectRows} from "./db/queryFunction.mjs";

import {getUserData, checkUserExistence, logger, createJWT, addNewUser} from "./util.mjs";

const JWTkey = process.env.ENCRYPT_KEY ;
console.log(JWTkey);
function registerFunction(userInput) {
    return validationFunction => Promise.resolve(validationFunction())
        .then(v => v ? Promise.resolve(userInput) : Promise.reject('userInput is invalid'))
        .then(userInput => checkUserExistence(userInput.email))

        .then(isExist => isExist ? Promise.reject('user already exists') : false)

        .then(isExist => addNewUser(userInput))
        .then(data => userInput/*getUserData*/)
        .then(UserData => createJWT(JWTkey)('5s')(userData))
        .then(logger)
        .catch((e) => console.log(e));
}
//registerFunction(1)(() => 4);
