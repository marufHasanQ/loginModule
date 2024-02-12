
import {dbMakeQueries, dbSelectRows, dbInsertValues, dbDeleteRows, dbCheckExistence} from './db/queryFunction.mjs';


function getUserData(email) {

    return dbSelectRows("User")('password')(`email = '${email}'`)
        .then((v) => v[0].value.rows[0])
}

function checkPassword(userPassword) {

    return dbPassword => bcrypt.compare(userPassword, dbPassword)
}

function checkUserExistence(email) {

    return dbCheckExistence("User")(`email = '${email}'`)
}

function getUserPassword(email) {

    const PASSWORD_COLUMN_NAME = 'password';
    return dbSelectRows("User")([PASSWORD_COLUMN_NAME])(`email = '${email}'`)
        .then((v) => v[0][PASSWORD_COLUMN_NAME])
}

function addNewUser(userInput) {
    return bcrypt.hash(userInput.password, 10)
        .then(hash => {
            const userInfoMap = new Map([['email', userInput.email], ['password', hash]]);
            return userInfoMap;

        })
        .then(userInfoMap => dbMakeQueries([dbInsertValues('users')(userInfoMap)]));
}


function logger(v) {
    console.log(v);
    return v;
}

export {getUserPassword, getUserData, checkPassword, checkUserExistence, logger, addNewUser};
