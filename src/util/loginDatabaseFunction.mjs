import {dbMakeQueries, dbSelectRows, dbInsertValues, dbDeleteRows, dbCheckExistence} from './db/queryFunction.mjs';
//import * as dotenv from 'dotenv'

function loginDatabaseFunction(userInput) {
    return checkUserExistence(userInput.email)
        .then(v => logger(v))
        //TODO  if users doesn't exist Promise.reject()
        .then(v => getUserPassword(userInput.email))
        .then(v => logger(v))
        .then(v => checkPassword(userInput.password)(v.password))
        .then(v => v ? true : Promise.reject('wrong password'))
        .then(v => logger(v))
        .then(v => getUserData(userInput.email))
        .then(v => logger(v))
        .catch(v => console.log(v));
}

function checkPassword(userPassword) {
    return dbPassword => bcrypt.compare(userPassword, dbPassword)
}

function getUserPassword(email) {
    return dbMakeQueries([dbSelectRows('user')('password')(`email = '${email}'`)])
        .then((v) => v[0].value.rows[0])
}


function getUserData(email) {
    return dbMakeQueries([dbSelectRows('user')('password')(`email = '${email}'`)])
        .then((v) => v[0].value.rows[0])
}

function checkUserExistence(email) {
    const query = dbCheckExistence('user')(`email = '${email}'`)
    return dbMakeQueries([query])
        .then(v => console.log('wowowo', v[0].value.rows[0].exists ? 'yes' : 'no'))
}

function logger(v) {
    console.log(v);
    return v;
}


export {getUserPassword, checkPassword, checkUserExistence};
//loginFunction({email:'xyz@gmail.com',password: 'password'});
