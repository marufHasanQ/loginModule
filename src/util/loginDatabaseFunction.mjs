import {checkUserExistencea, getUserPassword, getUserPassword, logger} from './util.mjs';

function loginDatabaseFunction(userInput) {
    return checkUserExistence(userInput.email)
        .then(v => logger(v))
        //TODO  if users doesn't exist Promise.reject()
        .then(v => getUserPassword(userInput.email))
        .then(v => logger(v))
        .then(v => v ? true : Promise.reject('wrong password'))
        .then(v => logger(v))
        .then(v => getUserData(userInput.email))
        .then(v => logger(v))
        .catch(v => console.log(v));
}



export {loginDatabaseFunction};
