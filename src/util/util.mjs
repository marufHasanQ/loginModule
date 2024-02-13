import {dbSelectRows, dbInsertValues, dbDeleteRows, dbCheckExistence} from './db/nodePostORM/queryFunction.mjs';


function getUserData(email) {

    return dbSelectRows("User")('password')(`email = '${email}'`)
        .then((v) => v[0].value.rows[0])
}


function checkUserExistence(email) {

    return dbCheckExistence("User")(`email = '${email}'`)
}

function getUserPassword(email) {

    const PASSWORD_COLUMN_NAME = 'password';
    return dbSelectRows("User")([PASSWORD_COLUMN_NAME])(`email = '${email}'`)
        .then((v) => v[0][PASSWORD_COLUMN_NAME])
}

function addNewUser(userInfoMap, hashedPassword) {
    userInfoMap.set('password', hashedPassword)

    return dbInsertValues('User')(userInfoMap);
}

function validateUserInput(userInput) {
    const email = userInput.get('email');
    const password = userInput.get('password');
    const validateEmail = email => email.length >= 0;
    const validatePassword = email => email.length >= 0;
    if (!validateEmail(email))
        throw 'Invalidate Email'
    if (!validatePassword(password))
        throw 'Invalidate Password'
    return true;
}

function logger(header, v) {
    console.log(header, v);
    return v;
}

export {getUserPassword, getUserData, checkUserExistence, logger, addNewUser, validateUserInput};
